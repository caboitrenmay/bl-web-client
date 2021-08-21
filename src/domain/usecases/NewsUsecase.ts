import { News, RssPack } from '../entities';
import { NewsRepository } from '../repositories';

export class NewsUsecase {
  private repo: NewsRepository;

  constructor(repo: NewsRepository) {
    this.repo = repo;
  }

  getRssEditorChoice(source: string): Promise<RssPack> {
    return this.repo.getRssEditorChoice(source);
  }

  getNews(url: string): Promise<News> {
    return this.repo.getNews(url);
  }

  getSources(): Promise<[string]> {
    return this.repo.getSources();
  }
}
