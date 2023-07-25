<script lang="ts" setup>
import ChatApp from '@/components/ChatApp.vue'
</script>

<template>
  <div class="component">
    <div class="content">
      <h1>Title Here</h1>
    </div>
  </div>
  <ChatApp />
</template>

<style lang="scss" scoped>
.component {
  width: 100%;
  height: 100%;

  .content {
    max-width: 768px;
    height: inherit;
    margin: auto;
    padding: 20px;
    border: solid thin #CCC;
    background: #EEE;
  }
}
</style>
