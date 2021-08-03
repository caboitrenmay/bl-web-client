import React, {useEffect} from 'react';
import {logger} from '../../config';
import {urlTitle} from '../../domain';
import './NewsPage.css';
import moment from 'moment';
import Wrapper from '../component/Wrapper';

function Header(props) {
  const {indexSelected} = props;
  logger('index selected: ', indexSelected);

  const Item = urlTitle.map((value, index) => (
    <li
      key={index}
      className={indexSelected === index ? 'nav-item active' : 'nav-item'}
      onClick={() => handleClick(props, index)}>
      <a className="nav-link" href="#">
        {value}{' '}
        {indexSelected === index ? (
          <span className="sr-only">(current)</span>
        ) : null}
      </a>
    </li>
  ));

  return (
    <header>
      <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <a className="navbar-brand" href="#">
          Báo Lướt
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav mr-auto">{Item}</ul>
        </div>
      </nav>
    </header>
  );
}

function Slider({data}) {
  logger('Slider: ', data);
  if (!data) {
    return null;
  }
  const SliderItem = data.map((value, index) => (
    <a
      target="_blank"
      href={value.link}
      rel="noreferrer"
      key={index}
      className={index === 0 ? 'carousel-item  active' : 'carousel-item '}>
      <p dangerouslySetInnerHTML={{__html: value.content}}></p>
      <div className="container">
        <div className="carousel-caption text-left">
          <h1>{value.title}</h1>
          <p>
            <button className="btn btn-lg btn-primary">Xem chi tiết</button>
          </p>
        </div>
      </div>
    </a>
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
        data-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="sr-only">Previous</span>
      </a>
      <a
        className="carousel-control-next"
        href="#myCarousel"
        role="button"
        data-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="sr-only">Next</span>
      </a>
    </div>
  );
}

function Row({data}) {
  const RowItem = data.map((value, index) => (
    <div key={index} className="col-lg-4">
      <p dangerouslySetInnerHTML={{__html: value.content}}></p>
      <h2>{value.title}</h2>
      <p>
        <a className="btn btn-secondary" href="#">
          Xem chi tiết &raquo;
        </a>
      </p>
    </div>
  ));

  return <div className="row">{RowItem}</div>;
}

function RowFeature({data}) {
  if (!data) {
    return null;
  }
  return data.map((value, index) => (
    <a key={index} target="_blank" href={value.link} rel="noreferrer">
      <div className="row featurette">
        <div className="col-md-7">
          <div className="featurette-heading">{value.title}</div>
          <p className="text-muted">{moment(value.pubDate).fromNow()}</p>
        </div>
        <div className="col-md-5">
          <p
            className="lead"
            dangerouslySetInnerHTML={{__html: value.content}}></p>
        </div>
      </div>
      <Divider />
    </a>
  ));
}

function Divider() {
  return <hr className="featurette-divider" />;
}

function Marketing({data}) {
  if (!data) {
    return null;
  }
  // const row = data.slice(0, 3);
  return (
    <div className="container marketing">
      {/* <Row data={row} />
      <Divider /> */}
      <RowFeature data={data} />
    </div>
  );
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

function Main(props) {
  logger('Main props: ', props);
  const {items} = props || [];
  if (!items) {
    return null;
  }
  const slider = items.slice(0, 3) || [];
  return (
    <main role="main">
      <Slider data={slider} />
      <Marketing data={items} />
      <Footer />
    </main>
  );
}

const handleClick = (props, index) => {
  try {
    const {news} = props;
    const section = urlTitle[index];
    logger('click section: ', section);
    if (news.length === 0) {
      return props.fetchNews(index);
    }

    const data = news[section] || null;
    logger(`click ${index}: `, data);

    if (data) {
      props.selectNewsIndex(index);
    } else {
      props.fetchNews(index);
    }
  } catch (e) {
    logger(e);
  }
};

export default function NewsPage(props) {
  const {news, indexSelected} = props;

  // logger('Home news:', news);
  const section = urlTitle[indexSelected];
  // logger('Home indexSelected:', indexSelected);

  let main = {};
  if (news && news[section]) {
    main = news[section];
    const {items} = news[section];
    logger('items news:', items);
  }

  useEffect(() => {
    logger('Home useEffect:', news);
    if (indexSelected === -1) {
      props.fetchNews(0);
    }
  });

  return (
    <Wrapper {...props}>
      <Header {...props} />
      <Main {...main} />
    </Wrapper>
  );
}
