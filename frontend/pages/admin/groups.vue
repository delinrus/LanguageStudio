<template lang="pug">
.container
	.row.justify-content-between.d-flex
		.card.col-sm-12.col-md-5.mt-3.p-0
			.card-header
				h4 Группы
			.card-body.p-0(v-if="loading")
				Loader
			.card-body.p-0.border-bottom(v-else-if="groups.length>0")
				GroupsList(:groupList="groups" @onSelectChange="selectGroup" )
					div(v-if="currentSelectedGroup" )
						Groups_StudentList(:group='currentSelectedGroup')
						hr.m-0
						Groups_StudentAdder.mx-4.my-2(:group_id='currentSelectedGroup.name')
			.card-body.border-bottom(v-else)
				h6.card-text.text-center Нет групп
			footer.m-3.mt-0.text-right
				button.btn.btn-primary(v-b-modal.form_addGroup='') Создать группу
				ModalForm_GroupInfo(id="form_addGroup" v-bind:group_id="''")
		//Student Card
		.card.col-sm-12.col-md-6.mt-3.p-0.hide_on_small
			.card-header
				h4 Список учеников
			.card-body.p-0.border-bottom
				Groups_StudentList(:group='currentSelectedGroup')
			footer.m-3.mt-0.text-right(v-if="!currentSelectedGroup.isEmpty() && !currentSelectedGroup.is_individual")
				Groups_StudentAdder(:group_id='currentSelectedGroup.name')
	</template>

<script>
import GroupsList from '~/components/Groups_GroupList'
import Groups_StudentList from '~/components/Groups_StudentList'
import ModalForm_GroupInfo from '~/components/Groups_GroupInfo'
import Groups_StudentAdder from '~/components/Groups_StudentAdder'
import Loader from '~/components/Loader'
import Group from '~/js/group_class.js'

export default {
	layout: 'private_area',
	components: {
		GroupsList,
		Groups_StudentList,
		ModalForm_GroupInfo,
		Groups_StudentAdder,
		Loader,
	},
	data: () => ({
		groups: [],
		students: [],
		currentSelectedGroup: new Group(),
	}),
	async mounted() {
		this.$loadingStart()
		await this.$store.dispatch('groups/fetchAll')
		this.groups = this.$store.getters['groups/groups']
		this.$loadingFinish()
	},
	methods: {
		selectGroup(group) {
			console.log(`changed to group ${group.name}`)
			this.currentSelectedGroup = group
		},
	},
}
</script>
<style scoped lang="scss">
.pointer:hover {
	cursor: pointer;
}
</style>
