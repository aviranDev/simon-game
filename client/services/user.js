import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const bareURL = 'https://simon-game-react-native.herokuapp.com/api/users';

export const signup = user => axios.post(`${bareURL}/signup`, user);

export const signin = async user => {
  const {
    data: {token},
  } = await axios.post(`${bareURL}/signin`, user);
  try {
    await AsyncStorage.setItem('my_token', token);
  } catch (error) {
    console.log('error: ', error);
  }
};
