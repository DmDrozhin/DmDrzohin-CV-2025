import { defineStore } from 'pinia';
import { ref } from 'vue';
import { createAssetMap } from '@/utils/assets';
import { computed } from 'vue';

export const useMainStore = defineStore('main', () => {
  const resume = ref(null);
  const language = ref('ua');
  const loading = ref(false);
  const error = ref(null);
  const currentTheme = ref('light');

  const avatars = import.meta.glob('@/assets/images/avatars/*', {
    eager: true
  });
  const avatarMap = createAssetMap(avatars);

  const icons = import.meta.glob('@/assets/images/ui/*', { eager: true });
  const iconsMap = createAssetMap(icons);

  const setTheme = (themeName) => {
    currentTheme.value = themeName;
  };
  const currentAvatar = computed(() => {
    if (!resume.value) {
      return '';
    }
    return currentTheme.value === 'light'
      ? resume.value.avatar_light
      : resume.value.avatar_dark;
  });

  // 🔧 Преобразуем данные, чтобы в resume попадали уже готовые src
  const formatData = (data) => {
    if (!data) {
      return null;
    }

    const formatted = {
      ...data,
      // аватарки подменяем сразу
      avatar_dark: data.avatar_dark ? avatarMap[data.avatar_dark] || '' : '',
      avatar_light: data.avatar_light ? avatarMap[data.avatar_light] || '' : '',

      // skills
      skills: Array.isArray(data.skills)
        ? data.skills.map((s) => {
            if (s.type === 1) {
              return {
                ...s,
                src: s.img ? iconsMap[s.img] || '' : ''
              };
            }
            if (s.type === 2 && Array.isArray(s.skill)) {
              return {
                ...s,
                skill: s.skill.map((it) => ({
                  ...it,
                  src: it.img ? iconsMap[it.img] || '' : ''
                }))
              };
            }
            return s;
          })
        : [],

      // contacts
      contacts: Array.isArray(data.contacts)
        ? data.contacts.map((c) => ({
            ...c,
            icon: c.icon ? iconsMap[c.icon] || '' : ''
          }))
        : []
    };

    return formatted;
  };

  async function fetchResume(lang = 'ua') {
    language.value = lang;
    loading.value = true;
    error.value = null;

    try {
      // имитация 1500ms задержки
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const response = await fetch(
        `${import.meta.env.BASE_URL}data/resume-${lang}.json`
      );
      if (!response.ok) {
        throw new Error('Failed to load resume');
      }
      const resp = await response.json();
      resume.value = formatData(resp); // 💡 кладем уже обработанное
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  }

  return {
    resume,
    language,
    loading,
    error,
    fetchResume,
    currentTheme,
    setTheme,
    currentAvatar
  };
});
