import { setConfig } from './config';
import { hiddenEvent } from './utils/utils';
import { report } from './utils/report';
import { getCache, clearCache } from './utils/cache';

// 当页面进入后台或关闭前时，将数据进行上报
const reportTiming = () => {
  hiddenEvent.forEach((fn) => {
    fn(() => {
      const data = getCache();
      if (data.length) {
        report(data, true);
        clearCache();
      }
    });
  });
};

export const Scada = {
  init(options = {}) {
    setConfig(options);
    reportTiming();
    // 进行error的监听
    // error()
    // 性能监听
    // performance()
    // 行为监听
    // behavior();
  },
  // report,
};
