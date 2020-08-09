import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import EventListener from 'react-event-listener';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HalfScreen from './screens/half';
import OrderScreen from './screens/order';

const MainStack = createStackNavigator(
  {
    Order: OrderScreen,
    Half: HalfScreen,
  }
)

const AppContainer = createAppContainer(MainStack)

export default class App extends Component {
  render() {
    return (<AppContainer />);
  }
}
