import logger from '../../../../helper/logger';
import { getNewsService, urlTitle } from '../../../../service';
import * as newsAction from '../../news';

/**
 * async action 
 */
export const fetchNews = (indexSelected) => async dispatch => {
    try {
        //const sectionIndex = urlTitle.indexOf(section)
        logger(`sectionIndex:`, indexSelected)
        dispatch(newsAction.selectNewsIndex(indexSelected))
        dispatch(newsAction.getNewsTodo(indexSelected))
        const key = urlTitle[indexSelected]
        //const news = JSON.parse(localStorage.getItem(key));
        //dispatch(newsAction.getNewsCache(news))
        const response = await getNewsService(indexSelected)
        //localStorage.setItem(key, JSON.stringify({'key': key, 'data': response}))
        logger("thunk - fetchNews: ", response)
        dispatch(newsAction.getNewsDone({'key': key, 'data': response}))
    } catch (error) {
        logger("thunk - fetchNews: ", error)
        dispatch(newsAction.getNewsFail(error))
    }
}