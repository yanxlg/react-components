import React, { useMemo } from 'react';
import { Popover } from 'antd';
import styles from './_index.less';
import LazyImage from '../LazyImage';

var AutoEnLargeImg = function AutoEnLargeImg(_a) {
  var _b = _a.className,
      className = _b === void 0 ? '' : _b,
      _c = _a.enLargeClassName,
      enLargeClassName = _c === void 0 ? '' : _c,
      src = _a.src,
      children = _a.children,
      enlargeContent = _a.enlargeContent;
  return useMemo(function () {
    return src || children ? React.createElement(Popover, {
      placement: "right",
      content: src ? React.createElement("img", {
        src: src.replace('150_150', '240_240'),
        alt: "",
        className: styles.enlarge + " " + enLargeClassName
      }) : enlargeContent,
      title: null,
      autoAdjustOverflow: true
    }, src ? React.createElement(LazyImage, {
      src: src,
      className: className,
      alt: ""
    }) : // <img src={src} className={className} alt="" />
    children) : null;
  }, [className, enLargeClassName, src]);
};

export default AutoEnLargeImg;