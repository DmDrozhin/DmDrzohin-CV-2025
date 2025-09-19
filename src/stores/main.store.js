import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useMainStore = defineStore('main', () => {
  const resume = ref(null);
  const language = ref('ua');
  const loading = ref(false);
  const error = ref(null);
  const currentTheme = ref('light');

  function setTheme(themeName) {
    currentTheme.value = themeName;
  }
  async function fetchResume(lang = 'ua') {
    language.value = lang;
    loading.value = true;
    error.value = null;

    try {
      // Imitation of 1500ms delay server response
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const response = await fetch(`${import.meta.env.BASE_URL}data/resume-${lang}.json`);
      if (!response.ok) {
        throw new Error('Failed to load resume');
      }
      resume.value = await response.json();
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
    setTheme
  };
});
