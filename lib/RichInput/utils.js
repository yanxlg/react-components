"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.positiveIntFormatter = exports.intFormatter = exports.numberFormatter = void 0;

var numberFormatter = function numberFormatter(value) {
  return typeof value === 'number' ? String(value) : value ? (/^\d+(\.\d*)?/.exec(value) || [''])[0] : '';
};

exports.numberFormatter = numberFormatter;

var intFormatter = function intFormatter(value) {
  return typeof value === 'number' ? String(value) : value ? (/^\d+/.exec(value) || [''])[0] : '';
};

exports.intFormatter = intFormatter;

var positiveIntFormatter = function positiveIntFormatter(value) {
  return typeof value === 'number' ? String(value) : value ? (/^[1-9]\d*/.exec(value) || [''])[0] : '';
};

exports.positiveIntFormatter = positiveIntFormatter;