const clicky = {
  add(state, write) {
    state.count = state.count || 0;

    const pending = setTimeout(() => {
      state.count = Math.max(0, state.count - 1);
      write();
    }, 1000);

    return `
      <button class="bg-teal-900 border-solid border-2 border-teal-900 px-3 py-1 rounded-md text-white" id="${state.action}-${state.label}">${state.action}</button>
      <label data-pending="${pending}" for="${state.label}-value">${state.label}</label>
      <input class="border-solid border-2 border-slate-200 px-3 py-1 rounded-md w-16" disabled id="${state.label}-value" name="${state.label}-value" value="${state.count}" />
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
};

export { clicky };
