export const state = () => ({
	error: null,
	notify: null,
})

export const mutations = {
	setError(state, error) {
		state.error = error
		state.notify = null
	},
	setNotify(state, notify) {
		state.error = null
		state.notify = notify
	},
	clearError(state) {
		state.notify = null
		state.error = null
	},
}

export const getters = {
	error: (s) => s.error,
	notify: (s) => s.notify,
}
