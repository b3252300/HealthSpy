<template>

  <div class="container-Questionnaire">
    <div class="container-Questionnaire-title">
      <slot name="title"></slot>
    </div>
    <slot>

    </slot>
  </div>



</template>
<style lang="scss" scoped>
.container-Questionnaire {
    background: #fff;
    padding: 1.25rem;
    border-radius: 10px;
    min-height: calc(100vh - 16px);
    margin-bottom: 60px;

    &-title {
      font-size: 18px;
      font-weight: 500;
      line-height: 1.38;
      padding-bottom: 10px;
      margin-bottom: 20px;
      text-align: center;
      border-bottom: solid #a3d47c 2px;
    }
  }



</style>
