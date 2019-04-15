/**
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */
import React from 'react';
import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from './src/Home';
import TripScreen from './src/Trip';
import HealthScreen from './src/Health';
import ProfileScreen from './src/Profile';
import VoiceCommandScreen from './src/VoiceCommand';

import GraphDetails from './src/Home/GraphDetail';
import HealthHistory from './src/Health/HistoryList'; 
import { majorColor, lightColor } from './app.json';

const HomeNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
  },
  DetailPage: { 
    screen: GraphDetails,
  },
})

const HealthNavigator = createStackNavigator({
  Health: {
    screen: HealthScreen
  },
  History: {
    screen: HealthHistory
  }
})

const AppNavigator = createBottomTabNavigator(
  {
    Home: { screen: HomeNavigator },
    Commands: { screen: VoiceCommandScreen },
    Health: { screen: HealthNavigator }, 
    Trips: { screen: TripScreen },
    Profile: { screen: ProfileScreen },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        const Material = MaterialCommunityIcons;
        const size = 25;
        const color = tintColor;
        let name = ''
        if (routeName === 'Home') {
          name = "view-dashboard-outline";
        } else if (routeName === 'Trips') {
          name = "map-outline"
        } else if (routeName === 'Health') {
          name = "heart-outline"
        } else if (routeName === 'Profile') {
          name = "account-outline"
        } else if (routeName === 'Commands') {
          name = "voice"
        }
        return <Material name={name} size={size} color={color} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: majorColor,
      inactiveTintColor: lightColor,
    },
  }
)

export default createAppContainer(AppNavigator)