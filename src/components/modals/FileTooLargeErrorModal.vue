<script setup lang="ts">
import { computed } from "vue";
import { useModalStore } from "@/stores/modalStore";

// Base modal component.
import BaseModal, { type BaseModalProps } from "./BaseModal.vue";

// Dependencies.
const store = useModalStore();

// Computed.
const attemptedFileSizeInMB = computed<number | null>(() => {
  if (store.fileTooLargeSize == null) {
    return null;
  }

  const sizeInMB = store.fileTooLargeSize / Math.pow(1024, 2);
  return Math.round(sizeInMB * 10) / 10;
});

const baseModalProps = computed<BaseModalProps>(() => {
  return {
    isVisible: store.fileTooLargeErrorResolve != null,
    title: "File vượt quá giới hạn",
    iconClass: "bi bi-x-octagon-fill fs-1 text-danger",
    content: [
      `File tải lên của bạn quá lớn (${attemptedFileSizeInMB.value}MB).`,
      "Hãy đảm bảo rằng file tải lên có kích thước tối đa 3MB."
    ],
    okButton: {
      class: "btn-secondary",
      text: "Đã hiểu"
    },
  };
});

// Callbacks.
function onHidden(): void {
  store.fileTooLargeErrorResolve?.();
}
</script>

<template>
  <BaseModal v-bind="baseModalProps" v-on:hidden="onHidden" />
</template>