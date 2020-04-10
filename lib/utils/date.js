"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unixToStartDate = unixToStartDate;
exports.unixToEndDate = unixToEndDate;
exports.startDateToUnix = startDateToUnix;
exports.endDateToUnix = endDateToUnix;
exports.utcToLocal = utcToLocal;
exports.localToUtc = localToUtc;
exports.dateToUnix = dateToUnix;
Object.defineProperty(exports, "dayjs", {
  enumerable: true,
  get: function get() {
    return _dayjs["default"];
  }
});

var _dayjs = _interopRequireDefault(require("dayjs"));

var _index = require("./index");

var _utc = _interopRequireDefault(require("dayjs/plugin/utc"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dayjs["default"].extend(_utc["default"]);

var dateFormat = "YYYY-MM-DD HH:mm:ss";

function unixToStartDate(unix) {
  return !unix ? undefined : _dayjs["default"].unix(unix);
}

function unixToEndDate(unix) {
  return !unix ? undefined : _dayjs["default"].unix(unix).add(-1, "d");
}

function startDateToUnix(moment) {
  return moment ? moment.clone().hour(0).minute(0).second(0).unix() : undefined;
}

function endDateToUnix(moment) {
  return moment ? moment.clone().add(1, "d").hour(0).minute(0).second(0).unix() : undefined;
}

function utcToLocal(dateString, placeholder) {
  if (placeholder === void 0) {
    placeholder = "--";
  }

  var dateValue = (0, _index.isNumber)(dateString) ? dateString * 1000 : dateString;
  return dateValue ? _dayjs["default"].utc(dateValue).local().format(dateFormat) : placeholder;
}

function localToUtc() {}

function dateToUnix(date) {
  return typeof date === "number" ? date : date === null || date === void 0 ? void 0 : date.unix();
}