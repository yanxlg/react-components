import "antd/es/button/style/css";
import _Button from "antd/es/button";

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

import React, { useCallback, useMemo, useState } from 'react';
import btnStyles from '@/styles/_btn.less';
import classNames from 'classnames';

var LoadingButton = function LoadingButton(props) {
  var _a = useState(false),
      loading = _a[0],
      setLoading = _a[1];

  var outerLoading = props.loading,
      icon = props.icon,
      className = props.className,
      _props = __rest(props, ["loading", "icon", "className"]);

  var onClick = useCallback(function (event) {
    setLoading(true);
    props === null || props === void 0 ? void 0 : props.onClick(event)["finally"](function () {
      setLoading(false);
    });
  }, [props.onClick]);
  var currentLoading = outerLoading || loading;
  return useMemo(function () {
    return React.createElement(_Button, __assign({}, _props, {
      icon: icon,
      className: classNames(className, icon ? btnStyles.btnWithoutAnim : ''),
      loading: currentLoading,
      onClick: onClick
    }));
  }, [props, currentLoading, onClick]);
};

export default LoadingButton;