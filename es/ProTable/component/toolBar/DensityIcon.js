import React, { useMemo } from 'react';
import { ColumnHeightOutlined } from '@ant-design/icons';
import { Menu, Dropdown, Tooltip } from 'antd';

var DensityIcon = function DensityIcon(_a, ref) {
  var tableSize = _a.tableSize,
      setTableSize = _a.setTableSize;
  return useMemo(function () {
    return React.createElement(Dropdown, {
      ref: ref,
      overlay: React.createElement(Menu, {
        selectedKeys: [tableSize],
        onClick: function onClick(_a) {
          var key = _a.key;
          setTableSize(key);
        },
        style: {
          width: 80
        }
      }, React.createElement(Menu.Item, {
        key: "large"
      }, "\u9ED8\u8BA4"), React.createElement(Menu.Item, {
        key: "middle"
      }, "\u4E2D\u7B49"), React.createElement(Menu.Item, {
        key: "small"
      }, "\u7D27\u51D1")),
      trigger: ['click']
    }, React.createElement(Tooltip, {
      title: '表格密度'
    }, React.createElement(ColumnHeightOutlined, null)));
  }, [tableSize, setTableSize]);
};

export default React.forwardRef(DensityIcon);