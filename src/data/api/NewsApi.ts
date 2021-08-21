import { News, RssPack } from '../../domain';
import { get, post } from './request';

export function getRss(source: string): Promise<RssPack> {
  const query =
    source === '' ? { limit: 20, page: 1 } : { limit: 20, page: 1, source };
  return get('/news/feed', query);
}

export function getNewsFeed(proxy: string): Promise<News> {
  return post('/news/feed', { proxy });
}

export function getFeedSource(): Promise<[string]> {
  return get('/news/feed/source');
}
