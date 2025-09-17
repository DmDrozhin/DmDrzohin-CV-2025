<script setup>
import { computed } from 'vue';

const props = defineProps({
  options: {
    type: Object,
    default: () => ({})
  }
});

// Собираем массив для вывода иконок/скиллов
const source = computed(() => {
  if (props.options.type === 1) {
    return [
      {
        item: props.options.skill,
        src: props.options.img
          ? new URL(`../assets/images/ui/${props.options.img}`, import.meta.url)
              .href
          : null,
        size: props.options.img_size
      }
    ];
  }
  if (props.options.type === 2) {
    return props.options.skill.map((s) => ({
      item: s.item,
      src: s.img
        ? new URL(`../assets/images/ui/${s.img}`, import.meta.url).href
        : null,
      size: s.img_size
    }));
  }
  return [];
});
</script>

<template>
  <!-- Внешний контейнер: сюда Vue автоматически навесит class="section__skill-block" -->
  <!-- <div v-bind="$attrs"> -->
  <!-- Multiple chips block -->
  <div
    v-if="options.type === 2 && source.length"
    class="skill block"
    :class="[
      { accented: options.skill[0].item === 'Vue' },
      options.customClass || ''
    ]"
  >
    <div
      v-for="(skill, idx) in source"
      :key="idx"
      class="skill"
      :class="skill.item.toLowerCase()"
    >
      <v-img
        v-if="skill.src"
        :src="skill.src"
        :width="skill.size"
        class="skill__icon"
        :class="{ shifted: options.skill[0].item === 'Vue' }"
      />
      {{ skill.item }}
    </div>
  </div>

  <!-- Single chip block -->
  <div
    v-else-if="options.type === 1"
    class="skill simple"
    :class="[
      options.skill.toLowerCase(),
      { accented: options.skill === 'Swiper Element' },
      options.customClass || ''
    ]"
  >
    <v-img
      v-if="source[0].src"
      :src="source[0].src"
      :min-width="source[0].size"
      :alt="source[0].item"
    />
    {{ source[0].item }}
  </div>
  <!-- </div> -->
</template>
<style lang="scss" scoped>
.skill {
  flex-shrink: 1;
  min-height: 28px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  gap: 4px;
  line-height: 1;
  font-size: 0.85rem;
  background-color: rgb(var(--v-theme-background));
  position: relative;
  &__icon {
    &.shifted {
      position: relative;
      top: 2px;
    }
  }
  &.accented::before {
    content: '';
    position: absolute;
    $offset: 8px;
    $size: calc(28px + $offset * 2);
    top: -$offset;
    left: -$offset;
    border-radius: 50%;
    width: $size;
    height: $size;
    z-index: -1;
    background-color: rgb(var(--v-theme-background-letter-3));
    outline: 1px solid rgb(var(--v-theme-skill-chip-outline));
  }
  &.simple {
    outline: 1px solid rgb(var(--v-theme-skill-chip-outline));
    padding: 0 8px;
  }
  &.block {
    max-width: 100%;
    width: fit-content;
    outline: 1px solid rgb(var(--v-theme-skill-chip-outline));
    padding: 0 8px;
    flex-wrap: nowrap;
    justify-content: space-between;
    gap: 8px;
  }
}
</style>
