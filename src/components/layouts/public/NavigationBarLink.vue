<script setup lang="ts">
import { computed } from "vue";
import { useRoute, RouterLink } from "vue-router";

// Dependencies.
const route = useRoute();

// Props.
const props = defineProps<{ to: string }>();

// Computed.
const computedClass = computed<string>(() => {
  const currentPathName = route.fullPath;
  if (currentPathName === "/" && props.to === "/") {
    return "active";
  }

  if (currentPathName.startsWith(props.to)) {
    return "active";
  }

  return "";
});
</script>

<template>
  <li class="nav-item">
    <RouterLink v-bind:to="to" v-bind:class="computedClass" class="nav-link">
      <slot></slot>
    </RouterLink>
  </li>
</template>

<style scoped>
.nav-link {
  --bs-nav-link-color: var(--navbar-foreground-color) !important;
  --bs-nav-link-hover-color: var(--navbar-foreground-color) !important;
  --bs-navbar-active-color: var(--navbar-foreground-color) !important;
  margin-right: 15px;
  padding: 3px 10px;
  border-radius: 8px;
}

.nav-link.active {
  background-color: var(--bs-success) !important;
  color: var(--bs-white);
}
</style>
