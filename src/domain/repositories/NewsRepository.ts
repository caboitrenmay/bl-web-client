import { News, Rss } from '../entities';

export interface NewsRepository {
  getRssEditorChoice(source: string): Promise<Rss[]>;
  getNews(url: string): Promise<News>;
  getSources(): Promise<[string]>;
}
