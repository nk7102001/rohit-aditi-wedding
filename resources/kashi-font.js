/* Clean Devanagari typography passthrough so Unicode spellings are 100% authentic */
(() => {
  window.withKashiFont = (jsx) => (type, props, key) => {
    return jsx(type, props, key);
  };
})();
