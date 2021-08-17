export interface News {
  items?: [NewsItems];
  title?: string;
  pubDate?: string;
  generator?: string;
  link?: string;
}

export interface NewsItems {
  title?: string;
  link?: string;
  pubDate?: string;
  content?: string;
  contentSnippet?: string;
  guid?: string;
  isoDate?: string;
}
