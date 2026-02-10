<template>
<Teleport to="body">     
<div class="modal fade" tabindex="-1" ref="modal">
<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">查看健檢報告</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
 
        
        <ul v-for="item in list" class="list-unstyled" :key="item.FileUrl">           
            
            <li>
                <a v-if="item.FileUrl" :href="item.FileUrl" alt="item.FileName">{{ item.PackageName }}</a>
                <a v-else :href="ExamReport" alt="item.FileName">{{ item.PackageName }}</a>
            </li>
            
        </ul>


      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary btn_modalClose" data-bs-dismiss="modal">取消</button>
  
      </div>
    </div>
  </div>
</div>
</Teleport>

</template>
<script setup>
import {  ref, onMounted } from 'vue';
import Modal from "bootstrap/js/dist/modal";
const modal = ref(null);
const formModal = ref(null);


const props = defineProps({  
    list: {
        type: Array,
    default: () => [] 
    },
    ExamReport:{
        type: Array,
      default: () => []
    }
});


onMounted(() => {
    formModal.value = new Modal(modal.value);

});

const myModal_show = () => {
    formModal.value.show();
};

const myModal_hide = () => {
    formModal.value.hide();
};

defineExpose({
  myModal_show,
  myModal_hide,
});


</script>
<style lang="scss" scoped>
.modal-header {
    align-items: center;
    padding-bottom: 1rem;
    font-size: 1rem;
    color: #0000;
}
.modal-footer{
    padding-top: 1rem;
    padding-bottom: 1rem;
}
.modal-body {
    border-top: solid #CED4DA thin;
    border-bottom:solid #CED4DA thin ;
}
.modal-dialog-scrollable .modal-body {
    min-height: 9.8rem;
}
.list-unstyled{
    font-size: 1rem;
    a{
        color:#2D2D2D;
        &:hover, a:focus{
            color:#057aff;
        }
    }
}
.btn_modalClose {
    padding: 0.625rem 1rem;
    color: #2D2D2D;
    font-weight: 600;
    font-size: 1rem;
    line-height: 1;
}
</style>
