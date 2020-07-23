import "antd/es/tooltip/style/css";
import _Tooltip from "antd/es/tooltip";
import "antd/es/menu/style/css";
import _Menu from "antd/es/menu";
import "antd/es/dropdown/style/css";
import _Dropdown from "antd/es/dropdown";
import React, { useMemo } from 'react';
import { ColumnHeightOutlined } from '@ant-design/icons';

var DensityIcon = function DensityIcon(_a) {
  var tableSize = _a.tableSize,
      setTableSize = _a.setTableSize;
  return useMemo(function () {
    return /*#__PURE__*/React.createElement(_Dropdown, {
      overlay: /*#__PURE__*/React.createElement(_Menu, {
        selectedKeys: [tableSize],
        onClick: function onClick(_a) {
          var key = _a.key;
          setTableSize(key);
        },
        style: {
          width: 80
        }
      }, /*#__PURE__*/React.createElement(_Menu.Item, {
        key: "large"
      }, "\u9ED8\u8BA4"), /*#__PURE__*/React.createElement(_Menu.Item, {
        key: "middle"
      }, "\u4E2D\u7B49"), /*#__PURE__*/React.createElement(_Menu.Item, {
        key: "small"
      }, "\u7D27\u51D1")),
      trigger: ['click']
    }, /*#__PURE__*/React.createElement(_Tooltip, {
      title: '表格密度'
    }, /*#__PURE__*/React.createElement(ColumnHeightOutlined, null)));
  }, [tableSize, setTableSize]);
};

export default DensityIcon;