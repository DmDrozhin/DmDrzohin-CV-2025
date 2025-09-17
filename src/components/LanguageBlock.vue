<script setup>
import { getAssetPath } from '@/utils/assets';

defineProps({
  options: {
    type: Object,
    default: () => ({}),
    required: false
  }
});
</script>
<template>
  <div
    v-if="options.language"
    class="language"
    :class="options.customClass || ''"
  >
    <div class="language__name">{{ options.language }}</div>
    <img :src="getAssetPath('divider.svg')" width="4" />
    <div v-if="options.level" class="language__level">
      {{ options.level }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.language {
  display: flex;
  width: fit-content;
  align-items: center;
  gap: 4px;
  min-height: 28px;
  line-height: 1;
  font-size: 0.85rem;
  border-radius: 50px;
  padding: 0 8px;
  background-color: rgb(var(--v-theme-background));
  outline: 1px solid rgb(var(--v-theme-skill-chip-outline));
}
</style>

<style lang="scss"></style>
