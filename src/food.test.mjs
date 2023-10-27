import { strict as assert } from "node:assert";
import { describe, it } from "node:test";

import { food } from "./food.mjs";

describe("food", () => {
  it("should be a function", () => {
    let click;

    const input = { value: "" };
    const state = {};
    const unit = {
      dataset: {
        unit: "",
      },
      querySelector(selector) {
        return selector === "button"
          ? {
              addEventListener(_, fn) {
                click = fn;
              },
            }
          : input;
      },
      style: {},
    };
    const updateFn = food(unit, state);

    assert.equal(state.food, 0);
    assert.equal(unit.style.visibility, "visible");

    click();

    assert.equal(state.food, 1);
    assert.equal(input.value, 1);

    updateFn(state);

    assert.equal(state.food, 0);
    assert.equal(input.value, 0);
  });
});
