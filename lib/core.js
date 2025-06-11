"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var React = _interopRequireWildcard(require("react"));
var _wangeditor = _interopRequireDefault(require("wangeditor"));
var _uniqueId = _interopRequireDefault(require("./utils/unique-id"));
var _helper = require("./utils/helper");
var _type = require("./type");
var _htmlRender = require("./utils/htmlRender");
var _imgFile = _interopRequireDefault(require("./imgFile"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
/*
 * @Author: donggg
 * @LastEditors: donggg
 * @Date: 2021-07-02 10:23:15
 * @LastEditTime: 2022-03-07 17:28:40
 */

class ReactWEditor extends React.PureComponent {
  constructor(..._args) {
    super(..._args);
    // Explicitly define props and state types
    (0, _defineProperty2.default)(this, "state", {});
    (0, _defineProperty2.default)(this, "id", (0, _uniqueId.default)(8));
    (0, _defineProperty2.default)(this, "hasCreated", false);
    // 是否执行 create 创建函数
    (0, _defineProperty2.default)(this, "imgFile", new _imgFile.default());
    (0, _defineProperty2.default)(this, "defaultConfig", {
      zIndex: 1
    });
    (0, _defineProperty2.default)(this, "editor", null);
    (0, _defineProperty2.default)(this, "_isMounted", false);
    (0, _defineProperty2.default)(this, "__hook__run", (hooks = [], args = [], target) => {
      hooks.forEach((hook, index) => {
        if (hook in target && typeof target[hook] === 'function' && args[index]) {
          target[hook].apply(target[hook], args[index]);
        } else if (/^(\w+\.\w+)+$/.test(hook) && args[index]) {
          const path = hook.split('.');
          const cache = [];
          let fn = target;
          path.forEach(d => {
            cache.push(fn);
            fn = fn[d];
          });
          cache.push(fn);
          if (typeof fn === 'function') {
            fn.apply(cache[cache.length - 2], args[index]);
          } else if (typeof args[index] === 'function') {
            args[index].apply(args[index], cache);
          }
        }
      });
    });
    /**
     * 根据属性，配置默认设置
     */
    (0, _defineProperty2.default)(this, "setDefaultConfigByProps", () => {
      const {
        placeholder,
        onChange,
        onFocus,
        onBlur,
        linkImgCallback,
        onlineVideoCallback,
        localBlobImg
      } = this.props;
      if (placeholder) this.defaultConfig.placeholder = placeholder;
      if (onChange) this.defaultConfig.onchange = onChange;
      if (onFocus) this.defaultConfig.onfocus = onFocus;
      if (onBlur) this.defaultConfig.onblur = onBlur;
      if (linkImgCallback) this.defaultConfig.linkImgCallback = linkImgCallback;
      if (onlineVideoCallback) this.defaultConfig.onlineVideoCallback = onlineVideoCallback;

      // 图片替换为本地Blob伪URL
      if (localBlobImg) {
        this.defaultConfig.customUploadImg = (resultFiles, insertImgFn) => {
          resultFiles.forEach(file => {
            const url = URL.createObjectURL(file);
            this.imgFile.saveImgFiles(url, file);
            insertImgFn(url);
          });
        };
      }
    });
    (0, _defineProperty2.default)(this, "changeCreatedFlag", flag => this.hasCreated = flag);
    (0, _defineProperty2.default)(this, "created", () => this.changeCreatedFlag(true));
    (0, _defineProperty2.default)(this, "destroyed", () => this.changeCreatedFlag(false));
    (0, _defineProperty2.default)(this, "isCreated", () => this.hasCreated === true);
  }
  // This method is considered legacy and should be avoided in new code
  // We'll keep it for backward compatibility but use componentDidUpdate for React 18
  UNSAFE_componentWillReceiveProps(nextProps) {
    const {
      value
    } = nextProps;
    if (!(0, _helper.isEqualString)(value, this.props.value)) {
      this.setContentByHTMLString(this.props.value);
    }
  }
  componentDidUpdate(prevProps) {
    const {
      value
    } = this.props;
    if (!(0, _helper.isEqualString)(value, prevProps.value)) {
      this.setContentByHTMLString(value);
    }
  }
  componentDidMount() {
    this._isMounted = true;
    try {
      this.init();
      this.create();
    } catch (e) {
      console.error(`[ReactWEditor Error]: ${e}`);
    }
  }
  componentWillUnmount() {
    // Mark component as unmounted
    this._isMounted = false;

    // Clean up the editor
    if (this.editor) {
      this.editor.destroy();
      this.editor = null;
    }

    // Clean up any Blob URLs
    if (this.imgFile) {
      this.imgFile.resetImgFiles();
    }

    // Revoke any object URLs that might have been created
    if (this.imgFile) {
      const imgFiles = this.imgFile.getAllImgFiles();
      Object.keys(imgFiles).forEach(url => {
        if (url.startsWith('blob:')) {
          URL.revokeObjectURL(url);
        }
      });
    }
  }
  __before__instanced() {
    const {
      globalHook = {}
    } = this.props;
    const hooks = Object.keys(globalHook);
    const args = Object.values(globalHook);
    this.__hook__run(hooks, args, _wangeditor.default);
  }
  __after__instanced() {
    if (!this.check()) {
      return;
    }
    const {
      instanceHook = {}
    } = this.props;
    const hooks = Object.keys(instanceHook);
    const args = Object.values(instanceHook);
    this.__hook__run(hooks, args, this.editor);
  }
  init() {
    const elem = document.getElementById(`editor-${this.id}`);
    if (elem) {
      // 0. 初始化前，调用全局的 hook
      this.__before__instanced();

      // 1. 初始化
      this.editor = new _wangeditor.default(`#editor-${this.id}`);

      // 2. 初始化后，调用实例的 hook，支持相对路径，例如键值是 'menus.extend'
      this.__after__instanced();

      // 3. 根据属性配置默认设置
      this.setDefaultConfigByProps();

      // 4. 根据默认设置更新设置
      this.setConfig(this.defaultConfig);
    } else {
      console.error('[ReactWEditor Error]: dom is not found');
    }
  }
  check() {
    if (this.editor) {
      return true;
    }
    console.error('[ReactWEditor Error]: editor not found');
    return false;
  }
  create(context = {}) {
    const {
      config,
      defaultValue
    } = this.props;
    if (this.check()) {
      // 1. 根据 config 属性配置设置
      this.setConfig(config);

      // 2. 扩展 edtior
      this.extend(context);

      // 3. 生成 editor
      this.editor.create();

      // 4. 修改标识
      this.created();

      // 5. 根据 defaultValue 设置内容
      this.setContentByHTMLString(defaultValue);
    }
  }

  /**
   * 通过 context 扩展 edtior
   * @param {object} context 待扩展的内容
   * @param {array} customFilter 需要过滤的扩展字段
   */
  extend(context = {}, customFilter = []) {
    if (this.check()) {
      // 1. 过滤数组
      const filter = Object.keys(this.editor).concat(customFilter || []);

      // 2. 向 editor 上扩展
      (0, _helper.difference)(Object.keys(context), filter).forEach(key => this.editor[key] = context[key]);
    }
  }

  /**
   * 销毁编辑器
   */
  destroy() {
    if (!this.isCreated()) {
      console.error("[ReactWEditor Error]: editor has not created, don't destroy.");
      return;
    }
    // 1. 销毁
    this.editor.destroy();
    this.editor = null;

    // 2. 修改标识
    this.destroyed();
  }

  /**
   * 配置 editor
   * @param {*} config 配置
   * @doc https://www.wangeditor.com/doc/
   */
  setConfig(config) {
    if (config) {
      this.editor.config = Object.assign(this.editor.config, config);
    }

    // 多语言处理
    const {
      languages
    } = this.props;
    if (languages && !(0, _helper.isEmpty)(languages)) {
      this.editor.config.languages = Object.assign(this.editor.config.languages, languages);
    }
  }
  /**
   * 设置 editor 内容。注意！必须在创建完 editor 后才可以设置内容
   * @param {string} html 回填的 html 字符串
   */
  setContentByHTMLString(html) {
    if (!this.isCreated()) {
      console.error('[ReactWEditor Error]: editor has not created');
    }
    if (this.check()) {
      try {
        this.editor.txt.html(html);
      } catch (e) {
        console.error(`[ReactWEditor Error]: ${e}`);
      }
    }
  }

  /**
   * 替换 html 中的 img 标签的 src 引用地址
   * @param {string} html html 文本
   * @param {function} callback 替换过程中的回调函数
   * @returns 替换后的 html 文本
   */
  replaceHTMLImgBlobURL(html, callback) {
    return (0, _htmlRender.replaceHTMLImgBlobURL)(html, this.imgFile.getAllImgFiles(), callback);
  }
  render() {
    const {
      style,
      className
    } = this.props;
    return /*#__PURE__*/React.createElement('div', {
      style: style,
      className,
      id: `editor-${this.id}`
    });
  }
}
exports.default = ReactWEditor;
//# sourceMappingURL=core.js.map