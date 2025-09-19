<script setup>
import PagePreloader from '@/components/PagePreloader.vue';
import SidebarSection from '@/components/SidebarSection.vue';
import BaseSection from '@/components/BaseSection.vue';
import { computed, onBeforeMount, onBeforeUnmount, onMounted, ref } from 'vue';
import { useDisplay, useTheme } from 'vuetify';
import { useMainStore } from '@/stores/main.store.js';
import { createAssetMap } from '@/utils/assets';
import SwitchersBlock from '@/components/SwitchersBlock.vue';
import SliderSwiper from '@/components/SliderSwiper.vue';
const theme = useTheme();
const store = useMainStore();
const display = useDisplay();
const isLoading = computed(() => store.loading || false);
const resume = computed(() => store.resume || {});
const drawer = ref(true); // open by default
const isSmallAndDown = computed(() => display.smAndDown ?? false);
const isXSmall = computed(() => display.xs ?? false);

// 1) Importing all images from folder
const avatars = import.meta.glob('@/assets/images/avatars/*', { eager: true });
// 2) Making object map like { name.jpeg: '/assets/images/name.jpeg' }
const avatarMap = createAssetMap(avatars);
// 3) Dynamic choice of the image
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
// Observing height of header and calculating height of sidebar
const resumeHeader = ref(null);
const headerHeight = ref(null);
const headerHeightMob = ref(null);
const observer = new ResizeObserver((entries) => {
  if (entries.length) {
    const { top, height } = entries[0].contentRect;
    headerHeight.value = height;
    headerHeightMob.value = top + height;
  }
});
onMounted(() => observer.observe(resumeHeader.value));
// Stop observing the header
onBeforeUnmount(() => {
  if (resumeHeader.value) {
    observer.unobserve(resumeHeader.value);
  }
});
const lang = computed(() => store.language || 'ua');
const translations = {
  ua: {
    summary: 'про себе',
    experience: 'досвід роботи',
    education: 'освіта',
    skills: 'навички',
    certificates: 'сертифікати',
    languages: 'мови'
  },
  en: {
    summary: 'summary',
    experience: 'experience',
    education: 'education',
    skills: 'skills',
    certificates: 'certificates',
    languages: 'languages'
  }
};
const groupedSections = computed(() => {
  if (!resume.value) {
    return { main: [], extra: [] };
  }
  const t = translations[lang.value];
  return {
    main: [
      { key: t.summary, value: resume.value.summary || [], id: 'summary' },
      {
        key: t.experience,
        value: resume.value.experience || [],
        id: 'experience'
      },
      { key: t.education, value: resume.value.education || [], id: 'education' }
    ],
    extra: [
      { key: t.skills, value: resume.value.skills || [], id: 'skills' },
      {
        key: t.certificates,
        value: resume.value.certificates || [],
        id: 'certificates'
      },
      { key: t.languages, value: resume.value.languages || [], id: 'languages' }
    ]
  };
});
const activeSlide = ref(0);
const darkSlidesMap = ref([1]);
const isSlideDark = computed(
  () => darkSlidesMap.value.indexOf(activeSlide.value) !== -1
);
// Importing all images from folder
const headerBackground = import.meta.glob('@/assets/images/background/*', {
  eager: true
});
// 2) Making object map like { name.jpeg: '/assets/images/name.jpeg' }
const urlMap = Object.values(createAssetMap(headerBackground));
// Initiating get data request
onBeforeMount(() => store.fetchResume());
// const appBar = ref(null);
</script>
<template>
  <div class="my-resume">
    <PagePreloader v-if="isLoading" />

    <v-app-bar class="my-resume__header" absolute height="auto">
      <div ref="resumeHeader" class="user__wrapper">
        <div class="user__adaptive-row">
          <div class="user__titles" :class="{ 'light-text': isSlideDark }">
            <template v-if="urlMap.length">
              <SliderSwiper
                class="user__swiper"
                :options="{ arr: urlMap, isDark: isSlideDark }"
                @change-slide="($event) => (activeSlide = $event)"
              />
            </template>
            <SwitchersBlock
              class="user__switcher"
              @change-lang="changeLanguage"
              @change-theme="changeTheme"
            />
            <div class="user__name">{{ resume.name }}</div>
            <div class="user__title">{{ resume.title }}</div>
            <div class="user__location">{{ resume.location }}</div>
          </div>
          <div class="user__photo-wrapper">
            <v-img
              v-if="avatarUrl"
              class="user__photo"
              :src="avatarUrl"
              height="150"
              width="150"
              alt="avatar"
            />
            <v-icon v-else size="150" color="#969595" icon="mdi-account-tie" />
          </div>
        </div>
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
    <!-- SIDEBAR -->
    <v-navigation-drawer
      v-model="drawer"
      class="my-resume__sidebar"
      location="right"
      :permanent="!isSmallAndDown.value"
      :mobile="isSmallAndDown.value"
      color="grey-lighten-4"
      absolute
      width="224"
    >
      <SidebarSection
        v-for="(section, idx) in groupedSections.extra"
        :key="idx"
        :options="{ ...section, darken: true }"
      />
    </v-navigation-drawer>
    <!-- MAIN -->
    <v-main class="my-resume__main">
      <v-container class="my-resume__container">
        <div
          v-if="!drawer"
          v-ripple
          role="button"
          class="my-resume__bookmark"
          @click="drawer = !drawer"
        >
          skills
        </div>
        <BaseSection
          v-for="(section, idx) in groupedSections.main"
          :key="idx"
          :options="{ ...section, darken: false }"
        />
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
  height: fit-content;
  min-height: 1123px;
  position: relative;
  margin: 0 auto;
  overflow: hidden;
  background-color: rgba(var(--v-theme-background-page));
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.15);
  &__header {
    overflow: visible !important;
  }
  &__sidebar {
    top: v-bind('headerHeight + 12 + "px"');
    height: auto;
    border-radius: 24px 0 0 0;
    @include media-down(xs) {
      height: fit-content;
      top: v-bind('headerHeightMob + 12 + "px"');
    }
  }
  &__main {
    padding-top: v-bind('headerHeight + "px"');
    @include media-down(xs) {
      padding-top: v-bind('headerHeightMob + "px"');
    }
  }
  &__container {
    padding: 8px 16px 16px;
  }
  &__bookmark {
    position: absolute;
    bottom: 60px;
    right: -40px;
    text-transform: uppercase;
    font-size: 0.8rem;
    font-weight: 500;
    line-height: 1;
    transform: rotate(-90deg);
    outline: 1px solid $green-start;
    letter-spacing: 0.5rem;
    padding: 2px 8px;
    border-radius: 8px 8px 0 0;
    cursor: pointer;
    transition: background 0.3s ease-in;
    &:hover {
      background-color: rgba($black, 0.1);
    }
  }
}
.user {
  &__wrapper {
    width: 100%;
    @include media-down(xs) {
    }
    @include media-down(xxs) {
    }
  }
  &__adaptive-row {
    position: relative;
    display: grid;
    grid-template-columns: 1fr auto;
    grid-template-areas: 'titles photo';
    transition: all 0.3s ease-in;
    background-color: rgba(var(--v-theme-background-header));
    @include media-down(xxs) {
      grid-template-columns: 1fr;
      grid-template-areas:
        'photo'
        'titles';
      justify-items: center;
      padding: 40px 12px 0;
    }
  }
  &__titles {
    grid-area: titles;
    position: relative;
    padding: 24px 32px;
    text-align: center;
    @include Prevent-select;
    &.light-text * {
      color: $light;
    }
    @include media-down(xxs) {
      position: static;
    }
  }
  &__swiper {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    height: -webkit-fill-available;
    z-index: 0;
  }
  &__name {
    width: fit-content;
    font-size: 2rem;
    letter-spacing: 2.7px;
    margin-bottom: 8px;
    position: relative;
  }
  &__title {
    width: fit-content;
    font-size: 1.4rem;
    position: relative;
  }
  &__location {
    width: fit-content;
    position: relative;
  }
  // &__contacts {}
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
    z-index: 10;
    &.light-text * {
      color: $light;
    }
  }
  &__meta-data {
    position: relative;
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
    z-index: 2;
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
    position: relative;
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
  &__gradient::before {
    content: '';
    position: absolute;
    top: 0;
    right: 28%;
    width: 100px;
    height: 50px;
    background: radial-gradient(
      circle at 50% 0,
      rgba(var(--v-theme-background-header), 0.5) calc(25px - 1px),
      transparent 25px
    );
    pointer-events: none;
    @include media-down(sm-down) {
      display: none;
    }
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
  &__sidebar {
    .section {
      &__wrapper.skills {
        flex: 1;
        .section.skills {
          .main-skill::before {
            animation: pulse-shadow 1.3s ease-in-out forwards;
            animation-delay: 1.5s;
          }
        }
      }
    }
  }
  .v-navigation-drawer {
    &__content {
      display: flex;
      flex-direction: column;
      border-radius: inherit;
      padding: 12px;
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
@keyframes pulse-shadow {
  0% {
    box-shadow: 0 0 0 0 $green-md;
  }
  50% {
    box-shadow: 0 0 3px 6px $green-md;
  }
  100% {
    box-shadow: 0 0 0 0 $green-md;
  }
}
.v-overlay-container {
  .v-overlay {
    &__content {
      max-height: fit-content !important;
      padding: 2px 8px !important;
      outline: 1px solid $green-md;
      font-size: 0.8rem !important;
    }
  }
}
</style>
