<template lang="pug">
b-modal(:id = 'id' title='Карточка ученика', @show='resetModal', @hidden='resetModal', @ok='handleSave' size="lg")
	form(ref='form')
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
				b-form-select(v-model='$v.student.group.$model' :options='groupList' v-bind:disabled='isReadonly')
		.row
			b-form-group.col-6(label='Телефон:' invalid-feedback='Введите телефон')
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
		b-button.mr-auto(v-if="isReadonly" variant='outline-primary', @click="isReadonly = false; changedToEdit = true") Изменить
		b-button(v-if="changedToEdit" variant='secondary', @click='cancel()') Отменить
		b-button(v-if="changedToEdit" variant='primary', @click='ok()') Сохранить
		b-button(v-else variant='primary', @click='cancel()') Закрыть

</template>

<script>
import { required, minLength, alpha } from 'vuelidate/lib/validators'
import phoneValidator from '@/plugins/phone.validator'
export default {
	props: {
		id: {
			type: String,
			required: true
		},
		groupList: {
			type: Array,
			required: true
		},
		isReadonlyMode: {
			type: Boolean,
			default: false
		},
		student_prop: {
			required: true,
			default: null,
			validator: prop => typeof prop === 'object' || prop === null
		}
	},
	validations: {
		student: {
			name: {
				required,
				minLength: minLength(2)
			},
			patronymic: {},
			family: {
				required,
				minLength: minLength(2)
			},
			address: {},
			group: {},
			phone: { phoneValidator },
			parents: {
				$each: {
					name: {
						required,
						minLength: minLength(2)
					},
					patronymic: {},
					family: {
						required,
						minLength: minLength(2)
					},
					phone: { phoneValidator }
				}
			}
		}
	},
	data() {
		return {
			isReadonly: false,
			changedToEdit: false,
			student: {
				name: '',
				family: '',
				patronymic: '',
				group: null,
				address: '',
				phone: '',
				parents: []
			}
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
		resetModal() {
			this.$v.$reset()
			if (this.student_prop) {
				this.changedToEdit = false
				this.student = this.student_prop
				if (!this.student.parents) {
					this.student.parents = []
				}
			} else {
				this.changedToEdit = true
				this.student = {
					name: '',
					family: '',
					patronymic: '',
					group: null,
					address: '',
					phone: '',
					parents: []
				}
			}
			this.isReadonly = this.isReadonlyMode
		},
		handleSave(bvModalEvt) {
			// Prevent modal from closing
			bvModalEvt.preventDefault()
			// Trigger submit handler
			// Exit when the form isn't valid
			if (!this.checkFormValidity()) {
				return
			}

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
				phone: ''
			})
		},
		deleteParent(n) {
			this.student.parents.splice(n, 1)
		}
	}
}
</script>
