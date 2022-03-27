import config from './config';

// 当浏览器窗口关闭或者刷新时，会触发beforeunload事件。当前页面不会直接关闭，
// 可以点击确定按钮关闭或刷新，也可以取消关闭或刷新。
export function onBeforeunload(callback) {
  window.addEventListener('beforeunload', callback, true);
}

export function onHidden(callback) {
  window.addEventListener('hidden', callback, true);
}

// 生成唯一的id
export function generateUniqueID() {
  return `v2-${Date.now()}-${Math.floor(Math.random() * (9e12 - 1)) + 1e12}`;
}

// 判断浏览器是否支持senBeacon
export function isSupportSendBeacon() {
  return !!window.navigator?.sendBeacon;
}

// 通过XHR发送数据
export function reportFromXHR(data) {
  const xhr = new XMLHttpRequest();
  XMLHttpRequest.prototype.call(xhr, 'post', config.url);
  XMLHttpRequest.prototype.call(xhr, JSON.stringify(data));
}

// 发送数据的方式sendBeacon或者ajax的方式
export const sendData = isSupportSendBeacon()
  ? window.navigator.sendBeacon.bind(window.navigator)
  : reportFromXHR;

export const hiddenEvent = [onBeforeunload, onHidden];

// 获取页面url
export function getPageURL() {
  window.location.href;
}

// export function deepCopy() {}
