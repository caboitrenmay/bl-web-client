import React, { useEffect, useState } from 'react';
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
  fetchSources,
  selectNewsDone,
  selectNewsErr,
  selectNewsSelected,
  selectNewsValue,
  selectRssPack,
  selectRssSources,
} from './newsSlice';

export default function NewsPage() {
  // map state to props
  const rssPack = useAppSelector(selectRssPack);
  const newsValue = useAppSelector(selectNewsValue);
  const rssSelected = useAppSelector(selectNewsSelected);
  const loaded = useAppSelector(selectNewsDone);
  const err = useAppSelector(selectNewsErr);
  const sources = useAppSelector(selectRssSources);
  // get dispatcher
  const dispatch = useAppDispatch();

  // local state
  const [currentSource, setCurrentSource] = useState('');
  const [width, setWidth] = useState(0);

  useEffect(() => {
    console.log('>>> useEffect rssPack: ', rssPack);
    if (
      rssPack &&
      rssPack.length > 0 &&
      rssSelected === ''
    ) {
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
    // Lấy source 1 lần
    if (!sources) {
       dispatch(fetchSources());
    }

    dispatch(fetchRssPack(currentSource));
  }, [currentSource]);

  const closeNav = () => {
    setWidth(0);
  };
  const openNav = () => {
    setWidth(250);
  };

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

  const pickSourceHandler = (pickSource: string) => {
    console.log('>> setSource: ', pickSource);
    setCurrentSource(pickSource);
  };

  if (rssPack === null) return null;

  let items: NewsItems[] = [];
  let generator = '';
  if (newsValue && newsValue[rssSelected]) {
    items = newsValue[rssSelected].items || [];
    generator = newsValue[rssSelected].generator || '';
  }

  const sourcesUi = sources ? ['', ...sources] : [''];

  return (
    <AppWrapper loaded={loaded}>
      <div id="mySidenav" className="sidenav" style={{ width: width }}>
        <a href="#!" className="closebtn" onClick={closeNav}>
          ×
        </a>
        {sourcesUi.map(v => (
          <a
            key={v}
            href="#!"
            onClick={() => {
              closeNav();
              pickSourceHandler(v);
            }}
            className={currentSource === v ? 'active' : ''}
          >
            {v === '' ? 'Đề xuất' : v}
          </a>
        ))}
      </div>
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
