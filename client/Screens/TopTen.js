import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {CustomButton} from '../components/CustomButton';
import UserScore from '../components/Form/UserScore';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const bareURL = 'https://simon-game-react-native.herokuapp.com/api/game';

//Styles
import {styles} from '../styles/styles';
const TopTen = ({navigation}) => {
  const [token, setToken] = useState(null);
  const [users, setUsers] = useState({});

  AsyncStorage.getItem('my_token').then(value => setToken(value));
  const topTenAxios = axios.create({
    baseURL: bareURL,
    headers: {
      'x-auth-token': `${token}`,
    },
  });

  useEffect(() => {
    if (token) {
      const getTopTenScores = async () => {
        try {
          const {data} = await topTenAxios.get(`/display-all-users-scores`);
          setUsers(data);
        } catch (error) {
          if (error.response && error.response.status >= 400) {
            console.log(error.response.data);
          }
        }
      };
      getTopTenScores();
    }
  }, [token]);

  let largest = users[0];
  const {...data} = largest;
  // console.log('-------------------------------->', data.score);
  return (
    <View style={styles.screenContainerTopTen}>
      {users.length &&
        users.map(user => (
          <UserScore
            key={user._id}
            nickname={user.nickname}
            score={user.score === data.score ? user.score + ' 🏆' : user.score}
          />
        ))}
      <CustomButton
        title="Back"
        container={styles.topTenBackHome}
        text={styles.homeText}
        onPress={() => navigation.navigate('Simon game')}
      />
    </View>
  );
};

export default TopTen;
