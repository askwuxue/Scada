// 类型
import {
  IConstantMap,
  IConfig,
  IRecord,
  IJSErrReportConfig,
  ICheckErrorNeedReport,
} from './type';

// 打点服务器地址
export const feeTarget: string = 'http://localhost/';

// 测试标记
const TEST_FLAG: string = 'b47ca710747e96f1c523ebab8022c19e9abaa56b';

// 错误日志
const LOG_TYPE_ERROR: string = 'error';

// 产品指标
const LOG_TYPE_PRODUCT: string = 'product';

// 性能指标
const LOG_TYPE_PERFORMANCE: string = 'perf';

// const LOG_TYPE_INFO: string = 'info'; // 尚未使用

// 定义JS_TRACKER错误类型码
const JS_TRACKER_ERROR_CONSTANT_MAP: IConstantMap = {
  1: 'ERROR_RUNTIME',
  2: 'ERROR_SCRIPT',
  3: 'ERROR_STYLE',
  4: 'ERROR_IMAGE',
  5: 'ERROR_AUDIO',
  6: 'ERROR_VIDEO',
  7: 'ERROR_CONSOLE',
  8: 'ERROR_TRY_CATCH',
};

const JS_TRACKER_ERROR_DISPLAY_MAP: IConstantMap = {
  1: 'JS_RUNTIME_ERROR',
  2: 'SCRIPT_LOAD_ERROR',
  3: 'CSS_LOAD_ERROR',
  4: 'IMAGE_LOAD_ERROR',
  5: 'AUDIO_LOAD_ERROR',
  6: 'VIDEO_LOAD_ERROR',
  7: 'CONSOLE_ERROR',
  8: 'TRY_CATCH_ERROR',
};

// TODO 此处没有实现，一直返回true
// 自定义检测函数, 判断是否需要报告该错误;
const checkErrorNeedReport: ICheckErrorNeedReport = (desc = '', stack = '') => {
  return true;
};

// JavaScript error 配置信息
const js_error_report_config: IJSErrReportConfig = {
  ERROR_RUNTIME: true,
  ERROR_SCRIPT: true,
  ERROR_STYLE: true,
  ERROR_IMAGE: true,
  ERROR_AUDIO: true,
  ERROR_VIDEO: true,
  ERROR_CONSOLE: true,
  ERROR_TRY_CATCH: true,
  checkErrorNeedReport,
};

// 数据配置信息
const record: IRecord = {
  time_on_page: true,
  performance: true,
  js_error: true,
  js_error_report_config,
};

const getPageType = (location = window.location) => {
  return `${location.host}${location.pathname}`;
};

// 默认配置
const DEFAULT_CONFIG: IConfig = {
  // [必填]项目id
  pid: '000001',
  is_test: false,
  record,
  version: '1.0.0',
  getPageType,
};
