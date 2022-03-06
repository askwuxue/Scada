import { report } from '../utils/report';
import { getPageURL } from '../utils/utils';

// 忽略iframe错误
const ignoreError = /^Script error\.?$/;

export function handleError() {
  /**
   * 捕获JavaScript错误，并立即上报
   * @date 2021-11-18
   * @param {string} message  错误信息。可用于HTML onerror=""处理程序中的event。
   * @param {string} source   发生错误的脚本URL
   * @param {number} lineno   发生错误的行号
   * @param {number} colno    发生错误的列号
   * @param {object} error    Error对象
   * @returns {void}
   */
  window.onerror = function (message, source, lineno, colno, error) {
    // TODO 如何处理iframe错误
    if (ignoreError.test(message)) {
      return;
    }
    report(
      {
        message,
        lineno,
        colno,
        pageUrl: source,
        error: error.stack,
        type: 'error',
        subType: 'js',
        startTime: performance.now(),
      },
      true,
    );
  };

  /**
   * 处理Promise错误并进行上报
   * @date 2021-11-18
   * @param {string} 'unhandledrejection'
   * @param {function} callback
   * @callback function
   * @param {event}
   * @returns {void}
   */
  window.addEventListener('unhandledrejection', function (event) {
    const { reason } = event;
    report(
      {
        reason,
        type: 'error',
        subType: 'promise',
        // 事件创建时的时间戳（精度为毫秒）
        startTime: event.timeStamp,
        pageURL: getPageURL(),
      },
      true,
    );
    // 防止默认处理（例如将错误输出到控制台）
    event.preventDefault();
  });
}
