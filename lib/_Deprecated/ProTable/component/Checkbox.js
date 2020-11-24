"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("antd/es/checkbox/style/css");

var _checkbox = _interopRequireDefault(require("antd/es/checkbox"));

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var __assign = void 0 && (void 0).__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
/**提供自我管控的Checkbox**/


var Checkbox = function Checkbox(_a, ref) {
  var componentWillUnMont = _a.componentWillUnMont,
      onChange = _a.onChange,
      props = __rest(_a, ["componentWillUnMont", "onChange"]);

  var _b = (0, _react.useState)({
    checked: false,
    indeterminate: false
  }),
      state = _b[0],
      setState = _b[1];

  (0, _react.useImperativeHandle)(ref, function () {
    return {
      updateChecked: function updateChecked(checked) {
        setState({
          checked: checked,
          indeterminate: false
        });
      },
      setIndeterminate: function setIndeterminate() {
        setState({
          checked: false,
          indeterminate: true
        });
      },
      getValue: function getValue() {
        return props.value;
      },
      getValues: function getValues() {
        return {
          value: props.value,
          checked: state.checked
        };
      }
    };
  }, [state.checked]);
  (0, _react.useEffect)(function () {
    return function () {
      componentWillUnMont(props.value);

      setState = function setState() {};
    };
  }, []);
  var onInnerChange = (0, _react.useCallback)(function (e) {
    var checked = e.target.checked;
    setState({
      checked: checked,
      indeterminate: false
    });
    onChange && onChange(e);
  }, [onChange]);
  var checked = state.checked,
      indeterminate = state.indeterminate;
  return (0, _react.useMemo)(function () {
    return /*#__PURE__*/_react["default"].createElement(_checkbox["default"], __assign({}, props, {
      checked: checked,
      indeterminate: indeterminate,
      onChange: onInnerChange
    }));
  }, [checked, indeterminate, onChange]);
};

var _default = /*#__PURE__*/(0, _react.forwardRef)(Checkbox);

exports["default"] = _default;