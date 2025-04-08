<script lang="ts">
export const fieldNameKey = "fieldNameKey";
</script>

<script setup lang="ts">
import { provide } from "vue";

// Form component.
import ValidationMessage from "./ValidationMessage.vue";

// Props.
const props = defineProps<{
  name: string;
  displayName: string;
  required?: boolean
}>();

// Provide.
provide(fieldNameKey, props.name);
</script>

<template>
  <div class="form-group">
    <label v-bind:for="name" v-bind:class="{ required }" class="form-label">
      {{ displayName }}
    </label>

    <slot></slot>

    <ValidationMessage v-bind:name />
  </div>
</template>

<style scoped>
.form-label {
  color: var(--bs-success-text-emphasis);
  font-size: .875rem;
  font-weight: bold;
  margin: 0;
}
</style>