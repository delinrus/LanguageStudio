<template lang="pug">
.container
	.card.mt-3.bw-1
		.card-header.no-border.text-right
				form.form-inline(v-on:submit.prevent)
						input.form-control.mr-sm-2(v-model="searchString" type='search', placeholder='Поиск', aria-label='Поиск')
						button.btn.btn-primary.ml-auto.d-none.d-sm-block(@click='openForm(null)') Новый ученик
						ModalForm_StudentInfo(id="form_addStudent" v-bind:student_id="currentSelected? currentSelected.id:null" @onChange='listChanged')
	.card.mt-3
		.card-header
			.row.d-flex
				.col-8.border-right
					h4(@click="sort('name')").pointer Ф.И.О
						i(v-if="currentSortMethod==='name' && currentSortMethodDown===true").material-icons expand_more
						i(v-if="currentSortMethod==='name' && currentSortMethodDown===false").material-icons expand_less
				.col-4.text-center
					h4(@click="sort('group')").pointer Группа
						i(v-if="currentSortMethod==='group' && currentSortMethodDown===true").material-icons expand_more
						i(v-if="currentSortMethod==='group' && currentSortMethodDown===false").material-icons expand_less
		.card-body.p-0(v-if="loading")
			Loader
		.card-body.p-0(v-else-if="filteredStudents.length>0")
			.list-group-flush(
				v-for="(student,idx) of filteredStudents"
			)
				.card.border-light.no-border
					.card-body.p-0
						button(
							@click="currentSelected = student"
						).list-group-item.list-group-item-action.justify-content-between.align-items-center
							.row.d-flex.justify-content-between.align-items-center
								.col-8.border-right  {{student | fio('short')}}
								.col-4.text-center
									span(v-if="student.group.isEmpty()") -
									span(v-else-if="!student.group.is_individual") {{student.group.name}}
									span(v-else) инд.
							.row(v-if="student===currentSelected").pt-3
								.col-12
									button.btn.btn-info Оплата
									button.btn.btn-outline-primary.float-right(v-b-modal.form_addStudent='') Подробнее
			footer.m-3.text-right.d-block.d-sm-none
				button.btn.btn-primary(@click='openForm(null)') Новый ученик
		.card-body(v-else)
			h5.card-text.text-center(v-if='searchString') Нет учеников по поисковому запросу "{{searchString}}"
			h5.card-text.text-center(v-else) Нет учеников
			footer.m-3.text-right.d-block.d-sm-none
				button.btn.btn-primary(@click='openForm(null)') Новый ученик
	</template>

<script>
import ModalForm_StudentInfo from '~/components/Students_StudentInfo'
import Loader from '~/components/Loader'
export default {
	layout: 'private_area',
	components: { ModalForm_StudentInfo, Loader },
	data: () => ({
		addFormMode_isReadonly: false,
		currentSelected: null,
		currentSortMethod: 'name',
		currentSortMethodDown: true,
		searchString: '',
		students: [],
	}),
	computed: {
		filteredStudents: function () {
			if (this.students === null) return []
			//if any property has searchString
			var result = this.students.filter((el) =>
				el.group && el.group.is_individual
					? Object.values(el)
							.join(' ')
							.concat('индивидуальный')
							.toLowerCase()
							.includes(this.searchString.toLowerCase())
					: Object.values(el)
							.join(' ')
							.toLowerCase()
							.includes(this.searchString.toLowerCase())
			)
			result.sort((a, b) =>
				a[this.currentSelected] > b[this.currentSelected]
					? 1
					: b[this.currentSelected] > a[this.currentSelected]
					? -1
					: 0
			)
			if (this.currentSortMethodDown) {
				result.reverse()
			}
			return result
		},
	},
	async mounted() {
		this.$loadingStart()
		await this.refreshList()
		this.$loadingFinish()
	},
	methods: {
		openForm(student) {
			this.currentSelected = student
			this.$bvModal.show('form_addStudent')
		},
		sort(property) {
			if (this.currentSortMethod == property) {
				this.currentSortMethodDown = !this.currentSortMethodDown
			} else {
				this.currentSortMethod = property
				this.currentSortMethodDown = true
			}
		},
		listChanged() {
			if (this.currentSelected) {
				this.currentSelected = this.students.find(
					(s) => s.id === this.currentSelected.id
				)
			}
		},
		async refreshList() {
			await this.$store.dispatch('students/fetchAll')
			this.students = this.$store.getters['students/students']
			this.sort('name')
		},
	},
}
</script>
<style scoped lang="scss">
.pointer:hover {
	cursor: pointer;
}
</style>
