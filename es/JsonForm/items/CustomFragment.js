import React from 'react';
var typeList = ['component'];

var CustomFragment = function CustomFragment(_a) {
  var form = _a.form,
      Component = _a.Component;
  return React.createElement(Component, {
    form: form
  });
};

CustomFragment.typeList = typeList;
export default CustomFragment;