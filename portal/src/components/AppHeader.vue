<script lang="ts" setup>
import { routes } from '@/router/Routes'
</script>

<template>
  <div class="d-flex align-items-center p-3 border-bottom">
    <h1 class="m-0">Admin Portal</h1>
    <span class="ms-5">
      <RouterLink :to="routes.CHAT_LIST_VIEW.path">Chat Sessions</RouterLink>
    </span>
    <span class="ms-4">
      <RouterLink :to="routes.ABOUT_VIEW.path">About</RouterLink>
    </span>
  </div>
</template>
