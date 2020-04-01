"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {};
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _antd = require("antd");

var _Input = _interopRequireDefault(require("./items/Input"));

var _Select = _interopRequireDefault(require("./items/Select"));

var _Checkbox = _interopRequireDefault(require("./items/Checkbox"));

var _DatePicker = _interopRequireDefault(require("./items/DatePicker"));

var _DateRanger = _interopRequireDefault(require("./items/DateRanger"));

var _InputRange = _interopRequireDefault(require("./items/InputRange"));

var _rcResizeObserver = _interopRequireDefault(require("rc-resize-observer"));

require("./index.less");

var _icons = require("@ant-design/icons");

var _form = _interopRequireDefault(require("./_form.less"));

var _CheckboxGroup = _interopRequireDefault(require("./items/CheckboxGroup"));

var _RadioGroup = _interopRequireDefault(require("./items/RadioGroup"));

var _classnames = _interopRequireDefault(require("classnames"));

var _utils = require("./utils");

Object.keys(_utils).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _utils[key];
    }
  });
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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

var JsonForm = function JsonForm(props, ref) {
  var fieldList = props.fieldList,
      children = props.children,
      labelClassName = props.labelClassName,
      _a = props.rowHeight,
      rowHeight = _a === void 0 ? 56 : _a,
      _b = props.defaultCollapse,
      defaultCollapse = _b === void 0 ? true : _b,
      _c = props.enableCollapse,
      enableCollapse = _c === void 0 ? true : _c,
      itemCol = props.itemCol,
      itemRow = props.itemRow,
      _props = __rest(props, ["fieldList", "children", "labelClassName", "rowHeight", "defaultCollapse", "enableCollapse", "itemCol", "itemRow"]);

  var _d = (0, _react.useState)(defaultCollapse),
      collapse = _d[0],
      setCollapse = _d[1];

  var _e = (0, _react.useState)(false),
      collapseBtnVisible = _e[0],
      setCollapseBtnVisible = _e[1];

  var form = _antd.Form.useForm()[0];

  var wrapRef = (0, _react.useRef)(null);
  var btnWrap = (0, _react.useRef)(null);

  var _f = (0, _react.useState)(defaultCollapse ? rowHeight : undefined),
      formHeight = _f[0],
      setFormHeight = _f[1];

  (0, _react.useImperativeHandle)(ref, function () {
    return {
      getFieldsValue: getValues,
      validateFields: function validateFields() {
        return form.validateFields().then(function () {
          return getValues();
        });
      }
    };
  }, []);
  var getValues = (0, _react.useCallback)(function () {
    var values = {};
    fieldList.map(function (_a) {
      var type = _a.type,
          name = _a.name,
          formatter = _a.formatter;

      if (_Input["default"].typeList.includes(type)) {
        values[name] = _Input["default"].formatter(formatter)(form.getFieldValue(name));
      } else if (_Select["default"].typeList.includes(type)) {
        values[name] = _Select["default"].formatter(formatter)(form.getFieldValue(name));
      } else if (_DateRanger["default"].typeList.includes(type)) {
        var name1 = name[0],
            name2 = name[1];
        values[name1] = _DateRanger["default"].formatter(formatter === null || formatter === void 0 ? void 0 : formatter[0])(form.getFieldValue(name1));
        values[name2] = _DateRanger["default"].formatter(formatter === null || formatter === void 0 ? void 0 : formatter[1])(form.getFieldValue(name2));
      } else if (_DatePicker["default"].typeList.includes(type)) {
        values[name] = _DatePicker["default"].formatter(formatter)(form.getFieldValue(name));
      } else if (_InputRange["default"].typeList.includes(type)) {
        var name1 = name[0],
            name2 = name[1];
        values[name1] = _InputRange["default"].formatter()(form.getFieldValue(name1));
        values[name2] = _InputRange["default"].formatter()(form.getFieldValue(name2));
      } else {
        return form.getFieldValue(name);
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
        }
      }, _react["default"].createElement(_antd.Button, {
        type: "link",
        className: _form["default"].formItem,
        style: {
          "float": 'right'
        },
        onClick: onCollapseChange
      }, collapse ? _react["default"].createElement(_react["default"].Fragment, null, "\u6536\u8D77\u81F3\u4E00\u884C", _react["default"].createElement(_icons.UpOutlined, null)) : _react["default"].createElement(_react["default"].Fragment, null, "\u5C55\u5F00", _react["default"].createElement(_icons.DownOutlined, null))));
    } else {
      return null;
    }
  }, [collapseBtnVisible, collapse]);
  var getColChildren = (0, _react.useCallback)(function (children, times) {
    if (times === void 0) {
      times = 1;
    } //TODO 暂时不支持时间关联使用col方式布局


    if (itemCol) {
      return _react["default"].createElement(_antd.Col, __assign({}, itemCol), children);
    } else {
      return children;
    }
  }, []);
  var fromItemList = (0, _react.useMemo)(function () {
    var fields = fieldList.map(function (_a) {
      var type = _a.type,
          field = __rest(_a, ["type"]);

      if (_Input["default"].typeList.includes(type)) {
        return getColChildren(_react["default"].createElement(_Input["default"], __assign({
          key: String(field.name)
        }, field, {
          type: type,
          labelClassName: labelClassName,
          form: form
        })));
      }

      if (_Select["default"].typeList.includes(type)) {
        return getColChildren(_react["default"].createElement(_Select["default"], __assign({
          key: String(field.name)
        }, field, {
          type: type,
          labelClassName: labelClassName,
          form: form
        })));
      }

      if (_Checkbox["default"].typeList.includes(type)) {
        return getColChildren(_react["default"].createElement(_Checkbox["default"], __assign({
          key: String(field.name)
        }, field, {
          type: type,
          labelClassName: labelClassName,
          form: form
        })));
      }

      if (_DatePicker["default"].typeList.includes(type)) {
        return getColChildren(_react["default"].createElement(_DatePicker["default"], __assign({
          key: String(field.name)
        }, field, {
          type: type,
          labelClassName: labelClassName,
          form: form
        })));
      }

      if (_DateRanger["default"].typeList.includes(type)) {
        return getColChildren(_react["default"].createElement(_DateRanger["default"], __assign({
          key: String(field.name)
        }, field, {
          type: type,
          labelClassName: labelClassName,
          form: form
        })));
      }

      if (_CheckboxGroup["default"].typeList.includes(type)) {
        return getColChildren(_react["default"].createElement(_CheckboxGroup["default"], __assign({
          key: String(field.name)
        }, field, {
          type: type,
          labelClassName: labelClassName,
          form: form
        })));
      }

      if (_RadioGroup["default"].typeList.includes(type)) {
        return getColChildren(_react["default"].createElement(_RadioGroup["default"], __assign({
          key: String(field.name)
        }, field, {
          type: type,
          labelClassName: labelClassName,
          form: form
        })));
      }

      if (_InputRange["default"].typeList.includes(type)) {
        return _react["default"].createElement(_InputRange["default"], __assign({
          key: String(field.name)
        }, field, {
          type: type,
          labelClassName: labelClassName,
          form: form
        }));
      }

      return null;
    });

    if (itemCol) {
      return _react["default"].createElement(_antd.Row, __assign({}, itemRow ? itemRow : {}, {
        className: _form["default"].formRow
      }), fields);
    } else {
      return fields;
    }
  }, [fieldList]);
  var formContent = (0, _react.useMemo)(function () {
    if (collapse) {
      return _react["default"].createElement(_react["default"].Fragment, null, fromItemList, children, collapseBtn);
    } else {
      return _react["default"].createElement("div", {
        className: (0, _classnames["default"])(_form["default"].flex, _form["default"].flex1)
      }, _react["default"].createElement("div", {
        className: (0, _classnames["default"])(_form["default"].flex1, _form["default"].flexRow),
        style: {
          flexWrap: 'wrap'
        }
      }, fromItemList), children, collapseBtn);
    }
  }, [fieldList, children, collapse, collapseBtnVisible]);
  var formComponent = (0, _react.useMemo)(function () {
    return _react["default"].createElement(_rcResizeObserver["default"], {
      onResize: onResize
    }, _react["default"].createElement("div", null, _react["default"].createElement(_antd.Form, __assign({
      layout: "inline"
    }, _props, {
      form: form
    }), formContent)));
  }, [fieldList, collapseBtnVisible, collapse, children]);
  return (0, _react.useMemo)(function () {
    var style = enableCollapse ? collapse ? {
      overflow: 'hidden',
      height: formHeight
    } : {
      overflow: 'hidden',
      height: rowHeight
    } : {};
    return _react["default"].createElement("div", {
      ref: wrapRef,
      style: style
    }, formComponent);
  }, [formHeight, fieldList, collapseBtnVisible, collapse, children]);
};

var _default = (0, _react.forwardRef)(JsonForm);

exports["default"] = _default;