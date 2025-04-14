import "./assets/index.css";
import "bootstrap";
import "@popperjs/core";
import "bootstrap/dist/css/bootstrap.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import { router } from "./router";
import { useAuthenticationStore } from "./stores/authenticationStore";
import { useModalStore } from "./stores/modalStore";
import {
    NotFoundError,
    AuthenticationError,
    AuthorizationError,
    UndefinedError } from "./errors";
import App from "./App.vue";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

const app = createApp(App);
app.use(router);
app.use(createPinia());
window.addEventListener("unhandledrejection", async (event) => {
    const modalStore = useModalStore();
    if (event.reason instanceof NotFoundError) {
        await modalStore.getNotFoundErrorConfirmationAsync();
        router.back();
    }

    if (event.reason instanceof AuthenticationError) {
        const authStore = useAuthenticationStore();
        authStore.reloadAsync();
        await router.push({ name: "signIn" });
        return;
    }

    if (event.reason instanceof AuthorizationError) {
        await router.push({ name: "protectedDashboard" });
        await modalStore.getAuthorizationErrorConfirmationAsync();
        return;
    }

    if (event.reason instanceof UndefinedError) {
        await modalStore.getUndefinedErrorConfirmationAsync();
        window.location.reload();
    }
});
app.mount("#root");
