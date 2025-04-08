<script setup lang="ts">
import { computed } from "vue";
import { useRoute, RouterLink } from "vue-router";

// Dependencies.;
const route = useRoute();

// Props.
const props = defineProps<{ to: string }>();

// Computed.
const computedClass = computed<string>(() => {
  if (route.fullPath.startsWith(props.to)) {
    return "active";
  }

  return "";
});
</script>

<template>
  <RouterLink v-bind:to="to" v-bind:class="computedClass" class="nav-link">
    <slot></slot>
  </RouterLink>
</template>

<style scoped>
</style>
