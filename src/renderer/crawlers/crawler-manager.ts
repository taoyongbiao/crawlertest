// crawler-manager.ts
import { Crawler, CrawlResults } from '../crawlers/crawler.ts';

export class CrawlerManager {
  private crawlers: Crawler[] = [];

  createCrawler(url: string, keywords: string[]): Crawler {
    const newCrawler = new Crawler(url, keywords);
    this.crawlers.push(newCrawler);
    return newCrawler;
  }

  getCrawlers(): Crawler[] {
    return this.crawlers;
  }

  getCrawlerById(id: string): Crawler | undefined {
    return this.crawlers.find((crawler) => crawler.id === id);
  }

  deleteCrawler(id: string): boolean {
    const index = this.crawlers.findIndex((crawler) => crawler.id === id);
    if (index !== -1) {
      this.crawlers.splice(index, 1);
      return true;
    }
    return false;
  }

  async startCrawl(url: string, keywords: string[]): Promise<CrawlResults> {
    const newCrawler = this.createCrawler(url, keywords);
    return await newCrawler.startCrawl(); // 此处类型已匹配
  }
}
