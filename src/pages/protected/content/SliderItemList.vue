<script setup lang="ts">
import { ref, onMounted, onUnmounted, useTemplateRef } from "vue";
import { RouterLink } from "vue-router";

// Layout components.
import MainBlock from "@/components/layouts/protected/MainBlock.vue";

// Props.
defineProps<{ model: SliderItemDetailModel[] }>();

// States.
const currentItemIndex = ref<number>(0);
const templateRef = useTemplateRef("slider");

// LifeCycle.
onMounted(() => {
  templateRef.value?.addEventListener("slide.bs.carousel", handleSliderItemChanged);
});

onUnmounted(() => {
  templateRef.value?.removeEventListener("slide.bs.carousel", handleSliderItemChanged);
});

// Functions.x
function computeThumbnailClass(index: number): string | undefined {
  if (index === currentItemIndex.value) {
    return "bg-success-subtle border-success";
  }
}

function handleSliderItemChanged(e: Event) {
  const event = e as Event & { to: number };
  currentItemIndex.value = event.to;
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
        ref="slider"
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
      <div class="d-flex flex-wrap border-top px-2">
        <RouterLink
          v-for="(item, index) in model"
          v-bind:key="index"
          v-bind:to="item.updateRoute"
          class="m-2"
        >
          <img
            v-bind:src="item.thumbnailUrl"
            v-bind:alt="`Ảnh #${item.id}`"
            v-bind:class="computeThumbnailClass(index)"
            class="img-thumbnail thumbnail"
          />
        </RouterLink>
      </div>
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
  transition: border-color, background-color .6s ease;
}

:deep(a.edit-link) {
  flex-shrink: 0;
  margin-left: 1rem;
}
</style>
