// 定义 HistoryRecord 类型
interface HistoryRecord {
  id: string; // 数据ID
  timestamp: number; // 时间戳
  description?: string; // 可选描述
}

export class DataStorage {
  constructor() {}

  async saveRawData<T>(data: T): Promise<string> {
    const id = Date.now().toString();
    const key = `rawData_${id}`;
    try {
      localStorage.setItem(key, JSON.stringify(data));
      return id;
    } catch (error) {
      console.error('Error saving raw data:', error);
      throw error;
    }
  }

  async getRawData<T>(id: string): Promise<T> {
    const key = `rawData_${id}`;
    try {
      const data = localStorage.getItem(key);
      if (data) {
        return JSON.parse(data) as T;
      }
      throw new Error('Data not found');
    } catch (error) {
      console.error('Error reading raw data:', error);
      throw error;
    }
  }

  async saveProcessedData<T>(id: string, data: T): Promise<void> {
    const key = `processedData_${id}`;
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving processed data:', error);
      throw error;
    }
  }

  getResultPath(id: string): string {
    return `processedData_${id}`;
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
