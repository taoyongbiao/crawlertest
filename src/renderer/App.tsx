// 导入React和React Router
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// 导入页面组件
import HomePage from './pages/HomePage.tsx';
import CrawlResultPage from './pages/CrawlResultPage.tsx';
import AIProcessPage from './pages/AIProcessPage.tsx';
import HistoryPage from './pages/HistoryPage.tsx';

// 添加样式导入
import './App.css'; // 假设样式文件为 App.css

function App() {
  return (
    <BrowserRouter>
      <div className="app-container flex">
        <div className="sidebar w-64 bg-gray-800 text-white p-4 md:w-1/4">
          {/* Sidebar content will go here */}
          <nav>
            <ul>
              <li>
                <a href="/" className="block py-2 px-4 hover:bg-gray-700">
                  Home
                </a>
              </li>
              <li>
                <a href="/crawl-result" className="block py-2 px-4 hover:bg-gray-700">
                  Crawl Result
                </a>
              </li>
              <li>
                <a href="/ai-result" className="block py-2 px-4 hover:bg-gray-700">
                  AI Process
                </a>
              </li>
              <li>
                <a href="/history" className="block py-2 px-4 hover:bg-gray-700">
                  History
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="mainpane flex-1 p-4 md:p-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/crawl-result" element={<CrawlResultPage />} />
            <Route path="/ai-result" element={<AIProcessPage />} />
            <Route path="/history" element={<HistoryPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
