import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator, createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from "react-navigation-stack";
import {Ionicons} from "@expo/vector-icons";

import HomeScreen from './../scenes/home/index';
import MapScreen from './../scenes/map/index';
import AnimationScreen from '../scenes/animation/index';
import VelibScreen from '../scenes/velibList/index';
import StationScreen from "../scenes/station/index";
import FavoriteScreen from "../scenes/favorite";

const VelibTabs = createMaterialTopTabNavigator({
    Velibs: {
        screen: VelibScreen,
        navigationOptions: {
            title: 'Stations',
        }
    },
    Favorite: {
        screen: FavoriteScreen,
        navigationOptions: {
            title: 'Favorites',
        }
    },
}, {
    tabBarPosition: 'top',
    tabBarOptions: {
        activeTintColor: '#FFFFFF',
        indicatorStyle: {
            backgroundColor: 'skyblue',
        },
        style: {
            backgroundColor: 'steelblue',
        },
    },
    navigationOptions: {
        title: 'Stations proches (<1km)',
    }
});

const VelibStack = createStackNavigator({
    VelibTabs: VelibTabs,
    StationDetails: {
        screen: StationScreen,
    },
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: 'steelblue',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    },
});

const AppTabNavigator = createBottomTabNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
                <Ionicons name="md-home" size={25} color={tintColor} />
            ),
        },
    },
    Map: {
        screen: MapScreen,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
                <Ionicons name="md-map" size={25} color={tintColor} />
            ),
        },
    },
    Animation: {
        screen: AnimationScreen,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
                <Ionicons name="md-cube" size={25} color={tintColor} />
            ),
        },
    },
    Velibs: {
        screen: VelibStack,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
                <Ionicons name="md-book" size={25} color={tintColor} />
            ),
        },
    }
}, {
    initialRouteName: 'Home',
    tabBarOptions: {
        activeTintColor: 'skyblue',
        inactiveTintColor: '#FFFFFF',
        style: {
            backgroundColor: 'steelblue',
        }
    },
});

const AppContainer = createAppContainer(AppTabNavigator);

export default AppContainer;