<script setup lang="ts">
// Child component.
import Footer from "./Footer.vue";
</script>

<template>
  <div>
    <slot></slot>
    <Footer />
  </div>
</template>