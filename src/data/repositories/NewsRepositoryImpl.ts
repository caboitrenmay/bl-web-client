import {News, urlBase} from '../../domain';
import {NewsRepository} from '../../domain';
import {get} from '../httpClient';

export class NewsRepositoryImpl implements NewsRepository {
  getNews(sectionIndex: number): Promise<News> {
    return get(urlBase[sectionIndex]);
  }
}
