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

import React from 'react';
var typeList = ['component'];

var CustomFragment = function CustomFragment(_a) {
  var form = _a.form,
      Component = _a.Component,
      props = _a.props;
  return React.createElement(Component, __assign({
    form: form
  }, props));
};

CustomFragment.typeList = typeList;
export default CustomFragment;