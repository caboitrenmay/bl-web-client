import { News, NewsRepository, Rss } from '../../domain';
import { getEditorRss, getFeedSource, getNewsFeed } from '../api';

export class NewsRepositoryImpl implements NewsRepository {
  getRssEditorChoice(source: string): Promise<Rss[]> {
    return getEditorRss(source);
  }

  getNews(url: string): Promise<News> {
    return getNewsFeed(url);
  }

  getSources(): Promise<[string]> {
    return getFeedSource();
  }
}
