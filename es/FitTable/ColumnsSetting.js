import "antd/es/button/style/css";
import _Button from "antd/es/button";
import "antd/es/col/style/css";
import _Col from "antd/es/col";
import "antd/es/row/style/css";
import _Row from "antd/es/row";
import "antd/es/checkbox/style/css";
import _Checkbox from "antd/es/checkbox";
import "antd/es/modal/style/css";
import _Modal from "antd/es/modal";
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import useModal from '../hooks/useModal';
import styles from './_index.less';

var ColumnsSetting = function ColumnsSetting(_a) {
  var columns = _a.columns,
      filterColumns = _a.filterColumns;

  var _b = useModal(),
      visible = _b.visible,
      setVisibleProps = _b.setVisibleProps,
      onClose = _b.onClose;

  var cacheColumnsHideList = useRef([]);

  var _c = useState([]),
      columnsHideList = _c[0],
      setColumnsHideList = _c[1]; // 列
  // 重新初始化


  useEffect(function () {
    cacheColumnsHideList.current = [];
    setColumnsHideList([]);
  }, [columns]); // drop修改

  useEffect(function () {
    if (visible) {
      setColumnsHideList(cacheColumnsHideList.current);
    }
  }, [visible]);
  var onChange = useCallback(function (checkedValue) {
    setColumnsHideList(checkedValue);
  }, []);
  var onSave = useCallback(function () {
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
  var modal = useMemo(function () {
    return React.createElement(_Modal, {
      title: "\u81EA\u5B9A\u4E49\u5B57\u6BB5\u5C55\u793A",
      cancelText: "\u8FD8\u539F\u9ED8\u8BA4",
      okText: "\u4FDD\u5B58",
      onOk: onSave,
      onCancel: onClose,
      visible: !!visible
    }, React.createElement(_Checkbox.Group, {
      onChange: onChange,
      value: columnsHideList
    }, React.createElement(_Row, null, columns.map(function (column) {
      return React.createElement(_Col, {
        span: 4,
        key: column.dataIndex
      }, React.createElement(_Checkbox, {
        value: column.dataIndex
      }, column.title));
    }))));
  }, [visible, columnsHideList]);
  var showModal = useCallback(function () {
    setVisibleProps(true);
  }, []);
  return useMemo(function () {
    return React.createElement(React.Fragment, null, React.createElement(_Button, {
      className: styles.settingBtn,
      size: "small",
      onClick: showModal
    }, "\u81EA\u5B9A\u4E49\u5C55\u793A\u5B57\u6BB5"), modal);
  }, [visible, columnsHideList]);
};

export default ColumnsSetting;