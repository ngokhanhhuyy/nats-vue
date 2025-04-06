<script setup lang="ts">
import { getAboutUsIntroductionAsync } from "@/services/aboutUsIntroductionService";
import { getMemberListAsync } from "@/services/memberService";
import { getCertificateListAsync } from "@/services/certificateService";
import { createAboutUsIntroductionDetailModel } from "@/models/aboutUsIntroductionModels";
import { createMemberDetailModel } from "@/models/memberModels";
import { createCertificateDetailModel } from "@/models/certificateModels";

// Layout component.
import PublicSubLayout from "@/components/layouts/public/PublicSubLayout.vue";

// Child component.
import Content from "./Content.vue";

// States.
const model = await initializeModelAsync();

// Functions.
async function initializeModelAsync() {
  const [
    aboutUsIntroductionResponseDto,
    memberResponseDtos,
    certificateResponseDtos
  ] = await Promise.all([
    getAboutUsIntroductionAsync(),
    getMemberListAsync(),
    getCertificateListAsync()
  ]);

  return {
    aboutUsIntroduction: createAboutUsIntroductionDetailModel(aboutUsIntroductionResponseDto),
    members: memberResponseDtos.map(dto => createMemberDetailModel(dto)),
    certificates: certificateResponseDtos.map(dto => createCertificateDetailModel(dto))
  };
}
</script>

<template>
  <PublicSubLayout>
    <div class="container p-4">
      <!-- Thumbnail -->
      <div class="row justify-content-center px-3 py-3 mb-4">
        <div class="col col-xl-6 col-lg-7 col-md-8 col-12 order-lg-0 order-1">
          <img
            v-bind:src="model.aboutUsIntroduction.thumbnailUrl"
            class="w-100 rounded-4 shadow"
            alt="Về chúng tôi"
          />
        </div>
      </div>


      <div class="row gx-5 gy-3 justify-content-center">
        <Content
          v-bind:content="model.aboutUsIntroduction.aboutUsContent"
          title="Về chúng tôi"
        />
        
        <Content
          v-bind:content="model.aboutUsIntroduction.whyChooseUsContent"
          title="Vì sao chọn chúng tôi"
        />
        
        <Content
          v-bind:content="model.aboutUsIntroduction.ourDifferenceContent"
          title="Sự khác biệt của chúng tôi"
        />
        
        <Content
          v-bind:content="model.aboutUsIntroduction.ourCultureContent"
          title="Văn hoá của chúng tôi"
        />
      </div>
      
      <!-- Members -->
      <div class="row gx-5 gy-3 justify-content-center mt-2">
        <div class="col col-lg-12 col-md-10 col-12">
          <h2 class="text-success text-center fw-normal">
            Đội ngũ của chúng tôi
          </h2>
        </div>

        <div
          v-for="(member, index) in model.members"
          v-bind:key="index"
          class="col col-xl-5 col-lg-6 col-md-8 col-sm-10 col-12 member-column"
        >
          <img
            v-bind:src="member.thumbnailUrl"
            v-bind:alt="member.fullName"
            class="rounded-circle shadow flex-shrink-0 mb-3 member-thumbnail"
          />

          <!-- FullName -->
          <h4 class="bg-success-subtle border border-success-subtle rounded text-success px-2">
            {{ member.fullName }}
          </h4>

          <!-- RoleName -->
          <span class="text-success fw-bold mb-3">
            {{ member.roleName }}
          </span>

          <!-- Description -->
          <span
            v-for="(paragraph, index) in member.description.split(/\r?\n/)"
            v-bind:key="index"
          >
            {{ paragraph }}
          </span>
          
        </div>
      </div>

      <!-- Certificates -->
      <div class="row gx-5 gy-3 justify-content-center my-2">
        <div class="col col-md-10 col-12">
          <h2 class="text-success text-center fw-normal m-0">
            Chứng chỉ
          </h2>
        </div>

        <div
          v-for="certificate in model.certificates"
          v-bind:key="certificate.id"
          class="col col-xl-5 col-md-10 col-12"
        >
          <div class="d-flex flex-column justify-content-stretch align-items-stretch">
            <img
              v-bind:src="certificate.thumbnailUrl"
              v-bind:alt="certificate.name"
              class="rounded-top-3 shadow"
            />
            
            <div class="fs-5 fw-bold px-3 py-2 shadow rounded-bottom-3 certificate-name">
              {{ certificate.name }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </PublicSubLayout>
</template>

<style scoped>
.member-column {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.member-thumbnail {
  width: 150px;
  height: auto;
  aspect-ratio: 1;
}

.certificate-name {
  background: rgba(var(--bs-success-rgb), 0.1);
  color: var(--bs-success);
  text-align: center;
  border: 1px solid var(--bs-success);
}
</style>