<script setup lang="ts">
import { RouterLink } from "vue-router";
import { useGeneralSettingsStore } from "@/stores/generalSettingsStore";
import * as routeUtils from "@/utils/routeUtils";
import Link from "./NavigationBarLink.vue";

// Dependencies.
const generalSettingsStore = useGeneralSettingsStore();
</script>

<template>
  <nav class="navbar navbar-expand-xl fixed-top shadow fs-5" id="navbar" data-bs-theme="light">
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
            <!-- Home -->
            <li class="nav-item">
              <Link v-bind:to="routeUtils.getPublicHomeRoutePath()">
              Trang chủ
              </Link>
            </li>

            <!-- SummaryItem -->
            <li class="nav-item">
              <Link v-bind:to="routeUtils.getPublicSummaryItemsRoutePath()">
              Giới thiệu
              </Link>
            </li>

            <!-- AboutUsIntroduction -->
            <li class="nav-item">
              <Link v-bind:to="routeUtils.getPublicAboutUsIntroductionRoutePath()">
              Về chúng tôi
              </Link>
            </li>

            <!-- CatalogItem - Services -->
            <li class="nav-item">
              <Link v-bind:to="routeUtils.getPublicServiceListRoutePath()">
              Dịch vụ
              </Link>
            </li>

            <!-- CatalogItem - Course -->
            <li class="nav-item">
              <Link v-bind:to="routeUtils.getPublicCourseListRoutePath()">
              Khoá học
              </Link>
            </li>

            <!-- Enquiry -->
            <li class="nav-item">
              <Link v-bind:to="routeUtils.getPublicEnquiryRoutePath()">
              Liên hệ
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