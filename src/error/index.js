import { report } from '../utils/report';
import { getPageURL } from '../utils/utils';

// 忽略iframe错误
const ignoreError = /^Script error\.?$/;

// 资源加载error
const resourceError = {
  script: 'script',
  link: 'link',
  // img: ERROR_IMAGE
};

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

  /**
   * 处理监控资源加载异常并进行上报
   */
  window.addEventListener(
    'load',
    function () {
      // performance.getEntriesByType('resource') 表示当前 HTML 文档中引用的所有静态资源信息，
      // 不包括本身 HTML 信息。获取主页 html 数据，应该使用 performance.timing
      const resources = performance.getEntriesByType('resource');
      const rourceErrorData =
        resources &&
        resources.filter((value) => {
          const { name, duration, initiatorType: type, transferSize } = value;

          /**
           * 监控资源error，响应时间超过20秒，SDK自身文件除外的所有资源error
           * @date 2021-11-28
           * @param {boolean} (Object.prototype.hasOwnProperty.call(resourceError, type) 监控资源
           * @param {date}  duration 资源加载时间
           * @param {date}  transferSize 资源大小
           * @returns {boolean}
           */
          if (
            (Object.prototype.hasOwnProperty.call(resourceError, type) &&
              duration > 20000 &&
              !name.includes()) ||
            transferSize === 0
          ) {
            return value;
          }
        });
      // 最终上报数据
      const data = rourceErrorData.map((value) => {
        const { initiatorType: resourceType, name: resUrl, startTime } = value;
        return {
          resUrl,
          type: 'error',
          subType: 'resource',
          startTime,
          resourceType,
          pageURL: getPageURL(),
        };
      });
      report(data);
    },
    false,
  );
}
