"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactDnd = require("react-dnd");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var ItemTypes = {
  CARD: 'card'
};

var Card = function Card(_a) {
  var id = _a.id,
      _end = _a.end,
      move = _a.move,
      children = _a.children,
      index = _a.index;
  var ref = (0, _react.useRef)(null);

  var _b = (0, _reactDnd.useDrop)({
    accept: ItemTypes.CARD,
    hover: function hover(item, monitor) {
      if (!ref.current) {
        return;
      }

      var dragIndex = item.index;
      var hoverIndex = index; // Don't replace items with themselves

      if (dragIndex === hoverIndex) {
        return;
      } // Determine rectangle on screen


      var hoverBoundingRect = ref.current.getBoundingClientRect(); // Get vertical middle

      var hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2; // Determine mouse position

      var clientOffset = monitor.getClientOffset(); // Get pixels to the top

      var hoverClientY = clientOffset.y - hoverBoundingRect.top; // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      } // Dragging upwards


      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      } // Time to actually perform the action


      if (move) {
        move(dragIndex, hoverIndex);
      } // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      // eslint-disable-next-line no-param-reassign


      item.index = hoverIndex;
    }
  }),
      drop = _b[1];

  var _c = (0, _reactDnd.useDrag)({
    item: {
      type: ItemTypes.CARD,
      id: id,
      index: index
    },
    collect: function collect(monitor) {
      return {
        isDragging: monitor.isDragging()
      };
    },
    end: function end(item) {
      if (!item) {
        return;
      }

      _end(item.id, item.index);
    }
  }),
      isDragging = _c[0].isDragging,
      drag = _c[1];

  var opacity = isDragging ? 0 : 1;
  drag(drop(ref));
  return /*#__PURE__*/_react["default"].createElement("div", {
    ref: ref,
    style: {
      opacity: opacity
    }
  }, children);
};

var _default = Card;
exports["default"] = _default;