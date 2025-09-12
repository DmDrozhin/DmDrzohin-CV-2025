<script setup>
import { ref, watch } from 'vue';

const emit = defineEmits(['change-lang', 'change-theme']);
const currentLanguage = ref('ua');
const currentTheme = ref('light');
watch(
  () => currentTheme.value,
  (newTheme) => {
    if (newTheme !== undefined) {
      emit('change-theme', newTheme);
    }
  },
  { immediate: true }
);
watch(
  () => currentLanguage.value,
  (lang) => {
    if (lang !== undefined) {
      emit('change-lang', lang);
    }
  },
  { immediate: true }
);
</script>
<template>
  <div class="switcher-block">
    <v-btn-toggle
      :key="1"
      v-model="currentLanguage"
      class="switcher-block__toggle language"
      density="compact"
    >
      <v-btn variant="text" size="x-small" slim value="ua">UA</v-btn>
      <v-btn variant="text" size="x-small" slim value="en">EN</v-btn>
    </v-btn-toggle>
    <v-btn-toggle
      :key="2"
      v-model="currentTheme"
      class="switcher-block__toggle theme"
      density="compact"
    >
      <v-btn variant="text" size="x-small" slim value="light">Light</v-btn>
      <v-btn variant="text" size="x-small" slim value="dark">Dark</v-btn>
    </v-btn-toggle>
  </div>
</template>
<style lang="scss" scoped>
.switcher-block {
  &__toggle {
    max-height: 20px;
    overflow-x: hidden;
  }
  &__toggle.theme::before {
    content: '|';
    margin: 0 8px;
    line-height: 1;
    color: rgba(var(--v-theme-background-divider));
  }
}
</style>
