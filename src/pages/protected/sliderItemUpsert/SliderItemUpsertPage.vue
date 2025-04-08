<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import * as service from "@/services/sliderItemService";
import { createSliderItemUpsertModel } from "@/models/sliderItemModels";
import { getProtectedDashboardRoutePath } from "@/utils/routeUtils";
import { NotFoundError } from "@/errors";

// Layout components.
import ProtectedLayout from "@/components/layouts/protected/ProtectedLayout.vue";
import MainBlock from "@/components/layouts/protected/MainBlock.vue";

// Form components.
import Form from "@/components/form/Form.vue";
import Field from "@/components/form/Field.vue";
import TextInput from "@/components/form/TextInput.vue";
import SubmitButton from "@/components/form/SubmitButton.vue";
import DeleteButton from "@/components/form/DeleteButton.vue";

// Dependencies.
const route = useRoute();
const router = useRouter();

// Props.
const props = defineProps<{ isForCreating: boolean }>();

// States.
const model = ref(await initializeModelAsync());

// Computed.
const blockTitle = computed<string>(() => {
  return props.isForCreating ? "Tạo ảnh trình chiếu mới" : "Chỉnh sửa ảnh trình chiếu";
});

// Functions.
async function initializeModelAsync(): Promise<SliderItemUpsertModel> {
  if (props.isForCreating) {
    return createSliderItemUpsertModel();
  }

  const id = parseInt(route.params.id as string);
  if (isNaN(id)) {
    throw new NotFoundError();
  }
  
  const responseDto = await service.getSliderItemSingleAsync(id);
  return createSliderItemUpsertModel(responseDto);
}

async function handleSubmissionAsync(): Promise<void> {
  if (props.isForCreating) {
    await service.createSliderItemAsync(model.value.toRequestDto());
  } else {
    await service.updateSliderItemAsync(model.value.id, model.value.toRequestDto());
  }
}

async function handleDeletionAsync(): Promise<void> {
  await service.deleteSliderItemAsync(model.value.id);
}

async function onSubmissionOrDeletionSucceededAsync(): Promise<void> {
  await router.push(getProtectedDashboardRoutePath());
}
</script>

<template>
  <ProtectedLayout>
    <Form
      v-bind:model="model"
      v-bind:submitting-action="handleSubmissionAsync"
      v-bind:deleting-action="handleDeletionAsync"
      v-on:submission-success="onSubmissionOrDeletionSucceededAsync"
      v-on:deletion-success="onSubmissionOrDeletionSucceededAsync"
      class="m-0 p-0"
    >
      <div class="row g-3 justify-content-end">
        <div class="col col-12">
          <MainBlock v-bind:title="blockTitle" v-bind:body-padding="[2, 3, 3, 3]">
            <Field name="thumbnailFile" displayName="Ảnh">
              <TextInput v-model="model.thumbnailFile" />
            </Field>
            <Field name="title" displayName="Tiêu đề">
              <TextInput v-model="model.title" placeholder="Tiêu đề ảnh" />
            </Field>
          </MainBlock>
        </div>

        <div class="col col-auto">
          <DeleteButton v-if="!isForCreating" />
          <SubmitButton class="ms-3" />
        </div>
      </div>
    </Form>
  </ProtectedLayout>
</template>