<script setup lang="ts">
// Child content.
import SliderItemList from "./SliderItemList.vue";
import SummaryItemList from "./SummaryItemList.vue";
import AboutUsIntroduction from "./AboutUsIntroduction.vue";
import MemberList from "./MemberList.vue";
</script>

<template>
  <div class="row g-3">
    <div class="col col-lg-6 col-12">
      <SliderItemList class="mb-3" />
      <SummaryItemList class="mb-3" />
      <AboutUsIntroduction />
    </div>
    
    <div class="col col-lg-6 col-12">
      <MemberList />
    </div>
  </div>
</template>

<style scoped>
:deep(.thumbnail) {
  width: 60px;
  height: auto;
  aspect-ratio: 1;
  object-fit: cover;
}
</style>