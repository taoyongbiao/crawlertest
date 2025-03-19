// src/renderer/pages/HistoryPage.tsx
import React, { useEffect, useState } from 'react';
import { DataStorage } from '../storage/data-storage.ts';

// 定义历史记录的接口
interface HistoryRecord {
  timestamp: string;
  url: string;
  keywords: string[];
  results: string;
}

// 定义从 storage 获取的原始记录类型
type RawRecord = {
  timestamp?: unknown;
  url?: unknown;
  keywords?: unknown;
  results?: unknown;
};

function HistoryPage() {
  const [history, setHistory] = useState<HistoryRecord[]>([]);
  const storage = new DataStorage();

  useEffect(() => {
    // 实现获取历史记录的逻辑
    const fetchHistory = async () => {
      try {
        const rawRecords = await storage.getHistory(); // 获取原始数据

        // 确保返回的数据符合 HistoryRecord 类型
        const formattedRecords: HistoryRecord[] = (rawRecords || []).map((record: RawRecord) => {
          return {
            timestamp: typeof record.timestamp === 'string' ? record.timestamp : '',
            url: typeof record.url === 'string' ? record.url : '',
            keywords:
              Array.isArray(record.keywords) &&
              record.keywords.every((item) => typeof item === 'string')
                ? record.keywords
                : [],
            results: typeof record.results === 'string' ? record.results : '',
          };
        });

        setHistory(formattedRecords); // 更新状态
      } catch (error) {
        console.error('获取历史记录失败:', error);
      }
    };

    fetchHistory();
  }, []); // 空依赖数组确保只在组件挂载时执行一次

  return (
    <div>
      <h1>历史记录</h1>
      <table>
        <thead>
          <tr>
            <th>时间</th>
            <th>URL</th>
            <th>关键词</th>
            <th>结果</th>
          </tr>
        </thead>
        <tbody>
          {history.map((record, index) => (
            <tr key={index}>
              <td>{record.timestamp}</td>
              <td>{record.url}</td>
              <td>{record.keywords.join(', ')}</td>
              <td>{record.results}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HistoryPage;
