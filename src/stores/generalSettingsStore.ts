import { ref } from "vue";
import { defineStore } from "pinia";
import { getGeneralSettingsAsync } from "@/services/generalSettingsService";
import { createGeneralSettingsDetailModel } from "@/models/generalSettingsModels";

const generalSettings = await loadGeneralSettingsAsync();

export const useGeneralSettingsStore = defineStore("generalSettings", () => {
  const data = ref<GeneralSettingsDetailModel>(generalSettings);

  async function reloadAsync(): Promise<void> {
    data.value = await loadGeneralSettingsAsync();
  }

  return { data, reloadAsync };
});

async function loadGeneralSettingsAsync(): Promise<GeneralSettingsDetailModel> {
  const responseDto = await getGeneralSettingsAsync();
  return createGeneralSettingsDetailModel(responseDto);
}