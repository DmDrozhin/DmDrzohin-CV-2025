<script setup>
import PagePreloader from '@/components/PagePreloader.vue';
import { computed, onBeforeMount, ref, watch, watchEffect } from 'vue';
import { useDisplay, useTheme } from 'vuetify';
import { useMainStore } from '@/stores/main.store.js';
import { createAssetMap } from '@/utils/assets';
import SwitchersBlock from '@/components/SwitchersBlock.vue';
const theme = useTheme();
const store = useMainStore();
const display = useDisplay();
const isLoading = computed(() => store.loading || false);
const resume = computed(() => store.resume || {});
const drawer = ref(true); // будет открыт по умолчанию
const isSmallAndDown = computed(() => display.smAndDown || false);
const isXSmall = computed(() => display.xs || false);
// watchEffect(() => {
//   drawer.value = !isSmallAndDown.value;
// });
onBeforeMount(() => store.fetchResume());

// import all images from folder
const avatars = import.meta.glob('@/assets/images/avatars/*', { eager: true });
// making object like { DmDrzohin.jpeg: '/assets/DmDrzohin.123abc.jpeg' }
const avatarMap = createAssetMap(avatars);
// dynamic image choice
const avatarUrl = computed(() => {
  // define photo depending on current theme
  const currentAvatar =
    theme.name.value === 'light' ? 'avatar_light' : 'avatar_dark';
  // if resume = null → return empty string
  if (!store.resume || !store.resume[currentAvatar]) {
    return '';
  }
  return avatarMap[store.resume[currentAvatar]] || '';
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
    icon: iconsMap[it.icon] || '',
    size: it.size
  }));
});
const changeLanguage = (lang) => {
  if (lang === 'ua' || lang === 'en') {
    store.fetchResume(lang);
  }
};
const changeTheme = (themeName) => {
  if (themeName === 'light' || themeName === 'dark') {
    store.setTheme(themeName);
    theme.change(themeName);
  }
};
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
          <SwitchersBlock
            class="user__switcher"
            @change-lang="changeLanguage"
            @change-theme="changeTheme"
          />
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
        <div v-if="metaData.length" class="user__meta-data">
          <v-btn
            v-for="contact in metaData"
            :key="contact.item"
            :href="contact.link"
            target="_blank"
            rel="noopener"
            tag="a"
            variant="text"
            size="small"
            class="user__button meta-item"
          >
            <v-img
              :src="contact.icon"
              :height="contact.size"
              :width="contact.size"
            />
            <span class="user__button-txt">{{ contact.item }}</span>
          </v-btn>
          <v-tooltip
            :text="drawer ? 'Close skills' : 'Open skills'"
            location="top"
            max-height="24"
          >
            <template #activator="{ props }">
              <v-btn
                v-if="isSmallAndDown.value"
                v-bind="props"
                class="user__button skills"
                icon
                :size="isXSmall.value ? 'large' : 'x-small'"
                position="absolute"
                location="end"
                :class="{ small: isXSmall }"
                @click="drawer = !drawer"
              >
                <v-icon
                  :size="isXSmall.value ? 48 : 32"
                  color="icon"
                  class="user__button-icon"
                  :class="{ open: drawer }"
                  >mdi-arrow-left-circle</v-icon
                >
              </v-btn>
            </template>
          </v-tooltip>
        </div>
        <div class="user__gradient"></div>
      </div>
    </v-app-bar>
    <!-- Right sidebar -->
    <v-navigation-drawer
      v-model="drawer"
      class="my-resume__sidebar"
      location="right"
      :permanent="!isSmallAndDown.value"
      :mobile="isSmallAndDown.value"
      color="grey-lighten-4"
      absolute
    >
      <v-list>
        <v-list-item title="Профиль" />
        <v-list-item title="Настройки" />
        <v-list-item title="Выход" />
      </v-list>
    </v-navigation-drawer>
    <!-- Main content -->
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
@use 'vuetify/settings' as *;
.my-resume {
  width: 100%;
  max-width: 794px;
  min-width: 320px;
  min-height: 1123px;
  position: relative;
  margin: 0 auto;
  overflow: hidden;
  background-color: rgba(var(--v-theme-background-page));
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.15);
  &__header {
    overflow: visible !important;
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
      'meta-data meta-data'
      'gradient gradient';
    background-color: rgba(var(--v-theme-background-header));
    transition: all 0.3s ease-in;
    @include media-down(xs) {
      padding-top: 12px;
      grid-template-columns: 1fr;
      grid-template-areas:
        'photo'
        'titles'
        'meta-data'
        'gradient';
    }
    @include media-down(xxs) {
      padding-top: 40px;
    }
  }
  &__titles {
    position: relative;
    grid-area: titles;
    padding: 24px 32px;
    @include media-down(xs) {
      position: static;
      text-align: center;
    }

    @include media-up(md-up) {
      // background: rgb(205, 234, 238);
    }

    @include media-between(sm-up, lg-down) {
      // border: 1px dashed rgb(11, 11, 247);
    }
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
    margin-top: auto;
    @include media-down(xs) {
      margin-inline: auto;
    }
  }
  &__switcher {
    position: absolute;
    top: 4px;
    right: 8px;
  }
  &__meta-data {
    position: relative;
    grid-area: meta-data;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    background-color: rgba(var(--v-theme-background-meta));
    @include media-down(sm-down) {
      padding-right: 80px;
    }
    @include media-down(xs) {
      flex-direction: column;
      row-gap: 8px;
      padding: 12px 80px;
    }
    @media screen and (max-width: 380px) {
      padding: 12px 12px 56px 12px;
    }
  }
  &__button.meta-item {
    flex: 1 0 auto;
    border-radius: 0 !important;
    padding: 0 8px !important;
    @include media-down(xs) {
      width: 100%;
      max-width: 200px;
      flex-shrink: 1;
    }
  }
  &__button.skills {
    flex-shrink: 0;
    margin: 0 8px;
    right: 16px !important;
    transition: all 0.3s ease-in;
    @media screen and (max-width: 380px) {
      top: unset !important;
      bottom: -16px;
      margin: 0;
    }
  }
  &__button.skills::before {
    content: '';
    position: absolute;
    $offset: 3px;
    top: -$offset;
    left: -$offset;
    width: calc(100% + $offset * 2);
    height: calc(100% + $offset * 2);
    border-radius: 50%;
    background-color: rgb(var(--v-theme-background-skills-button));
  }
  &__button.meta-item:hover::before {
    content: '';
    position: absolute;
    top: -1px;
    height: 1px;
    width: 100%;
    background-color: $green-md;
  }
  &__button-txt {
    font-size: 0.75rem;
    font-weight: 500;
    max-width: 150px;
    color: $white;
    line-height: 1;
    @include Txt-ellipsis;
  }
  &__button-icon {
    transition: transform 0.3s linear;
    &.open {
      transform: rotate(-180deg);
    }
  }
  &__gradient {
    grid-area: gradient;
    width: 100%;
    height: 50px;
    background: linear-gradient(
      90deg,
      rgb(var(--v-theme-background-gradient-start)) 0%,
      rgb(var(--v-theme-background-gradient-middle)) 50%,
      rgb(var(--v-theme-background-gradient-end)) 100%
    );
  }
}
</style>
<style lang="scss">
.my-resume {
  .v-toolbar {
    &__content {
      overflow: visible;
    }
  }
}
.user {
  &__meta-data {
    .v-btn {
      --v-hover-opacity: 0.85;
      &__overlay {
        background: rgba(#000, 0.15) !important;
      }
      &__content {
        gap: 8px;
      }
    }
  }
}
</style>
