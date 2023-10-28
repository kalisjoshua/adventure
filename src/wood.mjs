export function wood(app, find) {
  const unit = find("wood");
  const valueElement = unit.querySelector(`[name=${unit.dataset.unit}]`);

  app.state.wood = 0;
  app.subscribe("wood", () => {
    valueElement.value = app.state.wood;
  });

  unit.querySelector("button").addEventListener("click", () => {
    app.state.wood += 1;
  });
  unit.style.visibility = "visible";

  return (state) => {
    state.wood = Math.max(0, state.wood - 1);
  };
}
