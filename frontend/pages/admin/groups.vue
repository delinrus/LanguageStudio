<template lang="pug">
.container
	.row.justify-content-between.d-flex
		.card.col-sm-12.col-md-5.mt-3.p-0
			.card-header
				h4 Группы
			.card-body.p-0.border-bottom(v-if="groupList.length>0")
				GroupsList(:groupList="groupList" :allStudents="students" @onSelectChange="selectGroup" )
					Groups_StudentList(v-if="currentSelectedGroup" :studentList="currentSelectedGroup.students" :group="currentSelectedGroup")
					hr.m-0
					Groups_StudentAdder.mx-4.my-2(:group='currentSelectedGroup' :allStudents='students')
			.card-body.border-bottom(v-else)
				h5.card-text.text-center Нет групп
			footer.m-3.mt-0.text-right
				button.btn.btn-primary(v-b-modal.form_addGroup='') Создать группу
				ModalForm_GroupInfo(id="form_addGroup" v-bind:group_prop="null" v-bind:allStudents="students" v-bind:isReadonlyMode="false")
		//Student Card
		.card.col-sm-12.col-md-6.mt-3.p-0.hide_on_small
			.card-header
				h4 Список учеников
			.card-body.p-0.border-bottom(v-if="currentSelectedGroup && currentSelectedGroup.students.length>0")
				Groups_StudentList(:studentList="currentSelectedGroup.students" :group="currentSelectedGroup")
			.card-body.border-bottom(v-else-if="!currentSelectedGroup")
				h6.card-text.text-center Группа не выбрана
			.card-body.border-bottom(v-else-if="currentSelectedGroup.students.length==0")
				h6.card-text.text-center В группе нет учеников
			footer.m-3.mt-0.text-right(v-if="currentSelectedGroup")
				Groups_StudentAdder(:group='currentSelectedGroup' :allStudents='students')
	</template>

<script>
import GroupsList from '~/components/Groups_GroupList'
import Groups_StudentList from '~/components/Groups_StudentList'
import ModalForm_GroupInfo from '~/components/Groups_GroupInfo'
import Groups_StudentAdder from '~/components/Groups_StudentAdder'
export default {
	layout: 'private_area',
	components: {
		GroupsList,
		Groups_StudentList,
		ModalForm_GroupInfo,
		Groups_StudentAdder
	},
	data: () => ({
		groupList: [
			{
				name: '2a',
				is_individual: false,
				students: [
					{
						name: 'my name'
					},
					{
						name: 'my name 2'
					}
				]
			},
			{
				name: '2b',
				is_individual: false,
				students: []
			},
			{ name: '2c', is_individual: false, students: [] },
			{
				name: 'Иванов Иван Иванович',
				is_individual: true,
				students: [
					{
						name: 'Иванов Иван Иванович'
					}
				]
			}
		],
		currentSelectedGroup: null,
		students: [
			{
				name: 'Иван',
				family: 'Иванов',
				patronymic: 'Иванович',
				group: 'Иванов Иван Иванович',
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
	mounted() {},
	methods: {
		selectGroup(group) {
			this.currentSelectedGroup = group
		}
	}
}
</script>
<style scoped lang="scss">
.pointer:hover {
	cursor: pointer;
}
</style>
