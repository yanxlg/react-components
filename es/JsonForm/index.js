import "antd/es/button/style/css";
import _Button from "antd/es/button";
import "antd/es/form/style/css";
import _Form from "antd/es/form";
import "antd/es/row/style/css";
import _Row from "antd/es/row";
import "antd/es/col/style/css";
import _Col from "antd/es/col";

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

import React, { forwardRef, useCallback, useImperativeHandle, useMemo, useRef, useState } from "react";
import FormInput from "./items/Input";
import FormSelect from "./items/Select";
import FormCheckbox from "./items/Checkbox";
import FormDatePicker from "./items/DatePicker";
import FormDateRanger from "./items/DateRanger";
import FormInputRange from "./items/InputRange";
import RcResizeObserver from "rc-resize-observer";
import { UpOutlined, DownOutlined } from "@ant-design/icons";
import FormCheckboxGroup from "./items/CheckboxGroup";
import FormRadioGroup from "./items/RadioGroup";
import classNames from "classnames";
import "./index.less";
import formStyles from "./_form.less";
import Layout from "./layout";
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
export var getFormItems = function getFormItems(fieldList, form, labelClassName, itemCol, itemRow) {
  var fields = fieldList.map(function (_a, index) {
    var type = _a.type,
        field = __rest(_a, ["type"]);

    var name = field["name"];

    if (FormInput.typeList.includes(type)) {
      return getColChildren(React.createElement(FormInput, __assign({
        key: String(name)
      }, field, {
        type: type,
        labelClassName: labelClassName,
        form: form
      })), itemCol);
    }

    if (FormSelect.typeList.includes(type)) {
      return getColChildren(React.createElement(FormSelect, __assign({
        key: String(name)
      }, field, {
        type: type,
        labelClassName: labelClassName,
        form: form
      })), itemCol);
    }

    if (FormCheckbox.typeList.includes(type)) {
      return getColChildren(React.createElement(FormCheckbox, __assign({
        key: String(name)
      }, field, {
        type: type,
        labelClassName: labelClassName,
        form: form
      })), itemCol);
    }

    if (FormDatePicker.typeList.includes(type)) {
      return getColChildren(React.createElement(FormDatePicker, __assign({
        key: String(name)
      }, field, {
        type: type,
        labelClassName: labelClassName,
        form: form
      })), itemCol);
    }

    if (FormDateRanger.typeList.includes(type)) {
      return getColChildren(React.createElement(FormDateRanger, __assign({
        key: String(name)
      }, field, {
        type: type,
        labelClassName: labelClassName,
        form: form
      })), itemCol);
    }

    if (FormCheckboxGroup.typeList.includes(type)) {
      return getColChildren(React.createElement(FormCheckboxGroup, __assign({
        key: String(name)
      }, field, {
        type: type,
        labelClassName: labelClassName,
        form: form
      })), itemCol);
    }

    if (FormRadioGroup.typeList.includes(type)) {
      return getColChildren(React.createElement(FormRadioGroup, __assign({
        key: String(name)
      }, field, {
        type: type,
        labelClassName: labelClassName,
        form: form
      })), itemCol);
    }

    if (FormInputRange.typeList.includes(type)) {
      return React.createElement(FormInputRange, __assign({
        key: String(name)
      }, field, {
        type: type,
        labelClassName: labelClassName,
        form: form
      }));
    }

    if (Layout.typeList.includes(type)) {
      return getColChildren(React.createElement(Layout, __assign({
        key: String(index)
      }, field, {
        type: type,
        labelClassName: labelClassName,
        form: form,
        itemRow: itemRow,
        itemCol: itemCol
      })), itemCol);
    }

    return null;
  });

  if (itemCol) {
    return React.createElement(_Row, __assign({}, itemRow ? itemRow : {}, {
      className: formStyles.formRow
    }), fields);
  } else {
    return fields;
  }
};

