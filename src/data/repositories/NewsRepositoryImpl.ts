import { News, NewsRepository, RssPack } from '../../domain';
import { getNewsFeed, getRss } from '../api';

export class NewsRepositoryImpl implements NewsRepository {
  getRssEditorChoice(): Promise<RssPack> {
    return getRss();
  }
  getNews(url: string): Promise<News> {
    return getNewsFeed(url);
  }
}
