<script setup lang="ts">
import { ref, computed, useTemplateRef, inject } from "vue";
import { type Ref } from "vue";
import { fileToBase64Strings } from "@/utils/photoUtils";
import { formStateKey, type FormState } from "./Form.vue";
import { fieldNameKey } from "./Field.vue";

// Dependencies.
const formState = inject<Ref<FormState>>(formStateKey);
const fieldName = inject<string>(fieldNameKey);

// Props.
const props = withDefaults(defineProps<{
  name?: string;
  placeholderUrl?: string;
  url?: string | null;
  allowDelete?: boolean;
  aspectRatio?: number;
  width?: string;
  maxWidth?: string;
}>(), {
  url: null,
  allowDelete: true,
  width: "100%",
  maxWidth: "400px"
});

// States.
const fileModel = defineModel<string | null>("file", { required: true });
const changedModel = defineModel<boolean>("changed", { required: true });
const base64ForHTMLImageElement = ref<string | null>(null);
const inputElement = useTemplateRef<HTMLInputElement>("input");
const placeholderImageSource = ref<string | null>(null);
const fallbackPlaceholderImageSource = "/images/front-pages/default.jpg";

// Computed properties.
const source = computed<string>(() => {
  if (!changedModel.value) {
    return props.url ?? placeholderImageSource.value ?? fallbackPlaceholderImageSource;
  }

  return base64ForHTMLImageElement.value
    ?? placeholderImageSource.value
    ?? fallbackPlaceholderImageSource;
});

const deleteButtonVisible = computed<boolean>(() => {
  return props.allowDelete && source.value != null;
});

const thumbnailPreviewClass = computed<string | undefined>(() => {
  if (!formState?.value) {
    return undefined;
  }

  if (!props.name || fieldName) {
    return undefined;
  }

  const names: string[] = [];
  if (formState.value.modelErrorMessagesStore.isValidated) {
    if (formState.value.modelErrorMessagesStore.hasError(props.name ?? fieldName)) {
      names.push("bg-danger bg-opacity-10 border-danger");
    }

    names.push("bg-success bg-opacity-10 border-success");
  }

  return names.join(" ");
});

// Functions.
async function onInputElementValueChanged(event: Event) {
  changedModel.value = true;
  const files = (event.target as HTMLInputElement).files;
  if (files && files[0]) {
    const file = files[0];
    let base64ForJson: string;
    [base64ForHTMLImageElement.value, base64ForJson] = await fileToBase64Strings(file);
    fileModel.value = base64ForJson;
  } else {
    base64ForHTMLImageElement.value = null;
    fileModel.value = null;
  }
}

function handleEditButtonClicked() {
  inputElement.value!.click();
}

function handleDeleteButtonClicked() {
  changedModel.value = true;
  if (fileModel.value) {
    base64ForHTMLImageElement.value = null;
    inputElement.value!.value = "";
  } else {
    fileModel.value = null;
  }
}
</script>

<template>
  <div ref="container-element" class="thumbnail-container">
    <img
      v-bind:src="source"
      v-bind:class="thumbnailPreviewClass"
      class="img-thumbnail"
    />

    <input
      v-bind:name="name"
      v-on:change="onInputElementValueChanged"
      ref="input"
      type="file"
      class="d-none"
      accept="image/png, image/jpeg, image/jpg"
    />

    <button
      v-on:click="handleEditButtonClicked"
      class="btn btn-outline-primary btn-sm edit-button"
      type="button"
    >
      <i class="bi bi-pencil-square"></i>
    </button>
    <button
      v-if="allowDelete"
      v-show="deleteButtonVisible"
      v-on:click="handleDeleteButtonClicked"
      class="btn btn-outline-danger btn-sm delete-button"
      type="button"
    >
      <i class="bi bi-pencil-square"></i>
    </button>
  </div>
</template>

<style scoped>
.thumbnail-container {
  position: relative;
  overflow: visible;
  width: v-bind(width);
  max-width: v-bind(maxWidth);
  aspect-ratio: v-bind(aspectRatio);
}

button {
  position: absolute;
}

button.edit-button {
  top: 0;
  right: 0;
  transform: translate(30%, -30%);
}

button.delete-button {
  bottom: 0;
  right: 0;
  transform: translate(30%, 30%);
}

img.img-thumbnail {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 50%;
  overflow: hidden;
}
</style>
