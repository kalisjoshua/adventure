import { Attollere } from "/Attollere.mjs";
import { food } from "/src/food.mjs";
import { population } from "/src/population.mjs";
import { wood } from "/src/wood.mjs";

window.addEventListener("DOMContentLoaded", () => {
  console.clear();
  const app = new Attollere();

  app
    //
    .add(food)
    .add(population)
    .add(wood)
    .start({});
});
