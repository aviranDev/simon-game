import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

const UserScore = ({nickname, score}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        User: {nickname} - Score: {score}
      </Text>
    </View>
  );
};

export default UserScore;

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    elevation: 20,
    backgroundColor: '#3E3E3E',
    paddingVertical: 10,
    marginHorizontal: 10,
    paddingHorizontal: 12,
    marginTop: 10,
  },
  text: {
    fontSize: 18,
    letterSpacing: 3,
    color: '#ffffff',
    fontWeight: 'bold',
    alignItems: 'center',
    top: 0,
  },
});
