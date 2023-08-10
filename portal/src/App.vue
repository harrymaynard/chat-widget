<script lang="ts" setup>
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
</script>

<template>
  <div class="page">
    <header>
      <AppHeader/>
    </header>
    <main>
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
  display: flex;
  flex-direction: column;

  main {
    flex: 1;
    display: flex;
  }
}
</style>
