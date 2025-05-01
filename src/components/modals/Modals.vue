<script setup lang="ts">
import NotFoundErrorModal from "../modals/NotFoundErrorModal.vue";
import SubmissionSuccessModal from "../modals/SubmissionSuccessModal.vue";
import SubmissionErrorModal from "../modals/SubmissionErrorModal.vue";
import DeletionSuccessModal from "../modals/DeletionSuccessModal.vue";
import DeletionConfirmationModal from "../modals/DeletionConfirmationModal.vue";
import AuthorizationErrorModal from "../modals/AuthorizationErrorModal.vue";
import FileTooLargeErrorModal from "./FileTooLargeErrorModal.vue";
import InvalidFileErrorModal from "./InvalidFileErrorModal.vue";
</script>

<template>
  <NotFoundErrorModal />
  <SubmissionSuccessModal />
  <SubmissionErrorModal />
  <DeletionConfirmationModal />
  <DeletionSuccessModal />
  <AuthorizationErrorModal />
  <FileTooLargeErrorModal />
  <InvalidFileErrorModal />
</template>