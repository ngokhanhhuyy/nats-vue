import { ref } from "vue";
import { defineStore } from "pinia";

export type Mode =
    | "discardingConfirmation"
    | "deletingConfirmation"
    | "notFoundNotification"
    | "forbiddenNotification"
    | "connectionErrorNotification"
    | "submissionErrorNotification"
    | "submissionSuccessNotification"
    | "dataUnchangedSubmissionNotification"
    | "unauthorizationConfirmation"
    | "fileTooLargeConfirmation"
    | "undefinedErrorNotification";

export type ModalStore = {
  fileTooLargeSize: number | null;
  notFoundErrorResolve: ((value: PromiseLike<void> | void) => void) | null;
  discardingConfirmationResolve: ((value: PromiseLike<boolean> | boolean) => void) | null;
  submissionErrorResolve: ((value: PromiseLike<void> | void) => void) | null;
  submissionSuccessResolve: ((value: PromiseLike<void> | void) => void) | null;
  deletionConfirmationResolve: ((value: PromiseLike<boolean> | boolean) => void) | null;
  deletionErrorResolve: ((value: PromiseLike<void> | void) => void) | null;
  deletionSuccessResolve: ((value: PromiseLike<void> | void) => void) | null;
  dataUnchangedSubmissionResolve: ((value: PromiseLike<void> | void) => void) | null;
  authorizationErrorResolve: ((value: PromiseLike<void> | void) => void) | null;
  fileTooLargeErrorResolve: ((value: PromiseLike<void> | void) => void) | null;
  invalidFileErrorResolve: ((value: PromiseLike<void> | void) => void) | null;
  undefinedErrorResolve: ((value: PromiseLike<void> | void) => void) | null;
  reset(): void;
  getNotFoundErrorConfirmationAsync(): Promise<void>;
  getDiscardingConfirmationAsync(): Promise<boolean>;
  getSubmissionSuccessConfirmationAsync(): Promise<void>;
  getSubmissionErrorConfirmationAsync(): Promise<void>;
  getDeletionConfirmationAsync(): Promise<boolean>;
  getDeletionSuccessConfirmationAsync(): Promise<void>;
  getDeletionErrorConfirmationAsync(): Promise<void>;
  getDataUnchangedSubmissionConfirmationAsync(): Promise<void>;
  getAuthorizationErrorConfirmationAsync(): Promise<void>;
  getFileTooLargeConfirmationAsync(attemptedFileSize: number): Promise<void>;
  getInvalidFileErrorConfirmationAsync(): Promise<void>;
  getUndefinedErrorConfirmationAsync(): Promise<void>;
};

