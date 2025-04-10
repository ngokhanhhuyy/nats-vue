<script setup lang="ts">
import { computed, inject, type Ref } from "vue";
import { formStateKey, type FormState } from "./Form.vue";
import { fieldNameKey } from "./Field.vue";

// Dependencies.
const formState = inject<Ref<FormState>>(formStateKey);
const fieldName = inject<string>(fieldNameKey);
if (formState == null) {
  throw new Error("ValidationMessage component must be rendered inside a Form component");
}

// Props.
const props = defineProps<{ name: string }>();

// Computed.
const shouldRender = computed<boolean>(() => {
  const isIdle = formState.value.formRequestingState === "idle";
  const isValidated = formState.value.modelErrorMessagesStore.isValidated;
  return isIdle && isValidated;
});

const computedClass = computed<string | undefined>(() => {
  const name = props.name ?? fieldName;
  if (formState.value && name) {
    return formState.value.modelErrorMessagesStore.getMessageClass(name) ?? undefined;
  }

  return undefined;
});

const message = computed<string | undefined>(() => {
  if (props.name) {
    return formState.value.modelErrorMessagesStore.getMessage(props.name);
  }

  return undefined;
});
</script>

<template>
  <span v-if="shouldRender" v-bind:class="computedClass">
    {{ message }}
  </span>
</template>