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
    isVisible: store.deletionConfirmationResolve != null,
    title: "Xác nhận xoá bỏ",
    iconClass: "bi bi-exclamation-triangle-fill fs-1 text-warning",
    content: [
      "Dữ liệu sau khi xoá có thể sẽ không thể khôi phục lại được.",
      "Bạn có chắc chắn muốn xoá bỏ?",
    ],
    cancelButton: {
      class: "btn-secondary",
      text: "Huỷ bỏ",
    },
    okButton: {
      class: "btn-outline-danger",
      text: "Chắc chắn",
    },
  };
});

const baseModalEmitHandlers = {
  okButtonClicked: () => store.deletionConfirmationResolve?.(true),
  cancelButtonClicked: () => store.deletionConfirmationResolve?.(false)
};
</script>

<template>
  <BaseModal v-bind="baseModalProps" v-on="baseModalEmitHandlers" />
</template>
