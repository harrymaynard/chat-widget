<script lang="ts" setup>
import { type PropType } from 'vue'
import type IMessage from '../interfaces/IMessage'

const props = defineProps({
  messages: {
    type: Array as PropType<Array<IMessage>>,
    default: () => []
  },
})
</script>

<template>
  <div>
    <div
      v-for="(message, index) in props.messages"
      :key="index"
    >
      {{ message }}
    </div>
  </div>
</template>
