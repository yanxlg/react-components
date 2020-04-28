"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.getFormItems = exports.getFormItem = exports.getColChildren = void 0;

require("antd/es/button/style/css");

var _button = _interopRequireDefault(require("antd/es/button"));

require("antd/es/form/style/css");

var _form = _interopRequireDefault(require("antd/es/form"));

require("antd/es/row/style/css");

var _row = _interopRequireDefault(require("antd/es/row"));

require("antd/es/col/style/css");

var _col = _interopRequireDefault(require("antd/es/col"));

var _react = _interopRequireWildcard(require("react"));

var _Input = _interopRequireDefault(require("./items/Input"));

var _Select = _interopRequireDefault(require("./items/Select"));

var _Checkbox = _interopRequireDefault(require("./items/Checkbox"));

var _DatePicker = _interopRequireDefault(require("./items/DatePicker"));

var _DateRanger = _interopRequireDefault(require("./items/DateRanger"));

var _InputRange = _interopRequireDefault(require("./items/InputRange"));

var _rcResizeObserver = _interopRequireDefault(require("rc-resize-observer"));

var _icons = require("@ant-design/icons");

var _CheckboxGroup = _interopRequireDefault(require("./items/CheckboxGroup"));

var _RadioGroup = _interopRequireDefault(require("./items/RadioGroup"));

var _classnames = _interopRequireDefault(require("classnames"));

require("./index.less");

var _form2 = _interopRequireDefault(require("./_form.less"));

var _layout = _interopRequireDefault(require("./layout"));

var _DynamicItem = _interopRequireDefault(require("./items/DynamicItem"));

var _HideItem = _interopRequireDefault(require("./items/HideItem"));

var _formatter = _interopRequireDefault(require("../utils/formatter"));

var _TextArea = _interopRequireDefault(require("./items/TextArea"));

