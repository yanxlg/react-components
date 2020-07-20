import "antd/es/tooltip/style/css";
import _Tooltip from "antd/es/tooltip";

var __assign = this && this.__assign || function () {
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

var __rest = this && this.__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

import React, { useCallback } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import styles from './_index.less';
import classNames from 'classnames';
import { StopOutlined } from '@ant-design/icons';
import { getColumnKey } from './index';
var type = 'DraggableHeaderTitle';

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

  var ref = React.useRef();

  var _c = useDrop({
    accept: type,
    collect: function collect(monitor) {
      var dragIndex = (monitor.getItem() || {}).index;

      if (dragIndex === index) {
        return {};
      }

      return {
        isOver: monitor.isOver(),
        dropClassName: dragIndex < index ? styles.dropOverRight : styles.dropOverLeft
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

  var _e = useDrag({
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

  var onHideColumn = useCallback(function () {
    var key = getColumnKey(column);
    hideColumn(key);
  }, []);

  if (index === void 0) {
    return React.createElement("th", __assign({
      className: className,
      style: style
    }, restProps), children);
  }

  drop(drag(ref));
  return React.createElement("th", __assign({
    ref: ref,
    className: classNames(className, (_b = {}, _b[dropClassName] = isOver, _b), styles.th),
    style: __assign({
      cursor: 'move'
    }, style)
  }, restProps), children, React.createElement(_Tooltip, {
    title: "\u9690\u85CF\u8BE5\u5217"
  }, React.createElement(StopOutlined, {
    className: styles.hideIcon,
    onClick: onHideColumn
  })));
};

export default DraggableHeaderCell;
export { type };