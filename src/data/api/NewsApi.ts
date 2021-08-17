import { News, RssPack } from '../../domain';
import { get, post } from './request';

export function getRss(): Promise<RssPack> {
  return get('/news/feed', { limit: 20, page: 1 });
}

export function getNewsFeed(proxy: string): Promise<News> {
  return post('/news/feed', { proxy });
}
