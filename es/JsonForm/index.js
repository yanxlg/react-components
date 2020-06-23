import "antd/es/button/style/css";
import _Button from "antd/es/button";
import "antd/es/form/style/css";
import _Form from "antd/es/form";
import "antd/es/row/style/css";
import _Row from "antd/es/row";
import "antd/es/col/style/css";
import _Col from "antd/es/col";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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

var __spreadArrays = this && this.__spreadArrays || function () {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) {
    s += arguments[i].length;
  }

  for (var r = Array(s), k = 0, i = 0; i < il; i++) {
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) {
      r[k] = a[j];
    }
  }

  return r;
};

import React, { forwardRef, useCallback, useImperativeHandle, useMemo, useRef, useState } from 'react';
import FormInput from './items/Input';
import FormSelect from './items/Select';
import FormCheckbox from './items/Checkbox';
import FormDatePicker from './items/DatePicker';
import FormDateRanger from './items/DateRanger';
import FormInputRange from './items/InputRange';
import { UpOutlined, DownOutlined } from '@ant-design/icons';
import FormCheckboxGroup from './items/CheckboxGroup';
import FormRadioGroup from './items/RadioGroup';
import classNames from 'classnames';
import './index.less';
import formStyles from './_form.less';
import Layout from './layout';
import DynamicItem from './items/DynamicItem';
import HideItem from './items/HideItem';
import formatter from '../utils/formatter';
import FormTextArea from './items/TextArea';
import FormCascader from './items/Cascader';
import CustomFragment from './items/CustomFragment';
import FormTreeSelect from './items/TreeSelect';
import LoadingItem from './items/LoadingItem';
import FormNumberRange from './items/NumberRange';
import FormTree from './items/TreeItem';
import CollapseLayout from './layout/CollapseLayout';
import FormPassword from './items/Password';
export var getColChildren = function getColChildren(children, itemCol, times) {
  if (times === void 0) {
    times = 1;
  }

  if (itemCol) {
    return React.createElement(_Col, __assign({}, itemCol), children);
  } else {
    return children;
  }
};
export var getFormItem = function getFormItem(_a, form, labelClassName, itemCol, itemRow, index, hide) {
  var type = _a.type,
      field = __rest(_a, ["type"]);

  var name = field['name'];

  if (FormInput.typeList.includes(type)) {
    return getColChildren(React.createElement(FormInput, __assign({
      key: String(name),
      labelClassName: labelClassName
    }, field, {
      type: type,
      form: form,
      hide: hide
    })), itemCol);
  }

  if (FormPassword.typeList.includes(type)) {
    return getColChildren(React.createElement(FormPassword, __assign({
      key: String(name),
      labelClassName: labelClassName
    }, field, {
      type: type,
      form: form
    })), itemCol);
  }

  if (FormSelect.typeList.includes(type)) {
    return getColChildren(React.createElement(FormSelect, __assign({
      key: String(name),
      labelClassName: labelClassName
    }, field, {
      type: type,
      form: form,
      hide: hide
    })), itemCol);
  }

  if (FormCheckbox.typeList.includes(type)) {
    return getColChildren(React.createElement(FormCheckbox, __assign({
      key: String(name),
      labelClassName: labelClassName
    }, field, {
      type: type,
      form: form,
      hide: hide
    })), itemCol);
  }

  if (FormDatePicker.typeList.includes(type)) {
    return getColChildren(React.createElement(FormDatePicker, __assign({
      key: String(name),
      labelClassName: labelClassName
    }, field, {
      type: type,
      form: form,
      hide: hide
    })), itemCol);
  }

  if (FormDateRanger.typeList.includes(type)) {
    return getColChildren(React.createElement(FormDateRanger, __assign({
      key: String(name),
      labelClassName: labelClassName
    }, field, {
      type: type,
      form: form,
      hide: hide
    })), itemCol);
  }

  if (FormCheckboxGroup.typeList.includes(type)) {
    return getColChildren(React.createElement(FormCheckboxGroup, __assign({
      key: String(name),
      labelClassName: labelClassName
    }, field, {
      type: type,
      form: form,
      hide: hide
    })), itemCol);
  }

  if (FormRadioGroup.typeList.includes(type)) {
    return getColChildren(React.createElement(FormRadioGroup, __assign({
      key: String(name),
      labelClassName: labelClassName
    }, field, {
      type: type,
      form: form,
      hide: hide
    })), itemCol);
  }

  if (FormInputRange.typeList.includes(type)) {
    return React.createElement(FormInputRange, __assign({
      key: String(name),
      labelClassName: labelClassName
    }, field, {
      type: type,
      form: form,
      hide: hide
    }));
  }

  if (Layout.typeList.includes(type)) {
    return getColChildren(React.createElement(Layout, __assign({
      key: String(index),
      labelClassName: labelClassName
    }, field, {
      type: type,
      form: form,
      itemRow: itemRow,
      itemCol: itemCol
    })), itemCol);
  }

  if (DynamicItem.typeList.includes(type)) {
    return getColChildren(React.createElement(DynamicItem, __assign({
      key: String(index),
      labelClassName: labelClassName
    }, field, {
      type: type,
      form: form,
      itemRow: itemRow,
      itemCol: itemCol
    })), itemCol);
  }

  if (HideItem.typeList.includes(type)) {
    return React.createElement(HideItem, __assign({
      key: String(index)
    }, field, {
      type: type,
      form: form
    }));
  }

  if (FormTextArea.typeList.includes(type)) {
    return React.createElement(FormTextArea, __assign({
      key: String(index),
      labelClassName: labelClassName
    }, field, {
      type: type,
      form: form,
      hide: hide
    }));
  }

  if (FormCascader.typeList.includes(type)) {
    return React.createElement(FormCascader, __assign({
      key: String(index),
      labelClassName: labelClassName
    }, field, {
      type: type,
      form: form,
      hide: hide
    }));
  }

  if (CustomFragment.typeList.includes(type)) {
    return React.createElement(CustomFragment, __assign({
      key: String(index)
    }, field, {
      type: type,
      form: form
    }));
  }

  if (FormTreeSelect.typeList.includes(type)) {
    return getColChildren(React.createElement(FormTreeSelect, __assign({
      key: String(name),
      labelClassName: labelClassName
    }, field, {
      type: type,
      form: form,
      hide: hide
    })), itemCol);
  }

  if (LoadingItem.typeList.includes(type)) {
    return getColChildren(React.createElement(LoadingItem, __assign({
      key: String(name)
    }, field, _extends({}, field.placeholder, {
      labelClassName: field.placeholder.labelClassName || labelClassName
    }), {
      type: type,
      form: form
    })), itemCol);
  }

  if (FormNumberRange.typeList.includes(type)) {
    return getColChildren(React.createElement(FormNumberRange, __assign({
      key: String(name),
      labelClassName: labelClassName
    }, field, {
      type: type,
      form: form,
      hide: hide
    })), itemCol);
  }

  if (FormTree.typeList.includes(type)) {
    return getColChildren(React.createElement(FormTree, __assign({
      key: String(name),
      labelClassName: labelClassName
    }, field, {
      type: type,
      form: form,
      hide: hide
    })), itemCol);
  }

  if (CollapseLayout.typeList.includes(type)) {
    return getColChildren(React.createElement(CollapseLayout, __assign({
      key: String(index),
      labelClassName: labelClassName
    }, field, {
      type: type,
      form: form,
      itemRow: itemRow,
      itemCol: itemCol
    })), itemCol);
  }

  return null;
};
export var getFormItems = function getFormItems(fieldList, form, labelClassName, itemCol, itemRow, showList) {
  var fields = fieldList.map(function (field, index) {
    var name = field['name']; // undefined | string | string[];

    var hide = showList === void 0 ? false : typeof name == 'string' ? showList.indexOf(name) === -1 : Array.isArray(name) ? showList.indexOf(name.join(',')) === -1 : false;
    return getFormItem(field, form, labelClassName, itemCol, itemRow, index, hide);
  });

  if (itemCol) {
    return React.createElement(_Row, __assign({}, itemRow ? itemRow : {}, {
      className: formStyles.formRow
    }), fields);
  } else {
    return fields;
  }
};

