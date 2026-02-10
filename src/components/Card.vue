<template>
  <div class="container-Questionnaire-result">

    <div class="d-flex justify-content-between align-items-center"
         style="margin-bottom: 20px; color: #2d2d2d">
      <div class="text-bold">
        <slot name="title"></slot>
      </div>
      <div style="color: #2d2d2d80; font-size: 14px; line-height: 1.4">
        <slot name="EvaluateDatetime"></slot>
      </div>

    </div>
    <slot>

    </slot>
  </div>
</template>


<script setup>
  import { ref } from "vue";


</script>
<style lang="scss" scoped>
  .text-bold {
    line-height: 1.39;
    font-weight: 500;
    font-size: 18px;
    font-family: 'Noto Sans TC';
  }
  .container-Questionnaire-result {
    background: #fff;
    padding: 1rem;
    border-radius: 10px;
    min-height: 87vh;
  }

</style>

