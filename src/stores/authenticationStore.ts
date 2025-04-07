import { ref } from "vue";
import { defineStore } from "pinia";
import { checkAuthenticationStatusAsync } from "@/services/authenticationService";

const isInitialAuthenticated = await checkAuthenticationStatusAsync();

export const useAuthenticationStore = defineStore("authentication", () => {
  const isAuthenticated = ref(isInitialAuthenticated);
  
  async function reloadAsync() {
    isAuthenticated.value = await checkAuthenticationStatusAsync();
  }

  return { isAuthenticated, reloadAsync };
});