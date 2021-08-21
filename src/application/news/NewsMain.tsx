import moment from 'moment';
import React, { Fragment, useState } from 'react';
import { NewsItems } from '../../domain';
import { NewsModal } from '../component/BaseModal';
import './NewsPage.css';

interface MainPropsType {
  source: string;
  items: NewsItems[];
}

interface NIListPropsType {
  source: string;
  data: NewsItems[];
  selectItem: (newsItem: NewsItems) => void;
}

interface RowPropsType {
  source: string;
  value: NewsItems;
}

export function Main({ source, items }: MainPropsType) {
  if (items.length === 0) return null;
  const [currentNews, setCurrentNews] = useState({});

  const selectItem = (item: NewsItems) => {
    console.log('selectItem :', item);
    setCurrentNews(item);
  };

  const slider = items.slice(0, 3) || [];
  return (
    <Fragment>
      <Slider data={slider} selectItem={selectItem} source={source} />
      <RowFeature data={items} selectItem={selectItem} source={source} />
      <Footer />
      <NewsModal {...currentNews} />
    </Fragment>
  );
}

function Slider({ data, selectItem }: NIListPropsType) {
  const SliderItem = data.map((value, index) => (
    <div
      key={index}
      className={index === 0 ? 'carousel-item  active' : 'carousel-item '}
    >
      <svg
        className="bd-placeholder-img"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label=" :  "
        preserveAspectRatio="xMidYMid slice"
        focusable="false"
      >
        <title />
        <rect width="100%" height="100%" fill="#777" />
        <text x="50%" y="50%" fill="#777" dy=".3em" />
      </svg>
      <div className="container">
        <div className="carousel-caption text-left">
          <h1>{value.title}</h1>
          <p>
            <button
              className="btn btn-lg btn-primary"
              data-toggle="modal"
              data-target="#newsModal"
              onClick={() => selectItem(value)}
            >
              Xem chi tiết
            </button>
          </p>
        </div>
      </div>
    </div>
  ));

  return (
    <div id="myCarousel" className="carousel slide" data-ride="carousel">
      <ol className="carousel-indicators">
        <li data-target="#myCarousel" data-slide-to={0} className="active" />
        <li data-target="#myCarousel" data-slide-to={1} />
        <li data-target="#myCarousel" data-slide-to={2} />
      </ol>
      <div className="carousel-inner">{SliderItem}</div>
      <a
        className="carousel-control-prev"
        href="#myCarousel"
        role="button"
        data-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="sr-only">Previous</span>
      </a>
      <a
        className="carousel-control-next"
        href="#myCarousel"
        role="button"
        data-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="sr-only">Next</span>
      </a>
    </div>
  );
}

function RowFeature({ data, selectItem, source }: NIListPropsType) {
  const rows = data.map((value, index) => (
    <a
      key={index}
      data-toggle="modal"
      data-target="#newsModal"
      onClick={() => selectItem(value)}
      href="#"
      rel="noreferrer"
    >
      <Row value={value} source={source} />
      <Divider />
    </a>
  ));

  return <div className="container marketing">{rows}</div>;
}

function Row({ value, source }: RowPropsType) {
  return (
    <div className="row featurette">
      <div className="col-md-5">
        <div className="featurette-heading">{value.title}</div>
        <p className="text-muted">{moment(value.pubDate).fromNow()}</p>
        <p className="badge badge-primary">
          {source}
        </p>
      </div>
      <div className="col-md-7">
        <p
          className="lead"
          dangerouslySetInnerHTML={{ __html: value.content || '' }}
        />
      </div>
    </div>
  );
}

function Divider() {
  return <hr className="featurette-divider" />;
}

function Footer() {
  return (
    <footer className="container">
      <p className="float-right">
        <a href="#">Back to top</a>
      </p>
      <p>
        &copy; 2021 Báo Lướt, Inc. &middot;
        <a href="#">Privacy</a> &middot; <a href="#">Terms</a>
      </p>
    </footer>
  );
}
