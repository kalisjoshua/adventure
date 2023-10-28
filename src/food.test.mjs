import { strict as assert } from "node:assert";
import { describe, it, mock } from "node:test";

import { food } from "./food.mjs";

function createMock(dataset) {
  const button = {
    addEventListener: mock.fn((event, fn) => {
      button[event] = fn;
    }),
  };
  const input = { value: "" };
  const unit = {
    dataset,
    querySelector: mock.fn((sel) => (sel === "button" ? button : input)),
    style: {},
  };
  const find = mock.fn(() => unit);

  const app = {
    state: {},
    subscribe: mock.fn((event, fn) => {
      app[event] = fn;
    }),
  };

  return { app, button, find, input, unit };
}

describe("food", () => {
  it("should initialize", () => {
    const { app, find, unit } = createMock({ unit: "food" });

    assert.equal(find.mock.calls.length, 0);
    assert.equal(app.subscribe.mock.calls.length, 0);
    assert.deepEqual(app.state, {});
    assert.deepEqual(unit.style, {});

    food(app, find);

    assert.equal(find.mock.calls.length, 1);
    assert.equal(app.subscribe.mock.calls.length, 1);
    assert.deepEqual(app.state, { food: 0 });
    assert.deepEqual(unit.style, { visibility: "visible" });
  });

  it("should update <input /> value", () => {
    const { app, find, button, input } = createMock({ unit: "food" });

    food(app, find);

    assert.equal(input.value, "");

    app.food();

    assert.equal(input.value, 0);

    button.click(); // click the button to increment the value in state
    app.food(); // "publish" the event and fake update subscribers

    assert.equal(input.value, 1);
  });

  it("should decrement the count in the update function", () => {
    const { app, find, button, input } = createMock({ unit: "food" });

    const update = food(app, find);

    app.food();

    assert.equal(input.value, 0);

    button.click(); // click the button to increment the value in state
    button.click();
    button.click();
    button.click();
    button.click();
    app.food(); // "publish" the event and fake update subscribers

    assert.equal(input.value, 5);

    update(app.state);

    assert.equal(app.state.food, 4);
  });
});
