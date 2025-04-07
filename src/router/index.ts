import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import { useAuthenticationStore } from "@/stores/authenticationStore";
import { useGeneralSettingsStore } from "@/stores/generalSettingsStore";

export const routeDefinitions: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/trang-chu",
  },
  {
    name: "signIn",
    path: "/dang-nhap",
    component: () => import("@/pages/SignInPage.vue"),
    meta: {
      pageTitle: "Đăng nhập",
    },
  },
  // Public routes.
  {
    path: "/",
    redirect: "/trang-chu",
    children: [
      {
        name: "publicHome",
        path: "/trang-chu",
        component: () => import("@/pages/public/home/HomePage.vue"),
        meta: {
          pageTitle: "Trang chủ",
        },
      },
      {
        name: "publicSummaryItemList",
        path: "/gioi-thieu",
        component: () => import("@/pages/public/summaryItems/SummaryItemsPage.vue"),
        meta: {
          pageTitle: "Giới thiệu",
        },
      },
      {
        name: "publicAboutUsIntroduction",
        path: "/ve-chung-toi",
        component: () => {
          return import("@/pages/public/aboutUsIntroduction/AboutUsIntroductionPage.vue");
        },
        meta: {
          pageTitle: "Về chúng tôi",
        },
      },
    ],
  },
  // Protected routes.
  {
    path: "/quan-tri",
    redirect: "/bang-dieu-khien",
    children: [
      {
        name: "protectedDashboard",
        path: "bang-dieu-khien",
        component: () => import("@/pages/protected/dashboard/DashboardPage.vue"),
        meta: {
          pageTitle: "Bảng điều khiển",
        },
      },
      {
        name: "protectedContent",
        path: "noi-dung",
        component: () => import("@/pages/protected/content/ContentPage.vue"),
        meta: {
          pageTitle: "Nội dung",
        },
      },
    ]
  },
];

export const router = createRouter({
  history: createWebHistory("/"),
  routes: routeDefinitions,
  scrollBehavior() {
    return { top: 0 };
  }
});

router.beforeEach(async (to) => {
  // Page load progress bar.
  // const pageLoadProgressBarStore = usePageLoadProgressBarStore();
  // pageLoadProgressBarStore.start();

  // Auth store.
  const authStore = useAuthenticationStore();
  const generalSettingsStore = useGeneralSettingsStore();
  // const initialDataStore = useInitialDataStore();

  // Redirect to home if the user accesses login page when already authenticated.
  if (to.name === "signIn" && authStore.isAuthenticated) {
    return { name: "protectedDashboard" };
  } else if (to.path.startsWith("/quan-tri")) {
    // Redirect to login page if the user accesses any protected pages while not having been
    // authenticated yet.
    if (!authStore.isAuthenticated) {
      return { name: "signIn" };
    }

    // Load the current user data if not loaded yet.
    // if (!initialDataStore.hasData()) {
    //     await initialDataStore.loadDataAsync();
    // }
  }

  // Page title
  let sharedTitle: string;
  if (to.fullPath.startsWith("/quan-tri")) {
    sharedTitle = "Trang quản trị";
  } else {
    sharedTitle = generalSettingsStore.data.applicationName;
  }

  if (to.meta.pageTitle) {
    document.title = to.meta.pageTitle + " - " + sharedTitle;
  } else {
    document.title = sharedTitle;
  }
});