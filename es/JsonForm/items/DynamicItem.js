import "antd/es/form/style/css";
import _Form from "antd/es/form";

/**
 * 动态FormItem
 */
import React from 'react';
import { getFormItem } from '../index';
var typeList = ['dynamic'];

var DynamicItem = function DynamicItem(_a) {
  var form = _a.form,
      dynamic = _a.dynamic,
      shouldUpdate = _a.shouldUpdate,
      labelClassName = _a.labelClassName,
      itemCol = _a.itemCol,
      itemRow = _a.itemRow;
  return /*#__PURE__*/React.createElement(_Form.Item, {
    shouldUpdate: shouldUpdate,
    noStyle: true
  }, function () {
    var formField = dynamic(form);

    if (formField) {
      return getFormItem(formField, form, labelClassName, itemCol, itemRow);
    } else {
      return null;
    }
  });
};

DynamicItem.typeList = typeList;
export default DynamicItem;