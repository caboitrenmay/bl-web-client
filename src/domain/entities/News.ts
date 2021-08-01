export interface News {
  items?: [NewsItems];
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

export const urlBase = [
  // trang chu
  'https://www.nguoiduatin.vn/trang-chu.rss',

  // thoi su viet nam js false
  'https://vietnamnet.vn/rss/thoi-su.rss',

  // thoi su the gioi js false
  'https://thanhnien.vn/rss/the-gioi.rss',

  // kinh doanh
  'https://vnexpress.net/rss/kinh-doanh.rss',
  // "https://vietnamnet.vn/rss/kinh-doanh.rss",

  // giai tri js false
  'https://vietnamnet.vn/rss/giai-tri.rss',

  //the thao
  'https://vnexpress.net/rss/the-thao.rss',

  // cong nghe
  'https://trainghiemso.vn/feed/',

  // js false
  'https://nld.com.vn/suc-khoe.rss',

  // js false
  'https://thanhnien.vn/rss/giao-duc.rss',

  'https://vnexpress.net/rss/oto-xe-may.rss',
  // js false
  'https://www.doisongphapluat.com/rss/phap-luat.rss',
];

export const urlTitle = [
  'Trang chủ',
  'Việt Nam',
  'Thế giới',

  'Kinh doanh',
  'Giải trí',
  'Thể thao',

  'Công nghệ',
  'Sức khoẻ',
  'Giáo dục',

  'Xe',
  'Pháp luật',
];