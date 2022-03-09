/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors, Header} from 'react-native/Libraries/NewAppScreen';

import messaging from '@react-native-firebase/messaging';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const saveToken = (token: string) => {
    console.log('TOKEN: ', token);
  };

  const registering = async () => {
    console.log('registering');
    await messaging().registerDeviceForRemoteMessages();
    saveToken(await messaging().getToken());
  };

  registering();

  const backGroundHandler = messaging().setBackgroundMessageHandler(
    async remoteMessage => {
      console.log('**** 1 - backGroundHandler');
      console.log(remoteMessage);
      console.log('**** 2 - backGroundHandler');
      return backGroundHandler;
    },
  );

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('Nova mensagem recebida: ', JSON.stringify(remoteMessage));
      return unsubscribe;
    });
    return messaging().onTokenRefresh(token => saveToken(token));
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Text
            style={{
              fontSize: 24,
            }}>
            POC - Firebase Cloud Messaging usage
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
