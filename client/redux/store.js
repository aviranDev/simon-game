import {
  configureStore,
  applyMiddleware,
  combineReducers,
} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import {simonReducer} from './reducers';

const rootReducer = combineReducers({
  game: simonReducer,
});

export const store = configureStore(
  {
    reducer: rootReducer,
  },
  applyMiddleware(thunk),
);
