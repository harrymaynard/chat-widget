<script lang="ts" setup>
import { routes } from '@/router/Routes'
</script>

<template>
  <div class="header">
    <h1>Admin Portal</h1>
    <span class="header-link">
      <RouterLink :to="routes.CHAT_LIST_VIEW.path">Chat Sessions</RouterLink>
    </span>
    <span class="header-link">
      <RouterLink :to="routes.ABOUT_VIEW.path">About</RouterLink>
    </span>
  </div>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;

  .header-link {
    margin-left: 30px;
  }
}
</style>
