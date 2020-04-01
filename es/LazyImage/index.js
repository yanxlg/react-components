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
import classNames from 'classnames'; // import styles from '../../temp/JsonForm/_form.less';

var LazyImage = function LazyImage(_a, ref) {
  var _b = _a.scrollContainer,
      scrollContainer = _b === void 0 ? '.ant-table-body' : _b,
      className = _a.className,
      props = __rest(_a, ["scrollContainer", "className"]);

  return React.createElement(LazyLoad, {
    scrollContainer: scrollContainer,
    offset: 100,
    throttle: true,
    placeholder: React.createElement(_Skeleton.Input, {
      active: true,
      className: classNames(className, "inline-block")
    })
  }, React.createElement("img", __assign({}, props, {
    className: className
  })));
};

export default forwardRef(LazyImage);