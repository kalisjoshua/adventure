export function population(app, find) {
  const unit = find("population");

  app.state.population = 0;

  return (state) => {
    if (state.food > 2 && state.wood > 2) unit.style.visibility = "visible";
  };
}
