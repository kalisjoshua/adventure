import { find } from "./find.mjs";

/**
 * HTML application initializer.
 */
export function attollere(...initializers) {
  const app = {
    start(fn) {
      if (!initializers.length) {
        throw new Error("No initializers provided");
      }

      const updaters = [];

      for (const init of initializers) {
        const updater = init(app, find);

        if (updater) {
          updaters.push(updater);
        }
      }

      initializers = {}; // free up some memory?

      if (typeof fn === "function") {
        const update = () => {
          updaters.forEach((updater) => {
            updater(app.state);
          });

          fn(app.state, update);
        };

        update();
      }
    },

    state(init, subscribe) {
      prop(app, "state", init);

      if (typeof subscribe === "function") {
        prop(app, "subscribe", subscribe);
      }

      return this;
    },
  };

  return app;
}

function prop(target, property, value) {
  Object.defineProperty(target, property, {
    configurable: false,
    enumerable: false,
    get: () => value,
    writeable: false,
  });
}
