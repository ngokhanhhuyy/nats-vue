<script setup lang="ts">
import { computed, inject, type Ref } from "vue";
import { formStateKey, type FormState } from "./Form.vue";

// Dependencies.
const formState = inject<Ref<FormState>>(formStateKey);

// Computed.
const isDisabled = computed<boolean>(() => {
  return (
    formState?.value.formRequestingState === "submitting" ||
    formState?.value.formRequestingState === "deleting" ||
    formState?.value.isModelDirty === false
  );
});
</script>

<template>
  <button v-bind:disabled="isDisabled" class="btn btn-success filter-shadow-sm" type="submit">
    <slot>
      <i class="bi bi-floppy mx-2"></i>
      <span class="me-2">Lưu</span>
    </slot>
  </button>
</template>

<style scoped>
button {
  transition: opacity .5s;
}
</style>