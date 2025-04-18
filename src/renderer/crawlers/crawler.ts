import { Result } from 'electron';

// crawler.ts
export class Crawler {
  id: string;
  url: string;
  keywords: string[];

  constructor(url: string, keywords: string[]) {
    this.id = `${url}-${keywords.join('-')}`; // 简单生成唯一 ID
    this.url = url;
    this.keywords = keywords;
  }

  async startCrawl(): Promise<CrawlResults> {
    //返回 CrawlResults 对象
    // 模拟爬取逻辑
    const data = await this.fetchData(); // 假设 fetchData 返回爬取的数据
    const metadata = { timestamp: new Date().toISOString(), url: this.url };
    // 将 data 转换为 Result[] 格式
    // const result = data.map((item: unknown) => ({
    //   keyword: item.keyword || '',
    //   count: item.count || 0,
    // }));
    // 创建并初始化 Result[] 数组 有对应接口
    const result: Result[] = [];
    return {
      data,
      metadata,
      result,
    };
  }

  private async fetchData(): Promise<unknown[]> {
    // 模拟异步数据获取
    return new Promise((resolve) => {
      setTimeout(() => resolve([1, 2, 3]), 1000); // 示例数据
    });
  }
}

// 定义 CrawlResults 类型
export interface CrawlResults {
  data: unknown[]; // 使用 unknown 表示类型未知但仍需类型安全
  metadata: Record<string, unknown>; // 同样使用 unknown 确保类型安全
  result: Result[];
}
