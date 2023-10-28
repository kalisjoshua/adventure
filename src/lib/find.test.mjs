import { strict as assert } from "node:assert";
import { describe, it, mock } from "node:test";

import { find } from "./find.mjs";

describe("find", () => {
  it("should query the DOM", () => {
    const qs = mock.fn();

    global.document = { querySelector: qs };

    assert.equal(qs.mock.calls.length, 0);

    find();

    assert.equal(qs.mock.calls.length, 1);
  });
});
