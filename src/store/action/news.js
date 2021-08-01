/*
 * action types
 */
export const GET_NEWS_TODO = 'GET_NEWS_TODO';
export const GET_NEWS_DONE = 'GET_NEWS_DONE';
export const GET_NEWS_FAIL = 'GET_NEWS_FAIL';
export const GET_NEWS_CANCEL = 'GET_NEWS_CANCEL';
export const GET_NEWS_CACHE = 'GET_NEWS_CACHE';

export const SELECT_NEWS_INDEX = 'SELECT_NEWS_INDEX';

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
