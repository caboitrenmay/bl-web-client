import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../config';
import { NewsItems, Rss } from '../../domain';
import AppWrapper from '../component/AppWrapper';
import { Header } from './NewsHeader';
import { Main } from './NewsMain';
import './NewsPage.css';
import {
  fetchNews,
  fetchRssPack,
  selectNewsDone,
  selectNewsSelected,
  selectNewsValue,
  selectRssPack,
} from './newsSlice';

export default function NewsPage() {
  // map state to props
  const rssPack = useAppSelector(selectRssPack);
  const newsValue = useAppSelector(selectNewsValue);
  const selected = useAppSelector(selectNewsSelected);
  const loaded = useAppSelector(selectNewsDone);
  // get dispatcher
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log('=> effect selected: ', selected);
    return () => {
      console.log('clean up indexSelected: ', selected);
    };
  }, [selected]);

  useEffect(() => {
    if (rssPack === null) {
      dispatch(fetchRssPack());
    } else {
      if (rssPack.results.length > 0 && selected === '') {
        handleClickSection(rssPack.results[0]);
      }
    }
  }, [rssPack]);

  const handleClickSection = (rss: Rss) => {
    try {
      window.scroll({ top: 0, left: 0, behavior: 'smooth' });
      return dispatch(fetchNews(rss));
    } catch (e) {
      console.log(e);
    }
  };

  if (rssPack === null) return null;

  let items: NewsItems[] = [];
  if (newsValue && newsValue[selected]) {
    items = newsValue[selected].items || [];
  }
  console.log('items news:', items);

  return (
    <AppWrapper loaded={loaded}>
      <Header
        results={rssPack.results}
        selected={selected}
        handleClick={handleClickSection}
      />
      <Main items={items} />
    </AppWrapper>
  );
}
