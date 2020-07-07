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
import btnStyles from './_btn.less';
import classNames from 'classnames';
import useUpdate from '../hooks/useUpdate';

var LoadingButton = function LoadingButton(_a) {
  var outerLoading = _a.loading,
      icon = _a.icon,
      className = _a.className,
      onDefaultClick = _a.onClick,
      _props = __rest(_a, ["loading", "icon", "className", "onClick"]);

  var _b = useState(!!outerLoading),
      loading = _b[0],
      setLoading = _b[1];

  var onClick = useCallback(function (event) {
    // 根据result 类型判断是否需要loading
    if (onDefaultClick) {
      var result = onDefaultClick(event);

      if (result['then']) {
        // promise
        setLoading(true);
      }

      if (result['finally']) {
        result['finally'](function () {
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    }
  }, [onDefaultClick]);
  useUpdate(function () {
    setLoading(!!outerLoading);
  }, [outerLoading]);
  return useMemo(function () {
    return React.createElement(_Button, __assign({}, _props, {
      icon: icon,
      className: classNames(className, icon ? btnStyles.btnWithoutAnim : ''),
      loading: loading,
      onClick: onClick
    }));
  }, [_props, loading, onDefaultClick, icon, className]);
};

export default LoadingButton;