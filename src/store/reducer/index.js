import { GET_NEWS_CACHE, GET_NEWS_DONE, GET_NEWS_TODO, SELECT_NEWS_INDEX } from "../action/news";

const initState = () => ({
    done: true,
    indexSelected: -1,
    news: []
})

function todos(state, action) {
    if (!state) {
        state = initState()
        //localStorage.clear()
    }
    switch (action.type) {
        case GET_NEWS_TODO:
            return {
                ...state, done: false
            }
        case GET_NEWS_CACHE:
            if (action.payload && action.payload.key && action.payload.data) {
                state.news[action.payload.key] = action.payload.data
            }
            return {
                ...state, done: false
            }
        case GET_NEWS_DONE:
            if (action.payload && action.payload.key && action.payload.data) {
                state.news[action.payload.key] = action.payload.data
            }
            return {
                ...state, done: true
            }
        case SELECT_NEWS_INDEX:
            return {
                ...state, indexSelected: action.payload
            }
        default:
            return state
    }
}


export default todos