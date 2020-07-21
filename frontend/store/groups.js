import Group from '../js/group_class'

export const state = () => ({
	groups: [],
})

export const mutations = {
	setGroups(state, groups) {
		state.groups = groups
	},
	updateGroup(state, { id, group }) {
		const index = state.groups.findIndex((g) => g.id === id)
		if ((index >= 0) & (group === null)) {
			state.groups.splice(index, 1)
			return
		}
		if (index >= 0) {
			state.groups.splice(index, 1, group)
		} else {
			state.groups.push(group)
		}
	},
}

export const actions = {
	async fetchAll({ commit }) {
		try {
			const response = await this.$axios.$get('/api/groups/')
			const groups = response.map(function (el) {
				return new Group(el, false)
			})
			commit('setGroups', groups)
		} catch (e) {
			commit('error/setError', e, { root: true })
			throw e
		}
	},
	async fetchById({ getters, commit }, id) {
		if (!id) return
		commit('error/clearError', null, { root: true })
		try {
			const response = await this.$axios.$get(`/api/groups/${id}`)
			const group = new Group(response, true)
			commit('updateGroup', { id, group })
			//if (!group) throw { message: `group with name ${name} not exist` }
		} catch (e) {
			commit('error/setError', e, { root: true })
			throw e
		}
	},
	async createGroup({ getters, commit }, newGroup) {
		commit('error/clearError', null, { root: true })
		try {
			const response = await this.$axios.$post(
				'/api/groups/',
				JSON.stringify(newGroup)
			)
			const updated_group = new Group(response, true)
			commit('updateGroup', { id: updated_group.id, group: updated_group })
		} catch (e) {
			commit('error/setError', e, { root: true })
			throw e
		}
	},
	async deleteGroupById({ dispatch, commit, getters }, id) {
		if (!id) return
		commit('error/clearError', null, { root: true })
		try {
			await this.$axios.$delete(`/api/groups/${id}`)
			//refresh student list (students will be excluded from group)
			const deleted_group_students = getters.groupById(id).student_count
			commit('updateGroup', { id, group: null })

			if (deleted_group_students) {
				await dispatch('students/fetchAll', null, { root: true })
			}
		} catch (e) {
			commit('error/setError', e, { root: true })
			throw e
		}
	},
	async updateGroup({ dispatch, commit, getters }, { id, group }) {
		commit('error/clearError', null, { root: true })
		try {
			const last_name = getters.groupById(id).name
			const response = await this.$axios.$post(
				`/api/groups/${id}`,
				JSON.stringify(group)
			)
			const updated_group = new Group(response, true)
			commit('updateGroup', { id, group: updated_group })
			//refresh student list (group name can be changed)
			if (
				last_name !== updated_group.name &&
				updated_group.students.length > 0
			) {
				await dispatch('students/fetchAll', null, { root: true })
			}
		} catch (e) {
			commit('error/setError', e, { root: true })
			throw e
		}
	},
}

export const getters = {
	groups: (s) => s.groups,
	groupById: (state) =>
		function (id) {
			const list = state.groups.filter((el) => el.id === id)
			return list.length ? list[0] : null
		},
}
