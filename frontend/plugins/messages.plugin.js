import Vue from 'vue'
const showMessage = (obj, title, msg, variant) => {
	obj.$bvToast.toast(msg || 'Что-то пошло не так!', {
		title: title,
		variant: variant,
		autoHideDelay: 3000,
		appendToast: false,
	})
}

Vue.use(function install(Vue, options) {
	Vue.prototype.$message = function (msg) {
		showMessage(this, 'Уведомление!', msg, 'success')
	}
	Vue.prototype.$error = function (msg) {
		showMessage(this, 'Ошибка!', msg, 'danger')
	}
})
