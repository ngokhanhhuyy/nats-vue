<script lang="ts">
type RouteItem = {
  to: string;
  text: string;
};
</script>

<script setup lang="ts">
import { computed, useTemplateRef, watch } from "vue";
import { useRoute, RouterLink } from "vue-router";
import { useGeneralSettingsStore } from "@/stores/generalSettingsStore";
import * as routeUtils from "@/utils/routeUtils";
import Link from "./NavigationBarLink.vue";

// Dependencies.
const route = useRoute();
const generalSettingsStore = useGeneralSettingsStore();

// States.
const toggleButtonElement = useTemplateRef("toggle-button");
const offcanvasElement = useTemplateRef("offcanvas");

// Computed.
const routeItems = computed<RouteItem[]>(() => {
  if (!route.fullPath.startsWith("/dang-nhap") && !route.fullPath.startsWith("/quan-tri")) {
    return [
      { to: routeUtils.getPublicHomeRoutePath(), text: "Trang chủ" },
      { to: routeUtils.getPublicSummaryItemsRoutePath(), text: "Giới thiệu" },
      { to: routeUtils.getPublicAboutUsIntroductionRoutePath(), text: "Về chúng tôi" },
      { to: routeUtils.getPublicServiceListRoutePath(), text: "Dịch vụ" },
      { to: routeUtils.getPublicCourseListRoutePath(), text: "Khoá học" },
      { to: routeUtils.getPublicContactsRoutePath(), text: "Liên hệ" }
    ];
  }

  return [
    { to: routeUtils.getPublicHomeRoutePath(), text: "Trang chủ" },
    { to: routeUtils.getProtectedDashboardRoutePath(), text: "Bảng điều khiển" },
    { to: routeUtils.getProtectedContentRoutePath(), text: "Nội dung" },
  ];
});

const computedClass = computed<string | undefined>(() => {
  if (!route.fullPath.startsWith("/quan-tri")) {
    return "shadow";
  }

  return "border-bottom border-success-subtle";
});

// Watch.
watch(() => route.fullPath, () => {
  if (offcanvasElement.value?.classList.contains("show")) {
    toggleButtonElement.value?.click();
  }
});
</script>

<template>
  <nav
    v-bind:class="computedClass"
    class="navbar navbar-expand-xl fixed-top fs-5"
    id="navbar"
    data-bs-theme="light"
  >
    <div class="container">
      <!-- Main logo -->
      <RouterLink
        v-bind:to="routeUtils.getPublicHomeRoutePath()"
        class="navbar-brand d-flex align-items-center"
      >
        <img
          v-bind:alt="generalSettingsStore.data.applicationName"
          src="/images/main-logo-transparent-white-without-text-small.png"
          class="me-2 flex-shrink-0"
        />

        <span class="fs-2 application-short-name">
          {{ generalSettingsStore.data.applicationShortName }}
        </span>
      </RouterLink>

      <!-- NavigationButtonInSmallScreens -->
      <button
        ref="toggle-button"
        class="navbar-toggler fs-3 me-2 py-2"
        id="navbar-toggler-button"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#navbar-content"
        aria-controls="navbar-content"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i class="bi bi-list"></i>
      </button>

      <!-- Offcanvas -->
      <div
        ref="offcanvas"
        class="offcanvas offcanvas-end"
        tabindex="-1"
        id="navbar-content"
        aria-labelledby="offcanvasNavbarLabel"
      >
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Điều hướng</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div class="offcanvas-body">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0 justify-content-end w-100">
            <li v-for="item in routeItems" v-bind:key="item.to" class="nav-item">
              <Link v-bind:to="item.to">
                {{ item.text }}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
  nav {
    --bs-navbar-padding-y: 0 !important;
    --navbar-logo-img-filter:
      brightness(0)
      saturate(100%)
      invert(39%)
      sepia(90%)
      saturate(393%)
      hue-rotate(100deg)
      brightness(88%)
      contrast(89%);
    --navbar-transition-duration: 0.3s;
    --navbar-background-color: var(--bs-white);
    --navbar-foreground-color: var(--bs-success);
    background: var(--navbar-background-color);
    height: var(--navbar-height);
    transition: background-color var(--navbar-transition-duration) ease;
  }

  nav img {
    width: auto;
    height: calc(var(--navbar-height) - 12px);
    padding: 5px;
    filter: var(--navbar-logo-img-filter);
    transition: filter var(--navbar-transition-duration) ease;
  }

  nav .navbar-brand span.application-short-name {
    font-family: Arial, serif;
    color: var(--navbar-foreground-color);
    transform: scaleX(110%);
    transform-origin: 0;
    transition: color var(--navbar-transition-duration) ease;
  }

  nav button#navbar-toggler-button {
    color: var(--navbar-foreground-color) !important;
    border-color: var(--navbar-foreground-color) !important;
    transition: var(--navbar-transition-duration) ease !important;
  }

  nav button#navbar-toggler-button:hover {
    background-color: var(--navbar-foreground-color) !important;
    color: var(--navbar-background-color) !important;
  }

  nav ::deep .navbar-nav {
    --bs-nav-link-color: var(--navbar-foreground-color) !important;
    --bs-nav-link-hover-color: var(--navbar-foreground-color) !important;
    --bs-navbar-active-color: var(--navbar-foreground-color) !important;
  }

  nav .navbar-nav .nav-item .nav-link {
    margin-right: 15px;
    padding: 3px 10px;
    border-radius: 8px;
  }

  @media (max-width: 992px) {
    nav .offcanvas {
      max-width: 300px;
    }
  }
</style>