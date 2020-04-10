"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("antd/es/button/style/css");

var _button = _interopRequireDefault(require("antd/es/button"));

require("antd/es/col/style/css");

var _col = _interopRequireDefault(require("antd/es/col"));

require("antd/es/row/style/css");

var _row = _interopRequireDefault(require("antd/es/row"));

require("antd/es/checkbox/style/css");

var _checkbox = _interopRequireDefault(require("antd/es/checkbox"));

require("antd/es/modal/style/css");

var _modal = _interopRequireDefault(require("antd/es/modal"));

var _react = _interopRequireWildcard(require("react"));

var _useModal = _interopRequireDefault(require("../hooks/useModal"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ColumnsSetting = function ColumnsSetting(_a) {
  var columns = _a.columns,
      filterColumns = _a.filterColumns;

  var _b = (0, _useModal["default"])(),
      visible = _b.visible,
      setVisibleProps = _b.setVisibleProps,
      onClose = _b.onClose;

  var cacheColumnsHideList = (0, _react.useRef)([]);

  var _c = (0, _react.useState)([]),
      columnsHideList = _c[0],
      setColumnsHideList = _c[1]; // 列
  // 重新初始化


  (0, _react.useEffect)(function () {
    cacheColumnsHideList.current = [];
    setColumnsHideList([]);
  }, [columns]); // drop修改

  (0, _react.useEffect)(function () {
    if (visible) {
      setColumnsHideList(cacheColumnsHideList.current);
    }
  }, [visible]);
  var onChange = (0, _react.useCallback)(function (checkedValue) {
    setColumnsHideList(checkedValue);
  }, []);
  var onSave = (0, _react.useCallback)(function () {
    cacheColumnsHideList.current = columnsHideList;
    var list = {};
    columnsHideList.map(function (value) {
      list[value] = true;
    });
    filterColumns(columns.filter(function (column) {
      return !list[column.dataIndex];
    }));
    onClose();
  }, [columnsHideList, columns]);
  var modal = (0, _react.useMemo)(function () {
    return _react["default"].createElement(_modal["default"], {
      title: "\u81EA\u5B9A\u4E49\u5B57\u6BB5\u5C55\u793A",
      cancelText: "\u8FD8\u539F\u9ED8\u8BA4",
      okText: "\u4FDD\u5B58",
      onOk: onSave,
      onCancel: onClose
    }, _react["default"].createElement(_checkbox["default"].Group, {
      onChange: onChange,
      value: columnsHideList
    }, _react["default"].createElement(_row["default"], null, columns.map(function (column) {
      return _react["default"].createElement(_col["default"], {
        span: 4
      }, _react["default"].createElement(_checkbox["default"], {
        value: column.dataIndex
      }, column.title));
    }))));
  }, [visible, columnsHideList]);
  var showModal = (0, _react.useCallback)(function () {
    setVisibleProps(true);
  }, []);
  return (0, _react.useMemo)(function () {
    return _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement(_button["default"], {
      onClick: showModal
    }, "\u81EA\u5B9A\u4E49\u5C55\u793A\u5B57\u6BB5"), modal);
  }, [visible, columnsHideList]);
};

var _default = ColumnsSetting;
exports["default"] = _default;