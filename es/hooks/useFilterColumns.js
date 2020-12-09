import "antd/es/button/style/css";
import _Button from "antd/es/button";
import "antd/es/input/style/css";
import _Input from "antd/es/input";

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

import React, { useCallback, useState, useMemo, useRef } from 'react';
import { SearchOutlined } from '@ant-design/icons/lib';
import Highlighter from 'react-highlight-words';
import styles from '../_Deprecated/ProTable/_index.less';

function useFilterColumns(columns) {
  var _a = useState({
    searchText: '',
    searchedColumn: ''
  }),
      search = _a[0],
      setSearch = _a[1];

  var handleSearch = useCallback(function (searchText, searchedColumn) {
    setSearch({
      searchText: searchText,
      searchedColumn: searchedColumn
    });
  }, []);
  var handleReset = useCallback(function (searchedColumn) {
    setSearch({
      searchText: '',
      searchedColumn: searchedColumn
    });
  }, []);
  var searchInputRef = useRef(null);
  return useMemo(function () {
    return columns.map(function (column) {
      var filterType = column.filterType,
          dataIndex = column.dataIndex,
          title = column.title,
          _render = column.render;

      if (filterType === 'input') {
        return __assign(__assign({}, column), {
          filterDropdown: function filterDropdown(_a) {
            var setSelectedKeys = _a.setSelectedKeys,
                selectedKeys = _a.selectedKeys,
                confirm = _a.confirm,
                clearFilters = _a.clearFilters;
            return /*#__PURE__*/React.createElement("div", {
              style: {
                padding: 8
              }
            }, /*#__PURE__*/React.createElement(_Input, {
              ref: searchInputRef,
              placeholder: "\u7B5B\u9009 " + title,
              value: selectedKeys[0],
              onChange: function onChange(e) {
                return setSelectedKeys(e.target.value ? [e.target.value] : []);
              },
              onPressEnter: function onPressEnter() {
                confirm();
                handleSearch(selectedKeys[0], dataIndex);
              },
              className: styles.tableFilterInput
            }), /*#__PURE__*/React.createElement(_Button, {
              type: "primary",
              onClick: function onClick() {
                confirm();
                handleSearch(selectedKeys[0], dataIndex);
              },
              icon: /*#__PURE__*/React.createElement(SearchOutlined, null),
              size: "small",
              className: styles.tableFilterBtn
            }, "\u7B5B\u9009"), /*#__PURE__*/React.createElement(_Button, {
              onClick: function onClick() {
                clearFilters === null || clearFilters === void 0 ? void 0 : clearFilters();
                handleReset(dataIndex);
              },
              size: "small",
              className: styles.tableFilterBtn
            }, "\u6E05\u7A7A"));
          },
          filterIcon: function filterIcon(filtered) {
            return /*#__PURE__*/React.createElement(SearchOutlined, {
              className: filtered ? styles.tableIconActive : undefined
            });
          },
          onFilter: function onFilter(value, record) {
            var showText = record.hasOwnProperty('__' + dataIndex) ? record['__' + dataIndex] : record[dataIndex];
            return showText.toString().toLowerCase().includes(value.toLowerCase());
          },
          onFilterDropdownVisibleChange: function onFilterDropdownVisibleChange(visible) {
            if (visible) {
              setTimeout(function () {
                var _a;

                return (_a = searchInputRef.current) === null || _a === void 0 ? void 0 : _a.select();
              });
            }
          },
          render: function render(text, record, index, dom) {
            var _a;

            return search.searchedColumn === dataIndex ? _render ? _render(text, record, index, search.searchText, dom) : /*#__PURE__*/React.createElement(Highlighter, {
              highlightClassName: styles.tableHighlight,
              searchWords: [search.searchText],
              autoEscape: true,
              textToHighlight: text.toString()
            }) : (_a = _render === null || _render === void 0 ? void 0 : _render(text, record, index, undefined, dom)) !== null && _a !== void 0 ? _a : text;
          }
        });
      } else {
        return column;
      }
    });
  }, [columns]);
}

export default useFilterColumns;