import React, {useState, useEffect} from 'react';
import Sound from 'react-native-sound';
import {CustomButton} from '../components/CustomButton';
import {View, Text} from 'react-native';
import ErrorImg from '../img/error.png';
import WinnerImg from '../img/win.jpg';
import GameOver from '../components/Simon/GameOver';
import axios from 'axios';
import {useLogin} from '../context/LoginProvider';
const bareURL = 'https://simon-game-react-native.herokuapp.com/api/game';
import {introSound} from '../utils/soundColor';

//utils
import {gameSpeed} from '../utils/gameFunctions';

Sound.setCategory('Playback');
//sound buttons
import {green, red, blue, yellow, startPlay, error} from '../utils/soundColor';
//Styles
import {styles} from '../styles/styles';
import {gameButtons, simonColors} from '../styles/simonButton';
import WinOrLose from '../components/Simon/WinOrLose';
import {useSelector} from 'react-redux';

const Game = ({navigation}) => {
  const userName = useSelector(state => state.game.userName);
  const {isLoggedIn} = useLogin();
  const [play, setPlay] = useState(false);
  const [score, setScore] = useState(0);
  const [disabled, setDisabled] = useState(true);
  const [disabledWhilePlaying, setDisabledWhilePlaying] = useState(true);
  const [userArray, setUserArray] = useState([]);
  const [gameArray, setGameArray] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [soundColor, setSoundColor] = useState(null);
  const [firstScore, setFirstScore] = useState(false);
  const [win, setWin] = useState(false);
  const [counter, setCounter] = useState(0);
  const [compliment, setCompliment] = useState('');

  const levelSpeed = [1000, 700, 550, 2000];
  const compliments = [
    `Good Job ${userName}!`,
    `Well Done ${userName}!`,
    `Excellent Move ${userName}!`,
    `You got it ${userName}`,
    'Keep going',
  ];
  const colors = ['red', 'green', 'blue', 'yellow'];
  //Win or lose
  const [errorImg, setErrorImg] = useState(false);
  const [winnerImg, setWinerImg] = useState(false);

  const axiosApi = axios.create({
    baseURL: bareURL,
    headers: {
      'x-auth-token': `${isLoggedIn}`,
    },
  });

  useEffect(() => {
    setUserArray([]);
    setGameArray([]);
    setGameOver(false);
  }, [counter]);

  const getFirstUserScore = async () => {
    try {
      const {
        data: {_id},
      } = await axiosApi.get(`/display-first-user-score`);
      setFirstScore(_id);
    } catch (error) {
      if (error.response && error.response.status >= 400) {
        console.log(error.response.data);
      }
    }
  };

  useEffect(() => {
    if (score === 20) {
      setWinerImg(true);

      setTimeout(() => {
        setGameOver(true);
        setWin(true);
        setWinerImg(false);
      }, 2000);
    }
  }, [score]);

  function nextStep(arr) {
    const random = arr[Math.floor(Math.random() * arr.length)];
    return random;
  }

  const playSoundButton = colorSound => {
    colorSound.play();
    setTimeout(() => {
      setSoundColor(null);
    }, levelSpeed[counter]);
    setSoundColor(colorSound);
  };

  const playColorSound = async array => {
    for (let index = 0; index < array.length; index++) {
      // console.log('start');
      setDisabledWhilePlaying(true);
      const gameColors = await gameSpeed(index, gameArray, levelSpeed[counter]);
      gameColors === 'green' ? playSoundButton(green) : null;
      gameColors === 'red' ? playSoundButton(red) : null;
      gameColors === 'blue' ? playSoundButton(blue) : null;
      gameColors === 'yellow' ? playSoundButton(yellow) : null;
    }

    setDisabledWhilePlaying(false);
    // console.log('end');
  };

  const startGame = startPlay => {
    setCompliment('');
    introSound.pause();
    setDisabledWhilePlaying(true);
    setDisabled(!disabled);
    setPlay(!play);
    setGameOver(false);
    setUserArray([]);

    if (!play) {
      startPlay.play();
      gameArray.push(nextStep(colors));
      setTimeout(() => {
        playColorSound(gameArray);
      }, 2000);
      setScore(0);
    } else {
      setGameArray([]);
      startPlay.stop();
      introSound.play().setVolume(0.5);
    }
  };

  const playButton = (color, colorSound) => {
    setCompliment('');
    const index = userArray.push(color) - 1;

    if (userArray[index] !== gameArray[index]) {
      error.play();
      setCompliment('');
      getFirstUserScore();

      setErrorImg(true);
      setTimeout(() => {
        setGameOver(!gameOver);
        setWin(false);
        setErrorImg(false);
        introSound.play();
      }, 2000);
      return;
    }

    if (userArray.length === gameArray.length && score < 21) {
      if (score < 19) {
        playColorSound(gameArray);
        gameArray.push(nextStep(colors));
        setTimeout(() => {
          setCompliment('');
        }, 2000);
        setCompliment(nextStep(compliments));
      } else {
        getFirstUserScore();
      }
      setScore(score + 1);
      setUserArray([]);
    }
    colorSound.play();
  };

  const handleSave = async () => {
    try {
      if (firstScore) {
        await axiosApi.put(`/update-user-score/${firstScore}`, {score});
      } else {
        await axiosApi.post(`/save-user-score`, {score});
      }
      navigation.navigate('Top 10');
    } catch (error) {
      if (error.response && error.response.status >= 400) {
        console.log(error.response.data);
      }
    }
  };

  const selectLevel = () => {
    setCounter(counter + 1);
    if (counter === 3) {
      setCounter(0);
    }
  };

  return (
    <View style={styles.screenContainer}>
      <Text style={styles.compliment}>{compliment && compliment}</Text>
      {gameOver && (
        <WinOrLose
          pad={gameButtons.pad}
          header={win ? 'You Win' : 'Game Over'}
          score={score}
          scoreStyled={styles.score}
          saveButton={win ? '🎉Save🎊' : 'Save'}
          ButtonContainer={styles.SaveContainer}
          text={styles.playText}
          handleSave={handleSave}
        />
      )}

      {!gameOver && (
        <>
          <View style={gameButtons.pad}>
            <CustomButton
              underlayColor={simonColors.underlayColorGreen}
              disabled={disabled || disabledWhilePlaying}
              container={
                (disabled && gameButtons.greenButtonOff) ||
                (soundColor === green && gameButtons.greenButtonOn) ||
                (disabledWhilePlaying && gameButtons.greenButton) ||
                (!disabled && gameButtons.greenButton)
              }
              onPress={() => playButton('green', green)}
            />

            <CustomButton
              underlayColor={simonColors.underlayColorRed}
              disabled={disabled || disabledWhilePlaying}
              container={
                (disabled && gameButtons.redButtonOff) ||
                (soundColor === red && gameButtons.redButtonOn) ||
                (disabledWhilePlaying && gameButtons.redButton) ||
                (!disabled && gameButtons.redButton)
              }
              onPress={() => playButton('red', red)}
            />
          </View>

          {errorImg && (
            <GameOver
              styleError={styles.error}
              styleImg={styles.errorImg}
              img={ErrorImg}
            />
          )}

          {disabled && (
            <>
              <Text style={styles.level}>Choose Level</Text>
              <CustomButton
                title={
                  (counter === 0 && 'Normal Speed') ||
                  (counter === 1 && 'High Speed') ||
                  (counter === 2 && 'Max Speed') ||
                  (counter === 3 && 'Slow Speed')
                }
                container={styles.speedContainer}
                text={styles.speedText}
                onPress={selectLevel}
              />
            </>
          )}

          {winnerImg && (
            <GameOver
              styleError={styles.error}
              styleImg={styles.errorImg}
              img={WinnerImg}
            />
          )}

          <View style={gameButtons.pad}>
            <CustomButton
              underlayColor={simonColors.underlayColorYellow}
              disabled={disabled || disabledWhilePlaying}
              container={
                (disabled && gameButtons.yellowButtonOff) ||
                (soundColor === yellow && gameButtons.yellowButtonOn) ||
                (disabledWhilePlaying && gameButtons.yellowButton) ||
                (!disabled && gameButtons.yellowButton)
              }
              onPress={() => playButton('yellow', yellow)}
            />

            <Text style={disabled ? null : styles.scoreStyle}>
              {disabled ? null : score}
            </Text>

            <CustomButton
              underlayColor={simonColors.underlayColorBlue}
              activeOpacity={0.8}
              disabled={disabled || disabledWhilePlaying}
              container={
                (disabled && gameButtons.blueButtonOff) ||
                (soundColor === blue && gameButtons.blueButtonOn) ||
                (disabledWhilePlaying && gameButtons.blueButton) ||
                (!disabled && gameButtons.blueButton)
              }
              onPress={() => playButton('blue', blue)}
            />
          </View>
        </>
      )}

      <CustomButton
        title={play ? 'Restart' : 'Start'}
        disabled={play && disabledWhilePlaying}
        container={styles.startGameButton}
        text={styles.textPlay}
        onPress={() => startGame(startPlay)}
      />

      <CustomButton
        title="Top 10"
        disabled={play && disabledWhilePlaying}
        container={styles.topContainer}
        text={styles.topText}
        onPress={() => navigation.navigate('Top 10')}
      />
      <CustomButton
        title="Back"
        disabled={play && disabledWhilePlaying}
        container={styles.homeContainer}
        text={styles.homeText}
        onPress={() => navigation.navigate('Simon game')}
      />
    </View>
  );
};

export default Game;
