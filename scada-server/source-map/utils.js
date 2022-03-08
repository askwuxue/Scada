const fs = require('fs');
const path = require('path');
const sourceMap = require('source-map');

function resolve(url) {
  return path.resolve(__dirname, url);
}

// 获取.map文件内容
function getMapFileContent(url) {
  return fs.readFileSync(
    resolve(`./maps/${url.split('/').pop()}.map`),
    'utf-8',
  );
}

function format(item) {
  return item.replace(/(\.\/)*/g, '');
}

async function mapToSource(error) {
  const mapObj = JSON.parse(getMapFileContent(error.url));
  const consumer = await new sourceMap.SourceMapConsumer(mapObj);
  // 将 webpack://source-map-demo/./src/index.js 文件中的 ./ 去掉
  const sources = mapObj.sources.map((item) => format(item));
  // 根据压缩后的报错信息得出未压缩前的报错行列数和源码文件
  const originalInfo = consumer.originalPositionFor({
    line: error.line,
    column: error.column,
  });
  // sourcesContent 中包含了各个文件的未压缩前的源码，根据文件名找出对应的源码
  const originalFileContent =
    mapObj.sourcesContent[sources.indexOf(originalInfo.source)];
  return {
    file: originalInfo.source,
    content: originalFileContent,
    line: originalInfo.line,
    column: originalInfo.column,
    msg: error.msg,
    error: error.error,
  };
}

module.exports = { mapToSource };
