<template lang="pug">
div
	ModalForm_GroupInfo(id="form_changeGroup" v-bind:group_id="selectedGroup? selectedGroup.name:null")
	.list-group-flush(v-for="(group,idx) of groupList")
		.card.border-light.no-border
			.card-body.p-0
				button(@click="onSelectClick(group)"
				).list-group-item.list-group-item-action.justify-content-between.align-items-center.p-0
					//show for selected
					div(v-if="selectedGroup && selectedGroup.name==group.name")
						//on big devices - no expand
						.card.border-light.no-border.hide_on_small
								.card-header
										div.row.d-flex.justify-content-between.align-items-center.align-text-baseline.mx-0
											h6.col {{group.name }}
											button.ml-auto.mr-2.btn.btn-outline-info.btn-sm.float-right(v-b-modal.form_changeGroup='') Изменить
						//on small devices - expand to list
						.card.border-light.no-border.visible_on_small
								.card-header
										div.row.d-flex.justify-content-between.align-items-center.align-text-baseline
											i(@click.stop="onSelectClick(null)").material-icons expand_less
											h6.col {{group.name }}
											button.ml-auto.mr-2.btn.btn-outline-info.btn-sm.float-right(v-b-modal.form_changeGroup='') Изменить
								.card-body.col.visible_on_small.p-0.no-border
									slot
					//show when not selected
					div(v-else)
						//on big devices
						div.hide_on_small
							div.row.d-flex.justify-content-between.align-items-center.align-text-baseline.p-3.mx-0
								h6.col {{group.name }}
								span.mr-2.ml-auto(v-if="group.student_count>0").badge.badge-secondary {{group.student_count}}
						//on small devices(dont show if some selected)
						div.visible_on_small(v-if="selectedGroup==null")
							.row.d-flex.justify-content-between.align-items-center.align-text-baseline.p-3.mx-0
								h6.col {{group.name }}
								span.mr-2.ml-auto(v-if="group.student_count>0").badge.badge-secondary {{group.student_count}}
</template>

<script>
import ModalForm_GroupInfo from '~/components/Groups_GroupInfo'
export default {
	components: { ModalForm_GroupInfo },
	model: {
		event: 'onSelectChange',
		props: ['groupList'],
	},
	props: {
		groupList: {
			type: Array,
			required: true,
		},
	},
	data() {
		return {
			selectedGroup: null,
		}
	},
	methods: {
		async onSelectClick(group) {
			this.selectedGroup = group

			this.$emit('onSelectChange', this.selectedGroup)
		},
	},
}
</script>
<style scoped lang="scss"></style>
