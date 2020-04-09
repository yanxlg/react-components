import React, { Fragment, useMemo } from "react";
import toNumber from "lodash/toNumber";
import { getColorByRealValue, getSymbolByRealValue, getRealTextWithPrecision } from "./util";

var Percent = function Percent(_a) {
  var value = _a.value,
      prefix = _a.prefix,
      precision = _a.precision,
      showSymbol = _a.showSymbol,
      _b = _a.suffix,
      suffix = _b === void 0 ? "%" : _b,
      _c = _a.showColor,
      showColor = _c === void 0 ? false : _c;
  var realValue = useMemo(function () {
    return typeof value === "string" && value.includes("%") ? toNumber(value.replace("%", "")) : toNumber(value);
  }, [value]);
  /** 颜色有待确定, 根据提供 colors: ['正', '负'] | boolean */

  var style = showColor ? {
    color: getColorByRealValue(realValue)
  } : {};
  return React.createElement("span", {
    style: style
  }, prefix && React.createElement("span", null, prefix), showSymbol && React.createElement(Fragment, null, getSymbolByRealValue(realValue), "\xA0"), getRealTextWithPrecision(realValue, precision), suffix && suffix);
};

export default Percent;