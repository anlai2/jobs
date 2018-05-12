import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { Button, Icon } from 'react-native-elements';
import { Provider } from 'react-redux';

import store from './store';
import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import MapScreen from './screens/MapScreen';
import DeckScreen from './screens/DeckScreen';
import SettingsScreen from './screens/SettingsScreen';
import ReviewScreen from './screens/ReviewScreen';

export default class App extends React.Component {
	// React Navigation loads all screens, with lazy, screens are only loaded when being shown
	render() {
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
									headerRight:
										(<Button
											title='Settings'
											onPress={() => navigation.navigate('settings')}
											backgroundColor="rgba(0,0,0,0)"
											color="rgba(0,122,255,1)"
										/>
										)
								})
							},
							settings: { screen: SettingsScreen }
						}),
						navigationOptions: ({ navigation }) => ({
							tabBarLabel: 'Review Jobs',
							tabBarIcon: ({ tintColor }) => {
								return <Icon name='favorite' size={30} color={tintColor} />
							},
							style: {
								marginTop: Platform.OS === 'android' ? 24 : 0
							}
						})
					}
				}, {
					tabBarPosition: 'bottom',
					tabBarOptions: {
						labelStyle: { fontSize: 12 }
					}
				}),
			}
		}, {
				navigationOptions: { tabBarVisible: false },
				lazy: true
			});

		return (
			<Provider store={store}>
				<MainNavigator />
			</Provider>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
