"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.type = exports["default"] = void 0;

require("antd/es/tooltip/style/css");

var _tooltip = _interopRequireDefault(require("antd/es/tooltip"));

var _react = _interopRequireWildcard(require("react"));

var _reactDnd = require("react-dnd");

var _index = _interopRequireDefault(require("./_index.less"));

var _classnames = _interopRequireDefault(require("classnames"));

var _icons = require("@ant-design/icons");

var _index2 = require("./index");

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

var type = 'DraggableHeaderTitle';
exports.type = type;

var DraggableHeaderCell = function DraggableHeaderCell(_a) {
  var _b;

  var index = _a.index,
      moveColumn = _a.moveColumn,
      className = _a.className,
      style = _a.style,
      children = _a.children,
      hideColumn = _a.hideColumn,
      column = _a.column,
      restProps = __rest(_a, ["index", "moveColumn", "className", "style", "children", "hideColumn", "column"]);

  var ref = _react["default"].useRef();

  var _c = (0, _reactDnd.useDrop)({
    accept: type,
    collect: function collect(monitor) {
      var dragIndex = (monitor.getItem() || {}).index;

      if (dragIndex === index) {
        return {};
      }

      return {
        isOver: monitor.isOver(),
        dropClassName: dragIndex < index ? _index["default"].dropOverRight : _index["default"].dropOverLeft
      };
    },
    drop: function drop(item) {
      moveColumn(item.index, index);
    }
  }),
      _d = _c[0],
      isOver = _d.isOver,
      dropClassName = _d.dropClassName,
      drop = _c[1];

  var _e = (0, _reactDnd.useDrag)({
    item: {
      type: type,
      index: index
    },
    collect: function collect(monitor) {
      return {
        isDragging: monitor.isDragging()
      };
    }
  }),
      drag = _e[1];

  var onHideColumn = (0, _react.useCallback)(function () {
    var key = (0, _index2.getColumnKey)(column);
    hideColumn(key);
  }, []);

  if (index === void 0) {
    return /*#__PURE__*/_react["default"].createElement("th", __assign({
      className: className,
      style: style
    }, restProps), children);
  }

  drop(drag(ref));
  return /*#__PURE__*/_react["default"].createElement("th", __assign({
    ref: ref,
    className: (0, _classnames["default"])(className, (_b = {}, _b[dropClassName] = isOver, _b), _index["default"].th),
    style: __assign({
      cursor: 'move'
    }, style)
  }, restProps), children, /*#__PURE__*/_react["default"].createElement(_tooltip["default"], {
    title: "\u9690\u85CF\u8BE5\u5217"
  }, /*#__PURE__*/_react["default"].createElement(_icons.StopOutlined, {
    className: _index["default"].hideIcon,
    onClick: onHideColumn
  })));
};

var _default = DraggableHeaderCell;
exports["default"] = _default;