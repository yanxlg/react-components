"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = require("react");

var useUpdate = function useUpdate(effect, deps) {
  var valueRef = (0, _react.useRef)(Symbol());
  (0, _react.useEffect)(function () {
    if (typeof valueRef.current === 'symbol') {
      // 初始化，跳过
      valueRef.current = deps;
    } else {
      return effect();
    }
  }, deps);
};

var _default = useUpdate;
exports["default"] = _default;