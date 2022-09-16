import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../config';
import { NewsItems, Rss } from '../../domain';
import AppWrapper from '../component/AppWrapper';
import { GrowingFullSpinner } from '../component/Spinner';
import { Header } from './NewsHeader';
import { Main } from './NewsMain';
import './NewsPage.css';
import {
  fetchNews, fetchRssPack, selectNewsDone,
  selectNewsErr,
  selectNewsSelected,
  selectNewsValue,
  selectRssPack
} from './newsSlice';

export default function NewsScreen({
  currentSource,
  openNav,
}: {
  currentSource: string;
  openNav: () => void;
}) {
  // map state to props
  const rssPack = useAppSelector(selectRssPack);
  const newsValue = useAppSelector(selectNewsValue);
  const rssSelected = useAppSelector(selectNewsSelected);
  const loaded = useAppSelector(selectNewsDone);
  const err = useAppSelector(selectNewsErr);

  // get dispatcher
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log('>>> useEffect rssPack: ', rssPack);
    if (rssPack && rssPack.length > 0 && rssSelected === '') {
      // Chọn section đầu tiên trong bộ rss pack
      handleClickSection(rssPack[0]);
    }
    return () => {
      console.log('useEffect rssPack clean up: ', rssPack);
    };
  }, [rssPack]);

  // dispatch mỗi lần change currentSource
  useEffect(() => {
    console.log('>>> useEffect currentSource: ', currentSource);
    dispatch(fetchRssPack(currentSource));
  }, [currentSource]);

  // dispatch lấy news feed
  const handleClickSection = (rss: Rss) => {
    try {
      // scroll lên đầu trang
      window.scroll({ top: 0, left: 0, behavior: 'smooth' });
      return dispatch(fetchNews(rss));
    } catch (e) {
      console.log(e);
    }
  };

  if (rssPack === null) return null;

  let items: NewsItems[] = [];
  let generator = '';
  if (newsValue && newsValue[rssSelected]) {
    items = newsValue[rssSelected].items || [];
    generator = newsValue[rssSelected].generator || '';
  }

  return (
    <AppWrapper loaded={loaded}>
      <Header
        currentSource={currentSource}
        results={rssPack}
        selected={rssSelected}
        handleClick={handleClickSection}
        handleSource={openNav}
      />
      <main role="main">
        {items.length === 0 ? (
          <div className="container h-100 d-flex justify-content-center">
            <div className="my-auto container-loading">
              {!loaded ? <GrowingFullSpinner /> : null}
              {err ? (
                <h1 className="display-3">Có lỗi xảy ra, vui lòng thử lại!</h1>
              ) : null}
            </div>
          </div>
        ) : (
          <Main source={generator} items={items} />
        )}
      </main>
    </AppWrapper>
  );
}
