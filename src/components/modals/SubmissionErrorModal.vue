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
    isVisible: store.submissionErrorResolve != null,
    title: "Dữ liệu không hợp lệ",
    iconClass: "bi bi-x-octagon-fill fs-1 text-danger",
    content: ["Dữ liệu đã nhập không hợp lệ.", "Vui lòng kiểm tra lại."],
    okButton: {
      class: "btn-secondary",
      text: "Đã hiểu"
    },
  };
});

// Callbacks.
function onHidden(): void {
  store.submissionErrorResolve?.();
}
</script>

<template>
  <BaseModal v-bind="baseModalProps" v-on:hidden="onHidden" />
</template>