import { getError, reportInfo, caughtError } from './info/getError';
import getHttpRequestError from './info/getHttpRequestError';
import report from './handle/report';
import { errorList } from './handle/handleError';
import { getPerformance, getResource } from './info/getPerformance';
import getUV from './info/getUV';
import getBaseInfo from './info/getBaseInfo';

const listener = window.addEventListener;
function _init() {
  const _hibugConfig = window.$HibugConfig;
  /**
   * 可捕获语法错误和网络错误 无法捕获 Promise 错误
   * @param {String}  msg    错误信息
   * @param {String}  url    出错文件
   * @param {Number}  row    行号
   * @param {Number}  col    列号
   * @param {Object}  error  错误详细信息
   */
  listener && listener('error', (e) => {
    getError({
      type: 'default',
      e,
    });
  }, true);

  /**
   * 可捕获 Promise 错误
   * react render 内发生 `Cannot read property 'xxx' of undefined` 可从此处捕获到
   */
  listener && listener('unhandledrejection', (e) => {
    e.preventDefault();
    getError({
      type: 'promise',
      e,
    });
  }, true);

  // ajax/fetch Error
  getHttpRequestError();

  // 文档卸载前执行发送日志操作
  if (_hibugConfig?.mode === 'beforeunload') {
    listener && listener('unload', () => {
      if (errorList?.length && errorList.length <= _hibugConfig.maxError) {
        report(errorList);
      }
    }, true);
  }

  if (_hibugConfig?.performance) {
    listener && listener('load', () => {
      const performance = getPerformance();
      const resource = getResource();
      const UV = getUV();
      const data = {
        ...getBaseInfo(),
      };
      if (performance) data.performance = performance;
      if (resource?.length) data.resource = resource;
      if (UV) data.UV = UV;
      report(data);
    }, true);
  }
}

function Hibug() {}

Hibug.init = function (conf) {
  if (!window) {
    console.error('Hibug: 检测到当前环境不支持 Hibug！');
    return;
  }
  window.$HibugAuth = true;
  if (!window?.$HibugConfig) {
    // default config
    window.$HibugConfig = {
      delay: 2000, // 错误处理间隔时间
      report() {}, // 上报错误的方法
      enabledDev: false, // 开发环境下上传错误
      maxError: 10, // 最大上传错误数量
      mode: 'immediately', // 信息发送模式 immediately 立即发送 beforeunload 页面注销前发送
      ignore: [], // 忽略指定错误 目前只支持忽略 HTTP 请求错误
      error: true, // 是否上报错误信息
      performance: false, // 是否上报性能信息
      include: null, // 用于收集指定用户的特定信息
    };
  }
  if (conf) {
    window.$HibugConfig = {
      ...window.$HibugConfig,
      ...conf,
    };
  }

  if (window?.$HibugAuth) _init();
};

Hibug.reportInfo = reportInfo;
Hibug.caughtError = caughtError;

export default Hibug;
