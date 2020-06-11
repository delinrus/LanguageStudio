<template lang="pug">
.container
	.card.mt-3.bw-1
		.card-header.no-border.text-right
				form.form-inline(v-on:submit.prevent)
						input.form-control.mr-sm-2(v-model="searchString" type='search', placeholder='Поиск', aria-label='Поиск')
						button.btn.btn-primary.ml-auto.d-none.d-sm-block(v-b-modal.form_addStudent='' @click='setAddFormMode(null,form_addStudent_MODE.EDIT)') Новый ученик
						ModalForm_StudentInfo(id="form_addStudent" v-bind:student_prop="currentSelected" v-bind:groupList="groupList" v-bind:isReadonlyMode="addFormMode_isReadonly")
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
		.card-body.p-0(v-if="filteredStudents.length>0")
			.list-group-flush(
				v-for="(student,idx) of filteredStudents"
			)
				.card.border-light.no-border
					.card-body.p-0
						button(
							@click="currentSelected = student"
						).list-group-item.list-group-item-action.justify-content-between.align-items-center
							.row.d-flex.justify-content-between.align-items-center
								.col-8.border-right  {{student | fio('full')}}
								.col-4.text-center {{student.group}}
							.row(v-if="student===currentSelected").pt-3
								.col-12
									button.btn.btn-info Оплата
									button.btn.btn-outline-primary.float-right(v-b-modal.form_addStudent='' @click='setAddFormMode(currentSelected,form_addStudent_MODE.READONLY)') Подробнее
			footer.m-3.text-right.d-block.d-sm-none
				button.btn.btn-primary(v-b-modal.form_addStudent='') Новый ученик
		.card-body(v-else)
			h5.card-text.text-center(v-if='searchString') Нет учеников по поисковому запросу "{{searchString}}"
			h5.card-text.text-center(v-else) Нет учеников
			footer.m-3.text-right.d-block.d-sm-none
				button.btn.btn-primary(v-b-modal.form_addStudent='' @click='setAddFormMode(form_addStudent_MODE.EDIT)') Новый ученик
	</template>

<script>
import ModalForm_StudentInfo from '~/components/Students_StudentInfo'
export default {
	layout: 'private_area',
	components: { ModalForm_StudentInfo },
	data: () => ({
		form_addStudent_MODE: {
			READONLY: true,
			EDIT: false
		},
		addFormMode_isReadonly: false,
		groupList: ['2a', '2b', '2c'],
		currentSelected: null,
		currentSortMethod: 'name',
		currentSortMethodDown: true,
		searchString: '',
		students: [
			{
				name: 'Иван',
				family: 'Иванов',
				patronymic: 'Иванович',
				group: '2a',
				address: '',
				phone: '',
				parents: []
			},
			{
				name: 'Петя',
				family: 'Петров',
				patronymic: 'Петрович',
				group: '2b',
				address: '',
				phone: '',
				parents: []
			}
		]
	}),
	computed: {
		filteredStudents: function() {
			//if any property has searchString
			return this.students.filter(el =>
				Object.values(el)
					.join(' ')
					.includes(this.searchString)
			)
		}
	},
	mounted() {
		this.sort(name)
	},
	methods: {
		sort(property) {
			if (this.currentSortMethod == property) {
				this.currentSortMethodDown = !this.currentSortMethodDown
				this.students.reverse()
				return
			} else {
				this.currentSortMethod = property
				this.currentSortMethodDown = true
				this.students.sort((a, b) =>
					a[property] > b[property] ? 1 : b[property] > a[property] ? -1 : 0
				)
			}
		},
		setAddFormMode(student, isReadonly) {
			this.currentSelected = student
			this.addFormMode_isReadonly = isReadonly
		}
	}
}
</script>
<style scoped lang="scss">
.pointer:hover {
	cursor: pointer;
}
</style>
