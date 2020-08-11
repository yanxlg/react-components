import "antd/es/skeleton/style/css";
import _Skeleton from "antd/es/skeleton";

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

import React, { forwardRef } from 'react';
import LazyLoad from 'react-lazyload';
import classNames from 'classnames';
import formStyles from "../JsonForm/_form.less";

var LazyImage = function LazyImage(_a, ref) {
  var className = _a.className,
      once = _a.once,
      height = _a.height,
      _b = _a.offset,
      offset = _b === void 0 ? 100 : _b,
      _c = _a.overflow,
      overflow = _c === void 0 ? true : _c,
      resize = _a.resize,
      scroll = _a.scroll,
      _d = _a.throttle,
      throttle = _d === void 0 ? true : _d,
      debounce = _a.debounce,
      scrollContainer = _a.scrollContainer,
      unmountIfInvisible = _a.unmountIfInvisible,
      preventLoading = _a.preventLoading,
      props = __rest(_a, ["className", "once", "height", "offset", "overflow", "resize", "scroll", "throttle", "debounce", "scrollContainer", "unmountIfInvisible", "preventLoading"]);

  return /*#__PURE__*/React.createElement(LazyLoad, {
    scrollContainer: scrollContainer,
    once: once,
    height: height,
    offset: offset,
    overflow: overflow,
    resize: resize,
    scroll: scroll,
    debounce: debounce,
    throttle: throttle,
    unmountIfInvisible: unmountIfInvisible,
    preventLoading: preventLoading,
    placeholder: /*#__PURE__*/React.createElement(_Skeleton.Input, {
      active: true,
      className: classNames(className, formStyles.inlineBlock)
    })
  }, /*#__PURE__*/React.createElement("img", __assign({}, props, {
    className: className
  })));
};

export default /*#__PURE__*/forwardRef(LazyImage);