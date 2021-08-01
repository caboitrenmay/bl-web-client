import {getNewsService} from '../../../../service/webService';
import * as newsAction from '../../news';
/**
 * async action
 */
export const fetchNews = sectionIndex => newsAction.getNewsTodo(sectionIndex);
export const fetchNewsEpic = $action =>
  $action.ofType(newsAction.GET_NEWS_TODO).mergeMap(action =>
    getNewsService(action.payload)
      .map(response => newsAction.getNewsDone(response))
      .takeUntil($action.ofType(newsAction.GET_NEWS_CANCEL)),
  );
