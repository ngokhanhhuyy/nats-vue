<script setup lang="ts">
import { computed } from "vue";

// Props.
const props = defineProps<{
  title: string;
  color?: "primary" | "success" | "danger";
  headerClass?: string;
  paginator?: boolean;
  bodyClass?: string;
  bodyPadding?: string | number | [number, number] | [number, number, number, number];
  bodyBorder?: boolean;
}>();

// Computed.
const headerComputedClass = computed<string>(() => {
  let className = `bg-${props.color}-subtle border-${props.color}-subtle`;
  if (props.headerClass) {
    className += ` ${props.headerClass}`;
  }
  
  return className;
});

const bodyComputedClass = computed<string | null>(() => {
  const classNames: string[] = [];
  if (props.bodyClass) {
    classNames.push(props.bodyClass);
  }

  if (props.bodyBorder) {
    classNames.push("border border-top-0");
  }

  if (Array.isArray(props.bodyPadding)) {
    if (props.bodyPadding.length === 2) {
      const [x, y] = props.bodyPadding;
      classNames.push(`px-${x} py-${y}`);
    } else {
      const [top, end, bottom, start] = props.bodyPadding;
      classNames.push(`pt-${top} pe-${end} pb-${bottom} ps-${start}`);
    }
  } else {
    classNames.push(`p-${props.bodyPadding}`);
  }

  return classNames.length ? classNames.join(" ") : null;
});
</script>

<template>
  <div class="d-flex flex-column">
    <div v-bind:class="headerComputedClass" class="block-header">
      <span class="fw-bold small text-success h-auto pt-1">
        {{ title.toUpperCase() }}
      </span>

      <slot name="header"></slot>
    </div>

    <div v-bind:class="bodyComputedClass" class="block-body flex-fill">
      <slot>
        <slot name="body"></slot>
      </slot>
    </div>
  </div>
</template>

<style scoped>
.block-header {
  background-color: rgba(var(--bs-success-rgb), 0.1);
  border: 1px solid rgba(var(--bs-success-rgb), 0.25);
  border-top-left-radius: var(--bs-border-radius-lg);
  border-top-right-radius: var(--bs-border-radius-lg);
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 45px;
  padding: .5rem;
  padding-left: .75rem;
}

.block-body {
  background-color: white;
  border: 1px solid rgba(var(--bs-success-rgb), 0.25);
  border-top-width: 0;
  border-bottom-left-radius: var(--bs-border-radius-lg);
  border-bottom-right-radius: var(--bs-border-radius-lg);
}
</style>
