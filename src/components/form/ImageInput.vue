<script setup lang="ts">
import { computed, watch, inject, type Ref } from "vue";
import { fileToBase64Strings } from "@/utils/photoUtils";
import { formStateKey, type FormState } from "./Form.vue";
import { fieldNameKey } from "./Field.vue";

// Dependencies.
const formState = inject<Ref<FormState>>(formStateKey);
const fieldName = inject<string>(fieldNameKey);

// Props.
const props = defineProps<{ name?: string }>();

// Model.
const fileModel = defineModel<string | null>("file");
const changedModel = defineModel<boolean>("changed");

// Computed.
const inputClass = computed<string | undefined>(() => {
  const inputName = props.name ?? fieldName;
  if (inputName) {
    return formState?.value.modelErrorMessagesStore.getInputClass(inputName) ?? undefined;
  }

  return undefined;
});

const deleteButtonClass = computed<string>(() => {
  return fileModel.value != null ? "btn-outline-danger" : "btn-outline-secondary";
});

// Watch.
watch(() => fileModel.value, () => changedModel.value = true);

// Functions.
async function handleChanged(event: Event) {
  const files = (event.target as HTMLInputElement).files;
  if (files && files[0]) {
    const file = files[0];
    const [_, value] = await fileToBase64Strings(file);
    fileModel.value = value;
  } else {
    fileModel.value = null;
  }
}

async function handleDeleteButtonClick() {
  fileModel.value = null;
}
</script>

<template>
  <div class="input-group filter-shadow-sm">
    <input
      v-bind:name="name"
      v-bind:class="inputClass"
      v-on:change="handleChanged"
      ref="input"
      type="file"
      class="form-control"
      accept="image/png, image/jpeg, image/jpg"
    />

    <button
      v-bind:class="deleteButtonClass"
      v-bind:disabled="fileModel == null"
      v-on:click="handleDeleteButtonClick"
      class="btn"
      type="button"
    >
      <i class="bi bi-x-lg"></i>
    </button>
  </div>
</template>