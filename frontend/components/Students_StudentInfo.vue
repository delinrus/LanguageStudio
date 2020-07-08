<template lang="pug">
b-modal(:id = 'id' title='Карточка ученика', @show='onShowForm', @hidden='onHideForm', @ok='handleSave' size="lg")
	Loader(v-if="isLoading")
	form(v-else ref='form')
		.row
			b-form-group.col-md-4.col-sm-12(label='Фамилия:', invalid-feedback='Введите фамилию')
				b-form-input(v-model='$v.student.family.$model' type='text' :state="validateState($v.student.family)" v-bind:readonly='isReadonly')
			b-form-group.col-md-4.col-sm-12(label='Имя:',  invalid-feedback='Введите имя')
				b-form-input(v-model='$v.student.name.$model', type='text' :state='validateState($v.student.name)' v-bind:readonly='isReadonly')
			b-form-group.col-md-4.col-sm-12(label='Отчество:', )
				b-form-input(v-model='$v.student.patronymic.$model' type='text' :state='validateState($v.student.patronymic)'  v-bind:readonly='isReadonly')
		.row
			b-form-group.col-12(label='Адрес:' )
				b-form-input(v-model='$v.student.address.$model'  type='text'  :state='$v.student.address.$dirty? true:null'  v-bind:readonly='isReadonly')
		.row(v-if='student.group!==null')
			b-form-group.col-6(label='Группа:', invalid-feedback='Укажите группу')
				b-form-select(v-model='$v.student.group.$model' :options='groupNames' v-bind:disabled='isReadonly')
		.row
			b-form-group.col-6(label='Телефон для связи:' invalid-feedback='Введите телефон')
				b-input-group
					b-input-group-prepend(is-text)
						i.material-icons.align-middle phone
					b-form-input(v-model='$v.student.phone.$model' type='tel' :state='validateState($v.student.phone)' placeholder="+7xxxxxxxxxx"  v-bind:readonly='isReadonly')
		//parents
		div(v-for="p,n in $v.student.parents.$each.$iter")
			hr
			.row.pb-3
				h5.align-text-bottom.pl-3 Родитель {{+n+1}}:
				b-button.align-baseline.ml-auto.mr-3.py-0(variant='outline-danger' @click='deleteParent(n)' size='sm')
					i.material-icons.align-middle clear
			.row
				b-form-group.col-md-4.col-sm-12(label='Фамилия:', invalid-feedback='Введите фамилию')
					b-form-input(v-model='p.family.$model' type='text' :state='validateState(p.family)'  v-bind:readonly='isReadonly')
				b-form-group.col-md-4.col-sm-12( label='Имя:', invalid-feedback='Введите имя')
					b-form-input(v-model='p.name.$model', type='text' :state='validateState(p.name)'  v-bind:readonly='isReadonly')
				b-form-group.col-md-4.col-sm-12(label='Отчество:')
					b-form-input(v-model='p.patronymic.$model' type='text' :state='validateState(p.patronymic)'  v-bind:readonly='isReadonly')
			.row
				b-form-group.pl-3(label='Телефон:', label-for='phone-input' invalid-feedback='Введите телефон')
					b-input-group
						b-input-group-prepend(is-text)
							i.material-icons.align-middle phone
						b-form-input(v-model='p.phone.$model' type='tel' :state='validateState(p.phone)' placeholder="+7xxxxxxxxxx"  v-bind:readonly='isReadonly')
		b-button(variant='outline-primary' @click='addParent' v-if='!isReadonly') Добавить родителя
	template(v-slot:modal-footer='{ edit, cancel, ok }')
		// Emulate built in modal footer ok and cancel button actions
		// Button with custom close trigger value
		b-button.mr-auto(v-if="isReadonly && !isLoading" variant='outline-primary', @click="isReadonly = false; changedToEdit = true") Изменить
		b-button(v-if="changedToEdit" variant='secondary', @click='cancel()') Отменить
		b-button(v-if="changedToEdit" variant='primary', @click='ok()') Сохранить
		b-button(v-else variant='primary', @click='cancel()') Закрыть

</template>

<script>
import Loader from '~/components/Loader'
import Student from '~/js/student_class'
import { required, minLength, alpha } from 'vuelidate/lib/validators'
import phoneValidator from '@/plugins/phone.validator'
export default {
	model: {
		prop: ['id', 'isReadonlyMode', 'student_id'],
		event: 'onChange',
	},
	props: {
		id: {
			type: String,
			required: true,
		},
		student_id: {
			required: true,
			default: null,
		},
	},
	components: { Loader },
	validations: {
		student: {
			name: {
				required,
				minLength: minLength(2),
			},
			patronymic: {},
			family: {
				required,
				minLength: minLength(2),
			},
			address: {},
			group: {},
			phone: { phoneValidator },
			parents: {
				$each: {
					name: {
						required,
						minLength: minLength(2),
					},
					patronymic: {},
					family: {
						required,
						minLength: minLength(2),
					},
					phone: { phoneValidator },
				},
			},
		},
	},
	computed: {
		groupNames() {
			return this.$store.getters['groups/groups'].map((el) => el.name)
		},
	},
	data() {
		return {
			isLoading: true,
			isReadonly: false,
			changedToEdit: false,
			student: null, //create in onShow
		}
	},
	methods: {
		validateState(p) {
			const { $dirty, $error } = p
			return $dirty ? !$error : null
		},

		checkFormValidity() {
			const is_valid = !this.$v.$invalid
			if (!is_valid) {
				this.$v.$touch()
			}
			return is_valid
		},
		getStudent() {
			return this.$store.getters['students/studentById'](this.student_id)
		},
		async onShowForm() {
			this.$v.$reset()
			this.isLoading = true

			if (this.student_id) {
				this.changedToEdit = false
				//cache
				if (this.groupNames.length == 0) {
					await this.$store.dispatch('groups/fetchAll')
				}

				//cache
				if (
					!this.$store.getters['students/studentById'](this.student_id).detailed
				) {
					await this.$store.dispatch('students/fetchById', this.student_id)
				}
				//this.student = {
				//	...this.$store.getters['students/studentById'](this.student_id),
				//}
				this.student = this.getStudent().clone()

				this.student.group = this.student.group ? this.student.group.name : ''
				if (!this.student.parents) {
					this.student.parents = []
				}
			} else {
				this.changedToEdit = true
				this.student = new Student()
			}
			this.isReadonly = this.student_id !== null //if student exist then readonly
			this.isLoading = false
			//this.$loadingFinish()
		},
		onHideForm() {
			this.$v.$reset()
		},
		async handleSave(bvModalEvt) {
			// Prevent modal from closing
			bvModalEvt.preventDefault()
			// Trigger submit handler
			// Exit when the form isn't valid
			if (!this.checkFormValidity()) {
				return
			}

			try {
				if (this.student_id) {
					await this.$store.dispatch('students/updateStudent', this.student)
				} else {
					await this.$store.dispatch('students/createStudent', this.student)
				}
				this.$store.getters['students/studentById'](this.student_id)
				this.$emit('onChange')
			} catch (error) {}
			//TODO! save this.student to DATABASE
			this.$nextTick(() => {
				this.$bvModal.hide(this.id)
			})
		},
		addParent() {
			this.student.parents.push({
				name: '',
				patronymic: '',
				family: '',
				phone: '',
			})
		},
		deleteParent(n) {
			this.student.parents.splice(n, 1)
		},
	},
}
</script>