var _Cascader = _interopRequireDefault(require("./items/Cascader"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var __assign = void 0 && (void 0).__assign || function () {
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

var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

var getColChildren = function getColChildren(children, itemCol, times) {
  if (times === void 0) {
    times = 1;
  }

  if (itemCol) {
    return _react["default"].createElement(_col["default"], __assign({}, itemCol), children);
  } else {
    return children;
  }
};

exports.getColChildren = getColChildren;

var getFormItem = function getFormItem(_a, form, labelClassName, itemCol, itemRow, index) {
  var type = _a.type,
      field = __rest(_a, ["type"]);

  var name = field['name'];

  if (_Input["default"].typeList.includes(type)) {
    return getColChildren(_react["default"].createElement(_Input["default"], __assign({
      key: String(name)
    }, field, {
      type: type,
      labelClassName: labelClassName,
      form: form
    })), itemCol);
  }

  if (_Select["default"].typeList.includes(type)) {
    return getColChildren(_react["default"].createElement(_Select["default"], __assign({
      key: String(name)
    }, field, {
      type: type,
      labelClassName: labelClassName,
      form: form
    })), itemCol);
  }

  if (_Checkbox["default"].typeList.includes(type)) {
    return getColChildren(_react["default"].createElement(_Checkbox["default"], __assign({
      key: String(name)
    }, field, {
      type: type,
      labelClassName: labelClassName,
      form: form
    })), itemCol);
  }

  if (_DatePicker["default"].typeList.includes(type)) {
    return getColChildren(_react["default"].createElement(_DatePicker["default"], __assign({
      key: String(name)
    }, field, {
      type: type,
      labelClassName: labelClassName,
      form: form
    })), itemCol);
  }

  if (_DateRanger["default"].typeList.includes(type)) {
    return getColChildren(_react["default"].createElement(_DateRanger["default"], __assign({
      key: String(name)
    }, field, {
      type: type,
      labelClassName: labelClassName,
      form: form
    })), itemCol);
  }

  if (_CheckboxGroup["default"].typeList.includes(type)) {
    return getColChildren(_react["default"].createElement(_CheckboxGroup["default"], __assign({
      key: String(name)
    }, field, {
      type: type,
      labelClassName: labelClassName,
      form: form
    })), itemCol);
  }

  if (_RadioGroup["default"].typeList.includes(type)) {
    return getColChildren(_react["default"].createElement(_RadioGroup["default"], __assign({
      key: String(name)
    }, field, {
      type: type,
      labelClassName: labelClassName,
      form: form
    })), itemCol);
  }

  if (_InputRange["default"].typeList.includes(type)) {
    return _react["default"].createElement(_InputRange["default"], __assign({
      key: String(name)
    }, field, {
      type: type,
      labelClassName: labelClassName,
      form: form
    }));
  }

  if (_layout["default"].typeList.includes(type)) {
    return getColChildren(_react["default"].createElement(_layout["default"], __assign({
      key: String(index)
    }, field, {
      type: type,
      labelClassName: labelClassName,
      form: form,
      itemRow: itemRow,
      itemCol: itemCol
    })), itemCol);
  }

  if (_DynamicItem["default"].typeList.includes(type)) {
    return getColChildren(_react["default"].createElement(_DynamicItem["default"], __assign({
      key: String(index)
    }, field, {
      type: type,
      labelClassName: labelClassName,
      form: form,
      itemRow: itemRow,
      itemCol: itemCol
    })), itemCol);
  }

  if (_HideItem["default"].typeList.includes(type)) {
    return _react["default"].createElement(_HideItem["default"], __assign({
      key: String(index)
    }, field, {
      type: type,
      form: form
    }));
  }

  if (_TextArea["default"].typeList.includes(type)) {
    return _react["default"].createElement(_TextArea["default"], __assign({
      key: String(index)
    }, field, {
      type: type,
      form: form
    }));
  }

  if (_Cascader["default"].typeList.includes(type)) {
    return _react["default"].createElement(_Cascader["default"], __assign({
      key: String(index)
    }, field, {
      type: type,
      form: form
    }));
  }

  return null;
};

exports.getFormItem = getFormItem;

var getFormItems = function getFormItems(fieldList, form, labelClassName, itemCol, itemRow) {
  var fields = fieldList.map(function (field, index) {
    return getFormItem(field, form, labelClassName, itemCol, itemRow, index);
  });

  if (itemCol) {
    return _react["default"].createElement(_row["default"], __assign({}, itemRow ? itemRow : {}, {
      className: _form2["default"].formRow
    }), fields);
  } else {
    return fields;
  }
};

exports.getFormItems = getFormItems;

var getFormatterFunc = function getFormatterFunc(formatterName, defaultFormatter) {
  var _default = function _default(value) {
    return value;
  };

  return (typeof formatterName === 'string' || formatterName === void 0 ? _formatter["default"][formatterName] || defaultFormatter || _default : formatterName) || _default;
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
      className = props.className,
      _d = props.containerClassName,
      containerClassName = _d === void 0 ? _form2["default"].formContainer : _d,
      _props = __rest(props, ["fieldList", "children", "labelClassName", "rowHeight", "defaultCollapse", "enableCollapse", "itemCol", "itemRow", "form", "className", "containerClassName"]);

  var _e = (0, _react.useState)(defaultCollapse),
      collapse = _e[0],
      setCollapse = _e[1];

  var _f = (0, _react.useState)(false),
      collapseBtnVisible = _f[0],
      setCollapseBtnVisible = _f[1];

  var form = _form["default"].useForm(proForm)[0];

  var btnWrap = (0, _react.useRef)(null);

  var _g = (0, _react.useState)(defaultCollapse ? rowHeight : undefined),
      formHeight = _g[0],
      setFormHeight = _g[1];

  (0, _react.useImperativeHandle)(ref, function () {
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
  var getValues = (0, _react.useCallback)(function (targetFieldList) {
    var values = {};
    var target = targetFieldList || fieldList;
    target.map(function (field) {
      var type = field.type;

      if (_layout["default"].typeList.includes(type)) {
        // layout 组件
        values = __assign(__assign({}, values), getValues(field.fieldList));
      } else if (_DynamicItem["default"].typeList.includes(type)) {
        var _value = getValues([field.dynamic(form)]);

        values = __assign(__assign({}, values), _value);
      } else {
        var _a = field,
            formatterName = _a.formatter,
            name_1 = _a.name;

        if (_Input["default"].typeList.includes(type) || _TextArea["default"].typeList.includes(type) || _Select["default"].typeList.includes(type) || _DatePicker["default"].typeList.includes(type)) {
          values[name_1] = getFormatterFunc(formatterName, _formatter["default"]["null"])(form.getFieldValue(name_1));
        } else if (_DateRanger["default"].typeList.includes(type)) {
          var name1 = name_1[0],
              name2 = name_1[1];
          values[name1] = getFormatterFunc(formatterName === null || formatterName === void 0 ? void 0 : formatterName[0], _formatter["default"]["null"])(form.getFieldValue(name1));
          values[name2] = getFormatterFunc(formatterName === null || formatterName === void 0 ? void 0 : formatterName[1], _formatter["default"]["null"])(form.getFieldValue(name2));
        } else if (_InputRange["default"].typeList.includes(type)) {
          var name1 = name_1[0],
              name2 = name_1[1];
          values[name1] = getFormatterFunc(formatterName === null || formatterName === void 0 ? void 0 : formatterName[0], _formatter["default"].number)(form.getFieldValue(name1));
          values[name2] = getFormatterFunc(formatterName === null || formatterName === void 0 ? void 0 : formatterName[1], _formatter["default"].number)(form.getFieldValue(name2));
        } else {
          values[name_1] = getFormatterFunc(formatterName, _formatter["default"]["null"])(form.getFieldValue(name_1));
        }
      }
    });
    return values;
  }, [fieldList]);
  var onCollapseChange = (0, _react.useCallback)(function () {
    // 需要判断当前元素位置
    setCollapse(!collapse);
  }, [collapse]);
  var equalSize = (0, _react.useCallback)(function (size, value) {
    return Math.abs(value - size) <= 1;
  }, []);
  var onResize = (0, _react.useCallback)(function (_a) {
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
  var collapseBtn = (0, _react.useMemo)(function () {
    if (enableCollapse) {
      return _react["default"].createElement("div", {
        ref: btnWrap,
        style: {
          display: 'flex',
          flex: collapse ? 1 : 0,
          justifyContent: 'flex-end',
          visibility: collapseBtnVisible ? 'visible' : 'hidden'
        },
        className: _form2["default"].formItem
      }, _react["default"].createElement(_button["default"], {
        type: "link",
        style: {
          "float": 'right'
        },
        onClick: onCollapseChange
      }, collapse ? _react["default"].createElement(_react["default"].Fragment, null, "\u6536\u8D77\u81F3\u4E00\u884C", _react["default"].createElement(_icons.UpOutlined, null)) : _react["default"].createElement(_react["default"].Fragment, null, "\u5C55\u5F00", _react["default"].createElement(_icons.DownOutlined, null))));
    } else {
      return null;
    }
  }, [collapseBtnVisible, collapse]);
  var fromItemList = (0, _react.useMemo)(function () {
    return getFormItems(fieldList, form, labelClassName, itemCol, itemRow);
  }, [fieldList]);
  var wrapChildren = (0, _react.useMemo)(function () {
    return _react["default"].Children.map(children, function (child) {
      return _react["default"].createElement("span", {
        className: _form2["default"].formItem
      }, child);
    });
  }, [children]);
  var formContent = (0, _react.useMemo)(function () {
    if (collapse) {
      return _react["default"].createElement(_react["default"].Fragment, null, fromItemList, wrapChildren, collapseBtn);
    } else {
      return _react["default"].createElement("div", {
        className: (0, _classnames["default"])(_form2["default"].flex, _form2["default"].flex1)
      }, _react["default"].createElement("div", {
        className: (0, _classnames["default"])(_form2["default"].flex1, _form2["default"].flexRow),
        style: {
          flexWrap: 'wrap'
        }
      }, fromItemList), wrapChildren, collapseBtn);
    }
  }, [fieldList, children, collapse, collapseBtnVisible]);
  var formComponent = (0, _react.useMemo)(function () {
    return _react["default"].createElement(_rcResizeObserver["default"], {
      onResize: onResize
    }, _react["default"].createElement("div", null, _react["default"].createElement(_form["default"], __assign({
      layout: "inline"
    }, _props, {
      form: form,
      className: className
    }), formContent)));
  }, [fieldList, collapseBtnVisible, collapse, children]);
  return (0, _react.useMemo)(function () {
    return _react["default"].createElement("div", {
      style: enableCollapse ? collapse ? {
        overflow: 'hidden',
        height: formHeight,
        boxSizing: 'content-box'
      } : {
        overflow: 'hidden',
        height: rowHeight,
        boxSizing: 'content-box'
      } : {},
      className: containerClassName
    }, formComponent);
  }, [formHeight, fieldList, collapseBtnVisible, collapse, children]);
};

var _default2 = (0, _react.forwardRef)(JsonForm);

exports["default"] = _default2;