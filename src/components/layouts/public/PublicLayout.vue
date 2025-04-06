<script setup lang="ts">
// Child components.
import NavigationBar from "./NavigationBar.vue";
import Footer from "./Footer.vue";
</script>

<template>
  <div>
    <NavigationBar />
    <main class="flex-fill h-100 fade-animation fade-animation-reverse">
      <RouterView v-slot="{ Component }">
        <template v-if="Component">
          <Transition name="fade" mode="out-in">
            <Suspense>
              <Component :is="Component" />
            </Suspense>
          </Transition>
        </template>
      </RouterView>
    </main>
    <Footer />
  </div>
</template>

<style scoped>
main {
  margin-top: var(--navbar-height);
}
</style>