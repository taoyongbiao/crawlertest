import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const [url, setUrl] = useState('');
  const [keywords, setKeywords] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate('/crawl-result', {
      state: {
        url,
        keywords: keywords.split(',').map((kw) => kw.trim()), // 优化：去除关键词前后空格
      },
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">网页爬取</h1>
      <div className="mb-4 w-full max-w-md">
        <label htmlFor="url" className="block text-sm font-medium text-gray-700">
          URL:
        </label>
        <input
          type="text"
          id="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>
      <div className="mb-6 w-full max-w-md">
        <label htmlFor="keywords" className="block text-sm font-medium text-gray-700">
          关键词（逗号分隔）:
        </label>
        <input
          type="text"
          id="keywords"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>
      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
      >
        开始爬取
      </button>
    </div>
  );
}

export default HomePage;
