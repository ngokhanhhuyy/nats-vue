import { ref } from "vue";
import { defineStore } from "pinia";
import { getContactListAsync } from "@/services/contactService";
import { createContactDetailModel } from "@/models/contactModels";

const initialLoadedData = await loadAsync();

export const useContactStore = defineStore("contact", () => {
  const data = ref(initialLoadedData);
  
  async function reloadAsync(): Promise<void> {
    data.value = await loadAsync();
  }

  return {
    data,
    reloadAsync
  };
});

async function loadAsync() {
  const responseDtos = await getContactListAsync();
  return responseDtos.map(dto => createContactDetailModel(dto));
}