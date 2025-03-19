import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AIProcessor } from '../ai/ai-processor.ts';

// 定义处理结果的接口
interface ProcessResult {
  success: boolean; // 示例字段，根据实际API响应调整
  data?: Record<string, unknown>; // 使用Record<string, unknown>替代any
  message?: string; // 错误信息或其他字段
}

function AIProcessPage() {
  const location = useLocation();
  const [processedData, setProcessedData] = useState<ProcessResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const processData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const { results } = location.state as { results: unknown }; // 明确state类型
        const processor = new AIProcessor();
        const data = await processor.process({ results });
        setProcessedData(data as ProcessResult); // 类型断言
      } catch (err) {
        setError('AI处理失败，请稍后重试');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (location.state && 'results' in location.state) {
      processData();
    } else {
      setError('未接收到有效的处理数据');
    }
  }, [location.state]);

  return (
    <div>
      <h1>AI处理结果</h1>
      {isLoading && <p>正在处理中...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {processedData && <pre>{JSON.stringify(processedData, null, 2)}</pre>}
    </div>
  );
}

export default AIProcessPage;
