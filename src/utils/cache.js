import { deepCopy } from './utils';

const cache = [];

// 获取缓存的数据
export function getCache() {
  return deepCopy(cache);
}

// 数据暂时收集
export function addCache(data) {
  cache.push(data);
}

// 清除缓存数据
export function clearCache() {
  cache.length = 0;
}
