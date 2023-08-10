<script lang="ts" setup>
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
</script>

<template>
  <div class="page d-flex flex-column">
    <header>
      <AppHeader/>
    </header>
    <main class="flex-fill d-flex">
      <RouterView/>
    </main>
    <footer>
      <AppFooter/>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.page {
  width: 100vw;
  min-height: 100vh;
}
</style>
