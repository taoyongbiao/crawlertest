import fs from 'fs/promises'; // 使用异步文件操作
import path from 'path';

const DATA_DIR = path.join(__dirname, '../../data');

// 定义 HistoryRecord 类型
interface HistoryRecord {
  id: string; // 数据ID
  timestamp: number; // 时间戳
  description?: string; // 可选描述
}

export class DataStorage {
  constructor() {
    this.ensureDataDirExists();
  }

  private async ensureDataDirExists() {
    try {
      const stats = await fs.stat(DATA_DIR);
      if (!stats.isDirectory()) {
        throw new Error('Data directory exists but is not a directory');
      }
    } catch (error) {
      console.error('Error accessing or creating data directory:', error);
      await fs.mkdir(DATA_DIR, { recursive: true });
    }
  }

  async saveRawData<T>(data: T): Promise<string> {
    const id = Date.now().toString();
    const filePath = path.join(DATA_DIR, `${id}.json`);
    try {
      await fs.writeFile(filePath, JSON.stringify(data));
      return id;
    } catch (error) {
      console.error('Error saving raw data:', error);
      throw error;
    }
  }

  async getRawData<T>(id: string): Promise<T> {
    const filePath = path.join(DATA_DIR, `${id}.json`);
    try {
      const data = await fs.readFile(filePath, 'utf-8');
      return JSON.parse(data) as T;
    } catch (error) {
      console.error('Error reading raw data:', error);
      throw error;
    }
  }

  async saveProcessedData<T>(id: string, data: T): Promise<void> {
    const filePath = path.join(DATA_DIR, `${id}_processed.json`);
    try {
      await fs.writeFile(filePath, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving processed data:', error);
      throw error;
    }
  }

  getResultPath(id: string): string {
    return path.join(DATA_DIR, `${id}_processed.json`);
  }

  // 获取历史记录
  async getHistory(): Promise<HistoryRecord[]> {
    try {
      // 假设历史记录存储在 localStorage 中
      const historyData = localStorage.getItem('history');
      if (historyData) {
        return JSON.parse(historyData) as HistoryRecord[];
      }
      return [];
    } catch (error) {
      console.error('读取历史记录失败:', error);
      return [];
    }
  }
}
