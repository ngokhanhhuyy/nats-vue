<script lang="ts">
export type ButtonProps = {
  class?: string;
  text: string;
};

export type BaseModalProps = {
  isVisible: boolean;
  title: string;
  iconClass: string;
  content: string | string[];
  okButton?: ButtonProps;
  cancelButton?: ButtonProps;
};

export type BaseModalEmit = {
  (event: "okButtonClicked"): void;
  (event: "cancelButtonClicked"): void;
  (event: "hidden"): void;
};
</script>

<script setup lang="ts">
import { ref, computed, useTemplateRef, getCurrentInstance} from "vue";
import { onMounted, onUnmounted, watch } from "vue";
import { Modal } from "bootstrap";

// Props/Emits.
const props = defineProps<BaseModalProps>();
const emit = defineEmits<BaseModalEmit>();

// States.
const modalElement = useTemplateRef("modalElement");
const modal = ref<Modal | null>(null);
const uid = getCurrentInstance()?.uid ?? Math.random().toString(16).slice(2);

// Computed.
const contentSentences = computed<string[]>(() => {
  return Array.isArray(props.content) ? props.content : [props.content];
});

// LifeCycle.
onMounted(() => {
  if (modalElement.value) {
    modal.value = new Modal(modalElement.value);
  }
});

onUnmounted(() => {
  if (modal.value) {
    modal.value.dispose();
  }
});

// Watch.
watch(
  () => props.isVisible,
  (isVisible) => {
    if (isVisible) {
      modal.value?.show();
    } else {
      modal.value?.hide();
    }
  },
);

// Callbacks..
function handleOkButtonClicked(): void {
  emit("okButtonClicked");
  setTimeout(() => {
    emit("hidden");
  }, 150);
}

function handleCancelButtonClick(): void {
  emit("cancelButtonClicked");
  setTimeout(() => {
    emit("hidden");
  }, 150);
}
</script>

<template>
  <div
    ref="modalElement"
    v-bind:aria-hidden="isVisible"
    v-bind:id="`modal-${uid}`"
    class="modal fade text-center px-2"
    tabindex="-1"
    data-bs-backdrop="static"
    aria-labelledby="modal-label"
  >
    <div class="modal-dialog modal-dialog-centered mx-auto">
      <div class="modal-content">
        <!-- Header -->
        <div class="modal-header d-flex flex-row justify-content-between">
          <h1 class="modal-title fs-5" v-bind:id="`modal-label-${uid}`">
            {{ props.title }}
          </h1>

          <button
            v-if="props.cancelButton"
            v-on:click="handleCancelButtonClick"
            type="button"
            class="btn-close"
            aria-label="Close"
          ></button>
        </div>

        <!-- Body -->
        <div class="modal-body">
          <div class="row px-4">
            <div class="col col-auto pe-3 d-flex align-items-center">
              <i v-bind:class="iconClass"></i>
            </div>
            <div class="col d-flex flex-column justify-content-center align-items-start">
              <span
                v-for="(sentence, index) in contentSentences"
                v-bind:key="index"
                class="text-start"
              >
                {{ sentence }}
              </span>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="modal-footer">
          <!-- CancelButton -->
          <button
            v-if="cancelButton"
            v-bind:class="cancelButton?.class"
            v-on:click="handleCancelButtonClick"
            class="btn ms-2"
          >
            {{ cancelButton.text }}
          </button>

          <!-- OkButton -->
          <button
            v-if="okButton"
            v-bind:class="okButton?.class"
            v-on:click="handleOkButtonClicked"
            class="btn"
          >
            {{ okButton.text }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
