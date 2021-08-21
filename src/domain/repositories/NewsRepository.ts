import { News, RssPack } from '../entities';

export interface NewsRepository {
  getRssEditorChoice(source: string): Promise<RssPack>;
  getNews(url: string): Promise<News>;
  getSources(): Promise<[string]>;
}
