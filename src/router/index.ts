import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import { useAuthenticationStore } from "@/stores/authenticationStore";

export const routeDefinitions: RouteRecordRaw[] = [
    {
        path: "/",
        redirect: "/home"
    },
    {
        name: "signIn",
        path: "/dang-nhap",
        component: () => import("@/pages/SignInPage.vue"),
        meta: {
            pageTitle: "Đăng nhập"
        }
    },
    {
        name: "publicHome",
        path: "/home",
        component: () => import("@/pages/public/HomePage.vue"),
        meta: {
            pageTitle: "Trang chủ"
        }
    }
];

export const router = createRouter({
    history: createWebHistory("/"),
    routes: routeDefinitions
});

router.beforeEach(async (to) => {
    // Page load progress bar.
    // const pageLoadProgressBarStore = usePageLoadProgressBarStore();
    // pageLoadProgressBarStore.start();

    // Auth store.
    const authStore = useAuthenticationStore();
    // const initialDataStore = useInitialDataStore();

    // Redirect to home if the user accesses login page when already authenticated.
    if (to.name === "signIn") {
        if (await authStore.isAuthenticatedAsync()) {
            return { name: "publicHome" };
        }
    } else {
        // Redirect to login page if the user accesses the pages requiring authorization while
        // not having been authenticated yet.
        if (!await authStore.isAuthenticatedAsync()) {
            return { name: "signIn" };
        }

        // Load the current user data if not loaded yet.
        // if (!initialDataStore.hasData()) {
        //     await initialDataStore.loadDataAsync();
        // }
    }

    // Page title
    const sharedTitle = "NATSInternal";
    if (to.meta.pageTitle) {
        document.title = to.meta.pageTitle + " - " + sharedTitle;
    } else {
        document.title = sharedTitle;
    }
});