export const useModalStore: () => ModalStore = defineStore("modal", () => {
  // States.
  const fileTooLargeSize = ref<number | null>(null);
  const notFoundErrorResolve = ref<((value: PromiseLike<void> | void) => void) | null>(null);
  const discardingConfirmationResolve = ref<((value: PromiseLike<boolean> | boolean) => void) | null>(null);
  const submissionErrorResolve = ref<((value: PromiseLike<void> | void) => void) | null>(null);
  const submissionSuccessResolve = ref<((value: PromiseLike<void> | void) => void) | null>(null);
  const deletionConfirmationResolve = ref<((value: PromiseLike<boolean> | boolean) => void) | null>(null);
  const deletionErrorResolve = ref<((value: PromiseLike<void> | void) => void) | null>(null);
  const deletionSuccessResolve = ref<((value: PromiseLike<void> | void) => void) | null>(null);
  const dataUnchangedSubmissionResolve = ref<((value: PromiseLike<void> | void) => void) | null>(null);
  const authorizationErrorResolve = ref<((value: PromiseLike<void> | void) => void) | null>(null);
  const fileTooLargeErrorResolve = ref<((value: PromiseLike<void> | void) => void) | null>(null);
  const invalidFileErrorResolve = ref<((value: PromiseLike<void> | void) => void) | null>(null);
  const undefinedErrorResolve = ref<((value: PromiseLike<void> | void) => void) | null>(null);

  // Actions.
  function reset(): void {
    fileTooLargeSize.value = null;
    notFoundErrorResolve.value = null;
    discardingConfirmationResolve.value = null;
    submissionErrorResolve.value = null;
    submissionSuccessResolve.value = null;
    deletionConfirmationResolve.value = null;
    deletionErrorResolve.value = null;
    deletionSuccessResolve.value = null;
    dataUnchangedSubmissionResolve.value = null;
    authorizationErrorResolve.value = null;
    fileTooLargeErrorResolve.value = null;
    invalidFileErrorResolve.value = null;
    undefinedErrorResolve.value = null;
  }

  async function getNotFoundErrorConfirmationAsync(): Promise<void> {
    return new Promise<void>(resolve => {
      notFoundErrorResolve.value = () => {
        resolve();
        reset();
      };
    });
  }

  async function getDiscardingConfirmationAsync(): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      discardingConfirmationResolve.value = (value: boolean | PromiseLike<boolean>) => {
        resolve(value);
        reset();
      };
    });
  }

  async function getSubmissionErrorConfirmationAsync(): Promise<void> {
    return new Promise<void>(resolve => {
      submissionErrorResolve.value = () => {
        resolve();
        reset();
      };
    });
  }

  async function getSubmissionSuccessConfirmationAsync(): Promise<void> {
    return new Promise<void>(resolve => {
      submissionSuccessResolve.value = () => {
        resolve();
        reset();
      };
    });
  }

  async function getDeletionConfirmationAsync(): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      deletionConfirmationResolve.value = (value: boolean | PromiseLike<boolean>) => {
        resolve(value);
        reset();
      };
    });
  }

  async function getDeletionErrorConfirmationAsync(): Promise<void> {
    return new Promise<void>(resolve => {
      deletionErrorResolve.value = (value: void | PromiseLike<void>) => {
        resolve(value);
        reset();
      };
    });
  }

  async function getDeletionSuccessConfirmationAsync(): Promise<void> {
    return new Promise<void>(resolve => {
      deletionSuccessResolve.value = (value: void | PromiseLike<void>) => {
        resolve(value);
        reset();
      };
    });
  }

  async function getDataUnchangedSubmissionConfirmationAsync(): Promise<void> {
    return new Promise<void>(resolve => {
      dataUnchangedSubmissionResolve.value = (value: void | PromiseLike<void>) => {
        resolve(value);
        reset();
      };
    });
  }

  async function getAuthorizationErrorConfirmationAsync(): Promise<void> {
    return new Promise<void>(resolve => {
      authorizationErrorResolve.value = (value: void | PromiseLike<void>) => {
        resolve(value);
        reset();
      };
    });
  }

  async function getFileTooLargeConfirmationAsync(attemptedFileSize: number): Promise<void> {
    fileTooLargeSize.value = attemptedFileSize;
    return new Promise<void>(resolve => {
      fileTooLargeErrorResolve.value = (value: void | PromiseLike<void>) => {
        resolve(value);
        reset();
      };
    });
  }

  async function getInvalidFileErrorConfirmationAsync(): Promise<void> {
    return new Promise<void>(resolve => {
      invalidFileErrorResolve.value = (value: void | PromiseLike<void>) => {
        resolve(value);
        reset();
      };
    });
  }

  async function getUndefinedErrorConfirmationAsync(): Promise<void> {
    return new Promise<void>(resolve => {
      undefinedErrorResolve.value = (value: void | PromiseLike<void>) => {
        resolve(value);
        reset();
      };
    });
  }
  
  return {
    fileTooLargeSize,
    notFoundErrorResolve,
    discardingConfirmationResolve,
    submissionErrorResolve,
    submissionSuccessResolve,
    deletionConfirmationResolve,
    deletionErrorResolve,
    deletionSuccessResolve,
    dataUnchangedSubmissionResolve,
    authorizationErrorResolve,
    fileTooLargeErrorResolve,
    invalidFileErrorResolve,
    undefinedErrorResolve,
    reset,
    getNotFoundErrorConfirmationAsync,
    getDiscardingConfirmationAsync,
    getSubmissionErrorConfirmationAsync,
    getSubmissionSuccessConfirmationAsync,
    getDeletionConfirmationAsync,
    getDeletionErrorConfirmationAsync,
    getDeletionSuccessConfirmationAsync,
    getDataUnchangedSubmissionConfirmationAsync,
    getAuthorizationErrorConfirmationAsync,
    getFileTooLargeConfirmationAsync,
    getInvalidFileErrorConfirmationAsync,
    getUndefinedErrorConfirmationAsync
  };
});