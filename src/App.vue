<template>
  <!-- <el-config-provider :locale="locale" :size="size"> -->
  <el-config-provider :size="size">
    <router-view />

  </el-config-provider>
</template>

<script setup>



defineOptions({
  name: 'App',
});
</script>
