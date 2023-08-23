<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useAPIClientService } from 'common/services/APIClientService'
import type IChatsDTO from 'common/interfaces/IChatsDTO'
import { formatArray } from 'common/helpers/StringHelper'

const APIClientService = useAPIClientService()

const viewModel = ref<IChatsDTO>()
const isErrorChatsListAPI = ref<boolean>(false)

onMounted(async () => {
  try {
    const { data } = await APIClientService.getChats()
    viewModel.value = data
  } catch (error) {
    console.error('Failed to fetch chats list.', error)
    isErrorChatsListAPI.value = true
  }
})
</script>

<template>
  <div class="p-4">
    <h2>Chat Sessions</h2>
    <table class="table table-striped table-bordered">
      <thead>
        <tr>
          <th>Session ID</th>
          <th>Participants</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="chat in viewModel?.chats"
          :key="chat.chatId"
        >
          <td>
            <RouterLink :to="`/chat/${chat.chatId}`">{{ chat.chatId }}</RouterLink>
          </td>
          <td>{{ formatArray(chat.participantNames) }}</td>
          <td>{{ chat.createdAt }}</td>
        </tr>
        <tr v-if="isErrorChatsListAPI">
          <td
            class="text-center text-danger"
            colspan="3"
          >Unable to fetch chats list</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
