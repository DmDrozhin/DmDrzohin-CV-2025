<script>
import { computed } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

export default {
  name: 'SliderSwiper',
  components: {
    Swiper,
    SwiperSlide
  },
  props: {
    options: {
      type: Object,
      required: false,
      default: () => ({})
    }
  },
  emits: ['change-slide'],
  setup(props, { emit }) {
    const navButtonColor = computed(() =>
      props.options?.isDark ? '#FFF' : '#000'
    );
    const handleSlideChange = (ev) => {
      if (ev !== undefined && ev.activeIndex !== undefined) {
        emit('change-slide', ev.activeIndex);
      }
    };
    return {
      modules: [Navigation],
      navButtonColor,
      handleSlideChange
    };
  }
};
</script>

<template>
  <swiper
    class="bg-slider"
    :modules="modules"
    :slides-per-view="1"
    :grab-cursor="true"
    navigation
    @slide-change="handleSlideChange"
  >
    <swiper-slide
      v-for="(img, idx) in options.arr"
      :key="idx"
      class="bg-slider__slide"
    >
      <v-img v-if="img" class="bg-slider__image" :src="img" cover location alt="header background" />
    </swiper-slide>
  </swiper>
</template>

<style lang="scss" scoped>
.bg-slider {
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
.bg-slider {
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
