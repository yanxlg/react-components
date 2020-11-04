import React, { forwardRef, useImperativeHandle, useMemo, useState } from 'react';

var UpdateContainer = function UpdateContainer(_a, ref) {
  var children = _a.children;

  var _b = useState(),
      data = _b[0],
      setData = _b[1];

  useImperativeHandle(ref, function () {
    return {
      update: function update(data) {
        setData(data);
      }
    };
  }, []);
  return useMemo(function () {
    return React.createElement("span", null, children(data));
  }, [children, data]);
};

export default forwardRef(UpdateContainer);