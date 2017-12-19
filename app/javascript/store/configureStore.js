import {createStore, applyMiddleware, compose} from 'redux';

import rootReducer from '../reducers/index'
import thunk from 'redux-thunk' //import thunk

const configureStore = (preloadedState = {}) => {
    return compose(applyMiddleware(thunk))(createStore)(rootReducer);
  }
  export default configureStore  