<template>



<Teleport to="body">     
<div class="modal fade" ref="modal">
<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">        
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body text-center">
        <h4>請至聯新國際醫院門診大樓地下一樓聯新尊爵健康會館完成報到!</h4>
        <qrcode-vue class="img_qrcode" :value="CodeName.QrCode" :size="size" level="H" />
        <div>{{ CodeName.QrCode }}</div>
        <Timer  ref="timerComp" @Update="sendUpdate"/>
      </div>
      <div class="modal-footer text-center">
        <button type="button"  class="btn btn-primary mx-auto" style="width:300px"  @click="myModal_hide">返回</button>
   
  
      </div>
    </div>
  </div>
</div>
</Teleport>

<Loading :IsShow="finishLoading"/>  
</template>

<script setup>
import {  onMounted, ref, watch, watchEffect } from 'vue';
import {  GetQrCode  } from '@/api/user';
import router from '@/router'
import Loading from '@/components/Loading.vue';
import QrcodeVue from 'qrcode.vue'
import Timer from '@/components/Timer.vue';
import Modal from "bootstrap/js/dist/modal";
import { emptyProps } from 'ant-design-vue/es/empty';
const modal = ref(null);
const formModal = ref(null);


const stopTime = ref(false);
const finishLoading = ref(true);


const size = ref(262);

const timerComp = ref(null);
const emit = defineEmits(['IsView']);



const props = defineProps({  
  CodeName: {
        type: String,
        default: ""
    },

});

if(window.innerWidth < 575){
  size.value = 200
}




onMounted(()=>{
    formModal.value = new Modal(modal.value);

});



function sendUpdate(){ 
    // location.reload();
    emit("Refrush");
}


const myModal_show = () => {
    formModal.value.show();
};

const myModal_hide = () => {
    formModal.value.hide();
    router.push({ name:'schedule'});
};
defineExpose({
  myModal_show,
  myModal_hide,
});

</script>
<style lang="scss" scoped>

.modal-body{
  display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 10px;
}
.modal-content {
    min-height: 80%;
}
.modal-footer{
  padding-bottom: 2rem;
}

.btn-primary{
  cursor: pointer;
}
.modal-open{
  position: fixed;
  overflow: hidden;
}
</style>