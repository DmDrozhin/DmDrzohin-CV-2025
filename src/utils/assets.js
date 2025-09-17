export function createAssetMap(globResult) {
  return Object.fromEntries(
    Object.entries(globResult).map(([path, module]) => {
      const filename = path.split('/').pop();
      return [filename, module.default];
    })
  );
}
export function getAssetPath(file) {
  if (!file) {
    return '';
  }
  return new URL(`../assets/images/ui/${file}`, import.meta.url).href;
}
