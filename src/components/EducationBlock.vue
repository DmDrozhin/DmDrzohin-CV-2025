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
  <div v-if="options.value.length" class="education">
    <div v-for="it, idx in options.value" :key="idx" class="education__entry">
      <div class="education__institution">{{ it.institution }}</div>
      <div class="education__degree">{{ it.degree }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.education {
  outline: 1px solid greenyellow;
  width: 100%;
  padding: 0 20px;
  &__institution {
    font-size: 1rem;
    font-weight: 600;
  }

}
</style>
<style lang="scss"></style>
