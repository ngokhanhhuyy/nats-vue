<script lang="ts">
import type { IModelErrorMessagesStore }
  from "@/composables/modelErrorMessagesStoreComposable";

type ModalType =
  | "authorizationError"
  | "submissionError"
  | "submissionSuccess"
  | "deletionError"
  | "deletionSuccess"
  | "deletionConfirmation"
  | "notFoundError";

type FormRequestingState = "idle" | "submitting" | "deleting";

export type FormState = {
  formId: string | undefined;
  formRequestingState: FormRequestingState;
  delete: () => void;
  modelErrorMessagesStore: IModelErrorMessagesStore;
  isModelDirty: boolean | null;
};

export const formStateKey = "formStateKey";
</script>

<script setup lang="ts" generic="TModel extends object, TSubmissionResult">
import { ref, computed, provide } from "vue";
import { useModelErrorMessagesStore } from "@/composables/modelErrorMessagesStoreComposable";
import { useDirtyModelChecker } from "@/composables/dirtyModelCheckerComposable";
import { useModalStore } from "@/stores/modalStore";
import { AuthorizationError, DuplicatedError, NotFoundError } from "@/errors";
import { OperationError, ValidationError } from "@/errors";

// Dependencies.
const modalStore = useModalStore();

// Props/Emits.
const props = withDefaults(defineProps<{
  model: TModel;
  id?: string;
  disabled?: boolean;
  submittingAction?: () => Promise<TSubmissionResult>;
  submissionSucceededModal?: boolean;
  deletingAction?: () => Promise<void>;
  deletionSucceededModal?: boolean;
  disableDirtyModelChecker?: boolean;
}>(), {
  submissionSucceededModal: true,
  deletionSucceededModal: true
});

const emit = defineEmits<{
  (event: "submissionSuccess", submissionResult: TSubmissionResult): void;
  (event: "deletionSuccess"): void;
}>();

// States.
const formRequestingState = ref<"idle" | "submitting" | "deleting">("idle");
const visibleModal = ref<ModalType | null>(null);
const modelErrorMessagesStore = useModelErrorMessagesStore();
const isModelDirty = useDirtyModelChecker(props.model);

// Computed.
const formState = computed<FormState>(() => {
  return {
    formId: props.id,
    formRequestingState: formRequestingState.value,
    delete: deleteAsync,
    modelErrorMessagesStore: modelErrorMessagesStore,
    isModelDirty: props.disableDirtyModelChecker ? null : isModelDirty.value,
  };
});

const computedClass = computed<string | undefined>(() => {
  if (formRequestingState.value != "idle" || props.disabled) {
    return "pe-none opacity-50";
  }

  return undefined;
});

const computedTabIndex = computed<number | undefined>(() => {
  return formRequestingState.value != "idle" ? -1 : undefined;
});

// Provide.
provide(formStateKey, formState);

// Callbacks.
async function submitAsync(event: Event): Promise<void> {
  event?.preventDefault();

  if (!props.submittingAction) {
    return;
  }

  formRequestingState.value = "submitting";

  try {
    const submissionResult = await props.submittingAction();
    modelErrorMessagesStore.clearErrorMessages();
    if (props.submissionSucceededModal ?? true) {
      await modalStore.getSubmissionSuccessConfirmationAsync();
    }
    
    emit("submissionSuccess", submissionResult);
  } catch (error) {
    const isValidationError = error instanceof ValidationError;
    const isOperationError = error instanceof OperationError;
    const isDuplicatedError = error instanceof DuplicatedError;
    if (isValidationError || isOperationError || isDuplicatedError) {
      modelErrorMessagesStore.setErrorMessages(error.errorMessages);
      modalStore.getSubmissionErrorConfirmationAsync();
      return;
    }

    if (error instanceof NotFoundError) {
      visibleModal.value = "notFoundError";
      return;
    }

    if (error instanceof AuthorizationError) {
      visibleModal.value = "authorizationError";
      return;
    }

    throw error;
  } finally {
    formRequestingState.value = "idle";
  }
}

async function deleteAsync(): Promise<void> {
  if (!props.deletingAction) {
    return;
  }

  const confirmation = await modalStore.getDeletionConfirmationAsync();
  if (!confirmation) {
    return;
  }

  formRequestingState.value = "deleting";

  try {
    await props.deletingAction();
    modelErrorMessagesStore.clearErrorMessages();
    await modalStore.getDeletionSuccessConfirmationAsync();
    emit("deletionSuccess");
  } catch (error) {
    if (error instanceof NotFoundError) {
      visibleModal.value = "notFoundError";
      return;
    }

    if (error instanceof OperationError) {
      modelErrorMessagesStore.setErrorMessages(error.errorMessages);
      visibleModal.value = "submissionError";
      return;
    }

    if (error instanceof AuthorizationError) {
      visibleModal.value = "authorizationError";
      return;
    }

    throw error;
  } finally {
    formRequestingState.value = "idle";
  }
}

function handleFormKeyDown(event: KeyboardEvent): void {
  if (event.key === "Enter") {
    event.preventDefault();
  }
}
</script>

<template>
  <form
    v-bind:class="computedClass"
    v-bind:id
    v-bind:tabindex="computedTabIndex"
    v-on:submit="submitAsync"
    v-on:keydown="handleFormKeyDown"
  >
    <slot></slot>
  </form>
</template>
