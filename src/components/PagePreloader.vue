<template>
  <div class="page-loader">
    <v-progress-circular indeterminate color="green" />
  </div>
</template>
<style scoped lang="scss">
.page-loader {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: rgba(#FFF, 0.2);
  backdrop-filter: blur(8px);
  z-index: 1100;
}
</style>
