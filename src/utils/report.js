import config from './config';
import { generateUniqueID, sendData } from './utils';

const sessionID = generateUniqueID();

// 上传地址
export function report(data, isImmediately = false) {
  console.log('data: ', data);
  if (!config.url) {
    console.error('请设置上传 url 地址');
  }

  const reportData = JSON.stringify({
    id: sessionID,
    appID: config.appID,
    userID: config.userID,
    data,
  });

  if (isImmediately) {
    sendData(config.url, reportData);
    return;
  }

  // 方法插入一个函数，这个函数将在浏览器空闲时期被调用。这使开发者能够在主事件循环上执行后台和低优先级工作，
  // 而不会影响延迟关键事件，如动画和输入响应。函数一般会按先进先调用的顺序执行，
  // 然而，如果回调函数指定了执行超时时间timeout，则有可能为了在超时前执行函数而打乱执行顺序。
  console.log('window.requestIdleCallback: ', window.requestIdleCallback);
  if (window.requestIdleCallback) {
    console.log('window.requestIdleCallback: ', window.requestIdleCallback);
    window.requestIdleCallback(
      () => {
        sendData(config.url, reportData);
      },
      { timeout: 3000 },
    );
  } else {
    setTimeout(() => {
      sendData(config.url, reportData);
    });
  }
}
