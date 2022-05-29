//Game
export const SET_PLAY = 'SET_PLAY';
export const SCORE = 'SCORE';
export const GAME_OVER = 'GAME_OVER';
export const COUNTER = 'COUNTER';
export const WIN = 'WIN';

//User
export const USER_NAME = 'USER_NAME';

export const setPlay = play => dispatch => {
  dispatch({
    type: SET_PLAY,
    payload: play,
  });
};

export const setUserName = userName => dispatch => {
  dispatch({
    type: USER_NAME,
    payload: userName,
  });
};

export const setScore = score => dispatch => {
  dispatch({
    type: SCORE,
    payload: score,
  });
};

export const setGameOver = gameOver => dispatch => {
  dispatch({
    type: GAME_OVER,
    payload: gameOver,
  });
};

export const setCounter = counter => dispatch => {
  dispatch({
    type: COUNTER,
    payload: counter,
  });
};

export const setWin = win => dispatch => {
  dispatch({
    type: WIN,
    payload: win,
  });
};
