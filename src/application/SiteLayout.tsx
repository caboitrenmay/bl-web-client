import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../config';
import NewsScreen from './news/NewsScreen';
import { fetchSources, selectRssSources } from './news/newsSlice';

export default function SiteLayout() {

  // const params = useParams();
  const location = useLocation()

  // console.log(`>> Page render: `, params);
  console.log(`>> Page render: `, location);

  // get dispatcher
  const dispatch = useAppDispatch();

  // selectors
  const sources = useAppSelector(selectRssSources);

  // local state
  const [width, setWidth] = useState(0);
  const [currentSource, setCurrentSource] = useState(location.pathname.replace('/', ''));


  // MARK: Effect Khi home start lấy source.
  useEffect(() => {
    console.log('>>> Home useEffect sources: ', sources);
    // Lấy source 1 lần
    if (!sources) {
      dispatch(fetchSources());
    }
  }, []);

  // MARK: action
  const closeNav = () => {
    setWidth(0);
  };

  const openNav = () => {
    setWidth(250);
  };

  const pickSourceHandler = (pickSource: string) => {
    console.log('>> setSource: ', pickSource);
    setCurrentSource(pickSource);
  };

  // MARK: sub ui
  const SlideNav = () => {
    const fullSources = sources ? ['', ...sources] : [''];

    return (
      <div id="mySidenav" className="sidenav" style={{ width: width }}>
        <a href="#!" className="closebtn" onClick={closeNav}>
          ×
        </a>

        {sources &&
          fullSources.map(v => (
            <Link
              key={v}
              to={v}
              onClick={() => {
                closeNav();
                pickSourceHandler(v);
              }}
              className={currentSource === v ? 'active' : ''}
            >
              {v === '' ? 'Đề xuất' : v}
            </Link>
          ))}
      </div>
    );
  };

  return (
    <>
      <SlideNav />
      <Routes>
        <Route
          path={currentSource}
          element={
            <NewsScreen currentSource={currentSource} openNav={openNav} />
          }
        />
      </Routes>
    </>
  );
}
