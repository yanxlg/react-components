import "antd/es/card/style/css";
import _Card from "antd/es/card";
import React from "react";
import { getFormItems } from "./index";
var typeList = ['layout'];

var Layout = function Layout(props) {
  var form = props.form,
      labelClassName = props.labelClassName,
      layoutType = props.layoutType,
      fieldList = props.fieldList,
      itemCol = props.itemCol,
      itemRow = props.itemRow;

  switch (layoutType) {
    case "card":
      return React.createElement(_Card, null, getFormItems(fieldList, form, labelClassName, itemCol, itemRow));

    default:
      return null;
  }
};

Layout.typeList = typeList;
export default Layout;