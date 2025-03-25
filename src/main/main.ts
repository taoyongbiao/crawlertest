// 修复 'prettier/prettier' 规则未找到的问题，需要确保项目中安装了 Prettier 和 ESLint 插件
// 可以通过以下命令安装：npm install --save-dev prettier eslint-plugin-prettier eslint-config-prettier
import { app, BrowserWindow, ipcMain, shell } from 'electron';
import path from 'path';
import { resolveHtmlPath } from './util.ts'; // 统一使用 .ts 扩展名
import { CrawlerManager } from '../renderer/crawlers/crawler-manager.ts'; // 统一使用 .ts 扩展名
import { DataStorage } from '../renderer/storage/data-storage.ts'; // 统一使用 .ts 扩展名
import { AIProcessor } from '../renderer/ai/ai-processor.ts'; // 统一使用 .ts 扩展名

let mainWindow: BrowserWindow | null = null;

const createWindow = async () => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

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
}); // 插入换行符后，这里可以根据实际情况添加代码逻辑，例如在 macOS 系统下，当所有窗口关闭时，如果应用程序还在激活状态，可以添加一些清理逻辑
if (process.platform === 'darwin') {
  app.on('will-quit', () => {
    // 可以在这里添加清理逻辑，例如关闭数据库连接等
  });
}
