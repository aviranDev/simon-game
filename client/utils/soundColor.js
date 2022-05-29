import greenSound from '../android/app/src/main/raws/green.mp3';
import redSound from '../android/app/src/main/raws/red.mp3';
import blueSound from '../android/app/src/main/raws/blue.mp3';
import yellowSound from '../android/app/src/main/raws/yellow.mp3';
import playSound from '../android/app/src/main/raws/play.mp3';
import errorSound from '../android/app/src/main/raws/error.mp3';
import intro from '../android/app/src/main/raws/intro.mp3';
import Sound from 'react-native-sound';

Sound.setCategory('Playback');

export const introSound = new Sound(intro, error => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  // if loaded successfully
  console.log(
    'duration in seconds: ' +
      introSound.getDuration() +
      'number of channels: ' +
      introSound.getNumberOfChannels(),
  );
});

export const green = new Sound(greenSound, error => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  // if loaded successfully
  console.log(
    'duration in seconds: ' +
      green.getDuration() +
      'number of channels: ' +
      green.getNumberOfChannels(),
  );
});

export const red = new Sound(redSound, error => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  // if loaded successfully
  console.log(
    'duration in seconds: ' +
      red.getDuration() +
      'number of channels: ' +
      red.getNumberOfChannels(),
  );
});

export const blue = new Sound(blueSound, error => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  // if loaded successfully
  console.log(
    'duration in seconds: ' +
      blue.getDuration() +
      'number of channels: ' +
      blue.getNumberOfChannels(),
  );
});

export const yellow = new Sound(yellowSound, error => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  // if loaded successfully
  console.log(
    'duration in seconds: ' +
      yellow.getDuration() +
      'number of channels: ' +
      yellow.getNumberOfChannels(),
  );
});

export const error = new Sound(errorSound, error => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  // if loaded successfully
  console.log(
    'duration in seconds: ' +
      red.getDuration() +
      'number of channels: ' +
      red.getNumberOfChannels(),
  );
});

export const startPlay = new Sound(playSound, error => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  // if loaded successfully
  console.log(
    'duration in seconds: ' +
      yellow.getDuration() +
      'number of channels: ' +
      yellow.getNumberOfChannels(),
  );
});
