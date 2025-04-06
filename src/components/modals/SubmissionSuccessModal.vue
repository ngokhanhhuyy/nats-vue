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
    isVisible: store.submissionSuccessResolve != null,
    title: "Lưu dữ liệu thành công",
    iconClass: "bi bi-exclamation-circle-fill fs-1 text-success",
    content: "Dữ liệu đã được lưu thành công.",
    okButton: {
      class: "btn-success",
      text: "Đã hiểu"
    },
  };
});

// Callbacks.
function onHidden(): void {
  store.submissionSuccessResolve?.();
}
</script>

<template>
  <BaseModal v-bind="baseModalProps" v-on:hidden="onHidden" />
</template>