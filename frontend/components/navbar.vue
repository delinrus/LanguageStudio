<template lang="pug">
div.shadow
  b-navbar(toggleable='lg', type='light', variant='light' fixed='top')
    b-navbar-brand(href='#') NavBar
    b-navbar-toggle(target='nav-collapse')
    b-collapse#nav-collapse(is-nav='')
      b-navbar-nav
        b-nav-item(href='#') Link
        b-nav-item(href='#', disabled='') Disabled
      // Right aligned nav items
      b-navbar-nav.ml-auto
        b-nav-item-dropdown(right='')
          // Using 'button-content' slot
          template(v-slot:button-content='')
            em User
          b-dropdown-item(href='#') Profile
          b-dropdown-item(href='#') Sign Out

</template>

<script>
export default {}
</script>

<style></style>
