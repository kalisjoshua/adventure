import { attollere } from "./lib/attollere.mjs";
import { observable } from "./lib/observable.mjs";

import { food } from "./food.mjs";
import { population } from "./population.mjs";
import { wood } from "./wood.mjs";

window.addEventListener("DOMContentLoaded", () => {
  attollere(
    //
    food,
    population,
    wood,
  )
    .state(...observable({ updateTick: 1000 }))
    .start((state, update) => {
      setTimeout(update, state.updateTick);
    });
});
