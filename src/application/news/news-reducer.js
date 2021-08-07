import {GET_NEWS_DONE, GET_NEWS_FAIL, GET_NEWS_TODO} from './news-types';

const initState = () => ({
  done: true,
  indexSelected: -1,
  news: {},
});

function newsReducer(state, action) {
  if (!state) {
    state = initState();
  }

  const payload = action.payload;
  switch (action.type) {
    case GET_NEWS_TODO:
      return {
        ...state,
        indexSelected: action.payload,
        done: false,
      };
    case GET_NEWS_DONE:
      if (action.payload && action.payload.key && action.payload.data) {
        state.news[action.payload.key] = action.payload.data;
      }
      return {
        ...state,
        done: true,
      };
    case GET_NEWS_FAIL:
      if (action.payload) {
        alert(payload);
      }
      return {
        ...state,
        done: true,
      };
    default:
      return state;
  }
}

export default newsReducer;
