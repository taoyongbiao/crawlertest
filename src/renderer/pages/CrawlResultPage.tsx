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

  useEffect(() => {
    const { url, keywords } = location.state || {};
    if (url && keywords) {
      const crawler = new CrawlerManager();
      crawler
        .startCrawl(url, keywords)
        .then((data) => {
          setResults(data.results);
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
    <div>
      <h1>爬取结果</h1>
      <table>
        <thead>
          <tr>
            <th>关键词</th>
            <th>出现次数</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, index) => (
            <tr key={index}>
              <td>{result.keyword}</td>
              <td>{result.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleProcess}>提交AI处理</button>
    </div>
  );
}

export default CrawlResultPage;
