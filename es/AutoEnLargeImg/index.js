import "antd/es/popover/style/css";
import _Popover from "antd/es/popover";

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

import React, { useMemo } from 'react';
import styles from './_index.less';
import LazyImage from '../LazyImage';

var AutoEnLargeImg = function AutoEnLargeImg(_a) {
  var _b = _a.className,
      className = _b === void 0 ? '' : _b,
      _c = _a.enLargeClassName,
      enLargeClassName = _c === void 0 ? '' : _c,
      src = _a.src,
      children = _a.children,
      enlargeContent = _a.enlargeContent,
      props = __rest(_a, ["className", "enLargeClassName", "src", "children", "enlargeContent"]);

  return useMemo(function () {
    return src || children ? React.createElement(_Popover, {
      placement: "right",
      content: src ? React.createElement("img", {
        src: src.replace('150_150', '240_240'),
        alt: "",
        className: styles.enlarge + " " + enLargeClassName
      }) : enlargeContent,
      title: null,
      autoAdjustOverflow: true
    }, src ? React.createElement(LazyImage, __assign({
      src: src,
      className: className,
      alt: ""
    }, props)) : children) : null;
  }, [className, enLargeClassName, src]);
};

export default AutoEnLargeImg;