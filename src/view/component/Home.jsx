import '../css/home.css';
import React, {useEffect} from 'react';
import logger from '../../helper/logger';
import {urlTitle} from '../../service';
import {loading} from './Util';

let item0;
let item1;
let item2;
let item3;
let content;

// let subContent;

const handleClick = (props, index) => {
  const {news} = props;
  const section = urlTitle[index];
  const data = news[section];
  logger(`click ${index}: `, data);

  if (data) {
    props.selectNewsIndex(index);
  } else {
    props.fetchNews(index);
  }
};

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

const Item = (value, index, isFirst = false) => (
  <div key={index} className={isFirst ? 'story is-first' : 'story'}>
    <div className="story__thumb">
      <a href={value.link} target="_blank" title={value.title} rel="noreferrer">
        <img
          src={converImg(
            value['content:encoded'] ? value['content:encoded'] : value.content,
          )}
          alt={value.title}
          title={value.title}
        />
      </a>
    </div>

    <h4 className="story__heading">
      <a href={value.link} title={value.title} target="_blank" rel="noreferrer">
        {value.title}
      </a>
    </h4>

    <div className="story__meta">
      <time className="time friendly">{value.pubDate}</time>
    </div>

    <img
      className="lazy"
      data-src={converImg(value.content)}
      src={converImg(value.content)}
    />
  </div>
);

// function NavMenu(listMenu, done) {
//     return <div className="nav-wrap-2020">
//         <div className="nav full-menu">
//             <div className="container">
//                 <div className="nav__menu">
//                     {listMenu}
//                 </div>
//                 {loading(done)}
//             </div>
//         </div>
//     </div>
// }

function NavMenu(listMenu) {
  return (
    <div className="nav-wrap-2020">
      <div className="nav full-menu">
        <div className="nav__menu">{listMenu}</div>
      </div>
    </div>
  );
}

function Container(done) {
  return (
    <div className="main-container">
      {loading(done)}

      <div className="container">
        <div className="main-col">
          <div data-track="|hotnews">
            <div className="rank1-stories">{item0}</div>
            <div className="rank2-stories">
              {item1}
              {item2}
              {item3}
            </div>

            <div className="timeline loadmore" data-track="|timeline">
              {content}
            </div>
          </div>
        </div>

        {/* <div className="sub-col">
                <div className="sidebar">
                    <div className="small-list newest-box" data-track="|newest_box">
                        {subContent}
                    </div>
                </div>
            </div> */}
      </div>
    </div>
  );
}

export default function Home(props) {
  // RENDER
  const {news, indexSelected} = props;

  const listMenu = urlTitle.map((value, index) => (
    <a
      key={index}
      className={indexSelected === index ? 'popular is-active' : 'latest'}
      href="#"
      onClick={() => handleClick(props, index)}>
      <span>{value}</span>
      {/* <span className="number">39</span> */}
    </a>
  ));

  logger('Home news:', news);
  const section = urlTitle[indexSelected];
  logger('Home indexSelected:', indexSelected);
  if (news && news[section]) {
    const {items} = news[section];
    //logger('HOME render items: ', items)
    //logger('HOME render items: ', items[0]['content:encoded'])
    if (items && items.length > 0) {
      content = items.map((value, index) => Item(value, index));
      // subContent = items.map((value, index) => {
      //   if (index < 10) return Item(value, index);
      // });

      try {
        item0 = Item(items[0], 0);
        item1 = Item(items[1], 1, true);
        item2 = Item(items[2], 2);
        item3 = Item(items[3], 3);
      } catch (error) {
        logger('HOME render ERROR: ', error);
      }
    }
  }

  // Declare a new state variable, which we'll call "content"
  //const [content, setContent] = useState("");

  useEffect(() => {
    logger('Home useEffect:', news);
    if (indexSelected === -1) {
      props.fetchNews(0);
    }
  });

  return (
    <div className="wrapper homepage_page">
      {NavMenu(listMenu, props.done)}
      {Container(props.done)}
    </div>
  );
}
