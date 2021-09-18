import React, { useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from 'react-native-elements';
import HomeScreen from './src/pages/HomeScreen';
import ImageShare from './src/pages/ImageShare';
import CurrentHotSearch from './src/pages/CurrentHotSearch';

SplashScreen.preventAutoHideAsync().then();
setTimeout(SplashScreen.hideAsync, 5000);

const HomeStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStackScreen = () => {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name='Home' component={HomeScreen} />
            <HomeStack.Screen name='HotSearch' component={CurrentHotSearch} />
        </HomeStack.Navigator>
    );
};

const App = () => {
    return (
        <SafeAreaProvider>
            <ThemeProvider>
                <NavigationContainer>
                    <Tab.Navigator
                        initialRouteName='Home'
                        screenOptions={({route}) => ({
                            tabBarIcon: ({focused, color, size}) => {
                                let iconName;
                                if (route.name === 'Home') {
                                    iconName = focused
                                        ? 'home'
                                        : 'home-outline';
                                } else if (route.name === 'ImageShare') {
                                    iconName = focused ? 'image' : 'image-outline';
                                }
                                return <Ionicons name={iconName} size={size} color={color} />;
                            },
                            tabBarActiveTintColor: 'tomato',
                            tabBarInactiveTintColor: 'gray',
                        })}
                    >
                        <Tab.Screen
                            name='Home'
                            component={HomeStackScreen}
                            options={{
                                tabBarBadge: 3,
                            }}
                            initialParams={{post: 'init post'}}
                        />
                        <Tab.Screen
                            name='ImageShare'
                            component={ImageShare}
                            initialParams={{p: 'this is init p'}}
                        />
                    </Tab.Navigator>
                </NavigationContainer>
            </ThemeProvider>
        </SafeAreaProvider>
    );
};

export default App;


