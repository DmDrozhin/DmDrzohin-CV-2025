<script setup>
import PagePreloader from '@/components/PagePreloader.vue';
import { computed, onBeforeMount, ref, watch, watchEffect } from 'vue';
import { useDisplay, useTheme } from 'vuetify';
import { useMainStore } from '@/stores/main.store.js';
import { createAssetMap } from '@/utils/assets';
const theme = useTheme();
const store = useMainStore();
const isLoading = computed(() => store.loading || false);
const resume = computed(() => store.resume || {});
const drawer = ref(true); // будет открыт по умолчанию
const display = useDisplay();
const isMobile = computed(() => useDisplay().mobile);

console.log('width:', display.width.value);
console.log('smAndDown:', display.smAndDown.value);
watchEffect(() => {
  drawer.value = !display.mobile.value;
});
onBeforeMount(() => store.fetchResume());
// import all images from folder
const avatars = import.meta.glob('@/assets/images/avatars/*', { eager: true });
// making object like { DmDrzohin.jpeg: '/assets/DmDrzohin.123abc.jpeg' }
const avatarMap = createAssetMap(avatars);
// dynamic image choice
const avatarUrl = computed(() => {
  // if resume = null → return empty string
  if (!store.resume || !store.resume.avatar) {
    return '';
  }
  return avatarMap[store.resume.avatar] || '';
});
// The same for icons
const icons = import.meta.glob('@/assets/images/ui/*', { eager: true });
const iconsMap = createAssetMap(icons);
const metaData = computed(() => {
  if (!store.resume?.contacts?.length) {
    return [];
  }
  return store.resume.contacts.map((it) => ({
    item: it.item,
    link: it.link,
    icon: iconsMap[it.icon] || ''
  }));
});
// реактивно следим за сменой темы
watch(
  () => store.currentTheme,
  (newTheme) => {
    theme.change(newTheme);
  },
  { immediate: true }
);
</script>
<template>
  <div class="my-resume">
    <PagePreloader v-if="isLoading" />
    <v-app-bar class="my-resume__header" absolute height="auto">
      <div class="user__wrapper">
        <div class="user__titles">
          <div class="user__name">{{ resume.name }}</div>
          <div class="user__title">{{ resume.title }}</div>
          <div class="user__location">{{ resume.location }}</div>
        </div>
        <v-img
          v-if="avatarUrl"
          class="user__photo"
          :src="avatarUrl"
          height="150"
          width="150"
          alt="avatar"
        />
        <v-icon v-else size="150" color="#969595" icon="mdi-account-tie" />
        <div class="user__meta-data">
          <v-btn
            v-for="contact in metaData"
            :key="contact.item"
            :href="contact.link"
            target="_blank"
            rel="noopener"
            tag="a"
            variant="text"
            class="user__meta-item"
          >
            <v-img :src="contact.icon" height="24" width="24" />
            <span class="user__meta-item-txt">{{ contact.item }}</span>
          </v-btn>
        </div>
      </div>
      <!-- Бургер только на мобильных -->
      <v-btn
        v-if="isMobile.value"
        class="my-resume__burger"
        icon
        @click="drawer = !drawer"
      >
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <!-- Боковая панель справа -->
    <v-navigation-drawer
      v-model="drawer"
      class="my-resume__sidebar"
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
.my-resume {
  width: 100%;
  max-width: 794px;
  min-height: 1123px;
  position: relative;
  margin: 0 auto;
  overflow: hidden;
  background: $background-main;
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.15);
  &__header {
  }
  &__burger {
  }
}
.user {
  &__wrapper {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr auto;
    grid-template-rows: auto auto;
    grid-template-areas:
      'titles photo'
      'meta-data meta-data';
    background-color: $background-header;
  }
  &__titles {
    grid-area: titles;
    padding: 24px 32px;
  }
  &__name {
    font-size: 2rem;
    letter-spacing: 2.7px;
    margin-bottom: 8px;
  }
  &__title {
    font-size: 1.4rem;
  }
  &__location {
  }
  &__contacts {
  }
  &__photo {
    grid-area: photo;
    border-radius: 16px 0 0 0 !important;
  }
  &__meta-data {
    grid-area: meta-data;
    display: flex;
    flex-wrap: wrap;
    background-color: $background-contacts;
  }
  &__meta-item {
    flex-grow: 1;
    padding: 0 8px !important;
  }
  &__meta-item:hover::before {
    content: '';
    position: absolute;
    top: -1px;
    height: 1px;
    width: 100%;
    background-color: $green-md;
  }
  &__meta-item-txt {
    font-size: 0.75rem;
    font-weight: 500;
    max-width: 150px;
    color: $white;
    line-height: 1;
    @include Txt-ellipsis;
  }
}
</style>
<style lang="scss">
.user {
  &__meta-data {
    .v-btn {
      border-radius: 0 !important;
      &__overlay {
        background: rgba(#000, 0.15) !important;
        color: $white !important;
      }
      &__content {
        gap: 8px;
      }
    }
    .v-ripple__animation {
      background-color: rgba(255, 255, 255, 0.15) !important;
    }
  }
}
</style>
