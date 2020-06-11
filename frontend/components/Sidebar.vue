<template lang="pug">
#sidebar.shadow-lg
	.sidebar-header
		ul.list-unstyled.components
			p.text-secondary Панель управления
			li.nav-item.active
				nuxt-link.nav-link(
					no-prefetch
					active-class="active"
					to='/admin/students'
					)
					i.material-icons.align-middle.mr-2 supervisor_account
					span Ученики
			li.nav-item.active
				nuxt-link.nav-link(
					no-prefetch
					active-class="active"
					to='/admin/groups'
					)
					i.material-icons.align-middle.mr-2 school
					span Группы
			li.nav-item.active
				nuxt-link.nav-link(
					no-prefetch
					active-class="active"
					to='/admin/attendance'
					)
					i.material-icons.align-middle.mr-2 import_contacts
					span Посещаемость
			li.nav-item.active
				nuxt-link.nav-link(
					no-prefetch
					active-class="active"
					to='/admin/marks'
					)
					i.material-icons.align-middle.mr-2 looks_5
					span Оценки
</template>

<script>
export default {
	data: () => ({
		isOpen: true
	})
}
</script>

<style lang="scss" scoped>
@import 'assets/scss/main.scss';
#sidebar {
	min-width: 250px;
	max-width: 250px;
	min-height: 100vh;
	transition: all 0.3s;
	background: var(--dark);
	ul.components {
		padding: 1rem 0rem;
	}
	ul {
		p {
			padding: $spacer;
		}
		li {
			a {
				padding: $spacer;
				font-size: 0.9em;
				display: block;
				color: var(--secondary);
				&:hover {
					color: var(--primary);
				}
			}
			a.active {
				color: var(--primary);
				background: var(--light);
			}
		}
	}
}
</style>
