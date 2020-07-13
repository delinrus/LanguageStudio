<template lang="pug">
.row
	.col(v-if='!showStudentAdder')
		button.ml-auto.btn.btn-outline-primary(@click='showAdder()' v-if="group_id") Добавить ученика
	//show form for add student
	.col(v-else)
		.row
			.col-md.col-sm-12.px-sm-0.px-md-3
				.form-group
					b-form-select(v-model='$v.addedStudent.$model' :options='studentNames' :state='validateState($v.addedStudent)' :disabled='isLoadingStudents')
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
		props: ['group_id'],
	},
	props: {
		group_id: {
			required: true,
		},
	},
	validations: {
		addedStudent: { required },
	},
	computed: {
		studentNames: function () {
			//TODO MAKE HERE ID OF GROUP, NOT NAME
			return this.allStudents
				.filter((el) => el.group.isEmpty() || el.group.name !== this.group_id)
				.map((el) => filterFio(el))
		},
	},
	data() {
		return {
			allStudents: [],
			isLoadingStudents: true,
			addedStudent: '', //student name for add
			showStudentAdder: false, //add student form
		}
	},
	mounted() {
		this.showStudentAdder = false
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
		async handleAddStudentToGroup(name) {
			if (!this.checkFormValidity()) {
				return
			}
			const student = this.allStudents.find(
				(el) => filterFio(el) === this.addedStudent
			)
			await this.$store.dispatch('students/changeGroup', {
				student,
				group_id: this.group_id,
			})
			//await this.$store.dispatch('groups/fetchByName', this.group_id)
			this.resetForm()
		},

		async showAdder() {
			this.showStudentAdder = true

			if (this.$store.getters['students/students'].length === 0) {
				this.isLoadingStudents = true
				await this.$store.dispatch('students/fetchAll')
			}
			this.allStudents = this.$store.getters['students/students']
			this.isLoadingStudents = false
		},
		handleCancelAddStudentToGroup() {
			this.showStudentAdder = false
			this.resetForm()
		},
		resetForm() {
			this.addedStudent = ''
			this.$nextTick(() => {
				this.$v.$reset()
			})
		},
	},
}
</script>
<style scoped lang="scss"></style>
