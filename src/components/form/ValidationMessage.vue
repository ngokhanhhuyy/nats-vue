<script setup lang="ts">
import { computed, inject, type Ref } from "vue";
import { formStateKey, type FormState } from "./Form.vue";

// Dependencies.
const formState = inject<Ref<FormState>>(formStateKey);

// Props.
const props = defineProps<{ name: string }>();

// Computed.
const message = computed<string | undefined>(() => {
  if (props.name && formState?.value) {
    return formState.value.modelErrorMessagesStore.getMessage(props.name);
  }

  return undefined;
});
</script>

<template>
  <span v-if="formState?.modelErrorMessagesStore.isValidated" class="text-danger">
    {{ message }}
  </span>
</template>