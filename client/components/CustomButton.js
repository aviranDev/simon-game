import React from 'react';
import {Text, TouchableHighlight, TouchableNativeFeedback} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const CustomButton = ({
  onPress,
  title,
  container,
  text,
  disabled,
  underlayColor = null,
}) => (
  <TouchableHighlight
    touchSoundDisabled={true}
    underlayColor={underlayColor}
    disabled={disabled}
    android_disableSound={true}
    onPress={onPress}
    style={container}>
    <Text style={text}>{title}</Text>
  </TouchableHighlight>
);
