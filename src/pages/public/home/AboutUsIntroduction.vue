<script setup lang="ts">
import { RouterLink } from "vue-router";

// Props.
defineProps<{ model: AboutUsIntroductionDetailModel }>();
</script>

<template>
  <div class="container-fluid bg-success text-white fs-5 shadow p-0">
    <div class="container p-0">
      <div class="row g-0 p-3 justify-content-center align-items-stretch">
        <div class="col col-xl-6 col-lg-8 col-12 d-flex align-items-start m-3">
          <img
            v-bind:src="model.thumbnailUrl"
            class="w-100 rounded-3"
            alt="Về chúng tôi"
          />
        </div>

        <div class="col-xl col-lg-8 col m-3 detail-column">
          <div class="fs-2 mb-3">Về chúng tôi</div>
          <p>{{ model.aboutUsContent }}</p>
          <RouterLink
            v-bind:to="model.detailRoute"
            class="btn btn-outline-light mt-3"
          >
            Tìm hiểu thêm
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.detail-column {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
}
</style>