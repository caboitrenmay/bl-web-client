import {logger, ERROR_CONNECTION, CORS_PROXY} from './config';
import Parser from 'rss-parser';

export const get = async urlFull => {
  try {
    let parser = new Parser();
    const feed = await parser.parseURL(CORS_PROXY + urlFull);
    console.log(feed.title);

    logger(`GET: ${urlFull}. Result: `, feed);
    return feed;
  } catch (err) {
    logger(`GET: ${urlFull}. Error: `, err);
    return ERROR_CONNECTION(urlFull, err);
  }
};
