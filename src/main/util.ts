import path from 'path';
import { fileURLToPath } from 'url';

export const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function resolveHtmlPath(htmlFileName: string) {
  if (process.env['NODE_ENV'] === 'development') {
    // 使用索引访问
    const port = process.env['PORT'] || 1212; // 同理处理 PORT
    return `http://localhost:${port}/dist/${htmlFileName}`;
  }
  return `file://${path.resolve(__dirname, '..', '..', 'dist', htmlFileName)}`;
}
