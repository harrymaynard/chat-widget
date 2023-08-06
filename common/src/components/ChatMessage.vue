<script lang="ts" setup>
import { type PropType } from 'vue'
import type IMessage from '../interfaces/IMessage'

const props = defineProps({
  message: {
    type: Object as PropType<IMessage>,
    default: null,
  },
})
</script>

<template>
  <div>
    {{ props.message?.text }}
  </div>
</template>
