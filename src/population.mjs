export function population(unit, state) {
  state.population = 0;

  return (state) => {
    if (state.food > 2 && state.wood > 2) unit.style.visibility = "visible";
  };
}
