import Vue from 'vue'

Vue.use(function install(Vue, options) {
	Vue.prototype.$loadingStart = function () {
		this.loading = true
		this.$nextTick(() => {
			this.$nuxt.$loading.start()
		})
	}
	Vue.prototype.$loadingFinish = function () {
		this.$nextTick(() => {
			this.$nuxt.$loading.finish()
			this.loading = false
		})
	}
	Vue.mixin({
		data: function () {
			return {
				loading: true,
			}
		},
	})
	//	Vue.set(Vue.prototype, 'loading', true)
})
