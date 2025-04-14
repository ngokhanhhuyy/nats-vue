<script lang="ts">
type TextInputProps = {
  name?: string;
  minHeight?: number;
};
</script>

<script setup lang="ts">
import { ref, computed, inject, type Ref } from "vue";
import { formStateKey, type FormState } from "./Form.vue";
import { fieldNameKey } from "./Field.vue";

// Dependencies.
const formState = inject<Ref<FormState>>(formStateKey);
const fieldName = inject<string>(fieldNameKey);

// Props.
const props = withDefaults(defineProps<TextInputProps>(), {
  type: "text",
  minHeight: 200
});

// State.
const model = defineModel<string>({ default: "" });
const inputElementRef = ref<HTMLInputElement>(null!);

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
  <textarea
    v-model="model"
    v-bind:name="name ?? fieldName"
    v-bind:class="computedClass"
    v-bind:style="{ minHeight: `${minHeight}px !important` }"
    ref="inputElementRef"
    class="form-control filter-shadow-sm"
  ></textarea>
</template>