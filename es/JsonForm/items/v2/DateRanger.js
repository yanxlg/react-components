import "antd/es/date-picker/style/css";
import _DatePicker from "antd/es/date-picker";
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

import React, { useMemo } from 'react';
import formStyles from '../../_form.less';
import classNames from 'classnames';
import { getValueByNamePath } from './Select';
var typeList = ['dateRanger@2'];

var FormDateRanger = function FormDateRanger(props) {
  var _a = props.name,
      name1 = _a[0],
      name2 = _a[1],
      _b = props.className,
      className = _b === void 0 ? formStyles.formItem : _b,
      _onChange = props.onChange,
      labelClassName = props.labelClassName,
      form = props.form,
      type = props.type,
      rules = props.rules,
      initialValue = props.initialValue,
      childrenProps = props.childrenProps,
      formatter = props.formatter,
      labelCol = props.labelCol,
      formItemProps = __rest(props, ["name", "className", "onChange", "labelClassName", "form", "type", "rules", "initialValue", "childrenProps", "formatter", "labelCol"]);

  var event1Props = useMemo(function () {
    return _onChange ? {
      onChange: function onChange() {
        _onChange(name1, form);
      }
    } : {};
  }, []);
  var event2Props = useMemo(function () {
    return _onChange ? {
      onChange: function onChange() {
        _onChange(name2, form);
      }
    } : {};
  }, []);
  return useMemo(function () {
    var itemClassName = classNames(formStyles.inlineBlock, formStyles.marginNone, formStyles.verticalMiddle);
    return /*#__PURE__*/React.createElement(_Form.Item, __assign({
      labelCol: __assign(__assign({}, labelCol), {
        className: classNames(labelCol === null || labelCol === void 0 ? void 0 : labelCol.className, labelClassName)
      }),
      className: className
    }, formItemProps), /*#__PURE__*/React.createElement(_Form.Item, {
      shouldUpdate: function shouldUpdate(prevValues, currentValues) {
        return getValueByNamePath(prevValues, name2) !== getValueByNamePath(currentValues, name2);
      },
      className: itemClassName
    }, function (_a) {
      var getFieldValue = _a.getFieldValue;
      var endTime = getFieldValue(name2);
      return /*#__PURE__*/React.createElement(_Form.Item, {
        name: name1,
        className: formStyles.marginNone,
        rules: rules === null || rules === void 0 ? void 0 : rules[0],
        initialValue: initialValue === null || initialValue === void 0 ? void 0 : initialValue[0],
        colon: false
      }, /*#__PURE__*/React.createElement(_DatePicker, __assign({
        disabledDate: function disabledDate(currentDate) {
          return currentDate ? endTime ? currentDate.isAfter(endTime) : false : false;
        }
      }, childrenProps, event1Props)));
    }), /*#__PURE__*/React.createElement("span", {
      className: classNames(formStyles.formColon, formStyles.verticalMiddle)
    }, "-"), /*#__PURE__*/React.createElement(_Form.Item, {
      className: itemClassName,
      shouldUpdate: function shouldUpdate(prevValues, currentValues) {
        return getValueByNamePath(prevValues, name1) !== getValueByNamePath(currentValues, name1);
      }
    }, function (_a) {
      var getFieldValue = _a.getFieldValue;
      var startTime = getFieldValue(name1);
      return /*#__PURE__*/React.createElement(_Form.Item, {
        name: name2,
        className: formStyles.marginNone,
        rules: rules === null || rules === void 0 ? void 0 : rules[1],
        initialValue: initialValue === null || initialValue === void 0 ? void 0 : initialValue[1],
        colon: false
      }, /*#__PURE__*/React.createElement(_DatePicker, __assign({
        disabledDate: function disabledDate(currentDate) {
          return currentDate ? startTime ? currentDate.isBefore(startTime) : false : false;
        }
      }, childrenProps, event2Props)));
    }));
  }, [childrenProps]);
};

FormDateRanger.typeList = typeList;
export default FormDateRanger;