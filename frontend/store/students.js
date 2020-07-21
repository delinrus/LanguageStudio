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
			const response = await this.$axios.$get('/api/students/')
			const students = response.map(function (el) {
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
			const response = await this.$axios.$get(`/api/students/${id}`)
			const student = new Student(response, true)

			commit('updateStudent', student)
		} catch (e) {
			commit('error/setError', e, { root: true })
			throw e
		}
	},

	async createStudent({ dispatch, commit }, student) {
		commit('error/clearError', null, { root: true })
		try {
			const response = await this.$axios.$post(
				'/api/students/',
				JSON.stringify(student)
			)
			const s = new Student(response, true)
			commit('updateStudent', s)
		} catch (e) {
			commit('error/setError', e, { root: true })
			throw e
		}
	},
	async updateStudent({ dispatch, commit }, student) {
		commit('error/clearError', null, { root: true })
		try {
			const response = await this.$axios.$post(
				`/api/students/${student.id}`,
				JSON.stringify(student)
			)
			const updated = new Student(response, true)
			commit('updateStudent', updated)
		} catch (e) {
			commit('error/setError', e, { root: true })
			throw e
		}
	},
	async deleteStudent({ dispatch, commit }, id) {
		commit('error/clearError', null, { root: true })
		try {
			await this.$axios.$del(`/api/students/${id}`)
			commit('removeStudentById', id)
			//refresh groups, because groups may be changed,for ex:
			//1) deleted individuals
			//2) list of group student will change
			await dispatch('groups/fetchAll', null, { root: true })
		} catch (e) {
			commit('error/setError', e, { root: true })
			throw e
		}
	},
	async changeGroup({ dispatch, commit }, { student, group_id }) {
		if (student.group.id === group_id) return
		commit('error/clearError', null, { root: true })
		try {
			const last_group = student.group
			const request_data = { ...student, group: group_id }
			const response = await this.$axios.$post(
				`/api/students/${student.id}`,
				JSON.stringify(request_data)
			)
			const updated_student = new Student(response, true)
			commit('updateStudent', updated_student)
			//refresh old group
			if (last_group) {
				if (last_group.is_individual) {
					await dispatch('groups/deleteGroupById', last_group.id, {
						root: true,
					})
				} else {
					await dispatch('groups/fetchById', last_group.id, { root: true })
				}
				//refresh new group
				await dispatch('groups/fetchById', group_id, { root: true })
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
