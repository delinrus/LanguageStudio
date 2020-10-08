<template lang="pug">
.container-fluid.px-0
	//group selector
	.row
		.card.col.px-0
			.card-header
				.form-inline
					span.pr-3 Группа:
					b-form-select(v-model='currentSelectedGroupId' :options='groups' text-field="name" value-field="id" size='sm' :disabled="loading").b-0
	//dashboard(:class="breakpoints.lt.sm?'':',=h-100'")
	.row
		//students
		.card.col.px-0.lesson-info.max-height
			.card-body.p-0(v-if="loading")
				Loader
			.card-body.p-0.border-bottom(v-else)
				b-table#my-table.mb-3.mh-100(v-if="items.length" striped hover :items="items" :fields="fields" responsive sticky-header bordered)
				div.p-3.container-fluid.text-center(v-else)
					span Нет данных
		//lessons
		div.scroll.col.px-0.lesson-tab.max-height
			.card.h-100
				.card-header.visible_on_small
					h4 Уроки
				.card-body.p-0.border-bottom
					div.p-3.container-fluid.text-center(v-if="!currentSelectedGroupId")
						span Группа не выбрана
					div(v-else)
						div(v-if='getLessonsSorted.length')
							.list-group-flush(v-for="(l) of getLessonsSorted")
								LessonElement(@onClick="currentSelectedLesson = l" :lesson='l' :selected='currentSelectedLesson===l' :group_id='currentSelectedGroupId')
						div.pt-3.container-fluid.text-center(v-else)
							span() Нет уроков
							hr.mb-0
						div.p-3(v-if="!isAddingLesson")
							button#btn-new-lesson.btn-block.btn.btn-primary(@click="isAddingLesson=true") Новый урок
						LessonElement(:lesson='getNewLesson()' :selected="true" v-if="isAddingLesson &&currentSelectedGroupId" @onCancel="isAddingLesson=false" @onSave="isAddingLesson=false" :group_id='currentSelectedGroupId')
</template>

<script>
import LessonElement from '~/components/Journal_LessonElement'
import Loader from '~/components/Loader'
import Group from '~/js/group_class.js'
import Lesson from '~/js/lesson_class.js'
import { LessonItem, Attendance, Homework } from '~/js/lesson_item_class.js'
import dateFormat from '~/plugins/date.filter.js'
import filterFio from '~/plugins/fio.filter.js'
import breakpoints from '~/js/breakpoint_utils'
import { mapGetters } from 'vuex'

