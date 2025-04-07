<script lang="ts">
type HomePageModel = {
  sliderItems: SliderItemDetailModel[];
  summaryItems: SummaryItemDetailModel[];
  aboutUsIntroduction: AboutUsIntroductionDetailModel;
  services: CatalogItemBasicModel[];
  courses: CatalogItemBasicModel[];
};
</script>

<script setup lang="ts">
import { getSliderItemListAsync } from "@/services/sliderItemService";
import { getSummaryItemListAsync } from "@/services/summaryItemService";
import { getAboutUsIntroductionAsync } from "@/services/aboutUsIntroductionService";
import { getCatalogItemListAsync } from "@/services/catalogItemService";
import { createSliderItemDetailModel } from "@/models/sliderItemModels";
import { createSummaryItemDetailModel } from "@/models/summaryItemModels";
import { createAboutUsIntroductionDetailModel } from "@/models/aboutUsIntroductionModels";
import { createCatalogItemBasicModel } from "@/models/catalogItemModels";
import { CatalogItemType } from "@/enums/catalogItemType";
import { useGeneralSettingsStore } from "@/stores/generalSettingsStore";

// Layout component.
import PublicLayout from "@/components/layouts/public/PublicLayout.vue";

// Child components.
import SliderItemList from "./SliderItemList.vue";
import SummaryItemList from "./SummaryItemList.vue";
import AboutUsIntroduction from "./AboutUsIntroduction.vue";
import CatalogItemList from "./CatalogItemList.vue";

// Dependencies.
const generalSettingsStore = useGeneralSettingsStore();

// States.
const model = await initializeModelAsync();

// Functions.
async function initializeModelAsync(): Promise<HomePageModel> {
  const [
    sliderItemResponseDtos,
    summaryItemResponseDtos,
    aboutUsIntroductionResponseDto,
    catalogItemResponseDtos
  ] = await Promise.all([
      getSliderItemListAsync(),
      getSummaryItemListAsync(),
      getAboutUsIntroductionAsync(),
      getCatalogItemListAsync(),
    ]);

  return {
    sliderItems: sliderItemResponseDtos.map((dto) => createSliderItemDetailModel(dto)),
    summaryItems: summaryItemResponseDtos.map((dto) => createSummaryItemDetailModel(dto)),
    aboutUsIntroduction: createAboutUsIntroductionDetailModel(aboutUsIntroductionResponseDto),
    services: catalogItemResponseDtos
      .filter((dto) => dto.type === CatalogItemType.Service)
      .map((dto) => createCatalogItemBasicModel(dto)),
    courses: catalogItemResponseDtos
      .filter((dto) => dto.type === CatalogItemType.Course)
      .map((dto) => createCatalogItemBasicModel(dto)),
  };
}
</script>

<template>
  <PublicLayout>
    <div class="container-fluid p-0">
      <!-- SliderItems -->
      <SliderItemList v-bind:model="model.sliderItems" />

      <!-- ApplicationName -->
      <div class="container-fluid p-2 mb-3 shadow application-name">
          {{ generalSettingsStore.data.applicationName }}
      </div>

      <!-- SummaryItems -->
      <SummaryItemList v-bind:model="model.summaryItems" />

      <!-- AboutUsIntroduction -->
      <AboutUsIntroduction v-bind:model="model.aboutUsIntroduction" />

      <!-- CatalogItems -->
      <div class="container my-3" id="catalog-item-container">
        <CatalogItemList v-bind:model="model.services" />
        <CatalogItemList v-bind:model="model.courses" />
      </div>
    </div>
  </PublicLayout>
</template>

<style scoped>
.application-name {
  background-color: rgb(20, 112, 70);
  font-size: 1.4em;
  color: var(--bs-white);
  font-weight: bold;
  text-align: center;
}

@media (max-width: 576px) {
  .application-name {
    font-size: 1.0em;
  }
}
</style>