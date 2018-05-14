import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { Button, Icon } from 'react-native-elements';
import configureStore from './store';
import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import MapScreen from './screens/MapScreen';
import DeckScreen from './screens/DeckScreen';
import ReviewScreen from './screens/ReviewScreen';
import SettingsScreen from './screens/SettingsScreen';

export default class App extends React.Component {
  render() {
    const { persistor, store } = configureStore();
    const MainNavigator = createBottomTabNavigator({
      welcome: { screen: WelcomeScreen },
      auth: { screen: AuthScreen },
      main: {
        screen: createBottomTabNavigator({
          map: { screen: MapScreen },
          deck: { screen: DeckScreen },
          review: {
            screen: createStackNavigator({
              review: {
                screen: ReviewScreen,
                navigationOptions: ({ navigation }) => ({
                  title: 'Review Jobs',
                  headerRight: (<Button
                    title="Settings"
                    onPress={() => navigation.navigate('settings')}
                    backgroundColor="rgba(0,0,0,0)"
                    color="rgba(0,122,255,1)"
                  />
                  ),
                }),
              },
              settings: { screen: SettingsScreen },
            }),
            navigationOptions: () => ({
              tabBarLabel: 'Review Jobs',
              tabBarIcon: ({ tintColor }) => <Icon name="favorite" size={30} color={tintColor} />,
              style: {
                marginTop: Platform.OS === 'android' ? 24 : 0,
              },
            }),
          },
        }, {
          tabBarPosition: 'bottom',
          tabBarOptions: {
            labelStyle: { fontSize: 12 },
          },
        }),
      },
    }, {
      navigationOptions: { tabBarVisible: false },
      lazy: true,
    });
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <View style={styles.container}>
            <MainNavigator />
          </View>
        </PersistGate>
      </Provider>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
