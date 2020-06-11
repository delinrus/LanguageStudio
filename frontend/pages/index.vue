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
      const showMessage = (result, variant) => {
        this.$bvToast.toast(`Response from server: ${result}`, {
          title: 'Ping result',
          variant: variant,
          autoHideDelay: 2000,
          appendToast: false,
        })
      }
      this.$axios.$get('/api/ping').then(
        (result) => showMessage(result, 'success'),
        (error) => showMessage(error, 'danger')
      )
    },
  },
}
</script>
