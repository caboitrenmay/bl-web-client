import { News, RssPack } from '../entities';

export interface NewsRepository {
  getRssEditorChoice(): Promise<RssPack>;
  getNews(url: string): Promise<News>;
}
