const _classCallCheck = (instance, Constructor) => {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

const _defineProperties = (target, props) => {
  for (let i = 0; i < props.length; i++) {
    const descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
};

const _createClass = (Constructor, protoProps, staticProps) => {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
};

export { _classCallCheck, _createClass, _defineProperties };
