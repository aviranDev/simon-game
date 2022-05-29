import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';

TouchableOpacity.defaultProps = {activeOpacity: 0.8};

export const CustomHeader = ({title}) => (
  <Text style={styles.Header}>{title}</Text>
);

const styles = StyleSheet.create({
  Header: {
    fontSize: 49,
    color: '#fff',
    letterSpacing: 5,
    margin: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
    marginBottom: 285,
  },
});
