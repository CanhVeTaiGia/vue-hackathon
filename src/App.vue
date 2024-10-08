<template>
  <div class="max-h-screen h-screen overflow-hidden">
    <Header />
    <div class="flex h-full">
      <Menu />
      <RouterView />
    </div>
    
  </div>
</template>
<script setup>
import { RouterView } from "vue-router";
import Header from "./components/Header.vue";
import Menu from "./components/Menu.vue";
</script>
<style scoped></style>
