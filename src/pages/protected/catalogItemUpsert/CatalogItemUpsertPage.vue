<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import * as service from "@/services/catalogItemService";
import { createCatalogItemUpsertModel } from "@/models/catalogItemModels";
import { getProtectedContentRoutePath } from "@/utils/routeUtils";
import { NotFoundError } from "@/errors";

// Layout components.
import ProtectedLayout from "@/components/layouts/protected/ProtectedLayout.vue";
import MainBlock from "@/components/layouts/protected/MainBlock.vue";

// Form components.
import Form from "@/components/form/Form.vue";
import Field from "@/components/form/Field.vue";
import TextInput from "@/components/form/TextInput.vue";
import ImageInput from "@/components/form/ImageInput.vue";
import SubmitButton from "@/components/form/SubmitButton.vue";
import DeleteButton from "@/components/form/DeleteButton.vue";

// Dependencies.
const route = useRoute();
const router = useRouter();

// Props.
const props = defineProps<{ isForCreating: boolean }>();

// States.
const model = ref(await initializeModelAsync());
const title = document.title;

// Functions.
async function initializeModelAsync(): Promise<CatalogItemUpsertModel> {
  if (props.isForCreating) {
    return createCatalogItemUpsertModel();
  }

  const id = parseInt(route.params.id as string);
  if (isNaN(id)) {
    throw new NotFoundError();
  }

  const responseDto = await service.getCatalogItemDetailAsync(id);
  return createCatalogItemUpsertModel(responseDto);
}
//
async function handleSubmissionAsync(): Promise<void> {
  await service.updateCatalogItemAsync(model.value.id, model.value.toRequestDto());
}

async function handleDeletionAsync(): Promise<void> {
  await service.deleteCatalogItemAsync(model.value.id);
}

async function onSubmissionOrDeletionSucceededAsync(): Promise<void> {
  await router.push(getProtectedContentRoutePath());
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
          <MainBlock v-bind:body-padding="[2, 3, 3, 3]" v-bind:title="title">
            <div class="row g-3 justify-content-center">
              <!-- Name -->
              <div class="col col-xl-4 col-12">
                <Field name="name" displayName="Tên chứng chỉ" required>
                  <TextInput
                    v-model="model.name"
                    maxlength="100"
                    placeholder="Tên chứng chỉ"
                  />
                </Field>
              </div>
              
              <!-- Thumbnail -->
              <div class="col col-xl-4 col-md-6 col-12">
                <Field name="thumbnailFile" displayName="Ảnh">
                  <ImageInput
                    v-model:file="model.thumbnailFile"
                    v-model:changed="model.thumbnailChanged"
                    placeholder="Ảnh"
                  />
                </Field>
              </div>
            </div>
          </MainBlock>
        </div>

        <div class="col col-auto">
          <DeleteButton v-if="!isForCreating" class="me-3" />
          <SubmitButton />
        </div>
      </div>
    </Form>
  </ProtectedLayout>
</template>
