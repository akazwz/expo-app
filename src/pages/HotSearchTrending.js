import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, StatusBar, View } from 'react-native';
import { Button, Text } from 'react-native-elements';
import * as Linking from 'expo-linking';

const HotSearchTrending = () => {
    const handleBtnPress = () => {
        Linking.canOpenURL('sinaweibo').then(r => console.log(r));
    };
    return (
        <View>
            <Button onPress={handleBtnPress}  title='weibo'/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {},
});


export default HotSearchTrending;
