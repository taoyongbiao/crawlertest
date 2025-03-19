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
    <div>
      <h1>网页爬取</h1>
      <div>
        <label>URL:</label>
        <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
      </div>
      <div>
        <label>关键词（逗号分隔）:</label>
        <input type="text" value={keywords} onChange={(e) => setKeywords(e.target.value)} />
      </div>
      <button onClick={handleSubmit}>开始爬取</button>
    </div>
  );
}

export default HomePage;
