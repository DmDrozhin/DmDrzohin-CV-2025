<script setup>
defineProps({
  options: {
    type: Object,
    default: () => ({})
  }
});
</script>

<template>
  <!-- Multiple items chip block -->
  <div
    v-if="options.type === 2 && options.skill.length"
    class="skill block"
    :class="[
      { accented: options.skill[0].item === 'Vue' },
      options.customClass || ''
    ]"
  >
    <div
      v-for="(skill, idx) in options.skill"
      :key="idx"
      class="skill"
      :class="skill.item.toLowerCase()"
    >
      <v-img
        v-if="skill.src"
        :src="skill.src"
        :width="skill.img_size"
        class="skill__icon"
        :class="{ shifted: skill.item === 'Vue' }"
        alt="skill icon"
      />
      <div class="skill__name">{{ skill.item }}</div>
    </div>
  </div>
  <!-- Single item chip block -->
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
      v-if="options.src"
      class="skill__icon"
      :src="options.src"
      :min-width="options.img_size"
      :alt="`${options.skill} icon`"
    />
    <div class="skill__name">{{ options.skill }}</div>
  </div>
</template>
<style lang="scss" scoped>
.skill {
  flex-shrink: 1;
  min-height: 28px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  gap: 4px;
  background-color: rgb(var(--v-theme-background));
  position: relative;
  overflow: visible;
  z-index: auto;
  &__icon {
    flex-shrink: 0;
    &.shifted {
      position: relative;
      top: 2px;
    }
  }
  &__name {
    line-height: 1;
    font-size: 0.85rem;
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
