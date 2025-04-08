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
  required?: boolean;
  floating?: boolean;
}>();

// Provide.
provide(fieldNameKey, props.name);
</script>

<template>
  <div class="form-group">
    <template v-if="floating">
      <div class="form-floating">
        <slot></slot>
        <label v-bind:for="name" v-bind:class="{ required }">
          {{ displayName }}
        </label>
      </div>
    </template>
    <template v-else>
      <label v-bind:for="name" v-bind:class="{ required }" class="form-label">
        {{ displayName }}
      </label>

      <slot></slot>
    </template>

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