<template lang="pug">
.row
	.col(v-if='!showStudentAdder')
		button.ml-auto.btn.btn-outline-primary(@click='showStudentAdder=true') Добавить ученика
	//show form for add student
	.col(v-else)
		.row
			.col-md.col-sm-12.px-sm-0.px-md-3
				.form-group
					b-form-select(v-model='$v.addedStudent.$model' :options='studentNames' :state='validateState($v.addedStudent)')
			.col-md.col-sm-12
				.row
					button.col-5.btn.btn-outline-primary(@click='handleCancelAddStudentToGroup()') Отмена
					button.col-5.ml-sm-auto.mr-md-3.btn.btn-primary(@click='handleAddStudentToGroup(addedStudent)' :disabled='!validateState($v.addedStudent)') Добавить

</template>

<script>
import filterFio from '@/plugins/fio.filter'
import { required } from 'vuelidate/lib/validators'

export default {
	model: {
		props: ['group', 'allStudents']
	},
	props: {
		group: {
			type: Object,
			required: true
		},
		allStudents: {
			type: Array,
			required: true
		}
	},
	validations: {
		addedStudent: { required }
	},
	computed: {
		studentNames: function() {
			//TODO MAKE HERE ID OF GROUP, NOT NAME
			return this.allStudents
				.filter(el => el.group !== this.group.name)
				.map(el => filterFio(el))
		}
	},
	data() {
		return {
			addedStudent: '', //student name for add
			showStudentAdder: false //add student form
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
		handleAddStudentToGroup(name) {
			if (!this.checkFormValidity()) {
				return
			}
			//TODO ADD Student to group
			this.resetForm()
		},
		handleCancelAddStudentToGroup() {
			this.resetForm()
		},
		resetForm() {
			this.$v.$reset()
			this.addedStudent = ''
			this.showStudentAdder = false
		}
	}
}
</script>
<style scoped lang="scss"></style>
