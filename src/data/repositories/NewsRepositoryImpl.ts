import { News, NewsRepository, RssPack } from '../../domain';
import { getFeedSource, getNewsFeed, getRss } from '../api';

export class NewsRepositoryImpl implements NewsRepository {
  getRssEditorChoice(source: string): Promise<RssPack> {
    return getRss(source);
  }

  getNews(url: string): Promise<News> {
    return getNewsFeed(url);
  }

  getSources(): Promise<[string]> {
    return getFeedSource();
  }
}
