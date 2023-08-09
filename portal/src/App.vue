<script lang="ts" setup>
const currentYear = new Date().getFullYear()
</script>

<template>
  <div class="page">
    <div class="content">
      <h1>Admin Portal</h1>
    </div>
    <footer>
      &copy; {{ currentYear }} Harry Maynard
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.page {
  max-width: 768px;
  height: inherit;
  margin: auto;

  .content {
    padding: 20px;
    border: solid thin #CCC;
    background: #EEE;
  }
  footer {
    padding: 20px;
    color: #888;
  }
}
</style>
