<script lang="ts" setup>
import SideBar from '@/components/SideBar.vue'

const currentYear = new Date().getFullYear()
</script>

<template>
  <div class="page">
    <header>
      <h1>Admin Portal</h1>
    </header>
    <main>
      <RouterView/>
    </main>
    <footer>
      &copy; {{ currentYear }} Harry Maynard
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.page {
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  .content {
    padding: 20px;
    border: solid thin #CCC;
    background: #EEE;
  }
  main {
    flex: 1;
    display: flex;
  }
  footer {
    padding: 20px;
    color: #888;
  }
}
</style>
