<script setup lang="ts">
import { computed, inject, type Ref } from "vue";
import { formStateKey, type FormState } from "./Form.vue";

// Dependencies.
const formState = inject<Ref<FormState>>(formStateKey);
if (formState == null) {
  throw new Error("ValidationMessage component must be rendered inside Form component");
}

// Props.
const props = defineProps<{ name: string }>();

// Computed.
const shouldRender = computed<boolean>(() => {
  const isIdle = formState.value.formRequestingState === "idle";
  const isValidated = formState.value.modelErrorMessagesStore.isValidated;
  return isIdle && isValidated;
});

const message = computed<string | undefined>(() => {
  if (props.name) {
    return formState.value.modelErrorMessagesStore.getMessage(props.name);
  }

  return undefined;
});
</script>

<template>
  <span v-if="shouldRender" class="text-danger">
    {{ message }}
  </span>
</template>