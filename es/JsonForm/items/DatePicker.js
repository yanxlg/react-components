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

import React, { useCallback, useMemo } from 'react';
import dayjs from 'dayjs';
import formStyles from '../_form.less';
var typeList = ['datePicker'];

var FormDatePicker = function FormDatePicker(props) {
  var name = props.name,
      placeholder = props.placeholder,
      label = props.label,
      _a = props.className,
      className = _a === void 0 ? formStyles.formItemDefault : _a,
      _b = props.formItemClassName,
      formItemClassName = _b === void 0 ? formStyles.formItem : _b,
      dateBeginWith = props.dateBeginWith,
      dateEndWith = props.dateEndWith,
      _onChange = props.onChange,
      labelClassName = props.labelClassName,
      form = props.form,
      rules = props.rules,
      picker = props.picker,
      initialValue = props.initialValue,
      _props = __rest(props, ["name", "placeholder", "label", "className", "formItemClassName", "dateBeginWith", "dateEndWith", "onChange", "labelClassName", "form", "rules", "picker", "initialValue"]);

  var disabledStartDate = useCallback(function (dateBeginWith) {
    if (!dateBeginWith || dateBeginWith.length === 0) {
      return undefined;
    }

    return function (startTime) {
      var timeMax = undefined; // 取最小值=> endOf('d');

      dateBeginWith.map(function (dependence) {
        var date = dependence === 'now' ? dayjs() : form.getFieldValue(dependence);

        if (date) {
          var time = date.startOf('day').valueOf();

          if (timeMax && time < timeMax || timeMax === void 0) {
            timeMax = time;
          }
        }
      });

      if (!startTime || timeMax === void 0) {
        return false;
      }

      return startTime.startOf('day').valueOf() < timeMax;
    };
  }, []);
  var disabledEndDate = useCallback(function (dateEndWith) {
    if (!dateEndWith || dateEndWith.length === 0) {
      return undefined;
    }

    return function (endTime) {
      var timeMax = undefined; // 取最大值=> startOf('d');

      dateEndWith.map(function (dependence) {
        var date = dependence === 'now' ? dayjs() : form.getFieldValue(dependence);

        if (date) {
          var time = date.endOf('day').valueOf();

          if (timeMax && time < timeMax || timeMax === void 0) {
            timeMax = time;
          }
        }
      });

      if (!endTime || timeMax === void 0) {
        return false;
      }

      return timeMax < endTime.endOf('day').valueOf();
    };
  }, []);
  var disabledDate = useMemo(function () {
    return dateBeginWith ? disabledStartDate(dateBeginWith) : dateEndWith ? disabledEndDate(dateEndWith) : undefined;
  }, [dateBeginWith, dateEndWith]);
  var eventProps = useMemo(function () {
    return _onChange ? {
      onChange: function onChange() {
        _onChange(name, form);
      }
    } : {};
  }, []);
  return React.createElement(_Form.Item, {
    name: name,
    className: formItemClassName,
    label: React.createElement("span", {
      className: labelClassName
    }, label),
    rules: rules,
    initialValue: initialValue
  }, React.createElement(_DatePicker, __assign({
    className: className,
    placeholder: placeholder,
    disabledDate: disabledDate,
    picker: picker
  }, eventProps, _props)));
};

FormDatePicker.typeList = typeList;
export default FormDatePicker;