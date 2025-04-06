<script setup lang="ts">
import { RouterLink } from "vue-router";
import { getPublicSummaryItemsRoutePath } from "@/utils/routeUtils";

// Props.
defineProps<{ model: SummaryItemDetailModel[] }>();
</script>

<template>
  <div class="container">
    <div class="row g-3 p-3">
      <RouterLink
        v-for="(summaryItem, index) in model"
        v-bind:to="getPublicSummaryItemsRoutePath(summaryItem.id)"
        v-bind:key="index"
        class="col col-xl-3 col-md-6 col-12 p-3 summary-item-link"
      >
        <img
          v-bind:src="summaryItem.thumbnailUrl"
          v-bind:alt="summaryItem.name"
          class="rounded-circle thumbnail mb-3 shadow"
        />

        <span class="fs-3 text-center text-success mb-3">
          {{ summaryItem.name }}
        </span>

        <p>{{ summaryItem.summaryContent }}</p>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
a {
  color: unset;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}

.thumbnail {
  width: 150px;
  height: 150px;
  aspect-ratio: 1;
}
</style>