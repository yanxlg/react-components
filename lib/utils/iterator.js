"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.iterator = iterator;

function iterator(data, render) {
  var list = [];

  for (var key in data) {
    if (data.hasOwnProperty(key)) {
      list.push(render(key, data[key]));
    }
  }

  return list;
}