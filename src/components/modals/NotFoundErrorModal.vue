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
    isVisible: store.notFoundErrorResolve != null,
    title: "Không tìm thấy dữ liệu",
    iconClass: "bi bi-x-octagon-fill fs-1 text-danger",
    content: ["Dữ liệu bạn yêu cầu đã bị xoá hoặc không tồn tại.", "Vui lòng kiểm tra lại."],
    okButton: {
      class: "btn-secondary",
      text: "Quay lại trang chủ"
    },
  };
});

// Callbacks.
function onHidden(): void {
  store.notFoundErrorResolve?.();
}
</script>

<template>
  <BaseModal v-bind="baseModalProps" v-on:hidden="onHidden" />
</template>