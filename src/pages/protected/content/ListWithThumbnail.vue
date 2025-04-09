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
          <RouterLink v-bind:to="item.updateRoute" class="thumbnail-link">
            <img
              v-bind:src="item.thumbnailUrl"
              v-bind:alt="nameSelector(item)"
              class="img-thumbnail thumbnail rounded-circle"
            />
          </RouterLink>

          <!-- Detail -->
          <div class="ms-2 flex-fill d-flex flex-column detail">
            <RouterLink v-bind:to="item.updateRoute" class="fw-bold text-success name-link">
              {{ nameSelector(item) }}
            </RouterLink>

            <span v-if="descriptionSelector" class="small opacity-50">
              {{ descriptionSelector(item) }}
            </span>
          </div>
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

.thumbnail-link {
  width: fit-content;
  height: fit-content;
  flex-shrink: 0;
}

.thumbnail {
  width: 60px;
  height: auto;
  aspect-ratio: 1;
  object-fit: cover;
}

.detail, .detail span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.name-link {
  text-decoration: none;
}

.name-link:hover {
  text-decoration: underline;
}
</style>
