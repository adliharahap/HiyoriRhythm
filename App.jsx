import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreenPages from './src/pages/SplashScreenPages';
import OnboardingScreen from './src/pages/onboarding/OnboardingScreen';
import FIleAksesDenied from './src/pages/FileAksesDenied/FIleAksesDenied';
import FileAksesBlocked from './src/pages/FileAksesDenied/FileAksesBlocked';
import NameInputScreen from './src/pages/onboarding/NameInputScreen';
import TrackPlayer, { State } from 'react-native-track-player';
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import MainScreen from './src/pages/MainScreen';
import PlayMusicScreen from './src/pages/screens/PlayMusicScreen';

const Stack = createNativeStackNavigator();

const App = () => {

  useEffect(() => {
    isPlayerInitialized();
  }, []);

  async function isPlayerInitialized() {
    
    try {
      await TrackPlayer.setupPlayer();
      
    } catch (e) {
      console.log(" error : ", e);
      
    }
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false, animation: 'slide_from_bottom'}} initialRouteName='SplashScreen'>
          <Stack.Screen name='SplashScreen' component={SplashScreenPages} />
          <Stack.Screen name='Onboarding' component={OnboardingScreen} />
          <Stack.Screen name='AksesDenied' component={FIleAksesDenied} />
          <Stack.Screen name='AksesBLocked' component={FileAksesBlocked} />
          <Stack.Screen name='InputName' component={NameInputScreen} />
          <Stack.Screen name='MainScreen' component={MainScreen} />
          <Stack.Screen name='MusicPlay' component={PlayMusicScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}


export default App;