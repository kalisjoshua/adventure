/**
 * A helper function for adding content to the DOM. Using pretty standard DOM
 * functionality domaddic enables the creation of modules that are capable of
 * re-rendering themselves when they decide it to be necessary. Modules enable
 * information hiding through scope and function calls so that everything is
 * out of the global scope.
 *
 * Is this at all a good idea? Will it potentially be found to be a horrible
 * memory hog/leak? Who can tell. Let's see if this bird has wings!
 *
 * @param {object} config - component configuration
 * @param {AddFn} [config.add] - the initialization/output function; describes
 * what the component should be
 * @param {AfterAddFn} [config.afterAdd] - the function to run after the
 * component has been inserted into the DOM; enables adding event handlers to
 * elements of the component
 * @param {() => Element} [config.mountPoint] - the position in the DOM where the
 * component will be inserted; defaults to `document.body`
 * @returns {WriteFn} factory function for creating instances of the component
 *
 * inspired by:
 *   - [HEX](https://medium.com/@metapgmr/hex-a-no-framework-approach-to-building-modern-web-apps-e43f74190b9c)
 *   - [strawberry](https://github.com/18alantom/strawberry)
 *   - [arrow](https://www.arrow-js.com/)
 *   - [alpine](https://alpinejs.dev/)
 *   - [template](https://github.com/retrohacker/template)
 *
 * others:
 *   - [preact+htm](https://preactjs.com/guide/v10/getting-started#no-build-tools-route)
 *   - [superfine](https://github.com/jorgebucaran/superfine)
 *   - [riot](https://riot.js.org/)
 */
function domaddic(config) {
  const { add, afterAdd, mountPoint } = config;

  return (state) => {
    const div = document.createElement("DIV");

    (mountPoint() ?? document.body).appendChild(div);

    function write(onUpdate) {
      new MutationObserver((mutationList, observer) => {
        onUpdate?.(state, div);

        for (const mutation of mutationList) {
          if (mutation.type === "childList") {
            afterAdd?.(state, div, write);
            observer.disconnect();
          }
        }
      }).observe(div, { childList: true, subtree: true });

      div.innerHTML = add(state, write);
    }

    write();
  };
}

export { domaddic };

/**
 * @callback AddFn
 * @param {object} state - the current state of the component
 * @param {function} write - function re-rendering with the new state
 * @returns {string} the DOM content to be inserted
 */

/**
 * @callback AfterAddFn
 * @param {object} state - the current state of the component
 * @param {function} div - the containing DOM Element (`<div />`)
 * @param {function} write - function re-rendering with the new state
 * @returns undefined
 */

/**
 * @callback WriteFn
 * @param {function} onUpdate - function to run after update is complete
 * @returns undefined
 */
