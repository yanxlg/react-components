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

var _index = _interopRequireDefault(require("./_index.less"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var __spreadArrays = void 0 && (void 0).__spreadArrays || function () {
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

var ColumnsSetting = function ColumnsSetting(_a) {
  var columns = _a.columns,
      ColumnsSettingRender = _a.columnsSettingRender,
      resetColumnsSetting = _a.resetColumnsSetting,
      onColumnsChange = _a.onColumnsChange;

  var _b = (0, _useModal["default"])(),
      visible = _b.visible,
      setVisibleProps = _b.setVisibleProps,
      onClose = _b.onClose;

  var cacheColumnsShowList = (0, _react.useRef)([]);

  var _c = (0, _react.useState)(columns.filter(function (column) {
    return !column.defaultHide;
  }).map(function (column) {
    return column['dataIndex'];
  })),
      columnsShowList = _c[0],
      setColumnsShowList = _c[1]; // 列


  var _setColumnsShowList = (0, _react.useCallback)(function (keys) {
    // console.log(1111, keys)
    setColumnsShowList(__spreadArrays([columns === null || columns === void 0 ? void 0 : columns.filter(function (item) {
      return item.hideInSetting;
    }).map(function (item) {
      return item['dataIndex'];
    })], keys));
  }, [columns]); // 重新初始化


  (0, _react.useEffect)(function () {
    var keys = columns.filter(function (column) {
      return !column.defaultHide;
    }).map(function (column) {
      return column['dataIndex'];
    });
    cacheColumnsShowList.current = keys;

    _setColumnsShowList(keys);
  }, [columns]); // drop修改

  (0, _react.useEffect)(function () {
    if (visible) {
      _setColumnsShowList(cacheColumnsShowList.current);
    }
  }, [visible]);
  var onChange = (0, _react.useCallback)(function (checkedValue) {
    _setColumnsShowList(checkedValue);
  }, []);
  var onSave = (0, _react.useCallback)(function () {
    cacheColumnsShowList.current = columnsShowList;
    var list = {};
    columnsShowList.map(function (value) {
      list[value] = true;
    });
    onColumnsChange(columns.filter(function (column) {
      return list[column['dataIndex']];
    }));
    onClose();
  }, [columnsShowList, columns]);
  var onCancel = (0, _react.useCallback)(function () {
    if (resetColumnsSetting) {
      //重置
      var keys = columns.map(function (column) {
        return column['dataIndex'];
      });
      cacheColumnsShowList.current = keys;

      _setColumnsShowList(keys);

      onColumnsChange(columns);
      onClose();
    } else {
      onClose();
    }
  }, []);
  var modal = (0, _react.useMemo)(function () {
    return _react["default"].createElement(_modal["default"], {
      title: "\u81EA\u5B9A\u4E49\u5B57\u6BB5\u5C55\u793A",
      cancelText: resetColumnsSetting ? '还原默认' : '不保存',
      okText: "\u4FDD\u5B58",
      onOk: onSave,
      onCancel: onCancel,
      visible: !!visible,
      className: _index["default"].settingModal
    }, ColumnsSettingRender === true ? _react["default"].createElement(_checkbox["default"].Group, {
      onChange: onChange,
      value: columnsShowList
    }, _react["default"].createElement(_row["default"], {
      gutter: [0, 5]
    }, columns.map(function (column) {
      if (column.hideInSetting) {
        return null;
      }

      var dataIndex = column['dataIndex'];
      return _react["default"].createElement(_col["default"], {
        span: 4,
        key: dataIndex
      }, _react["default"].createElement(_checkbox["default"], {
        value: dataIndex
      }, column.title));
    }))) : _react["default"].createElement(ColumnsSettingRender, {
      value: columnsShowList,
      onChange: onChange
    }));
  }, [visible, columnsShowList]);
  var showModal = (0, _react.useCallback)(function () {
    setVisibleProps(true);
  }, []);
  return (0, _react.useMemo)(function () {
    return _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement(_button["default"], {
      className: _index["default"].settingBtn,
      size: "small",
      onClick: showModal
    }, "\u81EA\u5B9A\u4E49\u5C55\u793A\u5B57\u6BB5"), modal);
  }, [visible, columnsShowList]);
};

var _default = ColumnsSetting;
exports["default"] = _default;