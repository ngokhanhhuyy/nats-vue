<script setup lang="ts">
import { getSliderItemListAsync } from "@/services/sliderItemService";
import { getSummaryItemListAsync } from "@/services/summaryItemService";
import { getAboutUsIntroductionAsync } from "@/services/aboutUsIntroductionService";
import { getMemberListAsync } from "@/services/memberService";
import { getCertificateListAsync } from "@/services/certificateService";
import { getCatalogItemListAsync } from "@/services/catalogItemService";
import { createSliderItemDetailModel } from "@/models/sliderItemModels";
import { createSummaryItemDetailModel } from "@/models/summaryItemModels";
import { createAboutUsIntroductionDetailModel } from "@/models/aboutUsIntroductionModels";
import { createMemberDetailModel } from "@/models/memberModels";
import { createCertificateDetailModel } from "@/models/certificateModels";
import { createCatalogItemBasicModel } from "@/models/catalogItemModels";
import { CatalogItemType } from "@/enums/catalogItemType";
import {
  getProtectedMemberCreateRoutePath,
  getProtectedCertificateCreateRoutePath,
  getProtectedCatalogItemCreateRoutePath } from "@/utils/routeUtils";

// Layout component.
import ProtectedLayout from "@/components/layouts/protected/ProtectedLayout.vue";

// Child components.
import SliderItemList from "./SliderItemList.vue";
import AboutUsIntroduction from "./AboutUsIntroduction.vue";
import ListWithThumbnail from "./ListWithThumbnail.vue";

// States.
const model = await initializeModelAsync();

// Functions.
async function initializeModelAsync() {
  const [
    sliderItemResponseDtos,
    summaryItemResponseDtos,
    aboutUsIntroductionResponseDto,
    memberResponseDtos,
    certificateResponseDtos,
    catalogItemResponseDtos
  ] = await Promise.all([
    getSliderItemListAsync(),
    getSummaryItemListAsync(),
    getAboutUsIntroductionAsync(),
    getMemberListAsync(),
    getCertificateListAsync(),
    getCatalogItemListAsync()
  ]);

  return {
    sliderItems: sliderItemResponseDtos.map(dto => createSliderItemDetailModel(dto)),
    summaryItems: summaryItemResponseDtos.map(dto => createSummaryItemDetailModel(dto)),
    aboutUsIntroduction: createAboutUsIntroductionDetailModel(aboutUsIntroductionResponseDto),
    members: memberResponseDtos.map(dto => createMemberDetailModel(dto)),
    certificates: certificateResponseDtos.map(dto => createCertificateDetailModel(dto)),
    services: catalogItemResponseDtos
      .filter(dto => dto.type === CatalogItemType.Service)
      .map(dto => createCatalogItemBasicModel(dto)),
    courses: catalogItemResponseDtos
      .filter(dto => dto.type === CatalogItemType.Course)
      .map(dto => createCatalogItemBasicModel(dto))
  };
}
</script>

<template>
  <ProtectedLayout>
    <div class="row g-3">
      <div class="col col-lg-6 col-12">
        <!-- SliderItems -->
        <SliderItemList v-bind:model="model.sliderItems" class="mb-3" />

        <!-- SummaryItemList -->
        <ListWithThumbnail
          v-bind:model="model.summaryItems"
          v-bind:name-selector="(model) => model.name"
          v-bind:description-selector="(model) => model.summaryContent"
          title="Giới thiệu"
          class="mb-3"
        />

        <!-- AboutUsIntroduction -->
        <AboutUsIntroduction />
      </div>
      
      <div class="col col-lg-6 col-12">
        <!-- Members -->
        <ListWithThumbnail
          v-bind:model="model.members"
          v-bind:create-route="getProtectedMemberCreateRoutePath()"
          v-bind:name-selector="(model) => model.fullName"
          v-bind:description-selector="(model) => model.description"
          title="Đội ngũ"
          class="mb-3"
        />

        <!-- Certificates -->
        <ListWithThumbnail
          v-bind:model="model.certificates"
          v-bind:create-route="getProtectedCertificateCreateRoutePath()"
          v-bind:name-selector="(model) => model.name"
          title="Chứng chỉ"
          class="mb-3"
        />

        <!-- Services -->
        <ListWithThumbnail
          v-bind:model="model.services"
          v-bind:create-route="getProtectedCatalogItemCreateRoutePath(CatalogItemType.Service)"
          v-bind:name-selector="(model) => model.name"
          v-bind:description-selector="(model) => model.summary"
          title="Dịch vụ"
          class="mb-3"
        />

        <!-- Courses -->
        <ListWithThumbnail
          v-bind:model="model.courses"
          v-bind:create-route="getProtectedCatalogItemCreateRoutePath(CatalogItemType.Course)"
          v-bind:name-selector="(model) => model.name"
          v-bind:description-selector="(model) => model.summary"
          title="Khóa học"
        />
      </div>
    </div>
  </ProtectedLayout>
</template>