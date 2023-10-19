import { domaddic } from "./domaddic.mjs";

const clicky = domaddic({
  add(state, write) {
    state.count = state.count || 0;

    const pending = setTimeout(() => {
      state.count = Math.max(0, state.count - 1);
      write();
    }, 1000);

    return `
      <dl data-pending="${pending}">
        <dt>${state.label}</dt>
        <dd>${state.count}</dd>
      </dl>
      <button id="${state.action}-${state.label}">${state.action}</button>
    `;
  },
  afterAdd(state, parent, write) {
    parent
      .querySelector(`#${state.action}-${state.label}`)
      .addEventListener("click", () => {
        clearTimeout(parent.querySelector("[data-pending").dataset.pending);
        state.count += 1;
        write();
      });
  },
});

export { clicky };
