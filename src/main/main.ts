import { app, BrowserWindow, ipcMain, shell } from 'electron';
import path from 'path';
// import { fileURLToPath } from 'url';
import { resolveHtmlPath } from './util.ts';
import { CrawlerManager } from '../renderer/crawlers/crawler-manager.ts';
import { DataStorage } from '../renderer/storage/data-storage.ts';
import { AIProcessor } from '../renderer/ai/ai-processor.ts';

let mainWindow: BrowserWindow | null = null;
// const __dirname = path.dirname(fileURLToPath(import.meta.url)); //是 ES 模块的一个元属性，返回当前模块的 URL 字符串 file:///C:/Users/tao.yongbiao/Desktop/crawlertest/src/main/util.ts
// 通过 fileURLToPath 将 URL 转换为文件路径
//path.dirname 是 Node.js path 模块中的一个方法，用于获取路径的目录部分。

const createWindow = async () => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true, //将渲染器进程中的 Node.js 和 Electron API 与网页脚本隔离开
      sandbox: false, // 启用沙箱模式
      preload: path.join(__dirname, 'preload.js'), // 使用绝对路径 相对于主进程的 preload.js的路径
    },
  });
  console.log('__dirname', __dirname);
  console.log('__filedir', `${path.join(__dirname, 'preload.js').replace(/\\/g, '/')}`);

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

// 初始化核心模块
const crawlerManager = new CrawlerManager();
const dataStorage = new DataStorage();
const aiProcessor = new AIProcessor();

// IPC 通信处理
ipcMain.handle('start-crawl', async (event, { url, keywords }) => {
  try {
    const data = await crawlerManager.startCrawl(url, keywords);
    const id = await dataStorage.saveRawData(data);
    return id;
  } catch (error) {
    console.error('Error starting crawl:', error);
    throw error;
  }
});

// 处理数据
ipcMain.handle('process-data', async (event, dataId) => {
  try {
    const rawData = await dataStorage.getRawData(dataId);
    const processedData = await aiProcessor.process(rawData);
    await dataStorage.saveProcessedData(dataId, processedData);
    return processedData;
  } catch (error) {
    console.error('Error processing data:', error);
    throw error;
  }
});

ipcMain.handle('open-result', (event, dataId) => {
  try {
    const resultPath = dataStorage.getResultPath(dataId);
    shell.openPath(resultPath);
  } catch (error) {
    console.error('Error opening result:', error);
    throw error;
  }
});

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (mainWindow === null) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

if (process.platform === 'darwin') {
  app.on('will-quit', () => {
    // 可以在这里添加清理逻辑，例如关闭数据库连接等
  });
}
