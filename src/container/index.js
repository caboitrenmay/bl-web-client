import {connect} from 'react-redux';
import {fetchNews, selectNewsIndex} from '../store/action';
import Home from '../view/component/Home';

const mapStateToProps = (state, ownProps) => {
  // ... computed data from state and optionally ownProps
  return {
    ...state,
    ...ownProps,
  };
};

const mapDispatchToProps = {
  // ... normally is an object full of action creators
  fetchNews,
  selectNewsIndex,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
