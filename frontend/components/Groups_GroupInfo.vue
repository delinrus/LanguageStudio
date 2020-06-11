<template lang="pug">
b-modal(:id = 'id' title='Карточка группы', @show='resetModal', @hidden='resetModal', @ok='handleSave' size="lg")
	form(ref='form')
		.row
			b-form-group.col(label='Название группы:', invalid-feedback='Введите название гпуппы')
				b-form-input(v-if='!$v.group.is_individual.$model' v-model='$v.group.name.$model' type='text' :state="validateState($v.group.name)" v-bind:readonly='isReadonly')
				b-form-select(v-else v-model='$v.group.name.$model' :options='studentNames' v-bind:disabled='isReadonly' :state='validateState($v.group.name)')
		.row
			b-form-group.col-12(label='Тип группы:' )
				b-form-radio-group(v-model='$v.group.is_individual.$model' v-bind:disabled='isReadonly')
					b-form-radio(:value='false') Группа
					b-form-radio(:value='true') Индивидуально
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
import filterFio from '@/plugins/fio.filter'
export default {
	props: {
		id: {
			type: String,
			required: true
		},
		isReadonlyMode: {
			type: Boolean,
			default: false
		},
		group_prop: {
			required: true,
			default: null,
			validator: prop => typeof prop === 'object' || prop === null
		},
		allStudents: {
			type: Array,
			required: true
		}
	},
	validations: {
		group: {
			name: {
				required,
				minLength: minLength(2)
			},
			is_individual: {}
		}
	},
	computed: {
		studentNames: function() {
			//convert allStudents to names
			return this.allStudents.map(el => filterFio(el))
		}
	},
	data() {
		return {
			isReadonly: false,
			changedToEdit: false,
			group: {
				name: '',
				students: [],
				is_individual: false
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
			if (this.group_prop) {
				this.changedToEdit = false
				this.group = this.group_prop
			} else {
				this.changedToEdit = true
				this.group = {
					name: '',
					students: [],
					is_individual: false
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

			//TODO! save this.group to DATABASE
			// if now individual grup->set student as member of group
			if (this.group.is_individual) {
				//TODO! change group of student
				const student = this.allStudents.find(
					el => this.studentToFio(el) === this.group.name
				)
				this.group.students = [student]
			}
			debugger
			this.$nextTick(() => {
				this.$bvModal.hide(this.id)
			})
		}
	}
}
</script>
