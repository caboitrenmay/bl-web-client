import {NewsRepositoryImpl} from '../../data';
import {NewsService, urlTitle} from '../../domain';
import {
  GET_NEWS_DONE,
  GET_NEWS_FAIL,
  GET_NEWS_TODO,
  SELECT_NEWS_INDEX,
} from './news-types';

/*
 * action creators
 */
export const getNewsTodo = indexSelected => ({
  type: GET_NEWS_TODO,
  payload: indexSelected,
});
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
    console.log(`sectionIndex:`, indexSelected);
    dispatch(getNewsTodo(indexSelected));
    const key = urlTitle[indexSelected];
    const news = await service.getNews(indexSelected);
    console.log('thunk - fetchNews: ', news);
    dispatch(getNewsDone({key: key, data: news}));
  } catch (error) {
    console.error('thunk - fetchNews: ', error);
    dispatch(getNewsFail(error));
  }
};
