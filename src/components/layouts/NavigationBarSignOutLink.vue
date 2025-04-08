<script setup lang="ts">
import { useRouter } from "vue-router";
import { signOutAsync } from "@/services/authenticationService";
import { useAuthenticationStore } from "@/stores/authenticationStore";
import { getSignInRoutePath } from "@/utils/routeUtils";

// Dependencies.
const router = useRouter();
const authenticationStore = useAuthenticationStore();

// Functions.
async function handleClick(): Promise<void> {
  await signOutAsync();
  await authenticationStore.reloadAsync();
  await router.push(getSignInRoutePath());
}
</script>

<template>
  <a v-on:click.prevent="handleClick" href="#" class="nav-link">
    Đăng xuất
  </a>
</template>