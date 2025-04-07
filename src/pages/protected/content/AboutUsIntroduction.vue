<script setup lang="ts">
import { getAboutUsIntroductionAsync } from "@/services/aboutUsIntroductionService";
import { createAboutUsIntroductionDetailModel } from "@/models/aboutUsIntroductionModels";

// Layout component.
import MainBlock from "@/components/layouts/protected/MainBlock.vue";

// States.
const model = await initializeModelAsync();

// Functions.
async function initializeModelAsync(): Promise<AboutUsIntroductionDetailModel> {
  const responseDto = await getAboutUsIntroductionAsync();
  return createAboutUsIntroductionDetailModel(responseDto);
}
</script>

<template>
  <MainBlock title="Về chúng tôi" v-bind:body-padding="[3, 3, 2, 3]" body-class="clearfix">
    <template #header>
      <a href="#" class="btn btn-success btn-sm">
        <i class="bi bi-pencil-square"></i>
        <span class="d-sm-inline d-none ms-2">Sửa</span>
      </a>
    </template>

    <template #body>
      <img
        v-bind:src="model.thumbnailUrl"
        class="img-thumbnail float-start me-3"
        alt="Về chúng tôi"
      />

      <span>{{ model.aboutUsContent }}</span>
    </template>
  </MainBlock>
</template>

<style scoped>
.img-thumbnail {
  width: 33%;
  height: auto;
  max-width: 500px;
}
</style>