import { Attollere } from "../Attollere.mjs";
import { food } from "./food.mjs";
import { population } from "./population.mjs";
import { wood } from "./wood.mjs";

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
