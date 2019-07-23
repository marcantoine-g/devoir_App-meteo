'use strict';
import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { PageStart } from "./Screens/PageStart";
import { PageConnect } from "./Screens/PageConnect";
import { PageDetails } from "./Screens/PageDetails";

const MainNavigator = createStackNavigator({
	Start: { screen: PageStart, navigationOptions : { header: null, gesturesEnabled: false} },
	Connect : {screen: PageConnect, navigationOptions: { header: null, gesturesEnabled: true}},
	Details : {screen: PageDetails, navigationOptions: { header: null, gesturesEnabled: true}}
});

const App = createAppContainer(MainNavigator);

export default App;
