import React, {useEffect} from 'react';
import {logger} from '../../config';
import {urlTitle} from '../../domain';
import './Temp.css';

function Header(props) {
  const {indexSelected} = props;
  logger('index selected: ', indexSelected);

  const Item = urlTitle.map((value, index) => (
    <li
      key={index}
      className={indexSelected === index ? 'nav-item active' : 'nav-item'}
      onClick={() => handleClick(props, index)}>
      <a className="nav-link" href="#">
        {value}
      </a>
    </li>
  ));

  return (
    <header>
      <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <a className="navbar-brand" href="#">
          Bao Luot
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
          <ul className="navbar-nav mr-auto">
            {/* <li className="nav-item active">
              <a className="nav-link" href="#">
                Home <span className="sr-only">(current)</span>
              </a>
            </li> */}
            {Item}
          </ul>
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
    <div
      key={index}
      className={index === 0 ? 'carousel-item  active' : 'carousel-item '}>
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
          <p>{value.content}</p>
          <p>
            <a className="btn btn-lg btn-primary" href="#">
              Xem chi tiết
            </a>
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
    <div key={index} className="col-lg-4">
      {/* <svg
        className="bd-placeholder-img rounded-circle"
        width="140"
        height="140"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Placeholder: 140x140"
        preserveAspectRatio="xMidYMid slice"
        focusable="false">
        <title>{value.title}</title>
        <rect width="100%" height="100%" fill="#777" />
        <text x="50%" y="50%" fill="#777" dy=".3em">
          {value.content}
        </text>
      </svg> */}

      <img
        className="bd-placeholder-img rounded-circle"
        width="140"
        height="140"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Placeholder: 140x140"
        preserveAspectRatio="xMidYMid slice"
        focusable="false"
        data-src={converImg(value.content)}
        src={converImg(value.content)}
      />

      <h2>{value.title}</h2>
      {/* <p>{value.content}</p> */}
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
    <div key={index} className="row featurette">
      <div className="col-md-7">
        <div className="featurette-heading">
          {value.title}
          <span className="text-muted">{value.pubDate}</span>
        </div>
        <p className="lead">{value.content}</p>
      </div>
      <div className="col-md-5">
        {/* <svg
          className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto"
          width={500}
          height={500}
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Placeholder: 500x500"
          preserveAspectRatio="xMidYMid slice"
          focusable="false">
          <title>{value.title}</title>
          <rect width="100%" height="100%" fill="#eee" />
          <text x="50%" y="50%" fill="#aaa" dy=".3em">
            {value.content}
          </text>
        </svg> */}
        <img
          className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto"
          width={500}
          height={500}
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Placeholder: 500x500"
          preserveAspectRatio="xMidYMid slice"
          focusable="false"
          data-src={converImg(value.content)}
          src={converImg(value.content)}
        />
      </div>
    </div>
  ));
}

function Divider() {
  return <hr className="featurette-divider" />;
}

function Marketing({data}) {
  if (!data) {
    return null;
  }
  const row = data.slice(0, 3);
  return (
    <div className="container marketing">
      <Row data={row} />
      <Divider />
      <RowFeature data={data} />
      <Divider />
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
        &copy; 2017-2021 Company, Inc. &middot;
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

export default function Temp(props) {
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
    <>
      <Header {...props} />
      <Main {...main} />
    </>
  );
}

const converImg = content => {
  //logger("content", content)

  const img = content.match(/<img(.*)>/);

  if (!img) {
    return 'https://reactnative.dev/img/tiny_logo.png';
  }
  //logger('img: ', img[0])

  const r = img[0].match(/src="(.*)g"/);
  if (!r || !r[1]) {
    return 'https://reactnative.dev/img/tiny_logo.png';
  }

  const v = r[1] + 'g';
  //logger("converImg", v)
  const arr = v.split(' "');
  //logger("converImg final", arr[0])

  return arr ? arr[0] : 'https://reactnative.dev/img/tiny_logo.png';
};
