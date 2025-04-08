<script lang="ts">
type TextInputProps = {
  name?: string;
  type?: "text" | "number" | "tel" | "email" | "url" | "password"
	regex?: RegExp;
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
  type: "text"
});

// State.
const model = defineModel<string>({ default: "" });
const inputElementRef = ref<HTMLInputElement>(null!);

// Computed.
const computedModel = computed<string>({
  get(): string {
    return isLoading.value ? "" : model.value;
  },
  set(newValue: string): void {
    if (props.regex != null) {
      const globalRegex = new RegExp(props.regex.source, props.regex.flags + "g");
      inputElementRef.value.value = newValue.replace(globalRegex, "");
    }

    if (props.type === "tel") {
      inputElementRef.value.value = newValue.replace(/[^$0-9_]/g, "");
    }

    if (props.type === "email") {
      inputElementRef.value.value = newValue
        .replace(/[^$a-zA-Z0-9!#%&'*+/=?^_`{|}~@.\\-]/g, "");
    }

    model.value = inputElementRef.value.value;
  }
});

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
  <input
    v-model="computedModel"
    v-bind="props"
    v-bind:class="computedClass"
    ref="inputElementRef"
    class="form-control"
  />
</template>