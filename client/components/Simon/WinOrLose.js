import React from 'react';
import {CustomButton} from '../CustomButton';
import {CustomHeader} from '../CustomHeader';
import {View, Text, StyleSheet} from 'react-native';

const WinOrLose = ({
  pad,
  score,
  ButtonContainer,
  text,
  handleSave,
  header,
  scoreStyled,
  saveButton,
}) => {
  return (
    <View style={pad}>
      <CustomHeader title={header} />
      <Text style={scoreStyled}>Your score is: {score}</Text>

      <CustomButton
        disabled={score === 0}
        title={score === 0 ? 'You can do better.' : saveButton}
        container={score === 0 ? styles.zeroContainer : ButtonContainer}
        text={text}
        onPress={handleSave}
      />
    </View>
  );
};

export default WinOrLose;

const styles = StyleSheet.create({
  zeroContainer: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 0,
    width: '100%',
  },
});
