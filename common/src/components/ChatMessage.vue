<script lang="ts" setup>
import { type PropType, computed } from 'vue'
import type IMessage from '../interfaces/IMessage'
import { formatISODateTime } from '../helpers/DateHelper'
import UserType from '../enums/UserType'

const props = defineProps({
  message: {
    type: Object as PropType<IMessage>,
    default: null,
  },
  userId: {
    type: Number,
    default: null,
  },
  userType: {
    type: String as PropType<UserType>,
    default: UserType.Member,
  }
})

const componentClassNames = computed(() => {
  let classNames = 'chat-message'

  if (props.message?.userId === props.userId) {
    classNames += ' user'
  }

  return classNames
})
</script>

<template>
  <div :class="componentClassNames">
    <div class="info">
      <span>{{ props.message?.name }}</span>
      <span class="time"> ({{ formatISODateTime(props.message?.createdAt) }})</span>
    </div>
    <div class="message">
      <span>{{ props.message?.text }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.chat-message {
  &:not(:last-child) {
    margin-bottom: 10px;
  }
  .info {
    color: #AAA;
    font-size: 14px;

    .time {
      font-style: italic;
    }
  }
  .message {
    display: block;
    padding: 10px;
    background: #CCC;
    border-radius: 10px;

    span {
      white-space: pre-wrap;
      word-wrap: break-word;
    }
  }

  &.user {
    margin-left: 30px;
    .message {
      background: rgb(27, 104, 140);
      color: #FFF;
    }
  }
  &:not(.user) {
    margin-right: 30px;
  }
}
</style>
