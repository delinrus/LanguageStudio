<template lang="pug">
div
	.list-group-flush(v-for="(student,idx) of studentList")
			.card.border-light.no-border
				.card-body.p-0()
					button.list-group-item.list-group-item-action.justify-content-between.align-items-center(@click="selectedStudent = student")
						div.row.d-flex.ml-2.justify-content-between.align-items-center.align-text-baseline
							h6.col {{student.name }}
							button.btn.btn-sm.btn-outline-danger.ml-auto.mr-2(v-if="selectedStudent===student" @click="removeStudentFromGroup(student,group)") Удалить

</template>
<script>
export default {
	model: {
		props: ['studentList', 'group']
	},
	props: {
		studentList: {
			type: Array,
			required: true
		},
		group: {
			type: Object,
			required: true
		}
	},
	mounted() {},
	data: () => ({
		selectedStudent: null
	}),
	methods: {
		removeStudentFromGroup(student, group) {
			//TODO remove student from group
			//student, group
			if (group.is_individual) {
				console.log('THIS WILL REMOVE GROUP, CONTINUE?')
			}
			//this.student.parents.splice(n, 1) remove from array
		}
	}
}
</script>
