import {logger} from '../../config';
import {NewsService, urlTitle} from '../../domain';
import {
  GET_NEWS_CACHE,
  GET_NEWS_DONE,
  GET_NEWS_FAIL,
  GET_NEWS_TODO,
  SELECT_NEWS_INDEX,
} from './news-types';
import {NewsRepositoryImpl} from '../../data';

/*
 * action creators
 */
export const getNewsTodo = indexSelected => ({
  type: GET_NEWS_TODO,
  payload: indexSelected,
});
export const getNewsCache = data => ({type: GET_NEWS_CACHE, payload: data});
export const getNewsDone = data => ({type: GET_NEWS_DONE, payload: data});
export const getNewsFail = error => ({type: GET_NEWS_FAIL, payload: error});

export const selectNewsIndex = indexSelected => ({
  type: SELECT_NEWS_INDEX,
  payload: indexSelected,
});

/**
 * async action
 */
const service = new NewsService(new NewsRepositoryImpl());
export const fetchNews = indexSelected => async dispatch => {
  try {
    logger(`sectionIndex:`, indexSelected);
    dispatch(selectNewsIndex(indexSelected));
    dispatch(getNewsTodo(indexSelected));
    const key = urlTitle[indexSelected];
    const response = await service.getNews(indexSelected);
    logger('thunk - fetchNews: ', response);
    dispatch(getNewsDone({key: key, data: response}));
  } catch (error) {
    logger('thunk - fetchNews: ', error);
    dispatch(getNewsFail(error));
  }
};
