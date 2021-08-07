import {News} from '../entities';

export interface NewsRepository {
  getNews(sectionIndex: number): Promise<News>;
}
