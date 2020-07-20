import { endDateToUnix, startDateToUnix } from './date';
import addOn from './addOn';
export var isNull = function isNull(value) {
  return value === null || value === void 0;
};
export function transNullValue(value) {
  // 数组中去除空字符
  if (Array.isArray(value)) {
    var filter_value = value.filter(function (item) {
      return item !== '' && !isNull(item);
    });
    return filter_value.length ? filter_value : undefined;
  }

  return value === '' || isNull(value) ? undefined : value;
}
export function transJoinStr(value) {
  return value && value.length ? value.join(',') : undefined;
}
export function transNumber(value) {
  var _value = typeof value === 'string' ? value === '' ? undefined : Number(value) : typeof value === 'number' ? value : undefined;

  return _value && isNaN(_value) ? undefined : _value;
}
export function transStrArr(value) {
  if (typeof value === 'string') {
    return value.trim().split(/\,|\s+|\;|\\r|\\n/g).filter(function (str) {
      return str;
    });
  }

  return value;
}
export function transNumberStrArr(value) {
  if (typeof value === 'string') {
    return value.trim().split(',').filter(function (str) {
      return str && !/[^0-9\,]/g.test(str);
    });
  }

  return value;
}
export function transNumberArray(value) {
  if (typeof value === 'string') {
    return transNumberStrArr(value).map(function (item) {
      return transNumber(item);
    });
  }

  return value;
}
var formatter = addOn({
  number: transNumber,
  str_arr: transStrArr,
  join: transJoinStr,
  "null": transNullValue,
  number_arr: transNumberArray,
  number_str_arr: transNumberStrArr,
  start_date: startDateToUnix,
  end_date: endDateToUnix
});
export default formatter;