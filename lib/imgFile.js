"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
/*
 * @Author: donggg
 * @LastEditors: donggg
 * @Date: 2021-04-27 11:57:19
 * @LastEditTime: 2021-07-05 16:04:41
 */

class ImgFile {
  constructor() {
    (0, _defineProperty2.default)(this, "store", void 0);
    /**
     * 缓存图片文件
     * @param {*} name 图片key
     * @param {*} file 图片File文件
     * @param {*} forceUpdate 如果已经存在是否更新
     */
    (0, _defineProperty2.default)(this, "saveImgFiles", (name, file, forceUpdate = false) => {
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
    (0, _defineProperty2.default)(this, "getImgFile", (name, defaultValue) => this.store[name] || defaultValue);
    /**
     * 返回存储的图片对象
     * @returns {*}
     */
    (0, _defineProperty2.default)(this, "getAllImgFiles", () => this.store);
    /**
     * 清空图片的存储空间
     */
    (0, _defineProperty2.default)(this, "resetImgFiles", () => this.store = {});
    this.store = {};
  }
}
exports.default = ImgFile;
//# sourceMappingURL=imgFile.js.map