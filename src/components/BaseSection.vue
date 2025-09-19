<script setup>
import SectionTitle from '@/components/SectionTitle.vue';
import SummaryBlock from '@/components/SummaryBlock.vue';
import ExperienceBlock from '@/components/ExperienceBlock.vue';
import EducationBlock from '@/components/EducationBlock.vue';

defineProps({
  options: {
    type: Object,
    default: () => ({}),
    required: false
  }
});
</script>

<template>
  <div class="section__wrapper">
    <SectionTitle
      :options="{ text: options.key || '', darken: options.darken }"
      class="section__title"
      :class="options.id || ''"
    />
    <SummaryBlock
      v-if="options.id === 'summary'"
      :options="{ value: options.value }"
    />
    <ExperienceBlock
      v-if="options.id === 'experience'"
      :options="{ value: options.value }"
    />
    <EducationBlock
      v-if="options.id === 'education'"
      :options="{ value: options.value }"
    />
  </div>
</template>

<style lang="scss" scoped>
.section {
  &__wrapper {
    position: relative;
    width: 100%;
    font-size: 0.85rem;
  }
  &__title {
    margin: 4px 0;
  }
}
</style>

<style lang="scss">
.section {
  &__wrapper {
    a {
      color: rgb(var(--v-theme-accented-text));
      text-decoration: none;
    }
  }
}
</style>
