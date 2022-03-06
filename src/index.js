import { setConfig } from './utils/config';
import { hiddenEvent } from './utils/utils';
import { report } from './utils/report';
import { getCache, clearCache } from './utils/cache';
import { handleError } from './error';

function Scada(options = {}) {
  initScada(options);
  this.report = report;
}

function initScada(options) {
  setConfig(options);
  reportTiming();
  // 进行error的监听
  handleError();
  // 性能监听
  // performance()
  // 行为监听
  // behavior();
}

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

export default Scada;
