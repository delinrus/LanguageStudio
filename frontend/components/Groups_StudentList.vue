<template lang="pug">
Loader(v-if="loading")
div(v-else)
	div(v-if="group_from_store && students.length>0")
		.list-group-flush(v-for="(student) of students")
			.card.border-light.no-border
				.card-body.p-0()
					button.list-group-item.list-group-item-action.justify-content-between.align-items-center(@click="selectedStudent = student").p-3
						div.row.d-flex.ml-2.justify-content-between.align-items-center.align-text-baseline
							h6.col {{student |fio('short') }}
							button.btn.btn-sm.btn-outline-danger.ml-auto.mr-3(v-if="selectedStudent===student && !group_from_store.is_individual" @click="excludeStudentFromGroup(student)") Удалить
	div(v-else-if="group_from_store && students.length===0")
		.card-body.p-3.border-bottom
				h6.card-text.text-center В группе нет учеников
	div(v-else)
		.card-body.p-3.border-bottom
			h6.card-text.text-center Группа не выбрана
</template>
<script>
import Loader from '~/components/Loader'
import Group from '~/js/group_class'
export default {
	model: {
		props: ['group'],
	},
	components: { Loader },
	props: {
		group: {
			required: true,
		},
	},
	data: () => ({
		selectedStudent: null,
	}),
	methods: {
		async setupGroup() {
			this.$loadingStart()

			this.selectedStudent = null
			if (!this.group.detailed) {
				await this.$store.dispatch('groups/fetchById', this.group.id)
			}
			this.$loadingFinish()
		},
		async excludeStudentFromGroup(student) {
			this.$loadingStart()
			await this.$store.dispatch('students/changeGroup', {
				student,
				group_id: null,
			})
			this.$loadingFinish()
		},
	},
	computed: {
		group_from_store() {
			//must be computed for reactivity, because getter returns a function
			if (this.group.isEmpty()) return null
			const id = this.group.id
			return this.$store.getters['groups/groupById'](id)
		},
		students() {
			return this.group_from_store ? this.group_from_store.students : []
		},
	},
	watch: {
		group: {
			immediate: true,
			deep: true,
			async handler() {
				await this.setupGroup()
			},
		},
	},
}
</script>
