import React, { useEffect, useRef } from 'react';
import isEqual from 'lodash/isEqual';
import TableStatus from './status';
/**
 * 转化 text 和 valueEnum
 * 通过 type 来添加 Status
 * @param text
 * @param valueEnum
 * @param prue 纯净模式，不增加 status
 */

export var parsingText = function parsingText(text, valueEnum, pure) {
  if (!valueEnum) {
    return text;
  }

  var domText = valueEnum[text];

  if (!domText) {
    return text;
  }

  if (domText.status) {
    if (pure) {
      return domText.text;
    }

    var status_1 = domText.status;
    var Status = TableStatus[status_1 || 'Init'];
    return /*#__PURE__*/React.createElement(Status, null, domText.text);
  }

  return domText.text || domText;
};
/**
 * 把 value 的枚举转化为 数组
 * @param valueEnum
 */

export var parsingValueEnumToArray = function parsingValueEnumToArray(valueEnum) {
  if (valueEnum === void 0) {
    valueEnum = {};
  }

  return Object.keys(valueEnum).map(function (key) {
    var value = valueEnum[key] || '';
    return {
      text: value.text || value || '',
      value: key
    };
  });
};
/**
 * 检查值是否存在
 * 为了 避开 0 和 false
 * @param value
 */

export var checkUndefinedOrNull = function checkUndefinedOrNull(value) {
  return value !== undefined && value !== null;
};

function deepCompareEquals(a, b) {
  return isEqual(a, b);
}

function useDeepCompareMemoize(value) {
  var ref = useRef(); // it can be done by using useMemo as well
  // but useRef is rather cleaner and easier

  if (!deepCompareEquals(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
}

export function useDeepCompareEffect(effect, dependencies) {
  useEffect(effect, useDeepCompareMemoize(dependencies));
}
export function getProgressStatus(text) {
  if (typeof text !== 'number') {
    return 'exception';
  }

  if (text === 100) {
    return 'success';
  }

  if (text < 100) {
    return 'active';
  } // magic


  if (text < 0) {
    return 'exception';
  }

  return 'normal';
}
/**
 *  根据 key 和 dataIndex 生成唯一 id
 * @param key
 * @param dataIndex
 */

export var genColumnKey = function genColumnKey(key, dataIndex) {
  if (key) {
    return key;
  }

  if (!key && dataIndex) {
    if (Array.isArray(dataIndex)) {
      return dataIndex.join('-');
    }

    return dataIndex;
  }

  return undefined;
};
export default function get(entity, path) {
  var tempPath = [''];

  if (typeof path === 'string') {
    if (path.includes('.')) {
      tempPath = path.split('.');
    } else {
      tempPath = [path];
    }
  }

  if (Array.isArray(path)) {
    tempPath = path;
  }

  var current = entity;

  for (var i = 0; i < tempPath.length; i += 1) {
    if (current === null || current === undefined) {
      return undefined;
    }

    current = current[tempPath[i]];
  }

  return current;
}