<template lang="pug">
div
	Navbar(@onCollapseButtonClick='onCollapseButtonClick')
	.wrapper
		Sidebar
		.container-fluid
			main
				nuxt
</template>

<script>
import Navbar from '~/components/Navbar'
import Sidebar from '~/components/Sidebar'
export default {
	components: {
		Navbar,
		Sidebar,
	},
	data: () => ({}),
	computed: {
		error() {
			return this.$store.getters['error/error']
		},
		notify() {
			return this.$store.getters['error/notify']
		},
	},
	watch: {
		error(value) {
			if (value) this.$error(value.message)
		},
		notify(value) {
			if (value) this.$message(value.message)
		},
	},
	methods: {
		onCollapseButtonClick() {
			//this.isSideBarOpen = !this.isSideBarOpen
		},
	},
}
</script>

<style lang="scss">
.wrapper {
	display: flex;
	width: 100%;
	align-items: stretch;
}
</style>
