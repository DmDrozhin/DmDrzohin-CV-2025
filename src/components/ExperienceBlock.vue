<script setup>
import { computed } from 'vue';
import { createAssetMap } from '@/utils/assets';

const props = defineProps({
  options: {
    type: Object,
    default: () => ({}),
    required: false
  }
});

const icons = import.meta.glob('@/assets/images/ui/*', { eager: true });
const iconsMap = createAssetMap(icons);
const metaData = computed(() => {
  if (!props.options?.value?.length) {
    return [];
  }
  return props.options.value.map((it) => ({
    ...it,
    company_icon: iconsMap[it.company_icon] || ''
  }));
});
</script>

<template>
  <div class="experience">
    <div
      v-for="(entry, idx) in metaData"
      :key="idx"
      class="experience__entry"
    >
      <div class="experience__position">{{ entry.position }}</div>
      <div class="experience__wrapper">
        <div class="experience__flex-wrapper">
          <v-img :src="entry.company_icon" :width="entry.company_icon_size" alt="entity logo"/>
          <div class="experience__company">{{ entry.company }}</div>
        </div>
        <div class="experience__period">{{ entry.period }}</div>
      </div>
      <ul>
        <li
          v-for="(it, it_idx) in entry.achievements"
          :key="it_idx"
          v-html="it"
        ></li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.experience {
  width: 100%;
  min-height: 500px;
  &__position {
    font-size: 1rem;
    font-weight: 600;
    padding: 0 20px;
  }
  &__wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
    padding: 0 0 0 20px;
  }
  &__flex-wrapper {
    display: flex;
    align-items: center;
    gap: 4px;
  }
  &__company {
    color:  rgb(var(--v-theme-background-divider));
  }
  &__period {
    color:  rgb(var(--v-theme-accented-text));
  }
}
</style>

<style lang="scss"></style>
