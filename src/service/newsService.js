import {urlBase} from '.';
import {get} from './httpClient';

export const getNewsService = sectionIndex => {
  return get(urlBase[sectionIndex]);
};
