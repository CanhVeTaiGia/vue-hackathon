<template>
  <nav class="h-screen w-1/5 p-3 bg-black flex items-center flex-col gap-5">
    <RouterLink
      exact-active-class="bg-gray-500"
      class="w-full rounded text-center p-3"
      to="/admin"
      >Dashboard</RouterLink
    >
    <RouterLink
      active-class="bg-gray-500 text"
      class="w-full rounded text-center p-3"
      to="/admin/manager-category"
      >Category Manager</RouterLink
    >
    <RouterLink
      active-class="bg-gray-500 text"
      class="w-full rounded text-center p-3"
      to="/admin/manager-product"
      >Product Manager</RouterLink
    >
  </nav>
</template>
<script setup></script>
<style></style>
