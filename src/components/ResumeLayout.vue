<script setup>
import { computed, ref, watch, watchEffect } from 'vue';
import { useDisplay, useTheme } from 'vuetify';

const drawer = ref(true); // будет открыт по умолчанию
const display = useDisplay();
const themeColors = useTheme().current.value.colors;

const isMobile = computed(() => useDisplay().mobile);
const vTcolors = computed(() => themeColors.value);

console.log('width:', display.width.value);
console.log('smAndDown:', display.smAndDown.value);
console.log('lgAndUp:', display.lgAndUp.value);
console.log('Mobile:', display.mobile.value);

watchEffect(() => {
  drawer.value = !display.mobile.value;
});

// Следим за изменением размера экрана
// watch(
//   () => display.mobile.value,
//   (mobile) => {
//     console.log('Watcher 1', mobile);
//     drawer.value = !mobile; // на мобилке закрыть, на десктопе открыть
//     console.log('Watcher 2', !mobile);
//     console.log('Watcher 3', drawer.value);
//   },
//   { immediate: true }
// );
</script>
<template>
  <div class="resume">
    <v-app-bar class="resume__header" absolute>
      <v-toolbar-title>Моё приложение</v-toolbar-title>
      <!-- Бургер только на мобильных -->
      <v-btn
        v-if="isMobile.value"
        class="resume__burger"
        icon
        @click="drawer = !drawer"
      >
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <!-- Боковая панель справа -->
    <v-navigation-drawer
      v-model="drawer"
      class="resume__sidebar"
      location="right"
      :permanent="!isMobile.value"
      :mobile="isMobile.value"
      color="grey-lighten-4"
      absolute
    >
      <v-list>
        <v-list-item title="Профиль" />
        <v-list-item title="Настройки" />
        <v-list-item title="Выход" />
      </v-list>
    </v-navigation-drawer>
    <!-- Основной контент -->
    <v-main>
      <v-container>
        <h1>Контент страницы</h1>
        <p>
          👉 На десктопе панель всегда справа и видна без бургера.<br />
          👉 На мобильных — панель скрыта и появляется с overlay по кнопке.
        </p>
      </v-container>
    </v-main>
  </div>
</template>
<style lang="scss" scoped>
.resume {
  width: 100%;
  max-width: 794px;
  min-height: 1123px;
  position: relative;
  margin: 0 auto;
  overflow: hidden;
  background: $grey-D1;
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.15);
}
</style>
