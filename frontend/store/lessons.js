import Lesson from '../js/lesson_class'
export const state = () => ({})

export const mutations = {}

export const actions = {
	async createLesson({ getters, commit }, { group_id, new_lesson }) {
		commit('error/clearError', null, { root: true })
		try {
			const response = await this.$axios.$post(
				`/api/groups/${group_id}/lessons`,
				JSON.stringify(new_lesson)
			)
			const updated_lesson = new Lesson(response)
			commit(
				'groups/updateLessonOfGroup',
				{ id: group_id, lesson: updated_lesson },
				{ root: true }
			)
		} catch (e) {
			commit('error/setError', e, { root: true })
			throw e
		}
	},
	async updateLesson({ dispatch, commit, getters }, { group_id, lesson }) {
		commit('error/clearError', null, { root: true })
		try {
			const response = await this.$axios.$post(
				`/api/groups/${group_id}/lessons/${lesson.id}`,
				JSON.stringify(lesson)
			)
			const updated_lesson = new Lesson(response)
			commit(
				'groups/updateLessonOfGroup',
				{ id: group_id, lesson: updated_lesson },
				{ root: true }
			)
		} catch (e) {
			commit('error/setError', e, { root: true })
			throw e
		}
	},
}

export const getters = {}
