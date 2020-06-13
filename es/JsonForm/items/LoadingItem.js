import "antd/es/spin/style/css";
import _Spin from "antd/es/spin";
import "antd/es/form/style/css";
import _Form from "antd/es/form";
import React, { useCallback, useEffect, useState } from 'react';
import { getColChildren, getFormItem } from '../index';
import LoadingButton from '../../LoadingButton';
var typeList = ['loading'];

var LoadingItem = function LoadingItem(_a) {
  var placeholder = _a.placeholder,
      loading = _a.loading,
      form = _a.form,
      labelClassName = _a.labelClassName,
      itemCol = _a.itemCol,
      itemRow = _a.itemRow;

  var _b = useState(true),
      loadState = _b[0],
      setLoadState = _b[1];

  var _c = useState(undefined),
      field = _c[0],
      setField = _c[1]; // 重试


  useEffect(function () {
    loading(form).then(function (field) {
      setField(field);
    })["finally"](function () {
      setLoadState(false);
    });
  }, []);
  var onReload = useCallback(function () {
    setLoadState(true);
    return loading(form).then(function (field) {
      setField(field);
    })["finally"](function () {
      setLoadState(false);
    });
  }, []);
  return loadState ? getColChildren(React.createElement(_Form.Item, {
    noStyle: true,
    label: placeholder.label
  }, React.createElement(_Spin, {
    spinning: true
  })), itemCol) : field ? getColChildren(React.createElement(_Form.Item, {
    noStyle: true,
    label: placeholder.label
  }, React.createElement(LoadingButton, {
    type: "link",
    onClick: onReload
  }, "\u91CD\u8BD5")), itemCol) : getFormItem(field, form, labelClassName, itemCol, itemRow);
};

LoadingItem.typeList = typeList;
export default LoadingItem;