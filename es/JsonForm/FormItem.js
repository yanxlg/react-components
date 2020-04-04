import "antd/es/form/style/css";
import _Form from "antd/es/form";
import React from "react";
import formStyles from "./_form.less";

var FormItem = function FormItem(_a) {
  var _b = _a.formItemClassName,
      formItemClassName = _b === void 0 ? formStyles.formItem : _b,
      children = _a.children;
  return React.createElement(_Form.Item, {
    className: formItemClassName
  }, children);
};

export default FormItem;