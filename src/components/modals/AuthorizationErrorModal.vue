<script setup lang="ts" generic>
import { computed } from "vue";
import { useModalStore } from "@/stores/modalStore";

// Base modal component.
import BaseModal, { type BaseModalProps } from "./BaseModal.vue";

// Dependencies.
const store = useModalStore();

// Computed.
const baseModalProps = computed<BaseModalProps>(() => {
  return {
    isVisible: store.authorizationErrorResolve != null,
    title: "Không đủ quyền truy cập",
    iconClass: "bi bi-x-octagon-fill fs-1 text-danger",
    content: "Bạn không đủ quyền hạn để truy cập trang này.",
    okButton: {
      class: "btn-secondary",
      text: "Quay lại trang chủ"
    },
  };
});

// Callbacks.
function onHidden(): void {
  store.authorizationErrorResolve?.();
}
</script>

<template>
  <BaseModal v-bind="baseModalProps" v-on:hidden="onHidden" />
</template>