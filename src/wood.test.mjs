import { strict as assert } from "node:assert";
import { describe, it, mock } from "node:test";

import { wood } from "./wood.mjs";

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

  return { app, find, button, input, unit };
}

describe("wood", () => {
  it("should initialize", () => {
    const { app, find, unit } = createMock({ unit: "wood" });

    assert.equal(find.mock.calls.length, 0);
    assert.equal(app.subscribe.mock.calls.length, 0);
    assert.deepEqual(app.state, {});
    assert.deepEqual(unit.style, {});

    wood(app, find);

    assert.equal(find.mock.calls.length, 1);
    assert.equal(app.subscribe.mock.calls.length, 1);
    assert.deepEqual(app.state, { wood: 0 });
    assert.deepEqual(unit.style, { visibility: "visible" });
  });

  it("should update <input /> value", () => {
    const { app, button, find, input } = createMock({ unit: "wood" });

    wood(app, find);

    assert.equal(input.value, "");

    app.wood();

    assert.equal(input.value, 0);

    button.click(); // click the button to increment the value in state
    app.wood(); // "publish" the event and fake update subscribers

    assert.equal(input.value, 1);
  });

  it("should decrement the count in the update function", () => {
    const { app, button, find, input } = createMock({ unit: "wood" });

    const update = wood(app, find);

    app.wood();

    assert.equal(input.value, 0);

    button.click(); // click the button to increment the value in state
    button.click();
    button.click();
    button.click();
    button.click();
    app.wood(); // "publish" the event and fake update subscribers

    assert.equal(input.value, 5);

    update(app.state);

    assert.equal(app.state.wood, 4);
  });
});
