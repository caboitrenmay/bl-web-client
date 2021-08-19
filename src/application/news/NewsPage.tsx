import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../config';
import { NewsItems, Rss } from '../../domain';
import AppWrapper from '../component/AppWrapper';
import { GrowingFullSpinner } from '../component/Spinner';
import { Header } from './NewsHeader';
import { Main } from './NewsMain';
import './NewsPage.css';
import {
  fetchNews,
  fetchRssPack,
  selectNewsDone,
  selectNewsErr,
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
  const err = useAppSelector(selectNewsErr);
  // get dispatcher
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log('=> effect selected: ', selected);
    return () => {
      console.log('clean up selected: ', selected);
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
      <main role="main">
        {items.length === 0 ? (
          <div className="container h-100 d-flex justify-content-center">
            <div className="my-auto container-loading">
              {!loaded ? (
                <GrowingFullSpinner />
              ) : (
                <h1 className="display-3">{err?.message}</h1>
              )}
            </div>
          </div>
        ) : (
          <Main items={items} />
        )}
      </main>
    </AppWrapper>
  );
}
