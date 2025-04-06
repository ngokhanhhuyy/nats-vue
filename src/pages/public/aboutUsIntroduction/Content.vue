<script setup lang="ts">
import { computed } from "vue";

// Props.
const props = defineProps<{ title: string, content: string }>();

// Computed.
const paragraphs = computed<string[]>(() => props.content.split(/\r?\n/));
</script>

<template>
  <div class="col col-lg-6 col-md-10 col-12">
    <h2 class="text-success text-center fw-normal mb-3">
      {{ title }}
    </h2>

    <p v-for="(paragraph, index) in paragraphs" v-bind:key="index">
      {{ paragraph }}
    </p>
  </div>
</template>
