<template lang="pug">
.app-loader
  b-spinner(label="Загрузка..." variant="primary")
</template>

<script>
export default {}
</script>

<style>
.app-loader,
.currency-line,
.page-title {
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
}
.app-loader {
  width: 100%;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  padding-top: 2rem;
  padding-bottom: 2rem;
}
</style>
