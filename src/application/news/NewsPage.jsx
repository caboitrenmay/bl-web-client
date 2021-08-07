import React, {useEffect, useState} from 'react';
import {urlTitle} from '../../domain';
import './NewsPage.css';
import moment from 'moment';
import Wrapper from '../component/Wrapper';
import {NewsModal} from '../component/BaseModal';

function Header(props) {
  const {indexSelected} = props;
  console.log('index selected: ', indexSelected);

  const Item = urlTitle.map((value, index) => (
    <li
      key={index}
      className={indexSelected === index ? 'nav-item active' : 'nav-item'}
      onClick={() => handleClick(props, index)}>
      <a
        className="nav-link"
        href="#"
        data-toggle="collapse"
        data-target=".navbar-collapse.show">
        {value}{' '}
        {indexSelected === index ? (
          <span className="sr-only">(current)</span>
        ) : null}
      </a>
    </li>
  ));

  return (
    <header>
      <nav className="navbar navbar-expand-md navbar-dark fixed-top active">
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

function Slider({data, selectItem}) {
  console.log('Slider: ', data);
  if (!data) {
    return null;
  }
  const SliderItem = data.map((value, index) => (
    <div
      rel="noreferrer"
      key={index}
      className={index === 0 ? 'carousel-item  active' : 'carousel-item '}>
      {/* <p dangerouslySetInnerHTML={{__html: value.content}}></p> */}
      <svg
        className="bd-placeholder-img"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label=" :  "
        preserveAspectRatio="xMidYMid slice"
        focusable="false">
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
              onClick={() => selectItem(value)}>
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
    <a
      key={index}
      className="col-lg-4"
      target="_blank"
      href={value.link}
      rel="noreferrer">
      <h2>{value.title}</h2>
      <p className="text-muted">{moment(value.pubDate).fromNow()}</p>
      <p dangerouslySetInnerHTML={{__html: value.content}} />
    </a>
  ));

  return <div className="row">{RowItem}</div>;
}

function RowFeature({data, selectItem}) {
  if (!data) {
    return null;
  }
  return data.map((value, index) => (
    <a
      key={index}
      data-toggle="modal"
      data-target="#newsModal"
      onClick={() => selectItem(value)}
      href="#"
      rel="noreferrer">
      <div className="row featurette">
        <div className="col-md-5">
          <div className="featurette-heading">{value.title}</div>
          <p className="text-muted">{moment(value.pubDate).fromNow()}</p>
        </div>
        <div className="col-md-7">
          <p
            className="lead"
            dangerouslySetInnerHTML={{__html: value.content}}
          />
        </div>
      </div>
      <Divider />
    </a>
  ));
}

function Divider() {
  return <hr className="featurette-divider" />;
}

function Marketing({data, selectItem}) {
  if (!data) {
    return null;
  }
  // const row = data.slice(0, 3);
  return (
    <div className="container marketing">
      {/* <Row data={row} /> */}
      <RowFeature data={data} selectItem={selectItem} />
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
  console.log('Main props: ', props);
  const {items} = props || [];
  if (!items) {
    return null;
  }

  const [currentNews, setCurrentNews] = useState({});
  const selectItem = news => {
    console.log('selected :', news);
    setCurrentNews(news);
  };
  console.log('currentNews :', currentNews);

  const slider = items.slice(0, 3) || [];
  return (
    <main role="main">
      <Slider data={slider} selectItem={selectItem} />
      <Marketing data={items} selectItem={selectItem} />
      <Footer />
      <NewsModal {...currentNews} />
    </main>
  );
}

const handleClick = (props, index) => {
  try {
    window.scroll({top: 0, left: 0, behavior: 'smooth'});
    return props.fetchNews(index);
  } catch (e) {
    console.log(e);
  }
};

export default function NewsPage(props) {
  const {news, indexSelected} = props;

  // console.log('Home news:', news);
  const section = urlTitle[indexSelected];
  // console.log('Home indexSelected:', indexSelected);

  let main = {};
  if (news && news[section]) {
    main = news[section];
    const {items} = news[section];
    console.log('items news:', items);
  }

  useEffect(() => {
    console.log('Home useEffect:', news);
    if (indexSelected === -1) {
      props.fetchNews(0);
    }
  }, [indexSelected]);

  return (
    <Wrapper {...props}>
      <Header {...props} />
      <Main {...main} />
    </Wrapper>
  );
}
