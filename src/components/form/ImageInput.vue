<script setup lang="ts">
import { ref, computed, inject, toRef, type Ref } from "vue";
import { getPhotoUrl, fileToBase64Strings } from "@/utils/photoUtils";
import { formStateKey, type FormState } from "./Form.vue";
import { fieldNameKey } from "./Field.vue";

// Props and emits.
const props = withDefaults(defineProps<{
  name?: string;
  defaultSrc: string;
  url?: string | null;
  allowDelete?: boolean;
}>(), {
  url: null,
  allowDelete: true,
});
const emit = defineEmits<{ (event: "change", file: string | null): void; }>();

// Dependencies.
const formState = inject<Ref<FormState>>(formStateKey);
const fieldName = inject<string>(fieldNameKey);

// Internal states.
const source = toRef(props.url);
const inputElement = ref<HTMLInputElement>();
const defaultSource = getPhotoUrl(props.defaultSrc);
const fileAsBase64 = ref<string | null>(null);

// Computed properties.
const deleteButtonVisible = computed<boolean>(() => {
  return props.allowDelete && fileAsBase64.value != null;
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
  const files = (event.target as HTMLInputElement).files;
  if (files && files[0]) {
    const file = files[0];
    let base64ForJson: string;
    [source.value, base64ForJson] = await fileToBase64Strings(file);
    emit("change", base64ForJson);
    fileAsBase64.value = source.value;
  } else {
    source.value = null;
    fileAsBase64.value = null;
    emit("change", null);
  }
}

function handleEditButtonClicked() {
  inputElement.value!.click();
}

function handleDeleteButtonClicked() {
  source.value = null;
  fileAsBase64.value = null;
  inputElement.value!.value = "";
}
</script>

<template>
  <div class="thumbnail-container">
    <img
      v-bind:src="source ?? defaultSource"
      v-bind:class="thumbnailPreviewClass"
      class="img-thumbnail"
    />

    <input
      v-bind:name="name"
      v-on:change="onInputElementValueChanged"
      type="file"
      class="d-none"
      accept="image/png, image/jpeg, image/jpg"
      ref="inputElement"
    />

    <button
      v-on:click="handleEditButtonClicked"
      class="btn btn-outline-primary btn-sm edit-button"
    >
      <i class="bi bi-pencil-square"></i>
    </button>
    <button
      v-if="allowDelete"
      v-show="deleteButtonVisible"
      v-on:click="handleDeleteButtonClicked"
      class="btn btn-outline-danger btn-sm delete-button"
    >
      <i class="bi bi-pencil-square"></i>
    </button>
  </div>
</template>

<style scoped>
.thumbnail-container {
  position: relative;
  overflow: visible;
  width: 150px;
  height: 150px;
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
  height: auto;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: 50% 50%;
  overflow: hidden;
}
</style>
