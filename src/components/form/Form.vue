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
import { AuthorizationError, DuplicatedError, NotFoundError } from "@/errors";
import { OperationError, ValidationError } from "@/errors";

// Props/Emits.
const props = defineProps<{
  model: TModel;
  id?: string;
  disabled?: boolean;
  submittingAction?: () => Promise<TSubmissionResult>;
  submissionSucceededModal?: boolean;
  deletingAction?: () => Promise<void>;
  deletionSucceededModal?: boolean;
  disableDirtyModelChecker?: boolean;
}>();

const emit = defineEmits<{
  (event: "submissionSuccess", submissionResult: TSubmissionResult): void;
  (event: "deletionSuccess"): void;
}>();

// States.
const formRequestingState = ref<"idle" | "submitting" | "deleting">("idle");
const submissionResult = ref<TSubmissionResult | null>(null);
const visibleModal = ref<ModalType | null>(null);
const modelErrorMessagesStore = useModelErrorMessagesStore();
const isModelDirty = useDirtyModelChecker(props.model);

// Computed.
const formState = computed<FormState>(() => {
  return {
    formId: props.id,
    formRequestingState: formRequestingState.value,
    delete: () => {
      if (!props.deletingAction) {
        return;
      }

      visibleModal.value = "deletionConfirmation";
    },
    modelErrorMessagesStore: modelErrorMessagesStore,
    isModelDirty: props.disableDirtyModelChecker ? null : isModelDirty.value,
  };
});

const submissionSuccessModalVisible = computed<boolean>({
  get(): boolean {
    return visibleModal.value === "submissionSuccess";
  },
  set(visible: boolean): void {
    if (visibleModal.value == null) {
      visibleModal.value = visible ? "submissionSuccess" : null;
    } else {
      visibleModal.value = null;
      setTimeout(() => {
        if (visible) {
          visibleModal.value = "submissionSuccess";
        }
      });
    }
  },
});

const submissionErrorModalVisible = computed<boolean>({
  get(): boolean {
    return visibleModal.value === "submissionError";
  },
  set(visible: boolean): void {
    if (visibleModal.value == null) {
      visibleModal.value = visible ? "submissionError" : null;
    } else {
      visibleModal.value = null;
      setTimeout(() => {
        if (visible) {
          visibleModal.value = "submissionError";
        }
      });
    }
  },
});

const deletionSuccessModalVisible = computed<boolean>({
  get(): boolean {
    return visibleModal.value === "deletionSuccess";
  },
  set(visible: boolean): void {
    if (visibleModal.value == null) {
      visibleModal.value = visible ? "deletionSuccess" : null;
    } else {
      visibleModal.value = null;
      setTimeout(() => {
        if (visible) {
          visibleModal.value = "deletionSuccess";
        }
      });
    }
  },
});

const deletionErrorModalVisible = computed<boolean>({
  get(): boolean {
    return visibleModal.value === "deletionError";
  },
  set(visible: boolean): void {
    if (visibleModal.value == null) {
      visibleModal.value = visible ? "deletionError" : null;
    } else {
      visibleModal.value = null;
      setTimeout(() => {
        if (visible) {
          visibleModal.value = "deletionError";
        }
      });
    }
  },
});

const notFoundErrorModalVisible = computed<boolean>({
  get(): boolean {
    return visibleModal.value === "notFoundError";
  },
  set(visible: boolean): void {
    if (visibleModal.value == null) {
      visibleModal.value = visible ? "notFoundError" : null;
    } else {
      visibleModal.value = null;
      setTimeout(() => {
        if (visible) {
          visibleModal.value = "notFoundError";
        }
      });
    }
  },
});

const authorizationErrorModalVisible = computed<boolean>({
  get(): boolean {
    return visibleModal.value === "authorizationError";
  },
  set(visible: boolean): void {
    if (visibleModal.value == null) {
      visibleModal.value = visible ? "authorizationError" : null;
    } else {
      visibleModal.value = null;
      setTimeout(() => {
        if (visible) {
          visibleModal.value = "authorizationError";
        }
      });
    }
  },
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
function handleSubmission(event: Event): void {
  event?.preventDefault();

  if (!props.submittingAction) {
    return;
  }

  formRequestingState.value = "submitting";

  props
    .submittingAction()
    .then((result) => {
      modelErrorMessagesStore.clearErrors();
      submissionResult.value = result;
      if (props.submissionSucceededModal ?? true) {
        visibleModal.value = "submissionSuccess";
      }
    })
    .catch((error) => {
      const isValidationError = error instanceof ValidationError;
      const isOperationError = error instanceof OperationError;
      const isDuplicatedError = error instanceof DuplicatedError;
      if (isValidationError || isOperationError || isDuplicatedError) {
        modelErrorMessagesStore.setErrors(error.errors);
        visibleModal.value = "submissionError";
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
    }).finally(() => (formRequestingState.value = "idle"));
}

function handleDeletion(): void {
  if (!props.deletingAction) {
    return;
  }

  formRequestingState.value = "deleting";

  props
    .deletingAction()
    .then(() => {
      modelErrorMessagesStore.clearErrors();
      visibleModal.value = "deletionSuccess";
    })
    .catch((error) => {
      if (error instanceof NotFoundError) {
        visibleModal.value = "notFoundError";
        return;
      }

      if (error instanceof OperationError) {
        modelErrorMessagesStore?.setErrors(error.errors);
        visibleModal.value = "submissionError";
        return;
      }

      if (error instanceof AuthorizationError) {
        visibleModal.value = "authorizationError";
        return;
      }

      throw error;
    })
    .finally(() => (formRequestingState.value = "idle"));
}

function handleFormKeyDown(event: KeyboardEvent): void {
  if (event.key === "Enter") {
    event.preventDefault();
  }
}

function handleSubmissionSuccessModalOkButtonClicked() {
  emit("submissionSuccess", submissionResult.value);
}

function handleDeletionSuccessModalOkButtonClicked(): void {
  emit("deletionSuccess");
}
</script>

<template>
  <form
    v-bind:class="computedClass"
    v-bind:id
    v-bind:tabindex="computedTabIndex"
    v-on:submit="handleSubmission"
    v-on:keydown="handleFormKeyDown"
  >
    <SubmissionSuccessModal
      v-model="submissionSuccessModalVisible"
      v-on:hidden="handleSubmissionSuccessModalOkButtonClicked"
    />

    <SubmissionErrorModal v-model="submissionErrorModalVisible" />

    <DeletionConfirmationModal
      v-model="deletionErrorModalVisible"
      v-on:ok-button-clicked="handleDeletion"
    />

    <DeletionSuccessModal
      v-model="deletionSuccessModalVisible"
      v-on:ok-button-clicked="handleDeletionSuccessModalOkButtonClicked"
    />

    <NotFoundErrorModal v-model="notFoundErrorModalVisible" />
    <AuthorizationErrorModal v-model="authorizationErrorModalVisible" />
    <slot></slot>
  </form>
</template>
