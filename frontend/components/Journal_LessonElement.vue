<template lang="pug">

.card.border-light.no-border
	.card-body.p-0
		button(@click="onClick"
		).list-group-item.list-group-item-action.justify-content-between.align-items-center
			//show when selected
			b-container(fluid='' v-if="selected")
				.row
					.col-sm-3.mt-1
						label.font-weight-bold Дата:
					.col-sm-9
						b-form-input.text-primary( :value='formatDate($v.changedLesson.date.$model)' @input="$v.changedLesson.date.$model=new Date($event)" type='date' :size="breakpoints.lt.sm? 'md':'sm'" :state="validateState($v.changedLesson.date)" v-bind:readonly='isReadonly')
				.row
					.col-sm-3.mt-1
						label.font-weight-bold Тема:
					.col-sm-9
						b-form-textarea.text-primary(v-model='$v.changedLesson.theme.$model' type='text' rows='1' :max-rows='breakpoints.lt.sm? 2:4' :size="breakpoints.lt.sm? 'md':'sm'" :state="validateState($v.changedLesson.theme)" v-bind:readonly='isReadonly' placeholder='Введите тему')
				.row
					.col-sm-3.mt-1
						label.font-weight-bold Д/з:
					.col-sm-9
						b-form-textarea(v-model='$v.changedLesson.homework.$model' type='text' rows='1' :max-rows='breakpoints.lt.sm? 4:6' :size="breakpoints.lt.sm? 'md':'sm'" :state="validateState($v.changedLesson.homework)" v-bind:readonly='isReadonly' :placeholder="isReadonly? 'Нет домашнего задания':'Введите домашнее задание'")
				.row
					.col-sm-3.mt-1
						label.font-weight-bold Прим.:
					.col-sm-9
						b-form-textarea(v-model='$v.changedLesson.description.$model' type='text' rows="1" :max-rows="breakpoints.lt.sm?4:6" :size="breakpoints.lt.sm? 'md':'sm'" :state="validateState($v.changedLesson.description)" v-bind:readonly='isReadonly' :placeholder="isReadonly? 'Нет примечания':'Введите примечание'")
			.row(v-if="selected").pt-3
				.col
					button.btn.btn-outline-primary.mx-3.float-right(v-if="isReadonly" @click="isReadonly=false") Изменить
					button.btn.btn-secondary.ml-3(v-if="!isReadonly" @click='cancelSaveLesson') Отменить
					button.btn.btn-outline-primary.mr-3.float-right(v-if="!isReadonly" @click="saveLesson") Сохранить
			//show when not selected
			div(v-else).mx-3
				.row.my-2
					h6
						span
							b-badge(variant='primary') {{lesson.date | dateFormat('date')}}
						span.font-weight-bold.ml-1.text-primary  {{lesson.theme}}
				.row(v-if="lesson.homework")
					hr.w-100.my-1
					p {{lesson.homework}}
				.row(v-if="lesson.description")
					hr.w-100.my-1
					span.font-italic.text-muted {{lesson.description}}
</template>

<script>
import { required, minLength, alpha, helpers } from 'vuelidate/lib/validators'
import breakpoints from '~/js/breakpoint_utils'
import Lesson from '~/js/lesson_class'
import Group from '~/js/group_class'
const mustBeDate = (value) => new Date(value)
export default {
	model: {
		props: ['lesson', 'selected', 'group_id'],
		event: ['onClick', 'onSave', 'onCancel'],
	},
	props: {
		lesson: {
			type: Lesson,
			required: true,
		},
		selected: {
			type: Boolean,
			required: true,
		},
		group_id: {
			required: true,
		},
	},
	components: {},
	validations: {
		changedLesson: {
			date: {
				required,
				mustBeDate,
			},
			theme: {
				required,
				minLength: minLength(2),
			},
			homework: {},
			description: {},
		},
	},
	computed: {
		breakpoints: function () {
			return breakpoints.screen
		},
		isExistedLesson: function () {
			return !this.lesson.isEmpty()
		},
	},
	data() {
		return {
			isReadonly: true,
			changedLesson: new Lesson(), //create in mounted
		}
	},
	mounted() {
		this.isReadonly = this.isExistedLesson
	},
	methods: {
		formatDate(date) {
			var d = new Date(date),
				month = '' + (d.getMonth() + 1),
				day = '' + d.getDate(),
				year = d.getFullYear()

			if (month.length < 2) month = '0' + month
			if (day.length < 2) day = '0' + day

			return [year, month, day].join('-')
		},
		onClick: function () {
			this.$emit('onClick', this.lesson)
		},
		async saveLesson() {
			if (!this.checkFormValidity()) return
			this.isReadonly = this.isExistedLesson
			if (this.isExistedLesson) {
				await this.$store.dispatch('lessons/updateLesson', {
					group_id: this.group_id,
					lesson: this.changedLesson,
				})
			} else {
				await this.$store.dispatch('lessons/createLesson', {
					group_id: this.group_id,
					new_lesson: this.changedLesson,
				})
				//reload list
			}
			this.$v.$reset()
			this.$emit('onSave')
		},
		cancelSaveLesson: function () {
			this.isReadonly = this.isExistedLesson
			this.changedLesson = this.lesson.clone()
			this.$v.$reset()
			this.$emit('onCancel')
		},
		checkFormValidity() {
			const is_valid = !this.$v.$invalid
			if (!is_valid) {
				this.$v.$touch()
			}
			return is_valid
		},
		validateState(p) {
			const { $dirty, $error } = p
			return $dirty ? !$error : null
		},
	},
	watch: {
		lesson: {
			immediate: true,
			handler(val) {
				this.changedLesson = val.clone()
			},
		},
	},
}
</script>
<style scoped></style>
