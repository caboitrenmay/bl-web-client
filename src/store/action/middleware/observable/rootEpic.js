import { combineEpics } from 'redux-observable';
import { fetchNewsEpic } from '.';

export default combineEpics(
    fetchNewsEpic
)