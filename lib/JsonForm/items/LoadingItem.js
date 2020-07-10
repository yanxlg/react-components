"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("antd/es/spin/style/css");

var _spin = _interopRequireDefault(require("antd/es/spin"));

require("antd/es/form/style/css");

var _form = _interopRequireDefault(require("antd/es/form"));

var _react = _interopRequireWildcard(require("react"));

var _index = require("../index");

var _LoadingButton = _interopRequireDefault(require("../../LoadingButton"));

var _form2 = _interopRequireDefault(require("../_form.less"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var typeList = ['loading'];

var LoadingItem = function LoadingItem(_a) {
  var _b = _a.placeholder,
      label = _b.label,
      labelClassName = _b.labelClassName,
      _c = _b.formItemClassName,
      formItemClassName = _c === void 0 ? _form2["default"].formItem : _c,
      colon = _b.colon,
      loading = _a.loading,
      form = _a.form,
      itemCol = _a.itemCol,
      itemRow = _a.itemRow;

  var _d = (0, _react.useState)(true),
      loadState = _d[0],
      setLoadState = _d[1];

  var _e = (0, _react.useState)(undefined),
      field = _e[0],
      setField = _e[1]; // 重试


  (0, _react.useEffect)(function () {
    loading(form).then(function (field) {
      setField(field); // @ts-ignore

      loading._cache = field;
    })["finally"](function () {
      setLoadState(false);
    });
  }, []);
  var onReload = (0, _react.useCallback)(function () {
    setLoadState(true);
    return loading(form).then(function (field) {
      setField(field); // @ts-ignore

      loading._cache = field; // 缓存，用来进行读值处理
    })["finally"](function () {
      setLoadState(false);
    });
  }, []);
  return loadState ? (0, _index.getColChildren)(_react["default"].createElement(_form["default"].Item, {
    className: formItemClassName,
    label: _react["default"].createElement("span", {
      className: labelClassName
    }, label),
    colon: colon
  }, _react["default"].createElement(_spin["default"], {
    spinning: true
  })), itemCol) : field === void 0 ? (0, _index.getColChildren)(_react["default"].createElement(_form["default"].Item, {
    className: formItemClassName,
    label: _react["default"].createElement("span", {
      className: labelClassName
    }, label),
    colon: colon
  }, _react["default"].createElement(_LoadingButton["default"], {
    type: "link",
    onClick: onReload
  }, "\u91CD\u8BD5")), itemCol) : (0, _index.getFormItem)(field, form, labelClassName, itemCol, itemRow);
};

LoadingItem.typeList = typeList;
var _default = LoadingItem;
exports["default"] = _default;