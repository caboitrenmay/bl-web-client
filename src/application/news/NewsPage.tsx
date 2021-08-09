import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../config';
import { NewsItems, urlTitle } from '../../domain';
import AppWrapper from '../component/AppWrapper';
import { Header } from './NewsHeader';
import { Main } from './NewsMain';
import './NewsPage.css';
import {
  fetchNews,
  selectNewsDone,
  selectNewsSelected,
  selectNewsValue,
} from './newsSlice';

export default function NewsPage() {
  // map state to props
  const newsValue = useAppSelector(selectNewsValue);
  const indexSelected = useAppSelector(selectNewsSelected);
  const loaded = useAppSelector(selectNewsDone);
  // get dispatcher
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log('effect indexSelected: ', indexSelected);
    if (indexSelected === -1) {
      dispatch(fetchNews(0));
    }
    return () => {
      console.log('clean up indexSelected: ', indexSelected);
    };
  }, [indexSelected]);

  const handleClickSection = (index: number) => {
    try {
      window.scroll({ top: 0, left: 0, behavior: 'smooth' });
      return dispatch(fetchNews(index));
    } catch (e) {
      console.log(e);
    }
  };

  console.log('index: ', indexSelected);

  const section = urlTitle[indexSelected];
  let items: NewsItems[] = [];
  if (newsValue && newsValue[section]) {
    items = newsValue[section].items || [];
  }
  console.log('items news:', items);

  return (
    <AppWrapper loaded={loaded}>
      <Header {...{ indexSelected, handleClick: handleClickSection }} />
      <Main items={items} />
    </AppWrapper>
  );
}
