export const state = () => ({
	currentUser: null,
})

export const mutations = {
	setCurrentUser(state, currentUser) {
		state.currentUser = currentUser
	},
}
export const actions = {
	async tryUpdateUser({ dispatch, commit, getters }, toUpdate) {
		commit('error/clearError', null, { root: true })
		try {
			const uid = await dispatch('getUid')
			//read all fields, and update changed
			const updateData = { ...getters.currentUser, ...toUpdate }
			//TODO update user in db by uid and updateData
			commit('setCurrentUser', updateData)
		} catch (e) {
			commit('error/setError', e, { root: true })
			throw e
		}
	},
	async tryLoginUser({ dispatch, commit }, { login, password }) {
		commit('error/clearError', null, { root: true })
		try {
			//TODO Login in db
			const user = { id: 0 }
			//await firebase.auth().signInWithEmailAndPassword(email, password);
			commit('error/setError', e, { root: true })
			commit('setCurrentUser', user)
		} catch (e) {
			commit('error/setError', e, { root: true })
			throw e
		}
	},
	async tryLogoutUser({ dispatch, commit }) {
		//TODO sign out in DB
		commit('setCurrentUser', null)
	},
	async tryRegisterUser({ dispatch, commit }, { email, password }) {
		commit('error/clearError', mull, { root: true })
		try {
			//TODO create new user in DB with email,password, and login.
			//TODO Possibly set initial user data
		} catch (e) {
			commit('error/setError', e, { root: true })
			throw e
		}
	},
}

export const getters = {
	currentUser: (s) => s.currentUser,
	checkUser: (s) => s.currentUser !== null,
}
