export function food(app, find) {
  const unit = find("food");
  const valueElement = unit.querySelector(`[name=${unit.dataset.unit}]`);

  app.state.food = 0;
  app.subscribe("food", () => {
    valueElement.value = app.state.food;
  });

  unit.querySelector("button").addEventListener("click", () => {
    app.state.food += 1;
  });
  unit.style.visibility = "visible";

  return (state) => {
    state.food = Math.max(0, state.food - 1);
  };
}