var getFormatterFunc = function getFormatterFunc(formatterName, defaultFormatter) {
  var _default = function _default(value) {
    return value;
  };

  return (typeof formatterName === 'string' || formatterName === void 0 ? formatter[formatterName] || defaultFormatter || _default : formatterName) || _default;
};

var JsonForm = function JsonForm(props, ref) {
  var fieldList = props.fieldList,
      children = props.children,
      labelClassName = props.labelClassName,
      _a = props.defaultCollapse,
      defaultCollapse = _a === void 0 ? true : _a,
      itemCol = props.itemCol,
      itemRow = props.itemRow,
      proForm = props.form,
      className = props.className,
      _b = props.containerClassName,
      containerClassName = _b === void 0 ? formStyles.formContainer : _b,
      collapseItems = props.collapseItems,
      _props = __rest(props, ["fieldList", "children", "labelClassName", "defaultCollapse", "itemCol", "itemRow", "form", "className", "containerClassName", "collapseItems"]);

  var enableCollapse = collapseItems && collapseItems.length > 0;

  var _c = useState(defaultCollapse),
      collapse = _c[0],
      setCollapse = _c[1]; // 展开收起状态控制


  var form = _Form.useForm(proForm)[0];

  var btnWrap = useRef(null);
  useImperativeHandle(ref, function () {
    return {
      getFieldsValue: getValues,
      validateFields: function validateFields() {
        return form.validateFields().then(function () {
          return getValues();
        });
      },
      setFieldsValue: function setFieldsValue(value) {
        form.setFieldsValue(value);
      },
      resetFields: function resetFields() {
        form.resetFields();
      }
    };
  }, [fieldList]);
  var getValues = useCallback(function (targetFieldList) {
    var values = {};
    var target = targetFieldList || fieldList;
    target.map(function (field) {
      var type = field.type;

      if (FormPassword.typeList.includes(type)) {
        values[name] = form.getFieldValue(name);
      } else if (Layout.typeList.includes(type)) {
        // layout 组件
        values = __assign(__assign({}, values), getValues(field.fieldList));
      } else if (CollapseLayout.typeList.indexOf(type)) {
        values = __assign(__assign({}, values), getValues(__spreadArrays(field.fieldList, [field.panel.header])));
      } else if (LoadingItem.typeList.includes(type)) {
        // @ts-ignore
        var _field = field.loading._cache;

        var _value = getValues(_field ? [_field] : []);

        values = __assign(__assign({}, values), _value);
      } else if (DynamicItem.typeList.includes(type)) {
        var _value = getValues([field.dynamic(form)]);

        values = __assign(__assign({}, values), _value);
      } else {
        var _a = field,
            formatterName = _a.formatter,
            name_1 = _a.name;

        if (FormInput.typeList.includes(type) || FormTextArea.typeList.includes(type) || FormSelect.typeList.includes(type) || FormDatePicker.typeList.includes(type)) {
          values[name_1] = getFormatterFunc(formatterName, formatter["null"])(form.getFieldValue(name_1));
        } else if (FormDateRanger.typeList.includes(type)) {
          var name1 = name_1[0],
              name2 = name_1[1];
          values[name1] = getFormatterFunc(formatterName === null || formatterName === void 0 ? void 0 : formatterName[0], formatter["null"])(form.getFieldValue(name1));
          values[name2] = getFormatterFunc(formatterName === null || formatterName === void 0 ? void 0 : formatterName[1], formatter["null"])(form.getFieldValue(name2));
        } else if (FormInputRange.typeList.includes(type) || FormNumberRange.typeList.includes(type)) {
          var name1 = name_1[0],
              name2 = name_1[1];
          values[name1] = getFormatterFunc(formatterName === null || formatterName === void 0 ? void 0 : formatterName[0], formatter.number)(form.getFieldValue(name1));
          values[name2] = getFormatterFunc(formatterName === null || formatterName === void 0 ? void 0 : formatterName[1], formatter.number)(form.getFieldValue(name2));
        } else if (CustomFragment.typeList.includes(type)) {
          var names = field.names;

          var _values = form.getFieldsValue(names);

          values = __assign(__assign({}, values), _values);
        } else {
          values[name_1] = getFormatterFunc(formatterName, formatter["null"])(form.getFieldValue(name_1));
        }
      }
    });
    return values;
  }, [fieldList]);
  var onCollapseChange = useCallback(function () {
    // 需要判断当前元素位置
    setCollapse(!collapse);
  }, [collapse]);
  var collapseBtn = useMemo(function () {
    if (enableCollapse) {
      return React.createElement("div", {
        ref: btnWrap,
        style: {
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'flex-end'
        },
        className: formStyles.formItem
      }, React.createElement(_Button, {
        type: "link",
        style: {
          "float": 'right'
        },
        onClick: onCollapseChange
      }, collapse ? React.createElement(React.Fragment, null, "\u6536\u8D77", React.createElement(UpOutlined, null)) : React.createElement(React.Fragment, null, "\u5C55\u5F00", React.createElement(DownOutlined, null))));
    } else {
      return null;
    }
  }, [collapse, enableCollapse]);
  var fromItemList = useMemo(function () {
    var showList = collapse ? undefined : collapseItems;
    return getFormItems(fieldList, form, labelClassName, itemCol, itemRow, showList);
  }, [fieldList, collapse, collapseItems]);
  var wrapChildren = useMemo(function () {
    return React.Children.map(children, function (child) {
      return React.createElement("span", {
        className: formStyles.formItem
      }, child);
    });
  }, [children]);
  var formContent = useMemo(function () {
    return React.createElement(React.Fragment, null, fromItemList, wrapChildren);
  }, [fieldList, children, collapse, collapseItems]);
  return useMemo(function () {
    if (enableCollapse) {
      return React.createElement("div", {
        className: containerClassName
      }, React.createElement("div", {
        className: classNames(formStyles.flex, formStyles.flex1)
      }, React.createElement("div", {
        className: classNames(formStyles.flex1, formStyles.flexRow),
        style: {
          flexWrap: 'wrap'
        }
      }, React.createElement(_Form, __assign({
        layout: "inline"
      }, _props, {
        form: form,
        className: className
      }), formContent)), collapseBtn));
    } else {
      return React.createElement("div", {
        className: containerClassName
      }, React.createElement(_Form, __assign({
        layout: "inline"
      }, _props, {
        form: form,
        className: className
      }), formContent));
    }
  }, [fieldList, collapse, children, collapseItems, enableCollapse]);
};

export default forwardRef(JsonForm);