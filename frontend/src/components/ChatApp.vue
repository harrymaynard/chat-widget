<script lang="ts" setup>
import { ref } from 'vue'
import IconChat from '@/components/icons/IconChat.vue'

const isChatOpen = ref<boolean>(false)

const handleClickChatIcon = () => {
  isChatOpen.value = !isChatOpen.value
}
</script>

<template>
  <div class="component">
    <a
      href="javascript:void(0)"
      class="chat-icon-container"
      @click="handleClickChatIcon"
    >
      <IconChat class="icon" />
    </a>
  </div>
</template>

<style lang="scss" scoped>
.chat-icon-container {
  position: fixed;
  bottom: 10px;
  right: 10px;
  padding: 10px;
  background: blue;
  border-radius: 50%;

  .icon {
    width: 32px;
    height: 32px;
    color: #FFF;
  }
}
</style>
