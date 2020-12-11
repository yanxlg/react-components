import "antd/es/carousel/style/css";
import _Carousel from "antd/es/carousel";
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
import LazyImage from '../LazyImage';
import styles from './_index.less';

var AutoEnLargeImg = function AutoEnLargeImg(_a) {
  var _b = _a.className,
      className = _b === void 0 ? '' : _b,
      _c = _a.enLargeClassName,
      enLargeClassName = _c === void 0 ? '' : _c,
      src = _a.src,
      srcList = _a.srcList,
      children = _a.children,
      enlargeContent = _a.enlargeContent,
      noLazy = _a.noLazy,
      props = __rest(_a, ["className", "enLargeClassName", "src", "srcList", "children", "enlargeContent", "noLazy"]);

  return useMemo(function () {
    if (Array.isArray(srcList) && srcList.length > 0) {
      return React.createElement(_Popover, {
        placement: "right",
        content: function content() {
          return React.createElement("div", {
            style: {
              width: 240,
              height: 240
            }
          }, React.createElement(_Carousel, {
            style: {
              position: 'relative'
            }
          }, srcList.map(function (val) {
            return React.createElement("div", {
              key: val
            }, React.createElement("img", {
              src: val === null || val === void 0 ? void 0 : val.replace('150_150', '240_240'),
              alt: "",
              className: styles.enlarge + " " + enLargeClassName
            }));
          })));
        },
        title: null,
        autoAdjustOverflow: true
      }, React.createElement(LazyImage, __assign({
        src: srcList[0],
        className: className,
        alt: ""
      }, props)));
    }

    return src || children ? React.createElement(_Popover, {
      placement: "right",
      content: src ? React.createElement("img", {
        src: src.replace('150_150', '240_240'),
        alt: "",
        className: styles.enlarge + " " + enLargeClassName
      }) : enlargeContent,
      title: null,
      autoAdjustOverflow: true
    }, src ? noLazy ? React.createElement("img", __assign({
      src: src,
      className: className,
      alt: ""
    }, props)) : React.createElement(LazyImage, __assign({
      src: src,
      className: className,
      alt: ""
    }, props)) : children) : null;
  }, [className, enLargeClassName, src]);
};

export default AutoEnLargeImg;