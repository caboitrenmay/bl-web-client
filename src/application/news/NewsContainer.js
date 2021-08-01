import {connect} from 'react-redux';
import {fetchNews, selectNewsIndex} from './news-action';
import NewsPage from './NewsPage';
import Temp from './Temp';

const mapStateToProps = (state, ownProps) => {
  // ... computed data from state and optionally ownProps
  return {
    ...state.newsReducer,
    ...ownProps,
  };
};

const mapDispatchToProps = {
  // ... normally is an object full of action creators
  fetchNews,
  selectNewsIndex,
};

export default connect(mapStateToProps, mapDispatchToProps)(Temp);
