import {News} from '../entities';
import {NewsRepository} from '../repositories';

export class NewsService {
  private repo: NewsRepository;

  constructor(repo: NewsRepository) {
    this.repo = repo;
  }
  getNews(sectionIndex: number): Promise<News> {
    return this.repo.getNews(sectionIndex);
  }
}
