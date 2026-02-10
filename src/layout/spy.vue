<template>
  <Header></Header>
  <main id="contentSpy" role="main">
    <AppMain :needTagsView="false" />
  </main>

</template>

<script setup>
  import { Header, AppMain, Footer } from './components';

</script>

<style lang="scss" scoped>

  #contentSpy {
    max-width: 470px;
    width: 100%;
    margin: 0 auto;
    .app-main  {
          padding: 0.5rem 1rem;
      }
  }
</style>
