import path from 'path';

export function resolveHtmlPath(htmlFileName: string) {
  if (process.env['NODE_ENV'] === 'development') {
    const port = process.env['PORT'] || 3000;
    return `http://localhost:${port}/${htmlFileName}`;
  }
  // 修改点：将 file:// 改为 file:/// 确保协议部分有三个斜杠
  return `file:///${path.resolve(__dirname, '..', '..', 'dist', htmlFileName).replace(/\\/g, '/')}`;
}
