import React, { useCallback, useMemo, useRef } from 'react';
import OptimizeCheckbox from './component/Checkbox';
import styles from './_index.less';

function useRowSelection(columns, rowKey, dataSource, rowSelection, optimize, onSelectedRowKeysUpdate) {
  var onChange = rowSelection.onChange,
      columnWidth = rowSelection.columnWidth,
      fixed = rowSelection.fixed; // key=>Ref形式存储

  var allCheckedRefList = useRef(new Map());
  var itemsRefList = useRef(new Map());
  var outerOnChange = useCallback(function (keys, items) {
    if (onChange) {
      // 延迟同步，防止卡顿
      onChange(keys, items);
    }

    onSelectedRowKeysUpdate(keys);
  }, [onChange]);
  var onSelectAll = useCallback(function (e) {
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
  var onChecked = useCallback(function (e) {
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

  var allCheckBoxUnMont = useCallback(function (value) {
    allCheckedRefList.current.clear(); // 仅存在一个全部checkbox
  }, []);
  var checkBoxUnMont = useCallback(function (value) {
    itemsRefList.current["delete"](value);
  }, []);
  var addRow = useMemo(function () {
    if (!columnWidth) {
      return undefined;
    }

    var isString = typeof rowKey === 'string';
    return {
      title: React.createElement(OptimizeCheckbox, {
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
      className: styles.rowSelectionRow,
      render: function render(_, record, index) {
        var rowValue = isString ? record[rowKey] : rowKey ? rowKey(record) : index;
        return React.createElement(OptimizeCheckbox, {
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
  var optimizeColumns = useMemo(function () {
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

export { useRowSelection };