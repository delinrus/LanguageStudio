<template lang="pug">
  .row
    .col-md-1.col-sm-12.border
      | One of three columns
    .col-md-10.col-sm-12.border
      button.btn.btn-primary( @click.prevent='ping') Ping
    .col-md-1.col-sm-12.border.d-none.d-md-block
      | Third of three columns

</template>

<script>
export default {
	components: {},
	methods: {
		ping() {
			//TODO! REMOVE THIS, ONLY EXAMPLE OF REQUREST TO BACKEND
			this.$axios.$get('/api/student').then(
				(result) => this.$message(result),
				(error) => this.$error(error)
			)
		},
	},
}
</script>
