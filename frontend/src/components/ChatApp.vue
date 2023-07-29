<script lang="ts" setup>
import { ref } from 'vue'
import IconChat from '@/components/icons/IconChat.vue'
import IconDash from '@/components/icons/IconDash.vue'

const isChatOpen = ref<boolean>(false)

const handleClickChatIcon = () => {
  isChatOpen.value = !isChatOpen.value
}

const handleClickCloseChat = () => {
  isChatOpen.value = false
}

const handleSubmitMessage = () => {
  console.log('send message')
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
    <div
      v-if="isChatOpen"
      class="chat-container"
    >
      <div class="chat-header">
        <div class="title">Conversation</div>
        <a
          href="javascript:void(0)"
          title="Minimize"
          class="close-chat-icon-container"
          @click="handleClickCloseChat"
        >
          <IconDash />
        </a>
      </div>
      <div class="chat-body"></div>
      <div class="chat-footer">
        <form @submit.prevent="handleSubmitMessage">
          <input
            type="text"
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$theme-color-primary: #115464;
$button-icon-size: 32px;
$button-padding: 10px;
$spacing: 10px;
.chat-icon-container {
  position: fixed;
  bottom: $spacing;
  right: $spacing;
  padding: $button-padding;
  background: $theme-color-primary;
  border-radius: 50%;

  .icon {
    width: $button-icon-size;
    height: $button-icon-size;
    color: #FFF;
  }
}
.chat-container {
  position: fixed;
  bottom: $spacing + $button-padding + $button-icon-size + $button-padding + $spacing;
  top: $spacing;
  right: $spacing;
  width: 300px;
  border: solid thin $theme-color-primary;
  background: #FFF;
  border-radius: 5px;
  display: flex;
  flex-direction: column;

  .chat-header {
    background: $theme-color-primary;
    color: #FFF;
    padding: 4px;
    display: flex;
    justify-content: center;

    .title {
      flex: 1;
    }
    .close-chat-icon-container {
      color: #FFF;
    }
  }
  .chat-body {
    flex: 1;
  }
  .chat-footer {
    background: $theme-color-primary;
    
    form {
      display: flex;

      input {
        flex: 1;
      }
    }
  }
}
</style>
