import {PLAY, SCORE, GAME_OVER, COUNTER, WIN, USER_NAME} from './actions';

const initialState = {
  play: false,
  score: 0,
  gameOver: false,
  counter: 0,
  win: false,
  userName: '',
};

export const simonReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_NAME:
      return {...state, userName: action.payload};

    case PLAY:
      return {...state, play: action.type};

    case SCORE:
      return {...state, score: action.type};

    case GAME_OVER:
      return {...state, gameOver: action.type};

    case COUNTER:
      return {...state, counter: action.type};

    case WIN:
      return {...state, win: action.type};

    default:
      return state;
  }
};
