<script lang="ts">
interface IModel {
  id: number;
  thumbnailUrl: string;
  updateRoute: string;
}
</script>

<script setup lang="ts" generic="TModel extends IModel">
// Layout component.
import MainBlock from "@/components/layouts/protected/MainBlock.vue";

// Props.
defineProps<{
  model: TModel[],
  title: string;
  createRoute?: string;
  nameSelector: (model: TModel) => string;
  descriptionSelector?: (model: TModel) => string;
}>();
</script>

<template>
  <MainBlock v-bind:title="title" body-padding="0">
    <template #header>
      <RouterLink v-if="createRoute" v-bind:to="createRoute" class="btn btn-success btn-sm">
        <i class="bi bi-plus-lg"></i>
        <span class="d-sm-inline d-none">Tạo mới</span>
      </RouterLink>
    </template>

    <template #body>
      <ul class="list-group list-group-flush">
        <li v-for="item in model" v-bind:key="item.id" class="list-group-item">
          <!-- Thumbnail -->
          <img
            v-bind:src="item.thumbnailUrl"
            v-bind:alt="nameSelector(item)"
            class="img-thumbnail thumbnail rounded-circle"
          />

          <!-- Detail -->
          <div class="ms-2 flex-fill d-flex flex-column detail">
            <span class="fw-bold text-success">
              {{ nameSelector(item) }}
            </span>

            <span v-if="descriptionSelector" class="small opacity-50">
              {{ descriptionSelector(item) }}
            </span>
          </div>

          <!-- EditLink -->
          <RouterLink
            v-bind:to="item.updateRoute"
            class="btn btn-outline-success btn-sm edit-link"
          >
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
