import { News, Rss } from '../../domain';
import { get, post } from './request';

export function getEditorRss(source: string): Promise<Rss[]> {
  return get('/news/rss/editor', { source: source === '' ? undefined : source });
}

export function getNewsFeed(proxy: string): Promise<News> {
  return post('/news/feed', { proxy });
}

export function getFeedSource(): Promise<[string]> {
  return get('/news/source');
}
