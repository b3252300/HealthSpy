<template>
  <div class="footer">
 
    Copyright © 2024 Hong Kuan Ltd., All Rights Reserved.
    v{{ version }}
  </div>
</template>

<script setup>
import { useAppStore } from '@/store';
const appStore = useAppStore();

const version = import.meta.env.VITE_VERSION;

</script>

<style lang="scss" scoped>
.footer {
  display: flex;
  justify-content: flex-end;
  padding: 0px 24px 0px 24px;
  color: #909090;
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
}
</style>
