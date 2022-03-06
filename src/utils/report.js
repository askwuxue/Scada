import { config } from './config';
import { generateUniqueID, sendData } from './utils';

const sessionID = generateUniqueID();

// 上传地址
export function report(data, isImmediate = false) {
  if (!config.url) {
    console.error('请设置上传 url 地址');
  }

  const reportData = JSON.stringify({
    id: sessionID,
    appID: config.appID,
    userID: config.userID,
    data,
  });

  if (isImmediate) {
    sendData(config.url, reportData);
    return;
  }

  if (window.requestIdleCallback) {
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
