import path from 'path';
import { fileURLToPath } from 'url';

export const __dirname = path.dirname(fileURLToPath(import.meta.url)); //是 ES 模块的一个元属性，返回当前模块的 URL 字符串 file:///C:/Users/tao.yongbiao/Desktop/crawlertest/src/main/util.ts
// 通过 fileURLToPath 将 URL 转换为文件路径
//path.dirname 是 Node.js path 模块中的一个方法，用于获取路径的目录部分。

export function resolveHtmlPath(htmlFileName: string) {
  if (process.env['NODE_ENV'] === 'development') {
    // 如果是开发环境则在本地服务器上访问
    // 使用索引访问
    const port = process.env['PORT'] || 3000; // 同理处理 PORT
    return `http://localhost:${port}/${htmlFileName}`;
  }
  // console.log('__dirname', __dirname);
  // console.log(
  //   '__filedir',
  //   `file://${path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..', 'dist', 'preload.js').replace(/\\/g, '/')}`
  // );
  return `file://${path.resolve(__dirname, '..', '..', 'dist', htmlFileName).replace(/\\/g, '/')}`;
  //如果是生产环境则在 dist 目录下访问
}
