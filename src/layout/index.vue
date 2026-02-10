<template>
  <Header>
    <!-- HERO -->
    <div class="d-flex bg-img-center inside_banner">
      <div class="container position-relative content-space-lg-1 text-lg-center p-5">
        <div class="row justify-content-center align-items-center">
          <div class="col-12">
            <h2 class="text-dark mb-md-0">尊爵健檢</h2>
          </div>
        </div>
      </div>
    </div>
    <!-- END HERO -->

  </Header>
  <main id="content" role="main">
    <div class="container py-4">
      <div class="w-lg-75 mx-lg-auto">
        <AppMain :needTagsView="false" />
      </div>
    </div>
  </main>
  <Footer></Footer>
</template>

<script setup>
  import { Header, AppMain, Footer } from './components';

</script>

<style lang="scss" scoped>
      .inside_banner {
        background-image: url(@/assets/img/doctor.jpg);
      }

</style>
