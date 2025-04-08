<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { signInAsync } from "@/services/authenticationService";
import { createSignInModel } from "@/models/signInModel";
import { useAuthenticationStore } from "@/stores/authenticationStore";
import { useGeneralSettingsStore } from "@/stores/generalSettingsStore";
import { getProtectedDashboardRoutePath } from "@/utils/routeUtils";

// FormComponents.
import Form from "@/components/form/Form.vue";
import Field from "@/components/form/Field.vue";
import TextInput from "@/components/form/TextInput.vue";
import SubmitButton from "@/components/form/SubmitButton.vue";

// Dependencies.
const authenticationStore = useAuthenticationStore();
const generalSettingsStore = useGeneralSettingsStore();
const router = useRouter();

// States.
const model = ref<SignInModel>(createSignInModel());
const mainLogoUrl = "/images/main-logo-transparent-white.png";

// Callbacks.
async function handleSignIn(): Promise<void> {
  await Promise.all([
    signInAsync(model.value.toRequestDto()),
    new Promise(resolve => setTimeout(resolve, 1000))
  ]);
}

async function handleSucceededSigningIn(): Promise<void> {
  await authenticationStore.reloadAsync();
  await router.push(getProtectedDashboardRoutePath());
}
</script>

<template>
  <div class="container-fluid flex-fill">
    <div class="row w-100 justify-content-center align-items-center">
      <div class="col col-sm-auto col-12 p-0 m-sm-4 m-0 rounded-4 shadow form-container">
        <!-- Header -->
        <div class="d-flex justify-content-center align-items-center p-4 pb-2">
          <div class="logo-container">
            <img
              v-bind:src="mainLogoUrl"
              v-bind:alt="generalSettingsStore.data.applicationName"
              class="logo w-100 h-100"
            />
          </div>
        </div>

        <!-- Form -->
        <Form
          v-bind:model="model"
          v-bind:submission-succeeded-modal="false"
          v-bind:submitting-action="handleSignIn"
          v-on:submission-success="handleSucceededSigningIn"
          class="bg-white p-3 w-100"
        >
          <!-- UserName -->
          <Field name="userName" display-name="Tên tài khoản" class="mb-3" floating>
            <TextInput name="userName" v-model="model.userName" placeholder="" />
          </Field>

          <!-- Password -->
          <Field name="password" display-name="Mật khẩu" class="mb-3" floating>
            <TextInput v-model="model.password" type="password" placeholder="" />
          </Field>

          <!-- SubmitButton -->
          <SubmitButton class="w-100">Đăng nhập</SubmitButton>
        </Form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container-fluid {
  background-color: var(--bs-success);
  display: flex;
  justify-content: center;
  align-items: center;
}

.form-container {
  background-color: var(--bs-white);
  border: 1px solid var(--bs-success);
  overflow: hidden;
  width: 350px;
}

.logo-container {
  background: transparent;
  width: 250px;
  height: 250px;
  padding: 3rem;
  border: 5px solid var(--bs-success);
  overflow: visible;
  border-radius: 50%;
  filter:
    brightness(0)
    saturate(100%)
    invert(38%)
    sepia(74%)
    saturate(430%)
    hue-rotate(100deg)
    brightness(94%)
    contrast(95%);
}
</style>
