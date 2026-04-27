"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/*
 * @Author: donggg
 * @LastEditors: donggg
 * @Date: 2021-04-27 11:57:19
 * @LastEditTime: 2021-07-05 16:04:41
 */

class ImgFile {
  constructor() {
    _defineProperty(this, "store", void 0);
    /**
     * 缓存图片文件
     * @param {*} name 图片key
     * @param {*} file 图片File文件
     * @param {*} forceUpdate 如果已经存在是否更新
     */
    _defineProperty(this, "saveImgFiles", (name, file, forceUpdate = false) => {
      if (this.store[name] && !forceUpdate) {
        return;
      }
      this.store[name] = file;
    });
    /**
     * 获取图片文件
     * @param {*} name 图片key
     * @param {*} defaultValue 当文件未查询到时，默认文件
     * @returns 返回 File 文件，或者 defaultValue
     */
    _defineProperty(this, "getImgFile", (name, defaultValue) => this.store[name] || defaultValue);
    /**
     * 返回存储的图片对象
     * @returns {*}
     */
    _defineProperty(this, "getAllImgFiles", () => this.store);
    /**
     * 清空图片的存储空间
     */
    _defineProperty(this, "resetImgFiles", () => this.store = {});
    this.store = {};
  }
}
exports.default = ImgFile;
//# sourceMappingURL=imgFile.js.map