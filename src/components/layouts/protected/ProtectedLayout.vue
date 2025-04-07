<script setup lang="ts">
import { RouterView } from "vue-router";

// Child component.
import NavigationBar from "./NavigationBar.vue";
</script>

<template>
  <div class="container-fluid flex-fill d-flex flex-column w-100">
    <!-- NavigationBar -->
    <NavigationBar />

    <div class="body-container flex-fill">
      <RouterView v-slot="{ Component }">
        <template v-if="Component">
          <Transition name="fade" mode="out-in">
            <Suspense>
              <Component :is="Component" />
            </Suspense>
          </Transition>
        </template>
      </RouterView>
    </div>
  </div>
</template>

<style scoped>
.container-fluid {
  --bs-body-font-size: 1.1rem !important;
  background: rgba(var(--bs-success-rgb), 0.1);
  font-size: var(--bs-body-font-size);
  height: 100%;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: stretch;
  padding: 0;
}

.body-container {
  background: rgba(255, 255, 255, 0.5);
  border-left: 1px solid rgba(var(--bs-success-rgb), 0.25);
  border-right: 1px solid rgba(var(--bs-success-rgb), 0.25);
  width: 100%;
  max-width: 1400px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: stretch;
  padding: 1rem;
  box-sizing: border-box;
}
</style>
