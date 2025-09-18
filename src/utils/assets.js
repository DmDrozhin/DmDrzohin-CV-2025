export function createAssetMap(globResult) {
  return Object.fromEntries(
    Object.entries(globResult).map(([path, module]) => {
      const filename = path.split('/').pop();
      return [filename, module.default];
    })
  );
}
export function getIconPath(file) {
  if (!file) {
    return '';
  }
  return new URL(`../assets/images/ui/${file}`, import.meta.url).href;
};
export function getBackgroundPath(file) {
  if (!file) {
    return '';
  }
  return new URL(`../assets/images/background/${file}`, import.meta.url).href;
};
