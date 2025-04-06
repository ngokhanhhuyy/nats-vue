<script setup lang="ts">
import { computed, type CSSProperties } from "vue";
import { useRoute } from "vue-router";

// Dependencies.
const route = useRoute();

// States.
const titleContainerImageUrl = "images/front-pages/sub-page-title-container-background.webp";
const titleContainerStyle: CSSProperties = {
  backgroundImage: `
    linear-gradient(
      to right,
      rgba(var(--bs-success-rgb), 0.85) 0%,
      rgba(var(--bs-success-rgb), 0.85) 100%),
    url(${titleContainerImageUrl})`
};

// Computed.
const title = computed<string>(() => {
  return route.meta.pageTitle;
});
</script>

<template>
  <div>
    <div v-bind:style="titleContainerStyle" class="container-fluid p-5 shadow title-container">
      <div class="container p-3">
        <span class="fs-1" v-once>
          {{ title }}
        </span>
      </div>
    </div>

    <slot></slot>
  </div>
</template>

<style scoped>
.title-container {
  background-color: rgba(var(--bs-success-rgb), 0.25);
  color: var(--bs-white);
  border-bottom: 1px solid var(--bs-success);
}
</style>