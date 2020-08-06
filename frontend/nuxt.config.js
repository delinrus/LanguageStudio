import pkg from './package'

export default {
	mode: 'spa', //for mirage need spa. If need universal, then => mode: process.env.NODE_ENV === 'development' ? 'spa' : 'universal'

	generate: {
		dir: 'target/dist',
	},

	/*
	 ** Headers of the page
	 */
	head: {
		title: pkg.name,
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: pkg.description },
		],
		link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
	},

	/*
	 ** Customize the progress-bar color
	 */
	loading: { color: '#ff662b' },

	/*
	 ** Global CSS
	 */
	bootstrapVue: {
		bootstrapCSS: false,
		bootstrapVueCSS: false,
	},
	css: ['@/assets/scss/main.scss'],

	/*
	 ** Plugins to load before mounting the App
	 */
	plugins: [
		'@/plugins/mirage.js',
		'@/plugins/vuelidate.plugin.js',
		'@/plugins/fio.filter.plugin.js',
		'@/plugins/date.filter.plugin.js',
		'@/plugins/messages.plugin.js',
		'@/plugins/loading.plugin.js',
	],

	/*
	 ** Nuxt.js modules
	 */
	modules: [
		// Doc: https://axios.nuxtjs.org/usage
		'@nuxtjs/axios',
		'bootstrap-vue/nuxt',
		'@nuxtjs/pwa',
		'@nuxtjs/dotenv',
		'nuxt-material-design-icons',
	],
	/*
	 ** Axios module configuration
	 */
	axios: {
		// See https://github.com/nuxt-community/axios-module#options
		proxy: true,
		debug: true,
	},

	proxy: {
		// See https://axios.nuxtjs.org/options, https://github.com/nuxt-community/proxy-module
		'/api': {
			target: 'http://localhost:8080',
		},
	},

	/*
	 ** Build configuration
	 */
	build: {
		// transpile: [/^element-ui/],

		/*
		 ** You can extend webpack config here
		 */
		extend(config, ctx) {},
	},
}
