<script setup lang="ts">
import { RouterLink } from "vue-router";
import { getSliderItemListAsync } from "@/services/sliderItemService";
import { createSliderItemDetailModel } from "@/models/sliderItemModels";

// Layout components.
import MainBlock from "@/components/layouts/protected/MainBlock.vue";

// States.
const model = await initializeModelAsync();

// Functions.
async function initializeModelAsync(): Promise<SliderItemDetailModel[]> {
  const responseDtos = await getSliderItemListAsync();
  return responseDtos.map((dto) => createSliderItemDetailModel(dto));
}
</script>

<template>
  <MainBlock title="Trình chiếu ảnh trang chủ" body-padding="0">
    <template #header>
      <a href="#" class="btn btn-success btn-sm">
        <i class="bi bi-plus-lg"></i>
        <span class="d-sm-inline d-none">Tạo mới</span>
      </a>
    </template>

    <template #body>
      <!-- Carousel -->
      <div
        id="slider"
        class="carousel slide overflow-visible m-3 position-relative img-thumbnail"
        data-bs-ride="carousel"
        data-bs-interval="5000"
      >
        <!-- Photos -->
        <div class="carousel-inner">
          <div
            v-for="(item, index) in model"
            v-bind:class="{ active: index === 0 }"
            v-bind:key="index"
            class="carousel-item"
          >
            <img
              v-bind:src="item.thumbnailUrl"
              v-bind:alt="item.title ?? `Ảnh #${item.id}`"
              class="carousel-img d-block w-100"
            />
          </div>
        </div>

        <!-- IndicatorButtons -->
        <div class="carousel-indicators">
          <button
            v-for="(_, index) in model"
            v-bind:class="{ active: index === 0 }"
            v-bind:aria-current="index == 0"
            v-bind:data-bs-slide-to="index"
            v-bind:aria-label="`Slide ${index}`"
            v-bind:key="index"
            type="button"
            data-bs-target="#slider"
          ></button>
        </div>

        <!-- CarouoselControlButtons -->
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#slider"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#slider"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>

      <!-- List -->
      <ul class="list-group list-group-flush border-top">
        <li v-for="item in model" v-bind:key="item.id" class="list-group-item">
          <!-- Thumbnail -->
          <img
            v-bind:src="item.thumbnailUrl"
            v-bind:alt="`Ảnh #${item.id}`"
            class="img-thumbnail thumbnail"
          />

          <!-- Detail -->
          <div class="ms-2 flex-fill d-flex flex-column">
            <span class="fw-bold text-success">
              {{ item.title ?? `Ảnh #${item.id}` }}
            </span>

            <span class="small opacity-50"> Ảnh {{ item.id }} </span>
          </div>

          <!-- EditLink -->
          <RouterLink to="#" class="btn btn-outline-success btn-sm edit-link">
            <i class="bi bi-pencil-square"></i>
            <span class="d-sm-inline d-none ms-1">Sửa</span>
          </RouterLink>
        </li>
      </ul>
    </template>
  </MainBlock>
</template>

<style scoped>
.list-group-item {
  background-color: transparent;
  display: flex;
  align-items: center;
}

.thumbnail {
    width: 60px;
    height: auto;
    aspect-ratio: 1;
    object-fit: cover;
}

:deep(a.edit-link) {
  flex-shrink: 0;
  margin-left: 1rem;
}
</style>
