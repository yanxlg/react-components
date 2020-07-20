"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.type = exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDnd = require("react-dnd");

var _index = _interopRequireDefault(require("./_index.less"));

var _classnames = _interopRequireDefault(require("classnames"));

var _icons = require("@ant-design/icons");

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
      restProps = __rest(_a, ["index", "moveColumn", "className", "style", "children"]);

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

  if (index === void 0) {
    return _react["default"].createElement("th", __assign({
      className: className,
      style: style
    }, restProps), children);
  }

  drop(drag(ref));
  return _react["default"].createElement("th", __assign({
    ref: ref,
    className: (0, _classnames["default"])(className, (_b = {}, _b[dropClassName] = isOver, _b), _index["default"].th),
    style: __assign({
      cursor: 'move'
    }, style)
  }, restProps), children, _react["default"].createElement(_icons.StopOutlined, {
    className: _index["default"].hideIcon
  }));
};

var _default = DraggableHeaderCell;
exports["default"] = _default;