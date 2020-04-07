"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useScrollXY = useScrollXY;

var _react = require("react");

var _lodash = require("lodash");

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

function useScrollXY(containerRef, bottom, minHeight, autoFitY, columns, rowSelection, scroll) {
  var _a = (0, _react.useState)(scroll === null || scroll === void 0 ? void 0 : scroll.y),
      y = _a[0],
      setY = _a[1];

  var scrollX = (0, _react.useMemo)(function () {
    if ((scroll === null || scroll === void 0 ? void 0 : scroll.x) === true || (scroll === null || scroll === void 0 ? void 0 : scroll.x) === "max-content") {
      var x_1 = 0;

      if (rowSelection && rowSelection.columnWidth) {
        x_1 += parseInt(rowSelection.columnWidth) || 0;
      }

      columns === null || columns === void 0 ? void 0 : columns.forEach(function (column) {
        x_1 += parseInt(column.width) || 0;
      });
      return x_1;
    } else {
      return scroll === null || scroll === void 0 ? void 0 : scroll.x;
    }
  }, [columns, rowSelection, scroll === null || scroll === void 0 ? void 0 : scroll.x]);
  (0, _react.useEffect)(function () {
    var resizeHeight = (0, _lodash.debounce)(function () {
      var el = containerRef.current;
      var height = document.body.offsetHeight - el.getBoundingClientRect().top - bottom;

      if ((!minHeight || height >= minHeight) && height > 0) {
        setY(height);
      } else if (minHeight) {
        setY(minHeight);
      }
    }, 300);

    if (autoFitY) {
      resizeHeight();
      window.addEventListener("resize", resizeHeight);
    }

    return function () {
      window.removeEventListener("resize", resizeHeight);
    };
  }, []);
  return (0, _react.useMemo)(function () {
    return __assign(__assign({
      scrollToFirstRowOnChange: true
    }, scroll), {
      y: y,
      x: scrollX
    });
  }, [scrollX, scroll, y]);
}