<template>
  <template v-if="inline">
    <slot></slot>
  </template>
  <template v-else>
    <Teleport :to="appendTo">
      <slot></slot>
    </Teleport>
  </template>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps({
  appendTo: {
    type: String,
    default: "body",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});
const inline = computed(() => props.disabled || props.appendTo === "self");
</script>
