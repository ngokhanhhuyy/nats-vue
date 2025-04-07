<script setup lang="ts">
import { useGeneralSettingsStore } from "@/stores/generalSettingsStore";

// Dependencies.
const generalSettingsStore = useGeneralSettingsStore();

// States.
const mainLogoImageUrl = "/images/main-logo-transparent-white.png";
</script>

<template>
  <nav class="bg-white border-bottom border-success-subtle py-1 w-100">
    <div class="container-fluid d-flex align-items-center h-100">
      <div class="logo-container">
        <img
          v-bind:src="mainLogoImageUrl"
          v-bind:alt="generalSettingsStore.data.applicationName"
          class="logo"
        />
      </div>

      <h3 class="text-success m-0 ms-2">
        {{ generalSettingsStore.data.applicationShortName }}
      </h3>
    </div>
  </nav>
</template>

<style scoped>
nav {
  height: 60px;
  overflow: hidden;
  display: flex;
  justify-content: center;
}

nav .logo-container {
  height: 40px;
  width: auto;
  aspect-ratio: 1;
  padding: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid var(--bs-success);
  border-radius: 50%;
}

.container-fluid {
  max-width: 1400px;
}

.logo {
  height: 100%;
  width: auto;
  aspect-ratio: 1;
  filter: 
    brightness(0)
    saturate(100%)
    invert(39%)
    sepia(90%)
    saturate(393%)
    hue-rotate(100deg)
    brightness(88%)
    contrast(89%);
}
</style>