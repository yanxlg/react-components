import dayjs from 'dayjs';
import { isNumber } from './index';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);
var dateFormat = 'YYYY-MM-DD HH:mm:ss';
export function unixToStartDate(unix) {
  return !unix ? undefined : dayjs.unix(unix);
}
export function unixToEndDate(unix) {
  return !unix ? undefined : dayjs.unix(unix).add(-1, 'd');
}
export function startDateToUnix(moment) {
  return moment ? moment.clone().hour(0).minute(0).second(0).unix() : undefined;
}
export function endDateToUnix(moment) {
  return moment ? moment.clone().add(1, 'd').hour(0).minute(0).second(0).unix() : undefined;
}
export function utcToLocal(dateString, placeholder) {
  if (placeholder === void 0) {
    placeholder = '--';
  }

  var dateValue = isNumber(dateString) ? dateString * 1000 : dateString;
  return dateValue ? dayjs.utc(dateValue).local().format(dateFormat) : placeholder;
}
export function localToUtc() {}
export function dateToUnix(date) {
  return typeof date === 'number' ? date : date === null || date === void 0 ? void 0 : date.unix();
} // 时间选择框当UTC时间

export function startUtcDateToUnix(moment) {
  return moment ? moment.clone().hour(0).minute(0).second(0).add(8, 'h').unix() : undefined;
} // 时间选择框当UTC时间

export function endUtcDateToUnix(moment) {
  return moment ? moment.clone().add(1, 'd').hour(0).minute(0).second(0).add(8, 'h').unix() : undefined;
}