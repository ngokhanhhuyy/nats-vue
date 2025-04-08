<script setup lang="ts">
import { useRoute, RouterView } from "vue-router";
import Modals from "@/components/modals/Modals.vue";

// Child components.
import NavigationBar from "./NavigationBar.vue";

// Dependencies.
const route = useRoute();
</script>

<template>
  <div class="container-fluid p-0 d-flex flex-column position-relative min-vh-100">
    <NavigationBar />

    <main class="d-flex flex-column flex-fill h-100">
      <RouterView v-slot="{ Component }">
        <template v-if="Component">
          <Transition name="fade" mode="out-in">
            <Suspense>
              <Component v-bind:is="Component" v-bind:key="route.fullPath" />
            </Suspense>
          </Transition>
        </template>
      </RouterView>
    </main>
    
    <Modals />
  </div>
</template>

<style scoped>
main {
  margin-top: var(--navbar-height);
}
</style>