<script setup lang="ts">
import Base from "./components/Base.vue";
</script>

<template>
  <div class="align-center">
      <img src="/wissem.svg" class="logo" alt="Wissem's Industries Logo" />
  </div>
  <Base msg="Hello World" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
