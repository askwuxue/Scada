export interface IConstantMap {
  [index: number]: string;
}

// 自定义检测函数, 判断是否需要报告该错误;
export interface ICheckErrorNeedReport {
  (desc: string, stack: string): boolean;
}

interface IGetPageType {
  (location: Location): string;
}

export interface IJSErrReportConfig {
  // js运行时报错 true
  ERROR_RUNTIME: boolean;
  // js资源加载失败 true
  ERROR_SCRIPT: boolean;
  // css资源加载失败 true
  ERROR_STYLE: boolean;
  // 图片资源加载失败 true
  ERROR_IMAGE: boolean;
  // 音频资源加载失败 true
  ERROR_AUDIO: boolean;
  // 视频资源加载失败 true
  ERROR_VIDEO: boolean;
  // vue运行时报错 true
  ERROR_CONSOLE: boolean;
  // 未catch错误 true
  ERROR_TRY_CATCH: boolean;
  // 自定义检测函数, 判断是否需要报告该错误
  checkErrorNeedReport: ICheckErrorNeedReport;
}

// 上报数据配置
export interface IRecord {
  // 是否监控用户在线时长数据
  time_on_page: boolean;
  // 是否监控页面载入性能, 默认为true
  performance: boolean;
  //  是否监控页面报错信息, 默认为true
  js_error: boolean;
  // 配置需要监控的页面报错类别, 仅在js_error为true时生效, 默认均为true(可以将配置改为false, 以屏蔽不需要上报的错误类别)
  js_error_report_config: IJSErrReportConfig;
}

export interface IConfig {
  // 项目id, 由灯塔项目组统一分配
  pid: string;
  // 设备唯一id, 用于计算uv数&设备分布. 一般在cookie中可以取到, 没有uuid可用设备mac/idfa/imei替代. 或者在storage的key中存入随机数字, 模拟设备唯一id.
  uuid?: string;
  // 用户ucid, 用于发生异常时追踪用户信息, 一般在cookie中可以取到, 没有可传空字符串
  ucid?: string;
  // 是否为测试数据, 默认为false(测试模式下打点数据仅供浏览, 不会展示在系统中)
  is_test: false;
  record: IRecord;

  // 业务方的js版本号, 会随着打点数据一起上传, 方便区分数据来源
  // 可以不填, 默认为1.0.0
  version: string;

  // 对于如同
  // test.com/detail/1.html
  // test.com/detail/2.html
  // test.com/detail/3.html
  // ...
  // 这种页面来说, 虽然url不同, 但他们本质上是同一个页面
  // 因此需要业务方传入一个处理函数, 根据当前url解析出真实的页面类型(例如: 二手房列表/经纪人详情页), 以便灯塔系统对错误来源进行分类
  // getPageType函数执行时会被传入一个location对象, 业务方需要完成该函数, 返回对应的的页面类型(50字以内, 建议返回汉字, 方便查看), 默认是返回当前页面的url
  getPageType: IGetPageType;
}
