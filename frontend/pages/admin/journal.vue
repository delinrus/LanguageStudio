<template lang="pug">
.container-fluid.px-0
	.row
		.card.col.px-0.lesson-info
			.card-header
				.form-inline
					span.pr-3 Группа:
					b-form-select(v-model='currentSelectedGroupId' :options='getGroups' text-field="name" value-field="id" size='sm').b-0
			.card-body.p-0(v-if="loading")
				Loader
			.card-body.p-0.border-bottom(v-else)
				b-table(striped hover :items="items")
		.card.px-0.col.lesson-tab
			.card-header
				h4 Уроки
			.card-body.p-0.border-bottom
					.list-group-flush(v-for="(l) of getLessonsSorted")
						LessonItem(@onClick="currentSelectedLesson = l" :lesson='l' :selected='currentSelectedLesson===l' :group_id='currentSelectedGroupId')
					button.my-3.btn.btn-primary.mr-3.float-right(v-if="!isAddingLesson && currentSelectedGroupId" @click="isAddingLesson=true") Новый урок
					LessonItem(:lesson='getNewLesson()' :selected="true" v-if="isAddingLesson &&currentSelectedGroupId" @onCancel="isAddingLesson=false" @onSave="isAddingLesson=false" :group_id='currentSelectedGroupId')
			footer.m-3.mt-0.text-right()
</template>

<script>
import LessonItem from '~/components/Journal_LessonItem'
import GroupsList from '~/components/Groups_GroupList'
import Groups_StudentList from '~/components/Groups_StudentList'
import ModalForm_GroupInfo from '~/components/Groups_GroupInfo'
import Groups_StudentAdder from '~/components/Groups_StudentAdder'
import Loader from '~/components/Loader'
import Group from '~/js/group_class.js'
import Lesson from '~/js/lesson_class.js'
export default {
	layout: 'private_diary',
	components: {
		GroupsList,
		Groups_StudentList,
		ModalForm_GroupInfo,
		Groups_StudentAdder,
		Loader,
		LessonItem,
	},
	computed: {
		getGroups() {
			return this.$store.getters['groups/groups']
		},
		getGroup() {
			if (!this.currentSelectedGroupId) return new Group()
			return this.$store.getters['groups/groupById'](
				this.currentSelectedGroupId
			)
		},
		getLessonsSorted() {
			var sorted = this.getGroup.lessons.slice().sort(function (a, b) {
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
		//currentSelectedGroup: new Group(),
		items: [{}, {}, {}],
	}),
	async mounted() {
		this.$loadingStart()
		await this.$store.dispatch('groups/fetchAll')
		//this.groups = this.$store.getters['groups/groups']
		this.$loadingFinish()
	},
	methods: {
		getNewLesson: function () {
			return new Lesson()
		},
	},
	watch: {
		async currentSelectedGroupId(value) {
			this.currentSelectedLesson = null
			if (value === null) {
				//this.currentSelectedGroup = new Group()
				return
			}
			this.$loadingStart()
			if (!this.getGroup.detailed) {
				await this.$store.dispatch('groups/fetchById', value)
			}
			this.$loadingFinish()
			//this.currentSelectedGroup = this.getGroup
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
</style>
