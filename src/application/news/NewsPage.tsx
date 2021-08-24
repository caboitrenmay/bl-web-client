import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../config';
import { NewsItems, Rss } from '../../domain';
import AppWrapper from '../component/AppWrapper';
import { CommonModal } from '../component/BaseModal';
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

  useEffect(() => {
    console.log('=> effect selected: ', selected);
    if (rssPack && rssPack.results.length > 0 && selected === '') {
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

  return (
    <AppWrapper loaded={loaded}>
      <Header
        currentSource={currentSource}
        results={rssPack.results}
        selected={selected}
        handleClick={handleClickSection}
      />
      <CommonModal
        title="Chọn nguồn cấp tin tức"
        sources={sources}
        currentSource={currentSource}
        pickSource={pickSourceHandler}
      />
      {/* {showSource && <CommonModal />} */}
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
