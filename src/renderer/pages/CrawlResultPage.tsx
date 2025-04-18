import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CrawlerManager } from '../crawlers/crawler-manager.ts';

interface Result {
  keyword: string;
  count: number;
}

function CrawlResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [results, setResults] = useState<Result[]>([]);
  //从 useState 返回的结果中提取当前状态值和更新函数。

  useEffect(() => {
    const { url, keywords } = location.state || {};
    if (url && keywords) {
      const crawler = new CrawlerManager();
      crawler
        .startCrawl(url, keywords)
        .then((data) => {
          setResults(data.result);
        })
        .catch((error) => {
          console.error('Crawl failed:', error);
        });
    }
  }, [location.state]);

  const handleProcess = () => {
    navigate('/ai-result', { state: { results } });
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">爬取结果</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">关键词</th>
            <th className="border border-gray-300 p-2">出现次数</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, index) => (
            <tr key={index}>
              <td className="border border-gray-300 p-2">{result.keyword}</td>
              <td className="border border-gray-300 p-2">{result.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={handleProcess}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
      >
        提交AI处理
      </button>
    </div>
  );
}

export default CrawlResultPage;
