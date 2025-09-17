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
  <ul class="summary">
    <!-- eslint-disable-next-line vue/no-v-html -->
    <li v-for="entry, idx in options.value" :key="idx" class="summary__entry" v-html="entry"></li>
  </ul>
</template>

<style lang="scss" scoped>
.block {
  outline: 1px solid greenyellow;
  width: 50px;
  height: 50px;
}
</style>

<style lang="scss">
</style>