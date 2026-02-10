<template>
<Teleport to="body">     
<div class="alert alert-secondary" role="alert" v-show="IsShow">
<h4 class="alert-heading">錯誤 !   <button type="button" class="btn-close" aria-label="Close" @click="btnClose"></button></h4>
<template v-if="Content">
  {{ Content }}
</template>
<template v-else>
  請稍後重試
</template>

</div>

</Teleport>
  
  </template>
  <script setup>
  import {  ref } from 'vue';
 
  const emit = defineEmits(['Close']);
  
  const props = defineProps({  
      IsShow: {
          type: Boolean,
          default:false 
       },
      Content:{
          type: String,
          default: "" 
      }
  });
  

  function btnClose(){
    emit("Close", false);

  }
  </script>
<style lang="scss" scoped>
button.btn-close {
    width: 4px;
    filter: invert(1);
}
.alert{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
    min-width: 217px;


}
.alert-heading {
    color: inherit;
    display: flex;
    justify-content: space-between;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
