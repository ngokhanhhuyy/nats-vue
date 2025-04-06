<script setup lang="ts">
import { computed } from "vue";
import { ContactType } from "@/enums/contactType";

// Props.
const props = defineProps<{ model: ContactDetailModel }>();

// Computed.
const iconClass = computed<string>(() => {
  const iconsByContactTypes: Record<ContactType, string> = {
    [ContactType.PhoneNumber]: "bi-telephone-fill",
    [ContactType.ZaloNumber]: "bi-stop-circle-fill",
    [ContactType.Email]: "bi-envelope-at-fill",
    [ContactType.Address]: "bi-geo-alt-fill"
  };

  return iconsByContactTypes[props.model.type];
});

const encodedAddress = computed<string>(() => encodeURIComponent(props.model.content));
const zaloUrl = computed<string>(() => {
  if (props.model.type !== ContactType.ZaloNumber) {
    return "";
  }

  return "https://zalo.me/" + props.model.content.replaceAll(" ", "").replaceAll("+84", "0");
});
</script>

<template>
  <div class="link-container">
    <!-- Label -->
    <i v-bind:class="iconClass" class="bi me-2"></i>

    <!-- PhoneNumber -->
    <a v-if="model.type === ContactType.PhoneNumber" v-bind:href="`tel:${model.content}`">
      {{ model.content }}
    </a>

    <!-- ZaloNumber -->
    <a v-else-if="model.type === ContactType.ZaloNumber" v-bind:href="`tel:${zaloUrl}`">
      {{ model.content }}
    </a>

    <!-- Email -->
    <a v-else-if="model.type === ContactType.Email" v-bind:href="`mailto:${model.content}`">
      {{ model.content }}
    </a>
    
    <!-- Address -->
    <a
      v-else-if="model.type === ContactType.Address"
      v-bind:href="`https://maps.google.com/?q=${encodedAddress}`"
      target="_blank"
      rel="noopener noreferrer"
    >
      {{ model.content }}
    </a>
  </div>
</template>

<style scoped>
.link-container {
  margin-top: .5rem;
  margin-bottom: .5rem;
}
</style>