<script setup lang="ts">
import { computed, inject, type Ref } from "vue";
import { type FormState, formStateKey } from "./Form.vue";
import { fieldNameKey } from "./Field.vue";
import { QuillEditor } from "@vueup/vue-quill";
import DOMPurify from "dompurify";

// Dependencies.
const formState = inject<Ref<FormState>>(formStateKey);
const fieldName = inject<string>(fieldNameKey);

// Props.
const props = defineProps<{ name?: string }>();

// State.
const model = defineModel<string>({ default: "" });
const toolbarOptions = [
  "bold",
  "italic",
  "underline",
  { list: "ordered" },
  { list: "bullet" },
  { list: "check" },
  { align: [] },
  "link",
  "image"
];

// Computed.
const computedModel = computed<string>({
  get(): string {
    return model.value;
  },
  set(value: string): void {
    model.value = DOMPurify.sanitize(value);
  }
});

const computedClass = computed<string | undefined>(() => {
  if ((props.name ?? fieldName) && !isLoading.value) {
    return (
      formState?.value.modelErrorMessagesStore.getInputClass((props.name || fieldName)!) ??
      undefined
    );
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
  <div v-bind:class="computedClass" class="editor-container">
    <QuillEditor
      v-model:content="computedModel"
      v-bind:toolbar="toolbarOptions"
      content-type="html"
      theme="snow"
    />
  </div>
</template>

<style>
.editor-container {
  filter: var(--filter-shadow-sm);
}

.ql-toolbar {
  background: white;
  border-bottom: none !important;
  border-top-left-radius: var(--bs-border-radius);
  border-top-right-radius: var(--bs-border-radius);
}

.ql-container {
  border: none !important;
  overflow: visible;
}

.ql-editor {
  background: white;
  font-size: var(--bs-body-font-size) !important;
  min-height: 600px;
  border: 1px solid var(--bs-border-color);
  border-bottom-left-radius: var(--bs-border-radius);
  border-bottom-right-radius: var(--bs-border-radius);
  transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
}

.ql-editor:focus {
  border-color: var(--bs-primary);
  box-shadow: 0 0 0 var(--bs-focus-ring-width) var(--bs-focus-ring-color) !important;
}

.editor-container:is(.is-valid) .ql-editor {
  --bs-focus-ring-color: rgba(var(--bs-success-rgb), var(--bs-focus-ring-opacity)) !important;
  color: var(--bs-success-text-emphasis) !important;
  background-color: rgba(var(--bs-success-rgb), 0.1) !important;
  border-width: 1px;
  border-color: var(--bs-success);
}

.editor-container:is(.is-invalid) .ql-editor {
  --bs-focus-ring-color: rgba(var(--bs-danger-rgb), var(--bs-focus-ring-opacity)) !important;
  color: var(--bs-danger-text-emphasis) !important;
  background-color: rgba(var(--bs-danger-rgb), 0.1) !important;
  border-width: 1px;
  border-color: var(--bs-danger);
}

.ql-editor p {
  margin-top: 0;
  margin-bottom: 1rem;
}

.ql-hidden {
  display: none;
}
</style>
