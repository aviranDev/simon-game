import React from 'react';
import MainNavigator from './Navigator/MainNavigator';
import LoginProvider from './context/LoginProvider';
import ApiProvider from './context/ApiProvider';
import {NavigationContainer} from '@react-navigation/native';
import {Provider, useDispatch} from 'react-redux';
import {View, ImageBackground, StatusBar} from 'react-native';
import {store} from './redux/store';

const App = () => {
  return (
    <LoginProvider>
      <StatusBar backgroundColor="#000" />
      <Provider store={store}>
        <ApiProvider>
          <NavigationContainer>
            <MainNavigator />
          </NavigationContainer>
        </ApiProvider>
      </Provider>
    </LoginProvider>
  );
};

export default App;
