<script setup>
import { computed, ref } from 'vue';
import SectionTitle from '@/components/SectionTitle.vue';
import SkillBlock from '@/components/SkillBlock.vue';
import CertificateBlock from '@/components/CertificateBlock.vue';
import LanguageBlock from '@/components/LanguageBlock.vue';

const props = defineProps({
  options: {
    type: Object,
    default: () => ({}),
    required: false
  }
});
const skills = computed(() => props.options.value || []);
</script>

<template>
  <div class="section__wrapper" :class="options.id || ''">
    <SectionTitle
      :options="{ text: options.key || '', darken: options.darken }"
      class="section__title"
      :class="options.id || ''"
    />
    <div
      v-if="options.id === 'skills' && skills.length"
      class="section skills"
    >
      <SkillBlock
        v-for="skill in skills"
        :key="skill.id"
        :options="{
          ...skill,
          customClass: skill.id === 101 ? 'main-skill' : ''
        }"
      />
    </div>
    <div v-if="options.id === 'certificates'" class="section certificates">
      <CertificateBlock
        v-for="(cert, idx) in skills"
        :key="idx"
        :options="{ ...cert, customClass: `order-${idx + 1}` }"
      />
    </div>
    <div v-if="options.id === 'languages'" class="section languages">
      <LanguageBlock
        v-for="(lang, idx) in skills"
        :key="idx"
        :options="{ ...lang, customClass: `order-${idx + 1}` }"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.section {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 8px 0;
  &__title {
  }
  &.skills {
    align-content: flex-start;
    gap: 8px;
  }
  &.certificates {
    column-gap: 8px;
  }
  &.languages {
    gap: 8px;
  }
}
</style>

<style lang="scss">
.section {
  &.skills {
    .skill.main-skill {
      position: relative;
      left: -10px;
      padding: 0 8px 0 0;
    }
  }
}
.title-block.languages {
  .title-block {
    &__capitalized {
      position: relative;
      top: -4px;
    }
  }
}
</style>
