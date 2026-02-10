<template>
  後端版本 {{ Version }}
  <br>
  前端版本 {{ FrontVersion }}
  <br>
  API 根位置 {{api}}
  <br>
  APP WEB 位置 {{ app }}
  <br>
  {{ refreshCount }} 刷新次數
</template>
<script setup>
import { ref } from 'vue';
import { GetVersion } from '@/api/user';
import axios from 'axios';

const Version = ref("");
const FrontVersion = ref("");
const api = ref("");
const app = ref("");
let count = ref(0);
let params = {};
let refreshCount = localStorage.getItem('refreshCount') || 0;

GetVersion(params)
    .then((res) => {
        const { code, data } = res;
        if (code == 0) {
            Version.value = data.Version;
            FrontVersion.value = import.meta.env.VITE_VERSION;
            api.value = import.meta.env.VITE_API_ROOT;
            app.value = import.meta.env.VITE_API_MEMBER;
            console.log(res);

            if (Version.value !== FrontVersion.value) {
           
                refreshCount++;  // 每次不相同時，計數增加
                localStorage.setItem('refreshCount', refreshCount);

                // 如果刷新次數小於等於 2，則進行重新整理
                if (refreshCount <= 2) {
                    window.location.replace(location.href);
                }
            }
        }
    })
    .finally(() => {
        // 可以在這裡加入其他的處理邏輯
    });


</script>
