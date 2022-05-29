import React, {useEffect, useState} from 'react';
import {View, ImageBackground, Text, StyleSheet} from 'react-native';
import {CustomButton} from '../components/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {useLogin} from '../context/LoginProvider';
const bareURL = 'https://simon-game-react-native.herokuapp.com/api/users';
// import {setUserName} from '../redux/actions';
import {introSound} from '../utils/soundColor';
import Icon from 'react-native-vector-icons/Entypo';
//Styles
import {styles} from '../styles/styles';
import {setUserName} from '../redux/actions';
import {useSelector, useDispatch} from 'react-redux';

const image = {
  uri: 'https://www.lilgames.com/wp-content/uploads/games/classic/simon.jpg',
};
const Home = ({navigation}) => {
  // const {userName} = useSelector(state => state.simonReducer);
  const {setIsLoggedIn, isLoggedIn} = useLogin();
  const [user, setUser] = useState(false);
  const [playSong, setPlaySong] = useState(true);
  const dispatch = useDispatch();
  const axiosApi = axios.create({
    baseURL: bareURL,
    headers: {
      'x-auth-token': `${isLoggedIn}`,
    },
  });

  const userProfile = async () => {
    try {
      const {
        data: {nickname},
      } = await axiosApi.get(`/user-profile`);
      dispatch(setUserName(nickname));
      setUser(nickname);
    } catch (error) {
      if (error.response && error.response.status >= 400) {
        console.log(error.response.data);
      }
    }
  };

  useEffect(() => {
    if (playSong) introSound.play().setVolume(0.5);
  }, [playSong]);

  useEffect(() => {
    if (isLoggedIn && !user) {
      setTimeout(() => {
        userProfile();
      }, 2000);
    }
  }, [isLoggedIn]);

  const remove = () => {
    try {
      AsyncStorage.removeItem('my_token').then(() => {
        setIsLoggedIn(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const playStopSong = () => {
    setPlaySong(!playSong);
    if (playSong) {
      introSound.pause();
    }

    if (!playSong) {
      introSound.play();
    }
  };
  // console.log(userName);
  return (
    <>
      <View style={styles.screenContainer}>
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
          <CustomButton
            title="play"
            container={styles.playContainer}
            text={styles.playText}
            onPress={() => navigation.navigate('Start Playing')}
          />
          <CustomButton
            title="Logout"
            container={styles.logout}
            text={styles.logoutText}
            onPress={remove}
          />
          <CustomButton
            title={
              playSong ? (
                <Icon style={style.icons} name="sound" size={30} color="#fff" />
              ) : (
                <Icon name="sound-mute" size={30} color="#fff" />
              )
            }
            container={styles.sound}
            onPress={playStopSong}
          />
          <View style={style.welcomeUserContainer}>
            <Text style={style.welcomeUser}> Welcome {user} </Text>
          </View>
        </ImageBackground>
      </View>
    </>
  );
};

export default Home;

const style = StyleSheet.create({
  welcomeUserContainer: {
    zIndex: 2,
    bottom: -410,
  },
  welcomeUser: {
    fontSize: 20,
    color: '#fff',
    position: 'absolute',
    alignSelf: 'center',
  },
  icons: {
    opacity: 0.5,
  },
});
