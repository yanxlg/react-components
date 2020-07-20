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

import { useEffect, useMemo, useState } from 'react';
import debounce from 'lodash/debounce';

function useScrollXY(containerRef, bottom, minHeight, autoFitY, columns, rowSelection, scroll) {
  var _a = useState(scroll === null || scroll === void 0 ? void 0 : scroll.y),
      y = _a[0],
      setY = _a[1];

  var scrollX = useMemo(function () {
    // 初始需要scrollX 防止header空白，columns更新返回undefined，防止header抖动
    if ((scroll === null || scroll === void 0 ? void 0 : scroll.x) === true || (scroll === null || scroll === void 0 ? void 0 : scroll.x) === 'max-content') {
      var x_1 = 0;

      if (rowSelection && rowSelection.columnWidth) {
        x_1 += parseInt(rowSelection.columnWidth) || 0;
      }

      columns === null || columns === void 0 ? void 0 : columns.forEach(function (column) {
        // 支持表头分组
        if (column['children']) {
          column['children'].map(function (item) {
            x_1 += parseInt(item.width) || 0;
          });
        } else {
          x_1 += parseInt(column.width) || 0;
        }
      });
      return x_1;
    } else {
      return scroll === null || scroll === void 0 ? void 0 : scroll.x;
    }
  }, [columns, rowSelection, scroll === null || scroll === void 0 ? void 0 : scroll.x]);
  useEffect(function () {
    var resizeHeight = debounce(function () {
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
      window.addEventListener('resize', resizeHeight);
    }

    return function () {
      window.removeEventListener('resize', resizeHeight);
    };
  }, []);
  return useMemo(function () {
    return __assign(__assign({
      scrollToFirstRowOnChange: true
    }, scroll), {
      y: y,
      // x: 'max-content',
      x: scrollX
    });
  }, [scrollX, scroll, y]);
}

export { useScrollXY };