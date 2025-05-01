<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import * as service from "@/services/summaryItemService";
import { createSummaryItemUpsertModel } from "@/models/summaryItemModels";
import { getProtectedContentRoutePath } from "@/utils/routeUtils";
import { NotFoundError } from "@/errors";

// Layout components.
import ProtectedLayout from "@/components/layouts/protected/ProtectedLayout.vue";
import MainBlock from "@/components/layouts/protected/MainBlock.vue";

// Form components.
import Form from "@/components/form/Form.vue";
import Field from "@/components/form/Field.vue";
import TextInput from "@/components/form/TextInput.vue";
import TextAreaInput from "@/components/form/TextAreaInput.vue";
import ImageInput from "@/components/form/ImageInput.vue";
import ImageInputWithPreview from "@/components/form/ImageInputWithPreview.vue";
import SubmitButton from "@/components/form/SubmitButton.vue";

// Dependencies.
const route = useRoute();
const router = useRouter();

// States.
const model = ref(await initializeModelAsync());

// Functions.
async function initializeModelAsync(): Promise<SummaryItemUpsertModel> {
  const id = parseInt(route.params.id as string);
  if (isNaN(id)) {
    throw new NotFoundError();
  }
  
  const responseDto = await service.getSummaryItemSingleAsync(id);
  return createSummaryItemUpsertModel(responseDto);
}

async function handleSubmissionAsync(): Promise<void> {
  await service.updateSummaryItemAsync(model.value.id, model.value.toRequestDto());
}

async function onSubmissionSucceededAsync(): Promise<void> {
  await router.push(getProtectedContentRoutePath());
}
</script>

<template>
  <ProtectedLayout>
    <Form
      v-bind:model="model"
      v-bind:submitting-action="handleSubmissionAsync"
      v-on:submission-success="onSubmissionSucceededAsync"
      class="m-0 p-0"
    >
      <div class="row g-3 justify-content-end">
        <div class="col col-12">
          <MainBlock v-bind:body-padding="[2, 3, 3, 3]" title="Chỉnh sửa giới thiệu">
            <div class="row g-3 justify-content-center">
              <!-- Name -->
              <div class="col col-lg-auto col-12 thumbnail-column">
                <!-- Thumbnail -->
                <Field name="thumbnailFile" displayName="Ảnh" class="mb-3">
                  <ImageInputWithPreview
                    v-model:file="model.thumbnailFile"
                    v-model:changed="model.thumbnailChanged"
                    width="180px"
                    placeholder="Ảnh"
                  />
                </Field>
              </div>

              <div class="col">
                <Field name="name" displayName="Tên" required>
                  <TextInput v-model="model.name" placeholder="Tên" />
                </Field>

                <!-- SummaryContent -->
                <Field name="summaryContent" displayName="Nội dung tóm tắt">
                  <TextAreaInput
                    v-model="model.summaryContent"
                    maxlength="255"
                    placeholder="Nội dung tóm tắt"
                  />
                </Field>
              </div>

              <!-- DetailContent -->
              <div class="col col-12">
                <Field name="detailContent" displayName="Nội dung chi tiết">
                  <TextAreaInput
                    v-model="model.detailContent"
                    v-bind:minHeight="400"
                    maxlength="3000"
                    placeholder="Nội dung chi tiết"
                  />
                </Field>
              </div>
            </div>
          </MainBlock>
        </div>

        <div class="col col-auto">
          <SubmitButton />
        </div>
      </div>
    </Form>
  </ProtectedLayout>
</template>

<style scoped>
.thumbnail-column {
  display: flex;
  justify-content: center;
  margin-right: 1rem; 
}

@media (max-width: 992px) {
  .thumbnail-column {
    margin-right: 0;
  }
}
</style>