<template>
  <header id="header" class="navbar navbar-expand-lg navbar-light navbar-show-hide" data-hs-header-options='{
        "fixMoment": 0,
        "fixEffect": "slide"
      }'>

    <div class="container">
      <nav class="js-mega-menu navbar-ls-nav-wrap">
        <!-- Default Logo -->
        <a class="navbar-brand" :href="pathList[0].path" aria-label="Unify">
          <img class="navbar-brand-logo" src="@/assets/svg/logos/logo.svg" alt="Image Description">
        </a>

      </nav>
    </div>
  </header>
  <slot></slot>

</template>

<script setup>
  import { ref } from 'vue';
import   path   from '@/api/path';
import { ANT_MARK } from 'ant-design-vue/es/locale';
const { pathList, qrcodeList, Logout, Privacy } = path();
const versionData = ref(null);
versionData.value = import.meta.env.VITE_VERSION;
function ConfirmLogout() {
        if (confirm('是否要登出？')) {
            window.location.href = Logout.path;
            localStorage.removeItem('refreshCount');
        }
    }
</script>

<style lang="scss" scoped>
.inside_banner{
    background-image: url(@/assets/img/doctor.jpg);
}

  .navbar {
    background: #fff;
  }

</style>
