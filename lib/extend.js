"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = extend;
var _core = _interopRequireDefault(require("./core"));
var _type = require("./type");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/*
 * @Author: donggg
 * @LastEditors: donggg
 * @Date: 2021-07-04 18:55:30
 * @LastEditTime: 2021-07-04 18:59:17
 */

function extend(context) {
  return class Component extends _core.default {
    constructor(props) {
      super(props);
    }
    componentDidMount() {
      try {
        this.init();
        this.create(context);
      } catch (e) {
        console.error(`[ReactWEditor Error]: ${e}`);
      }
    }
  };
}
//# sourceMappingURL=extend.js.map