var JsonForm = function JsonForm(props, ref) {
  var fieldList = props.fieldList,
      children = props.children,
      labelClassName = props.labelClassName,
      _a = props.rowHeight,
      rowHeight = _a === void 0 ? 56 : _a,
      // 32 + 24
  _b = props.defaultCollapse,
      // 32 + 24
  defaultCollapse = _b === void 0 ? true : _b,
      _c = props.enableCollapse,
      enableCollapse = _c === void 0 ? true : _c,
      itemCol = props.itemCol,
      itemRow = props.itemRow,
      proForm = props.form,
      _d = props.className,
      className = _d === void 0 ? formStyles.formContainer : _d,
      _props = __rest(props, ["fieldList", "children", "labelClassName", "rowHeight", "defaultCollapse", "enableCollapse", "itemCol", "itemRow", "form", "className"]);

  var _e = useState(defaultCollapse),
      collapse = _e[0],
      setCollapse = _e[1];

  var _f = useState(false),
      collapseBtnVisible = _f[0],
      setCollapseBtnVisible = _f[1];

  var form = _Form.useForm(proForm)[0];

  var wrapRef = useRef(null);
  var btnWrap = useRef(null);

  var _g = useState(defaultCollapse ? rowHeight : undefined),
      formHeight = _g[0],
      setFormHeight = _g[1];

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
      }
    };
  }, []);
  var getValues = useCallback(function (targetFieldList) {
    var values = {};
    var target = targetFieldList || fieldList;
    target.map(function (field) {
      var type = field.type;

      if (Layout.typeList.includes(type)) {
        // layout 组件
        values = __assign(__assign({}, values), getValues(field.fieldList));
      } else {
        var _a = field,
            formatter = _a.formatter,
            name_1 = _a.name;

        if (FormInput.typeList.includes(type)) {
          values[name_1] = FormInput.formatter(formatter)(form.getFieldValue(name_1));
        } else if (FormSelect.typeList.includes(type)) {
          values[name_1] = FormSelect.formatter(formatter)(form.getFieldValue(name_1));
        } else if (FormDateRanger.typeList.includes(type)) {
          var name1 = name_1[0],
              name2 = name_1[1];
          values[name1] = FormDateRanger.formatter(formatter === null || formatter === void 0 ? void 0 : formatter[0])(form.getFieldValue(name1));
          values[name2] = FormDateRanger.formatter(formatter === null || formatter === void 0 ? void 0 : formatter[1])(form.getFieldValue(name2));
        } else if (FormDatePicker.typeList.includes(type)) {
          values[name_1] = FormDatePicker.formatter(formatter)(form.getFieldValue(name_1));
        } else if (FormInputRange.typeList.includes(type)) {
          var name1 = name_1[0],
              name2 = name_1[1];
          values[name1] = FormInputRange.formatter()(form.getFieldValue(name1));
          values[name2] = FormInputRange.formatter()(form.getFieldValue(name2));
        } else {
          values[name_1] = form.getFieldValue(name_1);
        }
      }
    });
    return values;
  }, [fieldList]);
  var onCollapseChange = useCallback(function () {
    // 需要判断当前元素位置
    setCollapse(!collapse);
  }, [collapse]);
  var equalSize = useCallback(function (size, value) {
    return Math.abs(value - size) <= 1;
  }, []);
  var onResize = useCallback(function (_a) {
    var height = _a.height,
        width = _a.width;

    if (enableCollapse) {
      var btnWrapOffsetLeft = btnWrap.current.offsetLeft;

      if (btnWrapOffsetLeft === 0) {
        // 按钮换行了
        if (equalSize(height, rowHeight * 2)) {
          setFormHeight(rowHeight);
          setCollapseBtnVisible(false);
          return;
        }
      }

      if (equalSize(height, rowHeight)) {
        setCollapseBtnVisible(false);
        setFormHeight(height);
        return;
      }

      setFormHeight(height);
      setCollapseBtnVisible(true);
    }
  }, []);
  var collapseBtn = useMemo(function () {
    if (enableCollapse) {
      return React.createElement("div", {
        ref: btnWrap,
        style: {
          display: "flex",
          flex: collapse ? 1 : 0,
          justifyContent: "flex-end",
          visibility: collapseBtnVisible ? "visible" : "hidden"
        },
        className: formStyles.formItem
      }, React.createElement(_Button, {
        type: "link",
        style: {
          "float": "right"
        },
        onClick: onCollapseChange
      }, collapse ? React.createElement(React.Fragment, null, "\u6536\u8D77\u81F3\u4E00\u884C", React.createElement(UpOutlined, null)) : React.createElement(React.Fragment, null, "\u5C55\u5F00", React.createElement(DownOutlined, null))));
    } else {
      return null;
    }
  }, [collapseBtnVisible, collapse]);
  var fromItemList = useMemo(function () {
    return getFormItems(fieldList, form, labelClassName, itemCol, itemRow);
  }, [fieldList]);
  var wrapChildren = useMemo(function () {
    return React.Children.map(children, function (child) {
      return React.createElement("span", {
        className: formStyles.formItem
      }, child);
    });
  }, [children]);
  var formContent = useMemo(function () {
    if (collapse) {
      return React.createElement(React.Fragment, null, fromItemList, wrapChildren, collapseBtn);
    } else {
      return React.createElement("div", {
        className: classNames(formStyles.flex, formStyles.flex1)
      }, React.createElement("div", {
        className: classNames(formStyles.flex1, formStyles.flexRow),
        style: {
          flexWrap: "wrap"
        }
      }, fromItemList), wrapChildren, collapseBtn);
    }
  }, [fieldList, children, collapse, collapseBtnVisible]);
  var formComponent = useMemo(function () {
    return React.createElement(RcResizeObserver, {
      onResize: onResize
    }, React.createElement("div", null, React.createElement(_Form, __assign({
      layout: "inline"
    }, _props, {
      form: form,
      className: className
    }), formContent)));
  }, [fieldList, collapseBtnVisible, collapse, children]);
  return useMemo(function () {
    var style = enableCollapse ? collapse ? {
      overflow: "hidden",
      height: formHeight
    } : {
      overflow: "hidden",
      height: rowHeight
    } : {};
    return React.createElement("div", {
      ref: wrapRef,
      style: style
    }, formComponent);
  }, [formHeight, fieldList, collapseBtnVisible, collapse, children]);
};

export default forwardRef(JsonForm);
export * from "./utils";