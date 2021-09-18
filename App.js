import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';
import uploadToAnonymousFilesAsync from 'anonymous-files';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from 'react-native-elements';
import HomeScreen from './src/pages/HomeScreen';
import ImageShare from './src/pages/ImageShare';

SplashScreen.preventAutoHideAsync().then();
setTimeout(SplashScreen.hideAsync, 5000);

const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <SafeAreaProvider>
            <ThemeProvider>
                <NavigationContainer>
                    <Stack.Navigator initialRouteName='Home'>
                        <Stack.Screen
                            name='Home'
                            component={HomeScreen}
                            options={{title: 'Overview'}}
                        />
                        <Stack.Screen name='ImageShare' component={ImageShare} />
                    </Stack.Navigator>
                </NavigationContainer>
            </ThemeProvider>
        </SafeAreaProvider>
    );
};

export default App;


