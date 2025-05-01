<script setup lang="ts">
import { computed } from "vue";
import { useModalStore } from "@/stores/modalStore";

// Base modal component.
import BaseModal, { type BaseModalProps } from "./BaseModal.vue";

// Dependencies.
const store = useModalStore();

// Computed.
const baseModalProps = computed<BaseModalProps>(() => {
  return {
    isVisible: store.getInvalidFileErrorConfirmationAsync != null,
    title: "File không hợp lệ",
    iconClass: "bi bi-x-octagon-fill fs-1 text-danger",
    content: [
      "File bạn tải lên có định dạng không hợp lệ.",
      "Bạn chỉ có thể tải lên file có định dạng sau: JPEG/JPG, PNG."
    ],
    okButton: {
      class: "btn-secondary",
      text: "Đã hiểu"
    },
  };
});

// Callbacks.
function onHidden(): void {
  store.invalidFileErrorResolve?.();
}
</script>

<template>
  <BaseModal v-bind="baseModalProps" v-on:hidden="onHidden" />
</template>