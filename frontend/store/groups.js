import Mock from '@/js/mock_data'
import Group from '../js/group_class'

export const state = () => ({
	groups: [],
})

export const mutations = {
	setGroups(state, groups) {
		state.groups = groups
	},
	updateGroup(state, { name, group }) {
		const index = state.groups.findIndex((g) => g.name === name)
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
			//TODO get from DB
			const groups = (await Mock.getGroups()).map(function (el) {
				return new Group(el, false)
			})
			commit('setGroups', groups)
		} catch (e) {
			commit('error/setError', e, { root: true })
			throw e
		}
	},

	async fetchByName({ getters, commit }, name) {
		commit('error/clearError', null, { root: true })
		try {
			//TODO find in DB
			const group = new Group(await Mock.getGroupDetailsByName(name), true)
			commit('updateGroup', { name, group })
			//if (!group) throw { message: `group with name ${name} not exist` }
		} catch (e) {
			commit('error/setError', e, { root: true })
			throw e
		}
	},
	async createGroup({ getters, commit }, newGroup) {
		commit('error/clearError', null, { root: true })
		try {
			//TODO find in DB
			const updated_group = new Group(await Mock.addGroup(newGroup), true)
			commit('updateGroup', { name: updated_group.name, group: updated_group })
		} catch (e) {
			commit('error/setError', e, { root: true })
			throw e
		}
	},
	async deleteGroupByName({ dispatch, commit }, name) {
		commit('error/clearError', null, { root: true })
		try {
			//TODO find in DB
			await Mock.deleteGroupByName(name)
			//refresh student list (students will be excluded from group)

			commit('updateGroup', { name, group: null })

			await dispatch('students/fetchAll', null, { root: true })
		} catch (e) {
			commit('error/setError', e, { root: true })
			throw e
		}
	},
	async updateGroup({ getters, commit }, { name, group }) {
		commit('error/clearError', null, { root: true })
		try {
			//TODO find in DB
			const updated_group = new Group(await Mock.updateGroup(name, group), true)
			commit('updateGroup', updated_group)
			//refresh student list (group name can be changed)
			if (name !== updated_group.name) {
				commit('students/fetchAll', null, { root: true })
			}
		} catch (e) {
			commit('error/setError', e, { root: true })
			throw e
		}
	},
}

export const getters = {
	groups: (s) => s.groups,
	groupByName: (state) => (name) =>
		state.groups.filter((el) => el.name === name)[0],
}
