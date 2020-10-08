import Lesson from '../js/lesson_class'
import { LessonItem } from '../js/lesson_item_class'
import Vue from 'vue'
import qs from 'qs'
export const state = () => ({
	lessons: {}, //key is group_id => array of{full:true|false; data:[]}
	//data.items = lesson items
})

export const mutations = {
	//all lessons of group is fetched
	setLessonsByGroup(state, { group_id, lessons }) {
		Vue.set(state.lessons, group_id, { full: true, data: lessons })
	},
	//only part of lessons is fetched (associated with sutdent)
	setLessonsByStudent(state, lessons) {
		lessons.forEach((l) => {
			if (!state.lessons[l.group_id]) {
				Vue.set(state.lessons, l.group_id, { full: false, data: [] })
			}
			state.lessons[l.group_id].data.push(l)
		})
	},
	setLessonsItems(state, { lesson, items }) {
		var l = state.lessons[lesson.group_id].data.find((l) => l.id === lesson.id)
		l.setItems(items)
		//Vue.set(l, 'items', items)
	},
	removeLessons(state, group_id) {
		Vue.set(state.lessons, group_id, null)
		delete state.lessons[group_id]
	},
	updateLessonOfGroup(state, { group_id, lesson }) {
		if (!state.lessons[group_id]) {
			Vue.set(state.lessons, group_id, { full: false, data: [lesson] })
			return
		}
		const lesson_index = state.lessons[group_id].data.findIndex(
			(l) => l.id === lesson.id
		)
		if (lesson_index >= 0) {
			state.lessons[group_id].data.splice(lesson_index, 1, lesson)
		} else {
			state.lessons[group_id].data.push(lesson)
		}
	},
}

function paramsSerializer(params) {
	return qs.stringify(params, {
		arrayFormat: 'brackets',
		encode: false,
	})
}

export const actions = {
	async createLesson({ getters, commit }, { group_id, new_lesson }) {
		commit('error/clearError', null, { root: true })
		try {
			const response = await this.$axios.$post(
				`/api/lessons`,
				JSON.stringify(new_lesson),
				{
					params: {
						group: group_id,
					},
				}
			)
			const updated_lesson = new Lesson(response)
			console.log(updated_lesson)
			commit('updateLessonOfGroup', { group_id, lesson: updated_lesson })
		} catch (e) {
			commit('error/setError', e, { root: true })
			throw e
		}
	},
	async updateLesson({ dispatch, commit, getters }, { group_id, lesson }) {
		commit('error/clearError', null, { root: true })
		try {
			const response = await this.$axios.$post(
				`/api/lessons/${lesson.id}`,
				JSON.stringify(lesson)
			)
			const updated_lesson = new Lesson(response)
			commit('updateLessonOfGroup', { group_id, lesson: updated_lesson })
		} catch (e) {
			commit('error/setError', e, { root: true })
			throw e
		}
	},
	async fetchAllByGroup({ dispatch, commit }, group) {
		if (group.id == null) return
		commit('error/clearError', null, { root: true })
		try {
			const response = await this.$axios.$get(`/api/lessons`, {
				params: { filter: { group: group.id } },
				paramsSerializer: paramsSerializer,
			})
			const lessons = response.map(function (el) {
				return new Lesson(el)
			})
			commit('setLessonsByGroup', { group_id: group.id, lessons })
		} catch (e) {
			commit('error/setError', e, { root: true })
			throw e
		}
	},
	async fetchAllByStudent({ dispatch, commit }, student) {
		if (student.id == null) return
		commit('error/clearError', null, { root: true })
		try {
			const response = await this.$axios.$get(`/api/lessons`, {
				params: { filter: { student: student.id } },
				paramsSerializer: paramsSerializer,
			})
			const lessons = response.map(function (el) {
				return new Lesson(el)
			})
			commit('setLessonsByStudent', lessons)
		} catch (e) {
			commit('error/setError', e, { root: true })
			throw e
		}
	},
	async fetchLessonItemsByLesson({ dispatch, commit }, lesson) {
		if (lesson.id == null) return
		commit('error/clearError', null, { root: true })
		try {
			const response = await this.$axios.$get(`/api/lessons/items/`, {
				params: { filter: { lesson: lesson.id } },
				paramsSerializer: paramsSerializer,
			})
			const lessonItems = response.map(function (el) {
				return new LessonItem(el)
			})
			commit('setLessonsItems', { lesson, items: lessonItems })
		} catch (e) {
			commit('error/setError', e, { root: true })
			throw e
		}
	},

	async fetchLessonItemsByStudent({ dispatch, commit }, student) {
		if (student.id == null) return
		commit('error/clearError', null, { root: true })
		try {
			const response = await this.$axios.$get(
				`/api/students/${students.id}/lessons/items`
			)
			const lessonItems = response.map(function (el) {
				return new LessonItem(el)
			})
			commit('setLessonsItems', { lesson, items: lessonItems })
		} catch (e) {
			commit('error/setError', e, { root: true })
			throw e
		}
	},
}

export const getters = {
	lessonsByGroupId: (state) =>
		function (group_id) {
			if (!group_id) return []
			return state.lessons[group_id] ? state.lessons[group_id].data : []
		},
	lessonsIsFetchedForGroupId: (state) =>
		function (group_id) {
			if (!group_id) return false
			return !!(state.lessons[group_id] != null && state.lessons[group_id].full)
		},
}
