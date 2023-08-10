<script lang="ts" setup>

</script>

<template>
  <div class="p-4">
    <h2>Chat Sessions</h2>
    <table class="table table-striped table-bordered">
      <thead>
        <tr>
          <th>Session ID</th>
          <th>User ID</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <RouterLink to="/chat/1">123</RouterLink>
          </td>
          <td>12345678</td>
          <td>2023-08-09</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
