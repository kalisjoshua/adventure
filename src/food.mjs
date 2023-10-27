export function food(unit, state) {
  state.food = 0;
  unit.style.visibility = "visible";

  const valueElement = unit.querySelector(`[name=${unit.dataset.unit}]`);

  unit.querySelector("button").addEventListener("click", () => {
    state.food += 1;
    valueElement.value = state.food;
  });

  return (state) => {
    state.food = Math.max(0, state.food - 1);
    valueElement.value = state.food;
  };
}
