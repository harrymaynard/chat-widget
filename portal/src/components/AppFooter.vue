<script lang="ts" setup>
const currentYear = new Date().getFullYear()
</script>

<template>
  <div class="footer p-4 border-top">&copy; {{ currentYear }} Harry Maynard</div>
</template>

<style lang="scss" scoped>
.footer {
  color: #888;
}
</style>
