import { contextBridge, ipcRenderer } from 'electron';

// 定义处理后的数据类型
interface ProcessedData {
  title: string;
  links: string[];
  contentPreview: string;
  // 可根据实际结构扩展字段
}

// 暴露 Node.js API 给渲染进程
contextBridge.exposeInMainWorld('appApi', {
  //'electron' 是一个命名空间字符串。渲染进程中将通过 window.electron 访问被暴露的功能。
  fs: {
    readFile: async (path: string): Promise<string> => await ipcRenderer.invoke('read-file', path),
    writeFile: async (path: string, data: string): Promise<void> =>
      await ipcRenderer.invoke('write-file', path, data),
  },
  crawler: {
    /**
     * 启动爬虫任务
     * @param url - 要爬取的网址
     * @param keywords - 关键词列表
     * @returns 数据 ID
     */
    startCrawl: async (url: string, keywords: string[]): Promise<string> => {
      return await ipcRenderer.invoke('start-crawl', { url, keywords });
    },

    /**
     * 处理爬取到的数据
     * @param dataId - 数据唯一标识
     * @returns 处理后的数据
     */
    processData: async (dataId: string): Promise<ProcessedData> => {
      return await ipcRenderer.invoke('process-data', dataId);
    },

    /**
     * 打开结果文件
     * @param dataId - 数据唯一标识
     */
    openResult: async (dataId: string): Promise<void> => {
      return await ipcRenderer.invoke('open-result', dataId);
    },
  },
});
