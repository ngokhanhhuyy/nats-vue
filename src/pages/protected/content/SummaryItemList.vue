<script setup lang="ts">
import { RouterLink } from "vue-router";
import { getSummaryItemListAsync } from "@/services/summaryItemService";
import { createSummaryItemDetailModel } from "@/models/summaryItemModels";

// Layout component.
import MainBlock from "@/components/layouts/protected/MainBlock.vue";

// States.
const model = await initializeModelAsync();

// Functions.
async function initializeModelAsync(): Promise<SummaryItemDetailModel[]> {
  const responseDto = await getSummaryItemListAsync();
  return responseDto.map((dto) => createSummaryItemDetailModel(dto));
}
</script>

<template>
  <MainBlock title="Giới thiệu" body-padding="0">
    <ul class="list-group list-group-flush">
      <li v-for="item in model" v-bind:key="item.id" class="list-group-item">
        <!-- Thumbnail -->
        <img
          v-bind:src="item.thumbnailUrl"
          v-bind:alt="item.name"
          class="img-thumbnail thumbnail rounded-circle"
        />

        <!-- Detail -->
        <div class="ms-2 flex-fill d-flex flex-column detail">
          <span class="fw-bold text-success">
            {{ item.name }}
          </span>

          <span class="small opacity-50">
            {{ item.summaryContent }}
          </span>
        </div>

        <!-- EditLink -->
        <RouterLink to="#" class="btn btn-outline-success btn-sm edit-link">
          <i class="bi bi-pencil-square"></i>
          <span class="d-sm-inline d-none ms-1">Sửa</span>
        </RouterLink>
      </li>
    </ul>
  </MainBlock>
</template>

<style scoped>
.list-group-item {
  background-color: transparent;
  display: flex;
  align-items: center;
}

.detail, .detail span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

:deep(.edit-link) {
  flex-shrink: 0;
  margin-left: 1rem;
}
</style>
