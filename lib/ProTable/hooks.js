"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useRowSelection = useRowSelection;

var _react = _interopRequireWildcard(require("react"));

var _Checkbox = _interopRequireDefault(require("./component/Checkbox"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function useRowSelection(columns, rowKey, dataSource, rowSelection, optimize, onSelectedRowKeysUpdate) {
  var onChange = rowSelection.onChange,
      columnWidth = rowSelection.columnWidth,
      fixed = rowSelection.fixed; // key=>Ref形式存储

  var allCheckedRefList = (0, _react.useRef)(new Map());
  var itemsRefList = (0, _react.useRef)(new Map());
  var outerOnChange = (0, _react.useCallback)(function (keys, items) {
    if (onChange) {
      // 延迟同步，防止卡顿
      onChange(keys, items);
    }

    onSelectedRowKeysUpdate(keys);
  }, [onChange]);
  var onSelectAll = (0, _react.useCallback)(function (e) {
    var checked = e.target.checked;

    if (checked) {
      var keys_1 = [];
      itemsRefList.current.forEach(function (item) {
        if (item) {
          item.updateChecked(true);
          keys_1.push(item.getValue());
        }
      });
      outerOnChange(keys_1, dataSource || []);
    } else {
      itemsRefList.current.forEach(function (item) {
        item && item.updateChecked(false);
      });
      outerOnChange([], []);
    }
  }, [onChange, dataSource]);
  var onChecked = (0, _react.useCallback)(function (e) {
    var checked = e.target.checked;
    var value = e.target.value; // 从ref中获取keys,不能接收props中selectedKeys，否则columns会发生变化，整个会重新渲染

    var beforeKeys = [];
    itemsRefList.current.forEach(function (item) {
      var values = item === null || item === void 0 ? void 0 : item.getValues();

      if (values === null || values === void 0 ? void 0 : values.checked) {
        beforeKeys.push(values.value);
      }
    });
    var set = new Set(beforeKeys);

    if (checked) {
      // 判断全选状态
      set.add(value);
    } else {
      // 判断全选状态
      set["delete"](value);
    }

    beforeKeys = Array.from(set);
    var size = beforeKeys.length;

    if (size === 0) {
      allCheckedRefList.current.forEach(function (item) {
        return item === null || item === void 0 ? void 0 : item.updateChecked(false);
      });
    } else if (size === dataSource.length) {
      allCheckedRefList.current.forEach(function (item) {
        return item === null || item === void 0 ? void 0 : item.updateChecked(true);
      });
    } else {
      allCheckedRefList.current.forEach(function (item) {
        return item === null || item === void 0 ? void 0 : item.setIndeterminate();
      });
    }

    outerOnChange(beforeKeys, dataSource.filter(function (item, index) {
      var rowValue = typeof rowKey === 'string' ? item[rowKey] : rowKey ? rowKey(item) : index;
      return beforeKeys.indexOf(rowValue) > -1;
    }));
  }, [onChange, dataSource]);

  var clearCheckedRows = function clearCheckedRows() {
    allCheckedRefList.current.forEach(function (item) {
      return item === null || item === void 0 ? void 0 : item.updateChecked(false);
    });
    itemsRefList.current.forEach(function (item) {
      return item && item.updateChecked(false);
    });
  };

  var allCheckBoxUnMont = (0, _react.useCallback)(function (value) {
    allCheckedRefList.current.clear(); // 仅存在一个全部checkbox
  }, []);
  var checkBoxUnMont = (0, _react.useCallback)(function (value) {
    itemsRefList.current["delete"](value);
  }, []);
  var addRow = (0, _react.useMemo)(function () {
    if (!columnWidth) {
      return undefined;
    }

    var isString = typeof rowKey === 'string';
    return {
      title: _react["default"].createElement(_Checkbox["default"], {
        value: "all",
        disabled: dataSource.length === 0,
        ref: function ref(_ref) {
          return _ref && allCheckedRefList.current.set('all', _ref);
        },
        onChange: onSelectAll,
        componentWillUnMont: allCheckBoxUnMont
      }),
      dataIndex: 'checked',
      width: columnWidth,
      align: 'center',
      copyable: false,
      render: function render(_, record, index) {
        var rowValue = isString ? record[rowKey] : rowKey ? rowKey(record) : index;
        return _react["default"].createElement(_Checkbox["default"], {
          value: rowValue,
          ref: function ref(_ref2) {
            return _ref2 && itemsRefList.current.set(rowValue, _ref2);
          },
          onChange: onChecked,
          componentWillUnMont: checkBoxUnMont
        });
      },
      fixed: fixed ? 'left' : undefined
    };
  }, [rowKey, fixed, columnWidth, dataSource]);
  var optimizeColumns = (0, _react.useMemo)(function () {
    return columns.length === 0 ? [] : addRow ? [addRow].concat(columns) : columns;
  }, [addRow, columns, dataSource]);
  return !optimize ? {
    columns: columns,
    rowSelection: rowSelection
  } : {
    columns: optimizeColumns,
    clearCheckedRows: clearCheckedRows
  };
}