<script setup lang="ts">
import { ref, computed, useTemplateRef, inject, toRef, onMounted, onUnmounted } from "vue";
import { type Ref } from "vue";
import { fileToBase64Strings } from "@/utils/photoUtils";
import { formStateKey, type FormState } from "./Form.vue";
import { fieldNameKey } from "./Field.vue";

// Dependencies.
const formState = inject<Ref<FormState>>(formStateKey);
const fieldName = inject<string>(fieldNameKey);

// Props and emits.
const props = withDefaults(defineProps<{
  name?: string;
  placeholderUrl?: string;
  url?: string | null;
  allowDelete?: boolean;
}>(), {
  url: null,
  allowDelete: true,
});

// States.
const model = defineModel<string | null>();
const source = toRef(props.url);
const inputElement = ref<HTMLInputElement>();
const placeholderImageSource = ref<string | null>(null);
const containerElement = useTemplateRef("container-element");
let observer: ResizeObserver | null = null;

// Computed properties.
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

// LifeCycle.
onMounted(() => {
  if (containerElement.value) {
    observer = new ResizeObserver(entries => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        placeholderImageSource.value = generatePlaceholderImage(width, height);
      }
    });

    observer.observe(containerElement.value);
  }
});

onUnmounted(() => {
  if (observer && containerElement.value) {
    observer.unobserve(containerElement.value);
    observer.disconnect();
  }
});

// Functions.
function generatePlaceholderImage(width: number, height: number): string {
  return `https://placehold.co/${Math.round(width)}x${Math.round(height)}`;
}

async function onInputElementValueChanged(event: Event) {
  const files = (event.target as HTMLInputElement).files;
  if (files && files[0]) {
    const file = files[0];
    let base64ForJson: string;
    [source.value, base64ForJson] = await fileToBase64Strings(file);
    model.value = base64ForJson;
  } else {
    source.value = null;
    model.value = null;
  }
}

function handleEditButtonClicked() {
  inputElement.value!.click();
}

function handleDeleteButtonClicked() {
  source.value = null;
  inputElement.value!.value = "";
}
</script>

<template>
  <div ref="container-element" class="thumbnail-container">
    <img
      v-bind:src="source ?? placeholderImageSource ?? generatePlaceholderImage(800, 600)"
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
  width: 100%;
  max-width: 400px;
  aspect-ratio: 800/600;
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
