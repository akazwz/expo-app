import React from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Input, Text, ThemeProvider } from 'react-native-elements';
import CurrentHotSearch from './src/pages/CurrentHotSearch';
import HotSearchHistory from './src/pages/HotSearchHistory';
import HotSearchTrending from './src/pages/HotSearchTrending';
import Setting from './src/pages/Setting';

SplashScreen.preventAutoHideAsync().then();
setTimeout(SplashScreen.hideAsync, 2000);

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


const Home = () => {
    return (
        <Tab.Navigator
            initialRouteName='CurrentHotSearch'
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;
                    if ( route.name === 'CurrentHotSearch' ) {
                        iconName = focused
                            ? 'ios-flame'
                            : 'ios-flame-outline';
                    } else if ( route.name === 'HotSearchHistory' ) {
                        iconName = focused ? 'ios-calendar' : 'ios-time-outline';
                    } else if ( route.name === 'HotSearchTrending' ) {
                        iconName = focused ? 'ios-trending-up' : 'ios-trending-down';
                    } else if ( route.name === 'Setting' ) {
                        iconName = focused ? 'ios-build' : 'ios-settings-outline';
                    }
                    return <Ionicons name={iconName} size={size} color={color}/>;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen
                name='CurrentHotSearch'
                component={CurrentHotSearch}
                options={{
                    tabBarBadge: 3,
                    headerTitleAlign: 'center',
                    title: '今',
                }}
            />
            <Tab.Screen
                name='HotSearchHistory'
                component={HotSearchHistory}
                options={{
                    headerTitleAlign: 'center',
                    title: '史',
                    headerShown: false,

                }}
            />
            <Tab.Screen
                name='HotSearchTrending'
                component={HotSearchTrending}
                options={{
                    headerTitleAlign: 'center',
                    title: '势',
                    headerTitle: '',
                }}
            />
            <Tab.Screen
                name='Setting'
                component={Setting}
                options={{
                    headerTitleAlign: 'center',
                    title: '设'
                }}
            />
        </Tab.Navigator>
    );
};

const App = () => {
    return (
        <SafeAreaProvider>
            <ThemeProvider>
                <NavigationContainer>
                    <Stack.Navigator>
                        <Stack.Screen
                            name='Home'
                            component={Home}
                            options={{headerShown: false}}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </ThemeProvider>
        </SafeAreaProvider>
    );
};

export default App;


