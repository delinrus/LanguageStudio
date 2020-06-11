<template lang="pug">
div
	Navbar
	.wrapper
		Sidebar
		.container
			main
				nuxt

</template>

<script>
import Navbar from '~/components/Navbar'
import Sidebar from '~/components/Sidebar'
export default {
	components: {
		Navbar,
		Sidebar
	}
}
</script>

<style lang="scss">
.wrapper {
	display: flex;
	width: 100%;
	align-items: stretch;
}
</style>
