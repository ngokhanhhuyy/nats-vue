<script lang="ts">
export type SelectInputOption<T> = {
  value: T;
  text: string;
}
</script>

<script setup lang="ts" generic="T">
import { computed, inject, type Ref } from "vue";
import { formStateKey, type FormState } from "./Form.vue";
import { fieldNameKey } from "./Field.vue";

// Dependencies.
const formState = inject<Ref<FormState>>(formStateKey);
const fieldName = inject<string>(fieldNameKey);

// Props.
const props = defineProps<{
  name?: string;
  options?: SelectInputOption<T>[];
}>();

// State.
const model = defineModel<T>();

// Computed.
const computedClass = computed<string | undefined>(() => {
  if ((props.name ?? fieldName) && !isLoading.value) {
    return formState?.value.modelErrorMessagesStore
      .getInputClass((props.name || fieldName)!)
      ?? undefined;
  }

  return undefined;
});

const isLoading = computed<boolean>(() => {
  if (formState == null) {
    return false;
  }

  return (
    formState.value.formRequestingState === "submitting" ||
    formState.value.formRequestingState === "deleting"
  );
});
</script>

<template>
  <select v-model="model" v-bind:class="computedClass" class="form-select filter-shadow-sm">
    <option v-for="(option, index) in options" v-bind:key="index" v-bind:value="option.value">
      {{ option.text }}
    </option>
  </select>
</template>