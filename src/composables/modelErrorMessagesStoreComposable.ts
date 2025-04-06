import { ref, shallowRef } from "vue";
import type { ApiErrorMessages } from "@/errors";

/**
 * Inspired by ModelStateDictionary class and ModelState property in ASP.NET Core MVC, this
 * interface/class is to store and display error messages for each property in a model.
 */
export interface IModelErrorMessagesStore {
  /**
   * Get the object containing the properties of the model those have errors and their
   * errors.
   */
  readonly errors: ApiErrorMessages;

  /**
   * Get the valid state of the model state, the result will be always true if the model
   * hasn't been validated yet. Otherwise, if the model has any error, the result will be
   * false.
   */
  readonly isValid: boolean;

  /**
   * Check if the model has been validated. The result will be true after the model state has
   * been set some errors and before being reset errors.
   */
  readonly isValidated: boolean;

  /**
   * Check if the model has been validated and the property has any error.
   *
   * @param propertyPath The path of the property in the model.
   * @returns If the model hasn't been validated, the result will be always false.
   * Otherwise, the result will be true if the property has any error.
   */
  readonly hasError: (propertyPath: string) => boolean;

  /**
   *
   * @param propertyPath The path of the property in the model.
   * @returns If the property has any errors, the result will be the first error message.
   */
  readonly getError: (propertyPath: string) => string | null;

  /**
   * Get the text for the message element of a property with given path.
   *
   * @param propertyPath
   * @returns The text will be "Hợp lệ" if the property doesn't have any error.
   * Otherwise, the text will be the first error message of the property.
   */
  readonly getMessage: (propertyPath: string) => string;

  /**
   * Set new errors and set the validation state into validated state.
   * @param errorMessages An object contaning errors for properties.
   */
  readonly setErrorMessages: (errorMessages: ApiErrorMessages) => void;

  /**
   * Clear the current errors.
   */
  readonly clearErrorMessages: () => void;

  /**
   * Clear the current errors and set validation state to initial state.
   */
  readonly resetErrorMessages: () => void;

  /**
   * Get all error messages of all properties.
   * @returns An array containing all error messages, regardless property name.
   */
  readonly getAllErrorMessages: () => string[];

  /**
   * Check if the model state has been validated and contains any error.
   * @returns True if there is any error, otherwise, false.
   */
  readonly hasAnyError: () => boolean;

  /**
   * Get Bootstrap class name for the input element based on the validation state of the
   * property with given path.
   *
   * @param propertyPath The path of the property in the model.
   * @returns Bootstrap class-name for the input element.
   */
  readonly getInputClass: (propertyPath: string) => string | null;

  /**
   * Get Bootstrap class name for message element based on the
   * validation state of the property with given path.
   *
   * @param propertyPath The path of the property in the model.
   * @returns Bootstrap class-name for the message element.
   */
  readonly getMessageClass: (propertyPath: string) => string | null;
}

export function useModelErrorMessagesStore(): IModelErrorMessagesStore {
  const modelErrors = shallowRef<ApiErrorMessages>({});
  const isValidated = ref<boolean>(false);

  return {
    get errors(): ApiErrorMessages {
      return modelErrors.value;
    },

    get isValid(): boolean {
      return modelErrors.value == null || Object.keys(modelErrors.value).length === 0;
    },

    get isValidated(): boolean {
      return isValidated.value;
    },

    hasError(propertyPath: string): boolean {
      if (!isValidated.value) {
        return false;
      }

      try {
        return modelErrors.value[propertyPath as keyof typeof modelErrors.value][0] != null;
      } catch {
        return false;
      }
    },

    getError(propertyPath: string): string | null {
      if (!isValidated.value) {
        return null;
      }

      try {
        return modelErrors.value[propertyPath][0] || null;
      } catch {
        return null;
      }
    },

    clearErrorMessages(): void {
      modelErrors.value = {};
      isValidated.value = false;
    },

    resetErrorMessages(): void {
      this.clearErrorMessages();
      isValidated.value = false;
    },

    getMessage(propertyPath: string): string {
      return this.getError(propertyPath) || "Hợp lệ.";
    },

    setErrorMessages(errors: ApiErrorMessages): void {
      modelErrors.value = errors;
      isValidated.value = true;
    },

    getAllErrorMessages(): string[] {
      const messages: string[] = [];

      if (!modelErrors.value) {
        return messages;
      }

      for (const propertyErrors of Object.values(modelErrors)) {
        for (const message of propertyErrors) {
          messages.push(message);
        }
      }

      return messages;
    },

    hasAnyError(): boolean {
      return modelErrors.value != null && Object.keys(modelErrors).length > 0;
    },

    getInputClass(propertyPath: string): string | null {
      if (isValidated.value) {
        return this.hasError(propertyPath) ? "is-invalid" : "is-valid";
      }
      return null;
    },

    getMessageClass(propertyPath: string): string | null {
      if (isValidated.value) {
        return this.hasError(propertyPath) ? "text-danger" : "text-success";
      }
      return null;
    },
  };
}
