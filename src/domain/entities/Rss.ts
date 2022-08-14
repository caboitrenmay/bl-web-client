export interface Rss {
  active: boolean;
  editorChoice: boolean;
  name: string;
  url: string;
  source: string;
  id: string;
}

export interface RssPack {
  results: Rss[];
  page: number;
  limit: number;
  totalPages: number;
  totalResults: number;
}
