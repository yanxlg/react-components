import "antd/es/spin/style/css";
import _Spin from "antd/es/spin";
import "antd/es/form/style/css";
import _Form from "antd/es/form";
import React, { useCallback, useEffect, useState } from 'react';
import { getColChildren, getFormItem } from '../index';
import LoadingButton from '../../LoadingButton';
import formStyles from '../_form.less';
var typeList = ['loading'];

var LoadingItem = function LoadingItem(_a) {
  var _b = _a.placeholder,
      label = _b.label,
      labelClassName = _b.labelClassName,
      _c = _b.formItemClassName,
      formItemClassName = _c === void 0 ? formStyles.formItem : _c,
      colon = _b.colon,
      loading = _a.loading,
      form = _a.form,
      itemCol = _a.itemCol,
      itemRow = _a.itemRow;

  var _d = useState(true),
      loadState = _d[0],
      setLoadState = _d[1];

  var _e = useState(undefined),
      field = _e[0],
      setField = _e[1]; // 重试


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
    className: formItemClassName,
    label: React.createElement("span", {
      className: labelClassName
    }, label),
    colon: colon
  }, React.createElement(_Spin, {
    spinning: true
  })), itemCol) : field === void 0 ? getColChildren(React.createElement(_Form.Item, {
    className: formItemClassName,
    label: React.createElement("span", {
      className: labelClassName
    }, label),
    colon: colon
  }, React.createElement(LoadingButton, {
    type: "link",
    onClick: onReload
  }, "\u91CD\u8BD5")), itemCol) : getFormItem(field, form, labelClassName, itemCol, itemRow);
};

LoadingItem.typeList = typeList;
export default LoadingItem;