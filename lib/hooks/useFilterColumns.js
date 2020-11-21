"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("antd/es/button/style/css");

var _button = _interopRequireDefault(require("antd/es/button"));

require("antd/es/input/style/css");

var _input = _interopRequireDefault(require("antd/es/input"));

var _react = _interopRequireWildcard(require("react"));

var _lib = require("@ant-design/icons/lib");

var _reactHighlightWords = _interopRequireDefault(require("react-highlight-words"));

var _index = _interopRequireDefault(require("../_Deprecated/ProTable/_index.less"));

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

function useFilterColumns(columns) {
  var _a = (0, _react.useState)({
    searchText: '',
    searchedColumn: ''
  }),
      search = _a[0],
      setSearch = _a[1];

  var handleSearch = (0, _react.useCallback)(function (searchText, searchedColumn) {
    setSearch({
      searchText: searchText,
      searchedColumn: searchedColumn
    });
  }, []);
  var handleReset = (0, _react.useCallback)(function (searchedColumn) {
    setSearch({
      searchText: '',
      searchedColumn: searchedColumn
    });
  }, []);
  var searchInputRef = (0, _react.useRef)(null);
  return (0, _react.useMemo)(function () {
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
            return _react["default"].createElement("div", {
              style: {
                padding: 8
              }
            }, _react["default"].createElement(_input["default"], {
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
              className: _index["default"].tableFilterInput
            }), _react["default"].createElement(_button["default"], {
              type: "primary",
              onClick: function onClick() {
                confirm();
                handleSearch(selectedKeys[0], dataIndex);
              },
              icon: _react["default"].createElement(_lib.SearchOutlined, null),
              size: "small",
              className: _index["default"].tableFilterBtn
            }, "\u7B5B\u9009"), _react["default"].createElement(_button["default"], {
              onClick: function onClick() {
                clearFilters === null || clearFilters === void 0 ? void 0 : clearFilters();
                handleReset(dataIndex);
              },
              size: "small",
              className: _index["default"].tableFilterBtn
            }, "\u6E05\u7A7A"));
          },
          filterIcon: function filterIcon(filtered) {
            return _react["default"].createElement(_lib.SearchOutlined, {
              className: filtered ? _index["default"].tableIconActive : undefined
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

            return search.searchedColumn === dataIndex ? _render ? _render(text, record, index, search.searchText, dom) : _react["default"].createElement(_reactHighlightWords["default"], {
              highlightClassName: _index["default"].tableHighlight,
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

var _default = useFilterColumns;
exports["default"] = _default;