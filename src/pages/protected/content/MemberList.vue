<script setup lang="ts">
import { getMemberListAsync } from "@/services/memberService";
import { createMemberDetailModel } from "@/models/memberModels";

// Layout component.
import MainBlock from "@/components/layouts/protected/MainBlock.vue";

// States.
const model = await initializeModelAsync();

// Functions.
async function initializeModelAsync(): Promise<MemberDetailModel[]> {
  const responseDtos = await getMemberListAsync();
  return responseDtos.map((dto) => createMemberDetailModel(dto));
}
</script>

<template>
  <MainBlock title="Đội ngũ" body-padding="0">
    <template #header>
      <a href="#" class="btn btn-success btn-sm">
        <i class="bi bi-plus-lg"></i>
        <span class="d-sm-inline d-none">Tạo mới</span>
      </a>
    </template>

    <template #body>
      <ul class="list-group list-group-flush">
        <li v-for="member in model" v-bind:key="member.id" class="list-group-item">
          <!-- Thumbnail -->
          <img
            v-bind:src="member.thumbnailUrl"
            v-bind:alt="member.fullName"
            class="img-thumbnail thumbnail rounded-circle"
          />

          <!-- Detail -->
          <div class="ms-2 flex-fill d-flex flex-column detail">
            <span class="fw-bold text-success">
              {{ member.fullName }}
            </span>

            <span class="small opacity-50">
              {{ member.description }}
            </span>
          </div>

          <!-- EditLink -->
          <RouterLink to="#" class="btn btn-outline-success btn-sm edit-link">
            <i class="bi bi-pencil-square"></i>
            <span class="d-sm-inline d-none ms-1">Sửa</span>
          </RouterLink>
        </li>
      </ul>
    </template>
  </MainBlock>
</template>

<style scoped>
.list-group-item {
  background-color: transparent;
  display: flex;
  align-items: center;
}

.detail, .detail span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

:deep(.edit-link) {
  flex-shrink: 0;
  margin-left: 1rem;
}
</style>
