import { strict as assert } from "node:assert";
import { describe, it } from "node:test";

import { observable } from "./observable.mjs";

describe("observable", () => {
  it("should call callback when a prop is updated", () => {
    const [obj, on] = observable({ foo: 1 });

    let called = false;

    on("foo", () => {
      called = true;
    });

    assert.equal(called, false);

    obj.foo = 2;

    assert.equal(called, true);
  });

  it("should observe deeply nested properties", () => {
    const [obj, on] = observable({
      foo: {
        bar: {
          fiz: {
            buz: 15,
          },
        },
      },
    });

    let called = false;

    on("foo", () => {
      called = true;
    });

    assert.equal(called, false);

    obj.foo = 2;

    assert.equal(called, true);
  });
});
