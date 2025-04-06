<script setup lang="ts">
import { getSummaryItemListAsync } from "@/services/summaryItemService";
import { createSummaryItemDetailModel } from "@/models/summaryItemModels";

// Layout component.
import PublicSubLayout from "@/components/layouts/public/PublicSubLayout.vue";

// Child component.
import SummaryItem from "./SummaryItem.vue";

// States.
const model = await initializeModelAsync();

// Functions.
async function initializeModelAsync(): Promise<SummaryItemDetailModel[]> {
  const responseDtos = await getSummaryItemListAsync();
  return responseDtos.map(dto => createSummaryItemDetailModel(dto));
}
</script>

<template>
  <PublicSubLayout>
    <div class="container p-4 mt-4">
      <SummaryItem
        v-for="(item, index) in model"
        v-bind:model="item"
        v-bind:index="index"
        v-bind:key="index"
      />
    </div>
  </PublicSubLayout>
</template>