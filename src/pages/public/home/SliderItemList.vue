<script setup lang="ts">
import { ref, computed, useTemplateRef, onMounted, onUnmounted } from "vue";

// Props.
const props = defineProps<{ model: SliderItemDetailModel[] }>();

// States.
const backgroundIndex = ref<number>(0);
const carouselElement = useTemplateRef("carousel-element");

// Computed.
const thumbnailUrls = computed<string[]>(() => props.model.map((item) => item.thumbnailUrl));

// Lifecycle.
onMounted(() => {
  if (carouselElement.value) {
    carouselElement.value.addEventListener("slide.bs.carousel", onCarouselSlide);
  }
});

onUnmounted(() => {
  if (carouselElement.value) {
    carouselElement.value.removeEventListener("slide.bs.carousel", onCarouselSlide);
  }
});

// Functions.
function computeCarouselBackgroundClass(index: number): string {
  return backgroundIndex.value === index ? "opacity-100" : "opacity-0";
}

function onCarouselSlide(event: Event) {
  backgroundIndex.value = (event as Event & { to: number }).to;
}
</script>

<template>
  <div
    v-if="model.length"
    class="container-fluid overflow-hidden position-relative bg-success p-0"
  >
    <div
      v-for="(thumbnailUrl, index) of thumbnailUrls"
      v-bind:class="computeCarouselBackgroundClass(index)"
      v-bind:style="{ background: `url(${thumbnailUrl})` }"
      v-bind:data-index="index"
      v-bind:key="index"
      ref="carousel-background"
      class="carousel-background"
    ></div>

    <div class="carousel-container">
      <div
        ref="carousel-element"
        id="slider"
        class="carousel slide m-0 w-100 position-relative"
        data-bs-ride="carousel"
        data-bs-interval="5000"
      >
        <!-- Photos -->
        <div class="carousel-inner">
          <div
            v-for="(item, index) in model"
            v-bind:key="index"
            v-bind:class="{ active: index === 0 }"
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
            v-bind:key="index"
            v-bind:class="{ active: index === 0 }"
            v-bind:aria-current="index === 0"
            v-bind:aria-label="`Slide ${index}`"
            v-bind:data-bs-slide-to="index"
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
    </div>
  </div>
</template>

<style scoped>
.carousel-background {
  --blur-radius: 25px;
  background: rgba(var(--bs-success-rgb), 0.5);
  position: absolute;
  top: 50%;
  left: 50%;
  width: calc(100% + var(--blur-radius) * 4);
  height: calc(100% + var(--blur-radius) * 4);
  transform: translate(-50%, -50%);
  filter: blur(var(--blur-radius));
  transition: opacity 1s ease;
}

.carousel-background::after {
  content: "";
  background: rgba(var(--bs-success-rgb), 0.5);
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
}

.carousel-container {
  width: 100%;
  max-width: 1400px;
  margin: auto;
}

.slide {
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.25);
}

.carousel-img {
  max-height: 750px;
  object-fit: cover;
}
</style>
