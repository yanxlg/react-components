import "antd/es/cascader/style/css";
import _Cascader from "antd/es/cascader";
import "antd/es/form/style/css";
import _Form from "antd/es/form";

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

import React, { useMemo, useState, useEffect } from 'react';
import classnames from 'classnames';
import formStyles from '../../_form.less';
var typeList = ['cascader@2'];

function _filter(inputValue, path, fieldNames) {
  return path.some(function (option) {
    return option[fieldNames ? fieldNames.label : 'label'].toLowerCase().indexOf(inputValue.toLowerCase()) > -1;
  });
}

var FormCascader = function FormCascader(props) {
  var _a = props.className,
      className = _a === void 0 ? formStyles.formItem : _a,
      labelCol = props.labelCol,
      labelClassName = props.labelClassName,
      childrenProps = props.childrenProps,
      form = props.form,
      _onChange = props.onChange,
      formItemProps = __rest(props, ["className", "labelCol", "labelClassName", "childrenProps", "form", "onChange"]);

  var _b = useState([]),
      optionList = _b[0],
      setOptionList = _b[1];

  var _c = childrenProps.options,
      options = _c === void 0 ? [] : _c,
      service = childrenProps.service,
      _d = childrenProps.dataPath,
      dataPath = _d === void 0 ? 'data' : _d,
      restChildrenProps = __rest(childrenProps, ["options", "service", "dataPath"]);

  var eventProps = useMemo(function () {
    return _onChange ? {
      onChange: function onChange() {
        _onChange(name, form);
      }
    } : {};
  }, [_onChange]);
  useEffect(function () {
    if (service && typeof service === 'function') {
      service().then(function (res) {
        dataPath ? setOptionList(res[dataPath]) : setOptionList(res);
      });
    }
  }, []);
  return useMemo(function () {
    return /*#__PURE__*/React.createElement(_Form.Item, __assign({
      className: className,
      labelCol: __assign(__assign({}, labelCol), {
        className: classnames(labelCol === null || labelCol === void 0 ? void 0 : labelCol.className, labelClassName)
      })
    }, formItemProps), /*#__PURE__*/React.createElement(_Cascader, __assign({
      showSearch: {
        filter: function filter(inputValue, path) {
          return _filter(inputValue, path, childrenProps.fieldNames);
        }
      },
      options: service ? optionList : options
    }, eventProps, restChildrenProps)));
  }, [optionList, options]);
};

FormCascader.typeList = typeList;
export default FormCascader;