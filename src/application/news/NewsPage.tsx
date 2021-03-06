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
  const selected = useAppSelector(selectNewsSelected);
  const loaded = useAppSelector(selectNewsDone);
  const err = useAppSelector(selectNewsErr);
  const sources = useAppSelector(selectRssSources);
  // get dispatcher
  const dispatch = useAppDispatch();

  // local state
  const [currentSource, setCurrentSource] = useState('');
  const [width, setWidth] = useState(0);

  useEffect(() => {
    console.log('=> effect selected: ', selected);
    if (
      rssPack &&
      rssPack.results &&
      rssPack.results.length > 0 &&
      selected === ''
    ) {
      handleClickSection(rssPack.results[0]);
    }
    return () => {
      console.log('clean up selected: ', selected);
    };
  }, [rssPack]);

  useEffect(() => {
    dispatch(fetchSources());
    console.log('=> effect selected: ', currentSource);
    dispatch(fetchRssPack(currentSource));
  }, [currentSource]);

  const closeNav = () => {
    setWidth(0);
  };
  const openNav = () => {
    setWidth(250);
  };

  const handleClickSection = (rss: Rss) => {
    try {
      window.scroll({ top: 0, left: 0, behavior: 'smooth' });
      return dispatch(fetchNews(rss));
    } catch (e) {
      console.log(e);
    }
  };

  const pickSourceHandler = (pickSource: string) => {
    console.log('setSource: ', pickSource);
    setCurrentSource(pickSource);
  };

  if (rssPack === null) return null;

  let items: NewsItems[] = [];
  let generator = '';
  if (newsValue && newsValue[selected]) {
    items = newsValue[selected].items || [];
    generator = newsValue[selected].generator || '';
  }
  console.log('items news:', items);

  const sourcesUi = sources ? ['', ...sources] : [''];

  return (
    <AppWrapper loaded={loaded}>
      <div id="mySidenav" className="sidenav" style={{ width: width }}>
        <a href="javascript:void(0)" className="closebtn" onClick={closeNav}>
          ??
        </a>
        {sourcesUi.map(v => (
          <a
            key={v}
            href="javascript:void(0)"
            onClick={() => {
              closeNav();
              pickSourceHandler(v);
            }}
            className={currentSource === v ? 'active' : ''}
          >
            {v === '' ? '????? xu???t' : v}
          </a>
        ))}
      </div>
      <Header
        currentSource={currentSource}
        results={rssPack.results}
        selected={selected}
        handleClick={handleClickSection}
        handleSource={openNav}
      />
      <main role="main">
        {items.length === 0 ? (
          <div className="container h-100 d-flex justify-content-center">
            <div className="my-auto container-loading">
              {!loaded ? <GrowingFullSpinner /> : null}
              {err ? (
                <h1 className="display-3">C?? l???i x???y ra, vui l??ng th??? l???i!</h1>
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
