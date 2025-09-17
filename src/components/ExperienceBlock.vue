<script setup>
import { computed, ref } from 'vue';

const props = defineProps({
  options: {
    type: Object,
    default: () => ({}),
    required: false
  }
});

const something = ref(null);
const comp = computed(() => null);
</script>

<template>
  <div class="experience">
    <div
      v-for="(entry, idx) in options.value"
      :key="idx"
      class="experience__entry"
    >
      <div class="experience__position">{{ entry.position }}</div>
      <div class="experience__wrapper">
        <div class="experience__company-wrapper">
          <v-img />
          <div class="experience__company">{{ entry.company }}</div>
        </div>
        <div class="experience__period">{{ entry.period }}</div>
      </div>
      <ul>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <li v-for="(it, it_idx) in entry.achievements" :key="it_idx" v-html="it"></li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.experience {
  outline: 1px solid greenyellow;
  width: 100%;
  &__position {
    font-size: 1rem;
    font-weight: 600;
    padding: 0 20px;
  }
  &__wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
    padding: 0 0 0 20px;
  }
  &__company {
    color: $background-contacts;
  }
  &__period {
    color: $green-end;
  }
}
</style>

<style lang="scss"></style>
