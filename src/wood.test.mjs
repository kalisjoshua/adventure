import { strict as assert } from "node:assert";
import { describe, it } from "node:test";

import { wood } from "./wood.mjs";

describe("wood", () => {
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
    const updateFn = wood(unit, state);

    assert.equal(state.wood, 0);
    assert.equal(unit.style.visibility, "visible");

    click();

    assert.equal(state.wood, 1);
    assert.equal(input.value, 1);

    updateFn(state);

    assert.equal(state.wood, 0);
    assert.equal(input.value, 0);
  });
});
