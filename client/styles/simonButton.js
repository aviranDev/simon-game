import {StyleSheet} from 'react-native';

export const colors = {
  //Header
  backgroundHeader: '#000000',
  textHeader: '#DFDFDF',

  //Main
  background: '#272930',

  //Buttons
  playButton: '#D34442',
  topButton: '#3B3E53',
  homeButton: '#121212',
  saveButton: '#338A26',

  //Game
  green: '#0CA31C',
  greenBorder: '#338A26',
  red: '#D20D0D',
  redBorder: '#A02525',
  blue: '#2B7AD2',
  blueBorder: '#2663A6',
  yellow: '#D5CF0F',
  yellowBorder: '#BCB71D',

  underlayColorGreen: '#A8FFAD',
  underlayColorRed: '#F7C2C2',
  underlayColorYellow: '#EFF7C2',
  underlayColorBlue: '#9FDCFF',
};

export const simonColors = {
  //Game
  green: '#0CA31C',
  greenBorder: '#338A26',
  red: '#D20D0D',
  redBorder: '#A02525',
  blue: '#2B7AD2',
  blueBorder: '#2663A6',
  yellow: '#D5CF0F',
  yellowBorder: '#BCB71D',

  underlayColorGreen: '#A8FFAD',
  underlayColorRed: '#F7C2C2',
  underlayColorYellow: '#EFF7C2',
  underlayColorBlue: '#9FDCFF',
};

export const gameButtons = StyleSheet.create({
  pad: {
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'center',
    bottom: 70,
  },
  greenButton: {
    borderTopLeftRadius: 155,
    borderBottomRightRadius: 75,
    backgroundColor: colors.green,
    height: 155,
    width: 155,
    margin: 10,
    borderWidth: 6,
    borderColor: colors.greenBorder,
  },
  greenButtonOff: {
    borderTopLeftRadius: 155,
    borderBottomRightRadius: 75,
    backgroundColor: 'rgba(25,106, 34, 0.5)',
    height: 155,
    width: 155,
    margin: 10,
  },
  greenButtonOn: {
    borderTopLeftRadius: 155,
    borderBottomRightRadius: 75,
    backgroundColor: colors.underlayColorGreen,
    height: 155,
    width: 155,
    margin: 10,
    borderWidth: 6,
    borderColor: colors.greenBorder,
  },
  redButton: {
    borderTopRightRadius: 155,
    borderBottomLeftRadius: 75,
    backgroundColor: colors.red,
    height: 155,
    width: 155,
    margin: 10,
    borderWidth: 6,
    borderColor: colors.redBorder,
  },
  redButtonOff: {
    borderTopRightRadius: 155,
    borderBottomLeftRadius: 75,
    backgroundColor: 'rgba(160,58, 56, 0.5)',
    height: 155,
    width: 155,
    margin: 10,
  },
  redButtonOn: {
    borderTopRightRadius: 155,
    borderBottomLeftRadius: 75,
    backgroundColor: colors.underlayColorRed,
    height: 155,
    width: 155,
    margin: 10,
    borderWidth: 6,
    borderColor: colors.redBorder,
  },
  blueButton: {
    borderBottomRightRadius: 155,
    borderTopLeftRadius: 75,
    backgroundColor: colors.blue,
    height: 155,
    width: 155,
    margin: 10,
    borderWidth: 6,
    borderColor: colors.blueBorder,
  },
  blueButtonOff: {
    borderBottomRightRadius: 155,
    borderTopLeftRadius: 75,
    backgroundColor: 'rgba(37,88, 144, 0.5)',
    height: 155,
    width: 155,
    margin: 10,
  },
  blueButtonOn: {
    borderBottomRightRadius: 155,
    borderTopLeftRadius: 75,
    backgroundColor: colors.underlayColorBlue,
    height: 155,
    width: 155,
    margin: 10,
    borderWidth: 6,
    borderColor: colors.blueBorder,
  },
  yellowButton: {
    borderBottomLeftRadius: 155,
    borderTopRightRadius: 75,
    backgroundColor: colors.yellow,
    height: 155,
    width: 155,
    margin: 10,
    borderWidth: 6,
    borderColor: colors.yellowBorder,
  },
  yellowButtonOff: {
    borderBottomLeftRadius: 155,
    borderTopRightRadius: 75,
    backgroundColor: 'rgba(162, 159, 43, 0.5)',
    height: 155,
    width: 155,
    margin: 10,
  },
  yellowButtonOn: {
    borderBottomLeftRadius: 155,
    borderTopRightRadius: 75,
    backgroundColor: colors.underlayColorYellow,
    height: 155,
    width: 155,
    margin: 10,
    borderWidth: 6,
    borderColor: colors.yellowBorder,
  },
});
