<script setup lang="ts">
import { computed } from "vue";
import { RouterLink } from "vue-router";
import { CatalogItemType } from "@/enums/catalogItemType";

// Props.
const props = defineProps<{ model: CatalogItemBasicModel[] }>();

// Computed.
const title = computed<string>(() => {
  if (!props.model.length) {
    return "";
  }

  const titleByTypes: Record<CatalogItemType, string> = {
    [CatalogItemType.Service]: "Dịch vụ",
    [CatalogItemType.Course]: "Khoá học",
    [CatalogItemType.Product]: "Sản phẩm"
  };

  return titleByTypes[props.model[0].type];
});

// Callbacks.
function computeThumbnailUrl(catalogItem: CatalogItemBasicModel): string {
  if (catalogItem.type == CatalogItemType.Course) {
    return "https://placehold.co/400";
  }

  return catalogItem.thumbnailUrl;
}
</script>

<template>
  <div class="row g-3 p-3 align-items-stretch catalog-items-row">
    <div class="col col-12 text-center">
      <h2 class="text-success fw-normal">
        {{ title }}
      </h2>
    </div>

    <div
      v-for="catalogItem in model"
      v-bind:key="catalogItem.id"
      class="col col-xl-3 col-lg-4 col-md-6 col-sm-10 col-10
            justify-self-md-start justify-self-sm-center"
    >
      <div class="card h-100 shadow-sm">
        <img
          v-bind:src="computeThumbnailUrl(catalogItem)"
          v-bind:alt="catalogItem.name"
          class="card-img-top"
        />

        <div class="card-body flex-fill">
          <h5 class="card-title">{{ catalogItem.name }}</h5>

          <RouterLink
            v-bind:to="catalogItem.detailRoute"
            class="btn btn-outline-success mt-2"
          >
            Chi tiết
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-img-top {
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: 50% 50%;
}

.card-body {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: start;
}

@media (max-width: 768px) {
  .row {
      width: fit-content !important;
      justify-content: center;
  }
}

@media (max-width: 576px) {
  .row {
      width: 100%;
  }
}
</style>