//export { fetchNews as fetchNews } from "./observable";

export {fetchNews} from './middleware/thunk';
export {getNewsFail, selectNewsIndex} from '../action/news';
