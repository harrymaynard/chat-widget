<script lang="ts" setup>
const currentYear = new Date().getFullYear()
</script>

<template>
  <div class="footer">&copy; {{ currentYear }} Harry Maynard</div>
</template>

<style lang="scss" scoped>
.footer {
  padding: 20px;
  color: #888;
}
</style>
