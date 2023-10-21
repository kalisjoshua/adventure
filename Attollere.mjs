export class Attollere {
  name = "Raise";
  #consume = [];
  #gameTick = 1000;
  #inits = {};
  #pending = null;
  #root = null;
  #state = {};
  #units = {};
  #values = {};

  constructor(app = "[data-app]", unit = "[data-unit]") {
    this.#root = document.querySelector(app);

    for (const el of this.#root.querySelectorAll(unit)) {
      this.#units[el.dataset.unit] = el;
    }
  }

  add(fn) {
    if (!this.#units[fn.name])
      throw new Error(`Unexpected initializer: ${fn.name}`);
    else this.#inits[fn.name] = fn;

    return this;
  }

  #loop() {
    clearTimeout(this.#pending);

    this.#consume.forEach((fn) => {
      fn(this.#state);
    });

    for (const el of Object.values(this.#values)) {
      el.value = this.#state[el.name];
    }

    this.#pending = setTimeout(() => this.#loop(), this.#gameTick);
  }

  start(state) {
    Object.assign(this.#state, state);

    for (const el of Object.values(this.#units)) {
      try {
        this.#values[el.dataset.unit] = el.querySelector(
          `[name=${el.dataset.unit}]`,
        );

        const consume = this.#inits[el.dataset.unit].call(
          this,
          el,
          this.#state,
        );

        consume && this.#consume.push(consume);
      } catch {
        throw new Error(`Missing initializer for: <${el.dataset.unit}>`);
      }
    }

    this.#loop();
  }
}
