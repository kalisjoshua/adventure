export const find = (name, sel = `[data-unit="${name}"]`) =>
  document.querySelector(sel);
