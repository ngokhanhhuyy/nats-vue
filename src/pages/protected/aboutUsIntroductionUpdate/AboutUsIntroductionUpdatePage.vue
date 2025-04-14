<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import * as service from "@/services/aboutUsIntroductionService";
import { createAboutUsIntroductionUpdateModel } from "@/models/aboutUsIntroductionModels";
import { getProtectedContentRoutePath } from "@/utils/routeUtils";

// Layout components.
import ProtectedLayout from "@/components/layouts/protected/ProtectedLayout.vue";
import MainBlock from "@/components/layouts/protected/MainBlock.vue";

// Form components.
import Form from "@/components/form/Form.vue";
import Field from "@/components/form/Field.vue";
import TextAreaInput from "@/components/form/TextAreaInput.vue";
import ImageInput from "@/components/form/ImageInput.vue";
import SubmitButton from "@/components/form/SubmitButton.vue";

// Dependencies.
const router = useRouter();

// States.
const model = ref(await initializeModelAsync());

// Functions.
async function initializeModelAsync(): Promise<AboutUsIntroductionUpdateModel> {
  const responseDto = await service.getAboutUsIntroductionAsync();
  return createAboutUsIntroductionUpdateModel(responseDto);
}

async function handleSubmissionAsync(): Promise<void> {
  await service.updateAboutUsIntroductionAsync(model.value.toRequestDto());
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
              <!-- Thumbnail -->
              <div class="col col-12">
                <Field name="thumbnailFile" displayName="Ảnh">
                  <ImageInput
                    v-model:file="model.thumbnailFile"
                    v-model:changed="model.thumbnailChanged"
                    placeholder="Ảnh"
                  />
                </Field>
              </div>

              <!-- AboutUsContent -->
              <div class="col col-lg-6 col-12">
                <Field name="aboutUsContent" displayName="Về chúng tôi">
                  <TextAreaInput
                    v-model="model.aboutUsContent"
                    v-bind:min-height="250"
                    maxlength="1500"
                    placeholder="Về chúng tôi"
                  />
                </Field>
              </div>

              <!-- WhyChooseUsContent -->
              <div class="col col-lg-6 col-12">
                <Field name="whyChooseUsContent" displayName="Vì sao chọn chúng tôi">
                  <TextAreaInput
                    v-model="model.whyChooseUsContent"
                    v-bind:min-height="250"
                    maxlength="1500"
                    placeholder="Vì sao chọn chúng tôi"
                  />
                </Field>
              </div>

              <!-- OurDifferenceContent -->
              <div class="col col-lg-6 col-12">
                <Field name="ourDifferenceContent" displayName="Sự khác biệt của chúng tôi">
                  <TextAreaInput
                    v-model="model.ourDifferenceContent"
                    v-bind:min-height="250"
                    maxlength="1500"
                    placeholder="Sự khác biệt của chúng tôi"
                  />
                </Field>
              </div>

              <!-- OurCultureContent -->
              <div class="col col-lg-6 col-12">
                <Field name="ourCultureContent" displayName="Văn hóa của chúng tôi">
                  <TextAreaInput
                    v-model="model.ourCultureContent"
                    v-bind:min-height="250"
                    maxlength="1500"
                    placeholder="Văn hóa của chúng tôi"
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
