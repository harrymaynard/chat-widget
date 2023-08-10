<script lang="ts" setup>
import SideBar from '@/components/SideBar.vue'
import ChatConversation from 'common/components/ChatConversation.vue'

const handleSubmitSendMessage = () => {
  console.log('send message')
}
</script>

<template>
  <div class="flex-fill d-flex">
    <div class="sidebar border-end">
      <SideBar/>
    </div>
    <div class="flex-fill d-flex flex-column">
      <div class="flex-fill position-relative">
        <ChatConversation/>
      </div>
      <div class="m-3">
        <form
          class="d-flex"
          @submit.prevent="handleSubmitSendMessage"
        >
          <input
            class="form-control flex-fill"
          />
          <button
            type="submit"
            class="btn btn-primary ms-3"
          >Send</button>
        </form>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sidebar {
  width: 300px;
}
</style>
