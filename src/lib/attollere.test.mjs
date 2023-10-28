import { strict as assert } from "node:assert";
import { describe, it, mock } from "node:test";

import { attollere } from "./attollere.mjs";

describe("attollere", () => {
  it("should have the expected API", () => {
    const app = attollere();

    assert.deepEqual(Object.keys(app), ["start", "state"]);
  });

  it("should set state property", () => {
    const app = attollere().state({ foo: 1 });

    assert.equal(app.state.foo, 1);
  });

  it("should set subscriber property", () => {
    const app = attollere().state({ foo: 1 }, mock.fn());

    assert.equal(typeof app.subscribe, "function");
  });

  describe("start", () => {
    it("should throw an error given no initializers", () => {
      let result = 0;

      try {
        attollere().start();
        result = 1;
      } catch (e) {}

      assert.equal(result, 0);
    });

    it("should call initializers", () => {
      const alpha = mock.fn();
      const beta = mock.fn();

      assert.equal(alpha.mock.calls.length, 0);
      assert.equal(beta.mock.calls.length, 0);

      attollere(alpha, beta).start();

      assert.equal(alpha.mock.calls.length, 1);
      assert.equal(beta.mock.calls.length, 1);
    });

    it("should call update", () => {
      const update = mock.fn();
      const alpha = mock.fn(() => update);

      assert.equal(update.mock.calls.length, 0);

      attollere(alpha).start(() => {});

      assert.equal(update.mock.calls.length, 1);
    });
  });
});
