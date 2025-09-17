<!-- eslint-disable vue/no-v-html -->
<script setup>
defineProps({
  options: {
    type: Object,
    default: () => ({}),
    required: false
  }
});
</script>

<template>
  <ul class="summary">
    <li
      v-for="(entry, idx) in options.value"
      :key="idx"
      class="summary__entry"
      v-html="entry"
    />
  </ul>
</template>

<style lang="scss" scoped>
.summary {
  width: 100%;
  list-style: none;
  &__entry {
    position: relative;
  }
  &__entry::before {
    content: '✪';
    color: $green-md;
    font-size: 1rem;
    position: absolute;
    top:  -0.12rem;
    left: -1rem;
  }
}
</style>

<style lang="scss"></style>
