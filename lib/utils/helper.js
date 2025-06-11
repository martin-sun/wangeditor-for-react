"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isEqualString = exports.isEmpty = exports.difference = exports.default = void 0;
exports.isValidKey = isValidKey;
/*
 * @Author: dongmin
 * @LastEditors: donggg
 * @Date: 2021-04-02 18:36:57
 * @LastEditTime: 2021-07-05 16:05:05
 */

/**
 * 简单判断两个值是否相当
 * @param {string} 值1
 * @param {string} 值2
 * @return {boolean} 判断结果
 */
const isEqualString = (value1, value2) => value1 === value2;

/**
 * 判断是否为空
 * @param  {object|array|string|boolean|null|undefined|NaN} value 待判断值
 * @return {boolean} 判断结果
 */
exports.isEqualString = isEqualString;
const isEmpty = value => {
  // null, undefined
  if (value === null || value === undefined) {
    return true;
  }
  // NaN
  if (typeof value === 'number' && value !== value) {
    return isNaN(value);
  }
  // array
  if (typeof value === 'object' && value.length) {
    return value.length === 0;
  }
  // string
  if (typeof value === 'string') {
    return value === '';
  }
  // object
  if (typeof value === 'object') {
    return Object.keys(value).length === 0;
  }
  return !value;
};

/**
 * 返回给定数组不同的值
 * @param {array} array 待过滤数组
 * @param {array} values 需要过滤的值组成的数组
 * @returns {array} 返回给定数组不同的值
 */
exports.isEmpty = isEmpty;
const difference = (array, values) => {
  const result = [];
  for (const value of array) {
    if (!values.includes(value)) {
      result.push(value);
    }
  }
  return result;
};

/**
 * 判断是否为该对象的键
 * @param key object 的键
 * @param editor 目标对象
 * @returns 是否是该元素的键
 */
exports.difference = difference;
function isValidKey(key, object) {
  return key in object;
}
var _default = exports.default = {};
//# sourceMappingURL=helper.js.map