import React from 'react';
import {View, Image} from 'react-native';

const GameOver = ({styleError, styleImg, img}) => {
  return (
    <View style={styleError}>
      <Image style={styleImg} source={img} />
    </View>
  );
};

export default GameOver;
