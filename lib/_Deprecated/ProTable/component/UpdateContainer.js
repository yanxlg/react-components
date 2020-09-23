"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var UpdateContainer = function UpdateContainer(_a, ref) {
  var children = _a.children;

  var _b = (0, _react.useState)(),
      data = _b[0],
      setData = _b[1];

  (0, _react.useImperativeHandle)(ref, function () {
    return {
      update: function update(data) {
        setData(data);
      }
    };
  }, []);
  return (0, _react.useMemo)(function () {
    return _react["default"].createElement("span", null, children(data));
  }, [children, data]);
};

var _default = (0, _react.forwardRef)(UpdateContainer);

exports["default"] = _default;