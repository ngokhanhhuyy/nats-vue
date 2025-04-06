<script setup lang="ts">
import { RouterView } from "vue-router";
import Modals from "@/components/modals/Modals.vue";
</script>

<template>
  <body class="container-fluid p-0 d-flex flex-column position-relative">
    <RouterView v-slot="{ Component }">
      <template v-if="Component">
        <Suspense>
          <Component :is="Component" />
        </Suspense>
      </template>
    </RouterView>
    <Modals />
  </body>
</template>