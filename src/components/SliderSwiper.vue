<script>
import { computed, ref, watch } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { createAssetMap } from '@/utils/assets';

export default {
  name: 'SliderSwiper',
  components: {
    Swiper,
    SwiperSlide
  },
  emits: ['dark'],
  setup(props, { emit }) {
    const backgrounds = import.meta.glob('@/assets/images/background/*', {
      eager: true
    });
    const backgroundsMap = Object.values(createAssetMap(backgrounds));
    const currentSlideIdx = ref(0);
    const darkSlides = ref([1]);
    const isSlideDark = computed(
      () => darkSlides.value.indexOf(currentSlideIdx.value) !== -1
    );
    const navButtonColor = computed(() =>
      isSlideDark.value ? '#FFF' : '#000'
    );
    const onSlideChange = (ev) => {
      if (ev && ev !== undefined) {
        currentSlideIdx.value = ev.activeIndex;
      }
    };
    watch(
      () => isSlideDark.value,
      (val) => {
        if (val !== undefined && typeof val === 'boolean') {
          emit('dark', val);
        }
      }
    );
    return {
      onSlideChange,
      modules: [Navigation],
      backgroundsMap,
      navButtonColor
    };
  }
};
</script>

<template>
  <swiper
    v-if="backgroundsMap.length"
    class="slider"
    :modules="modules"
    navigation
    :slides-per-view="1"
    :grab-cursor="true"
    @slide-change="onSlideChange"
  >
    <swiper-slide
      v-for="(img, idx) in backgroundsMap"
      :key="idx"
      class="slider__slide"
    >
      <v-img class="slider__image" :src="img" cover location />
    </swiper-slide>
  </swiper>
</template>

<style lang="scss" scoped>
.slider {
  width: 100%;
  &__slide {
    display: flex;
  }
  &__image {
    @include Prevent-select;
  }
}
</style>
<style lang="scss">
.slider {
  .swiper-button-prev {
    left: -6px;
  }
  .swiper-button-next {
    right: -6px;
  }
  .swiper-button-next,
  .swiper-button-prev {
    height: 1rem;
    top: 50%;
    transform: translateY(100%);
    color: v-bind(navButtonColor);
  }
}
</style>
