import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Home from '../Screens/Home';
import Signup from '../Screens/Signup';
import Signin from '../Screens/Signin';
import Game from '../Screens/Game';
import TopTen from '../Screens/TopTen';
//custom login hook
import {useLogin} from '../context/LoginProvider';
//Styles
import {colors} from '../styles/styles';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  const {setIsLoggedIn, isLoggedIn} = useLogin();
  useEffect(() => {
    if (setIsLoggedIn) {
      getCurrentUser();
    }
  }, [isLoggedIn]);
  const getCurrentUser = () => {
    try {
      AsyncStorage.getItem('my_token').then(value => {
        if (value != null) {
          setIsLoggedIn(value);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Stack.Navigator>
      {isLoggedIn ? (
        <>
          <Stack.Screen
            name="Simon game"
            component={Home}
            options={{
              headerTintColor: `${colors.textHeader}`,
              headerStyle: {
                backgroundColor: colors.backgroundHeader,
              },
              headerTitleStyle: {
                fontSize: 45,
              },
              headerTitleAlign: 'center',
            }}
          />

          <Stack.Screen
            name="Start Playing"
            component={Game}
            options={{
              headerTintColor: `${colors.textHeader}`,
              headerStyle: {
                backgroundColor: colors.backgroundHeader,
              },
              headerTitleStyle: {
                fontSize: 30,
              },
              headerTitleAlign: 'center',
            }}
          />
          <Stack.Screen
            name="Top 10"
            component={TopTen}
            options={{
              headerTintColor: `${colors.textHeader}`,
              headerStyle: {
                backgroundColor: colors.backgroundHeader,
              },
              headerTitleStyle: {
                fontSize: 30,
              },
              headerTitleAlign: 'center',
            }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Simon Signin"
            component={Signin}
            options={{
              headerTintColor: `${colors.textHeader}`,
              headerStyle: {
                backgroundColor: colors.backgroundHeader,
              },
              headerTitleStyle: {
                fontSize: 30,
              },
              headerTitleAlign: 'center',
            }}
          />

          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{
              headerTintColor: `${colors.textHeader}`,
              headerStyle: {
                backgroundColor: colors.backgroundHeader,
              },
              headerTitleStyle: {
                fontSize: 30,
              },
              headerTitleAlign: 'center',
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

const MainNavigator = () => {
  return <StackNavigator />;
};

export default MainNavigator;
