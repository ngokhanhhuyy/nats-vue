<script setup lang="ts">
import { computed } from "vue";
import { RouterLink } from "vue-router";
import { useAuthenticationStore } from "@/stores/authenticationStore";
import { useGeneralSettingsStore } from "@/stores/generalSettingsStore";
import { useContactStore } from "@/stores/contactStore";
import * as routeUtils from "@/utils/routeUtils";

// Child component.
import ContactLink from "./FooterContactLink.vue";

// Dependencies.
const authenticationStore = useAuthenticationStore();
const generalSettingsStore = useGeneralSettingsStore();
const contactStore = useContactStore();

// Computed.
const protectedDashboardLinkPath = computed<string>(() => {
  if (authenticationStore.isAuthenticated) {
    return routeUtils.getProtectedDashboardRoutePath();
  }

  return routeUtils.getSignInRoutePath();
});

const protectedDashboardLinkText = computed<string>(() => {
  if (authenticationStore.isAuthenticated) {
    return "Bảng điều khiển";
  }

  return "Đăng nhập";
});
</script>

<template>
  <footer class="container-fluid bg-dark">
    <div class="container text-white">
      <div class="row g-3 justify-content-center align-items-stretch px-3 py-4">
        <!-- Links - Left/Top column -->
        <div class="col col-xl-2 col-lg-3 col-sm-6 col-12 links-column">
          <span class="fw-bold fs-4 opacity-75"> Công ty </span>

          <!-- SummaryItems -->
          <RouterLink v-bind:to="routeUtils.getPublicSummaryItemsRoutePath()">
            Giới thiệu
          </RouterLink>

          <!-- AboutUs -->
          <RouterLink v-bind:to="routeUtils.getPublicAboutUsIntroductionRoutePath()">
            Về chúng tôi
          </RouterLink>

          <!-- News -->
          <RouterLink v-bind:to="routeUtils.getPublicHomeRoutePath()">
            Tin tức
          </RouterLink>

          <!-- Contact -->
          <RouterLink v-bind:to="routeUtils.getPublicContactsRoutePath()">
            Liên hệ
          </RouterLink>
        </div>

        <!-- Links - Right/Bottom column -->
        <div class="col col-xl-2 col-lg-3 col-sm-6 col-12 links-column">
          <span class="fw-bold fs-4 opacity-75">Lĩnh vực</span>

          <!-- Services -->
          <RouterLink v-bind:to="routeUtils.getPublicServiceListRoutePath()">
            Dịch vụ
          </RouterLink>

          <!-- Courses -->
          <RouterLink v-bind:to="routeUtils.getPublicCourseListRoutePath()">
            Khóa học
          </RouterLink>
        </div>

        <!-- Contacts -->
        <div class="col col-xl-5 col-lg-6 col-12">
          <span class="fw-bold fs-4 opacity-75"> Liên hệ </span>
          <template v-if="contactStore.data?.length">
            <ContactLink
              v-for="contact in contactStore.data"
              v-bind:model="contact"
              v-bind:key="contact.id"
            />
          </template>
        </div>

        <!-- Logo -->
        <div class="col d-flex flex-column justify-content-center align-items-center">
          <div class="border border-4 rounded-circle logo-container">
            <img
              src="/images/main-logo-transparent-white.png"
              v-bind:alt="generalSettingsStore.data.applicationName"
            />
          </div>

          <div class="fw-bold fs-5 text-center mt-3">
            {{ generalSettingsStore.data.applicationName }}
          </div>
        </div>

        <!-- Copyright -->
        <div class="col col-12 text-center">
          Bản quyền ©{{ new Date().getFullYear() }} thuộc về
          <a
            href="https://facebook.com/huy.nino.97"
            target="_blank"
            rel="noopener noreferrer"
            class="fw-bold"
          >
            Ngô Khánh Huy
          </a><br/>

          <RouterLink
            v-bind:to="protectedDashboardLinkPath"
            class="btn btn-outline-success btn-sm mt-3 sign-in-link"
          >
            {{ protectedDashboardLinkText }}
          </RouterLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
footer :deep(a) {
  color: white !important;
}

footer :deep(a:not(:hover)) {
  text-decoration: none;
}

footer .links-column :deep(a) {
  margin-top: .5rem;
  margin-bottom: .5rem;
  display: block;
}

.logo-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: auto;
  aspect-ratio: 1;
}

.logo-container img {
  width: 65%;
}

.sign-in-link {
  color: var(--bs-success) !important;
  filter: brightness(150%);
}

.sign-in-link:hover {
  color: var(--bs-dark) !important;
}
</style>