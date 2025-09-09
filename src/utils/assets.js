export function createAssetMap(globResult) {
  return Object.fromEntries(
    Object.entries(globResult).map(([path, module]) => {
      const filename = path.split('/').pop();
      return [filename, module.default];
    })
  );
}
