<template>
    <Teleport to="body">     
    <div class="modal fade" ref="modal"  v-show="IsShow">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" data-bs-backdrop="false">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">錯誤</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
                   {{ Content }}
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
        IsShow: {
            type: Boolean,
            default:false 
         },
        Content:{
            type: String,
            default: "" 
        }
    });
    
    
    onMounted(() => {
        formModal.value = new Modal(modal.value);
    
    });
    
    const Failed_show = () => {
        formModal.value.show();
    };
    
    const Failed_hide = () => {
        formModal.value.hide();
    };
    
    defineExpose({
      Failed_show,
      Failed_hide,
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