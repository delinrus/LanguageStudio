import Mock from '@/js/mock_data'
import Student from '@/js/student_class'
export const state = () => ({
	students: [],
})

export const mutations = {
	set(state, students) {
		state.students = students
	},
	removeStudentById(state, id) {
		state.students = state.students.filter((el) => el.id !== id)
	},
	updateStudent(state, student) {
		const foundIndex = state.students.findIndex((s) => s.id === student.id)
		if (foundIndex >= 0) {
			state.students.splice(foundIndex, 1, student)
		} else {
			state.students.push(student)
		}
	},
}

export const actions = {
	async fetchAll({ commit }) {
		try {
			//TODO get from DB
			const students = (await Mock.getStudents()).map(function (el) {
				return new Student(el, false)
			})
			commit('set', students)
		} catch (e) {
			commit('error/setError', e, { root: true })
			throw e
		}
	},

	async fetchById({ getters, commit }, id) {
		commit('error/clearError', null, { root: true })
		try {
			//TODO find in DB
			const student = new Student(await Mock.getStudentById(id), true)

			commit('updateStudent', student)
		} catch (e) {
			commit('error/setError', e, { root: true })
			throw e
		}
	},

	async createStudent({ dispatch, commit }, student) {
		commit('error/clearError', null, { root: true })
		try {
			//TODO SAVE in DB
			const s = new Student(await Mock.addStudent(student), true)
			commit('updateStudent', s)
		} catch (e) {
			commit('error/setError', e, { root: true })
			throw e
		}
	},
	async updateStudent({ dispatch, commit }, student) {
		commit('error/clearError', null, { root: true })
		try {
			//TODO SAVE in DB
			const updated = new Student(await Mock.updateStudent(student), true)
			commit('updateStudent', updated)
		} catch (e) {
			commit('error/setError', e, { root: true })
			throw e
		}
	},
	async changeGroup({ dispatch, commit }, { student, group_id }) {
		if (student.group === null && group_id === null) return
		if (student.group && group_id && student.group.name === group_id) return
		commit('error/clearError', null, { root: true })
		try {
			//TODO Update in DB
			const last_group = student.group
			const updated_student = new Student(
				await Mock.studentSetGroup(student, group_id),
				true
			)

			commit('updateStudent', updated_student)
			//refresh new group
			if (group_id) {
				await dispatch('groups/fetchByName', group_id, { root: true })
			}
			//refresh old group
			if (last_group) {
				if (last_group.is_individual) {
					await dispatch('groups/deleteGroupByName', last_group.name, {
						root: true,
					})
				} else {
					await dispatch('groups/fetchByName', last_group.name, { root: true })
				}
			}
		} catch (e) {
			commit('error/setError', e, { root: true })
			throw e
		}
	},
}

export const getters = {
	students: (s) => s.students,
	studentById: (state) => (id) =>
		state.students.filter((el) => el.id === id)[0],
}
