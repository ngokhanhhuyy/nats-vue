<script setup lang="ts">
import { computed, inject, type Ref } from "vue";
import { formStateKey, type FormState } from "./Form.vue";

// Dependencies.
const formState = inject<Ref<FormState>>(formStateKey);

// Computed.
const isDeleting = computed<boolean>(() => {
  return (formState?.value.formRequestingState ?? false) === "deleting";
});

const isDisabled = computed<boolean>(() => {
  if (formState == null) {
    return false;
  }

  return isDeleting.value || formState.value.formRequestingState === "deleting";
});
</script>

<template>
  <button
    v-bind:disabled="isDisabled"
    v-on:click="formState?.delete"
    class="btn btn-outline-danger px-4 filter-shadow-sm"
    type="button"
  >
    <slot v-if="isDeleting" name="spinner">
      <span class="spinner-border spinner-border-sm me-2" aria-hidden="true" />
      <span role="status">Đang xoá ...</span>
    </slot>
    <slot v-else name="default">
      <i class="bi bi-trash3 me-1"></i>
      <span>Xoá</span>
    </slot>
  </button>
</template>