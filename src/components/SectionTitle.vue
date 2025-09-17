<script setup>
import { computed, ref } from 'vue';
const props = defineProps({
  options: {
    type: Object,
    default: () => {}
  }
});
const firstLetter = computed(
  () => props.options.text?.charAt(0).toUpperCase() || ''
);
</script>
<template>
  <div class="title-block">
    <div class="title-block__capitalized" :class="{ darken: options.darken }">
      {{ firstLetter }}
    </div>
    <div class="title-block__name">
      {{ options.text || '' }}
    </div>
  </div>
</template>
<style lang="scss" scoped>
.title-block {
  display: flex;
  gap: 12px;
  align-items: center;
  &__capitalized {
    flex-shrink: 0;
    position: relative;
    $size: 32px;
    width: $size;
    height: $size;
    display: grid;
    place-content: center;
    background-color: rgb(var(--v-theme-background-letter));
    border-radius: 50%;
    line-height: 1;
    color: $light;
    font-size: 1.2rem;
    z-index: 1;
    font-weight: bold;
    outline: 6px solid rgb(var(--v-theme-background-letter-2));
  }
  &__capitalized.darken {
    outline: 6px solid rgb(var(--v-theme-background-letter-3));
  }
  &__name {
    line-height: 1;
    text-transform: uppercase;
    font-size: 1.2rem;
    letter-spacing: 0.2rem;
  }
}
</style>