export default {
	layout: 'private_diary',
	components: {
		Loader,
		LessonElement,
	},
	computed: {
		breakpoints: function () {
			return breakpoints.screen
		},
		...mapGetters('groups', ['groups', 'groupById']),
		...mapGetters('lessons', [
			'lessonsByGroupId',
			'lessonsIsFetchedForGroupId',
			'lessonItemsByGroupIdAndLessonId',
		]),
		getGroup() {
			return this.groupById(this.currentSelectedGroupId)
		},
		getLessons() {
			return this.lessonsByGroupId(this.currentSelectedGroupId)
		},
		isLessonsFetched() {
			return this.lessonsIsFetchedForGroupId(this.currentSelectedGroupId)
		},
		getLessonsSorted() {
			var sorted = this.getLessons.slice().sort(function (a, b) {
				if (a.date > b.date) return 1
				if (a.date < b.date) return -1
				return 0
			}) //in place //shallow copy
			console.log(sorted)
			return sorted
		},
	},
	data: () => ({
		currentSelectedGroupId: null,
		currentSelectedLesson: null,
		isAddingLesson: false,
		fields: [],
		items: [],
	}),
	async mounted() {
		this.$loadingStart()
		await this.$store.dispatch('groups/fetchAll')
		await this.$store.dispatch('students/fetchAll')
		this.$loadingFinish()
	},
	methods: {
		getNewLesson: function () {
			return new Lesson()
		},
		//TODO MAKE Pagination
		generateTable() {
			this.fields = []
			this.items = []
			//generate fields
			if (this.getLessonsSorted.length === 0) {
				return
			}
			// name, lesson_id1,lesson_id2,lesson_id3...
			this.fields = [
				{ key: 'name', sortable: true, label: 'Имя', stickyColumn: true },
				...this.getLessonsSorted.map((el) => {
					return {
						key: `${el.id}`,
						label: dateFormat(el.date, 'date'),
					}
				}),
			]
			//generates items=> array of rows:
			//each row: name, lesson_id1, lesson_id2,lesson_id3....

			//create list of all students(id`s) that was in this group
			const studentsInGroup = [
				123, //TODO (remove after test) not existed id, for TEST purpose only (must be ignored by code's handler)
				...new Set( //make only unique id's in array
					this.getLessonsSorted.reduce(function (res, el) {
						return res.concat(el.students)
					}, []) //get list of all students from all lessons
				),
			]
			//get all studentsInfo
			const detailedStudents = studentsInGroup
				.map(function (id) {
					return this.$store.getters['students/students'][id]
				}, this)
				.filter((el) => {
					//if student not found (for ex. deleted from db, ignore it)
					return typeof el !== 'undefined'
				})
			//create array of rows
			this.items = detailedStudents.map(function (student) {
				//generate 1 row here
				//get simple row of all lessons
				//GET HERE ONLY LESSONS PAGINATED (FROM SELECTED DATE, TO SELECTED DATE)
				var row = {}
				this.getLessonsSorted.forEach(function (lesson) {
					var item = lesson.items.find((item) => item.student_id === student.id)
					if (!item) {
						item = new LessonItem() //mock
					}
					row[lesson.id] = item.attendance.toString()
				})
				return { name: filterFio(student, 'fio'), ...row }
			}, this)
			//get lessons_data (Make pagination here)

			//console.log(studentsInGroup)
			//	console.log(detailedStudents)

			//console.log(this.items)
			//console.log(this.fields)
			//var elm = document.getElementById(id);
			//elm.scrollIntoView(true);
			//var elm = this.$refs.id
			setTimeout(this.scrollTableToRight, 100)
		},

		scrollTableToRight() {
			var el = document.querySelector('#my-table tbody tr td:last-child')
			if (el) {
				el.scrollIntoView()
				//window.scrollTo(0, 0)
			}
			var el2 = document.querySelector('#btn-new-lesson')
			if (el2) {
				el2.scrollIntoView()
			}
		},
		async fetchItemsForLesson(lesson) {
			await this.$store.dispatch('lessons/fetchLessonItemsByLesson', lesson)
		},
	},
	watch: {
		async currentSelectedGroupId(value) {
			this.currentSelectedLesson = null
			if (value === null) {
				return
			}
			this.$loadingStart()
			if (!this.getGroup.detailed) {
				await this.$store.dispatch('groups/fetchById', value)
			}
			if (!this.isLessonsFetched) {
				await this.$store.dispatch('lessons/fetchAllByGroup', this.getGroup)
			}
			//TODO PAGINATION generate lesson count per page, on paginate do
			//paralel job  -get all items for lessons
			const promises = this.getLessonsSorted.map(this.fetchItemsForLesson)
			await Promise.all(promises)

			this.generateTable()
			this.$loadingFinish()
		},
	},
}
</script>
<style scoped lang="scss">
@import 'assets/scss/main.scss';
//on small devices
.lesson-tab {
}
.lesson-info {
	display: none;
}

@include media-breakpoint-up(md) {
	.lesson-tab {
		-ms-flex: 0 0 350px;
		flex: 0 0 350px;
	}
	.lesson-info {
		display: flex;
	}
}
.scroll {
	overflow-y: auto;
}
.max-height {
	height: calc(100vh - 65px * 2);
}
</style>
