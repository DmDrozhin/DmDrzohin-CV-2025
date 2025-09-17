<script setup>
// import { computed, ref } from 'vue';

defineProps({
  options: {
    type: Object,
    default: () => ({}),
    required: false
  }
});
</script>

<template>
  <div class="certificate" :class="options.customClass || ''">
    <div class="certificate__name">{{ options.certificate }}</div>
    <div class="certificate__institution">{{ options.institution }}</div>
  </div>
</template>

<style lang="scss" scoped>
.certificate {
  width: fit-content;
  font-size: 0.85rem;
  line-height: 1;
  &__name {
    display: grid;
    place-content: center;
    min-height: 28px;
    border-radius: 50px;
    padding: 0 8px;
    background-color: rgb(var(--v-theme-background));
    outline: 1px solid rgb(var(--v-theme-skill-chip-outline));
  }
  &__institution {
    width: inherit;
    position: relative;
    top: -4px;
    padding: 0 8px;
    color: $green-end;
    background-color: rgba(var(--v-theme-background-institution));
  }
}
</style>
<style lang="scss"></style>
