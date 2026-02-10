<template>
 <transition  name="fade">
<div class="alert alert-secondary" role="alert" v-show="IsShow">
{{ Title }}
</div>
</transition>   
</template>
<style lang="scss" scoped>
.alert.alert-secondary {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 200px;
    text-align: center;
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
<script setup>
import { ref, watch } from 'vue';

const props = defineProps({  
      IsShow: {
        type: Boolean,
        default:false 
      },
      Title: {
        type: String,
        default:"" 
      },
    });





    
</script>