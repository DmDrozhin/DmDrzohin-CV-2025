import { defineStore } from 'pinia';
import { ref } from 'vue';
export const useMainStore = defineStore('counter', () => {
  const count = ref(100);
  const name = ref('Eduardo');

  return {
    count,
    name
  };
});
