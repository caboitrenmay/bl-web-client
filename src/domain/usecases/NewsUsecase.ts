import { News, RssPack } from '../entities';
import { NewsRepository } from '../repositories';

export class NewsUsecase {
  private repo: NewsRepository;

  constructor(repo: NewsRepository) {
    this.repo = repo;
  }

  getRssEditorChoice(): Promise<RssPack> {
    return this.repo.getRssEditorChoice();
  }

  getNews(url: string): Promise<News> {
    return this.repo.getNews(url);
  }
}
