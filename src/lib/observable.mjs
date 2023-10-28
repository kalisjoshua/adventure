const watcher = (listeners, path = []) => ({
  get: (target, key) => {
    if (typeof target[key] === "object" && target[key] != null)
      return new Proxy(target[key], watcher(listeners, [...path, key]));

    return target[key];
  },
  set: (target, key, value) => {
    target[key] = value;
    listeners[path.concat(key).join(".")]?.forEach((fn) =>
      fn(target[key], target),
    );

    return true;
  },
});

export function observable(obj) {
  const listeners = {};
  const subject = new Proxy(obj, watcher(listeners));

  return [
    subject,
    (path, fn) => {
      listeners[path] ||= [];
      listeners[path].push(fn);
    },
  ];
}
