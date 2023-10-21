import { domaddic } from "../domaddic.mjs";

import { clicky } from "./clicky.mjs";

const appState = {
  food: {
    action: "Cook",
    count: 0,
    label: "Food",
  },
  people: {
    action: "Recruit",
    count: 0,
    label: "People",
  },
  wood: {
    action: "Chop",
    count: 0,
    label: "Wood",
  },
};

domaddic({
  add() {
    return `
      <ul> ${[
        //
        "food",
        "wood",
        appState.food.count > 20 && appState.wood.count > 20 ? "people" : "",
      ]
        .filter(Boolean)
        .map((s) => `<li class="py-2" data-component="${s}"></li>`)
        .join("")} <ul>
    `;
  },
  afterAdd() {
    const components = Array.from(document.querySelectorAll("[data-component"));

    components.forEach((el) => {
      domaddic({ ...clicky, mountPoint: () => el })(
        appState[el.dataset.component],
      );
    });
  },
  mountPoint: () => document.querySelector("#app"),
})(appState);
