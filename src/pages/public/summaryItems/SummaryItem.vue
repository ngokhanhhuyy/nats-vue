<script setup lang="ts">
import { computed, useTemplateRef, onMounted } from "vue";
import { useRoute } from "vue-router";

// Dependencies.
const route = useRoute();

// Props.
const props = defineProps<{ model: SummaryItemDetailModel; index: number; }>();

// States.
const templateRef = useTemplateRef("summary-item");

// Computed.
const id: string = `summary-item-${props.model.id}`;
const nameClass = computed<string>(() => {
  let className = "text-center";
  if (props.index % 2 == 0) {
    className += " text-lg-start";
  } else {
    className += " text-lg-end";
  }

  return className;
});

const isFocused = computed<boolean>(() => {
  if (route.query.id == null) {
    return false;
  }
  return parseInt(route.query.id as string) === props.model.id;
});

// Lifecycle.
onMounted(() => {
  if (templateRef.value && isFocused.value) {
    templateRef.value.scrollIntoView({ behavior: "smooth", block: "start" });
  }
});
</script>

<template>
  <div
    v-bind:id="id"
    v-bind:class="{ focused: isFocused }"
    ref="summary-item"
    class="row g-5 justify-content-center mb-5 item-row"
  >
    <!-- Thumbnail -->
    <div
      v-bind:class="`order-lg-${index % 2}`"
      class="col col-lg-auto col-md-11 col-12 thumbnail-column"
    >
      <img
        v-bind:src="model.thumbnailUrl"
        v-bind:alt="model.name"
        class="rounded-circle shadow"
      />
    </div>

    <div v-bind:class="`order-lg-${(index + 1) % 2}`" class="col col-lg col-md-10 col-12">
      <!-- Name -->
      <div v-bind:class="nameClass" class="fs-2 text-success mb-3">
        {{ model.name }}
      </div>

      <!-- DetailContent -->
      <p v-for="(paragraph, index) in model.detailContent.split(/\r?\n/)" v-bind:key="index">
        {{ paragraph }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.thumbnail-column {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
}

img {
  width: 250px;
  height: auto;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: 50%;
}
        
.item-row {
  border-radius: 1rem;
  border: 1px solid transparent;
  scroll-margin-top: 2rem;
}

.item-row.focused {
  transform-origin: 50% 50%;
  animation-name: focus-animation;
  animation-iteration-count: 5;
  animation-duration: .5s;
}
        
@keyframes focus-animation {
  0% {
    transform: scale(100%);
  }
  
  50% {
    transform: scale(102%);
  }
  
  100% {
    transform: scale(100%);
  }
}
</style>