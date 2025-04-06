import { computed, type ComputedRef } from "vue";

// Utility for model serialization.
const serializeModel = <TModel extends object, TKey extends keyof TModel>
        (model: TModel, excludedKeys?: TKey[]): string => {
    if (excludedKeys && excludedKeys.length) {
        return JSON.stringify(model, (key, value) => {
            if (!excludedKeys.includes(key as TKey)) {
                return value;
            }
        });
    }

    return JSON.stringify(model);
};

export function useDirtyModelChecker<TModel extends object, TKey extends keyof TModel>(
        model: TModel,
        excludedKeys?: TKey[]): ComputedRef<boolean> {
    // States.
    const originalModelJson = serializeModel(model);

    // Computed.
    const isModelDirty = computed(() => {
        const currentModelJson = model ? serializeModel(model, excludedKeys)
            : "";
        return originalModelJson !== currentModelJson;
    });

    return isModelDirty;
}