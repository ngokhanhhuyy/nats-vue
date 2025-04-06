<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <body class="container-fluid p-0 d-flex flex-column position-relative">
    <RouterView v-slot="{ Component }">
      <template v-if="Component">
        <Transition name="fade" mode="out-in">
          <Suspense>
            <Component :is="Component" />
          </Suspense>
        </Transition>
      </template>
    </RouterView>
  </body>
</template>