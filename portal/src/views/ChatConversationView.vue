<script lang="ts" setup>
import SideBar from '@/components/SideBar.vue'
</script>

<template>
  <div class="chat-conversation-view">
    <div class="sidebar">
      <SideBar />
    </div>
    <div class="page-content"></div>
  </div>
</template>

<style lang="scss" scoped>
.chat-conversation-view {
  flex: 1;
  display: flex;

  .sidebar {
    background: blue;
    width: 300px;
  }
  .page-content {
    background: green;
    flex: 1;
  } 
}
</style>
