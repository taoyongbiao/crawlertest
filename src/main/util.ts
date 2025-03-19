import path from 'path';

export function resolveHtmlPath(htmlFileName: string): string {
  return path.resolve(__dirname, '..', 'renderer', 'html', htmlFileName);
}
