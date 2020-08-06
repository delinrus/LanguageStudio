<template lang="pug">
#sidebar.shadow-lg
	.sidebar-header
		ul.list-unstyled.components.p-0.pt-3
			p.text-secondary.hide_on_small.m-0.p-3.pt-3 Панель управления
			li.nav-item.active(v-for="(l) of links")
				nuxt-link.nav-link.p-3(
					no-prefetch
					active-class="active"
					:to="l.path"
					)
					i.h4.material-icons.align-baseline.mr-2.align-top(style="font-size:1.3rem;") {{l.icon}}
					span.hide_on_small_inline {{l.title}}
</template>

<script>
export default {
	props: {},
	data: () => ({
		links: [
			{ path: '/admin/students', icon: 'supervisor_account', title: 'Ученики' },
			{ path: '/admin/groups', icon: 'school', title: 'Группы' },
			{
				path: '/admin/journal',
				icon: 'import_contacts',
				title: 'Журнал',
			},
			//{ path: '/admin/marks', icon: 'looks_5', title: 'Оценки' },
		],
	}),
}
</script>

<style lang="scss" scoped>
@import 'assets/scss/main.scss';

//on small
#sidebar {
	min-width: 60px;
	max-width: 60px;
	min-height: 100vh;
	transition: all 0.3s;
	background: var(--dark);
	ul {
		li {
			a {
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

@include media-breakpoint-up(md) {
	#sidebar {
		min-width: 250px;
		max-width: 250px;
		min-height: 100vh;
		background: var(--dark);
		ul {
			li {
				a {
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
}
</style>
