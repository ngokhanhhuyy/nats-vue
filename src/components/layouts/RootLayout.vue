<script setup lang="ts">
import { computed } from "vue";
import { useRoute, RouterView } from "vue-router";
import Modals from "@/components/modals/Modals.vue";
import { getSignInRoutePath } from "@/utils/routeUtils";

// Child components.
import NavigationBar from "./NavigationBar.vue";

// Dependencies.
const route = useRoute();

// Computed.
const isNavigationBarVisible = computed<boolean>(() => {
  return !route.fullPath.startsWith(getSignInRoutePath());
});

const mainMarginTop = computed<string>(() => {
  if (isNavigationBarVisible.value) {
    return "var(--navbar-height)";
  }

  return "0";
});
</script>

<template>
  <div class="container-fluid p-0 d-flex flex-column position-relative min-vh-100">
    <NavigationBar v-if="isNavigationBarVisible" />

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
  margin-top: v-bind(mainMarginTop);
}
</style>