export function wood(unit, state) {
  state.wood = 0;
  unit.style.visibility = "visible";

  const valueElement = unit.querySelector(`[name=${unit.dataset.unit}]`);

  unit.querySelector("button").addEventListener("click", () => {
    state.wood += 1;
    valueElement.value = state.wood;
  });

  return (state) => {
    state.wood = Math.max(0, state.wood - 1);
  };
}
