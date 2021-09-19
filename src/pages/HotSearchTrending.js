import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, StatusBar, View } from 'react-native';
import { Button, Text } from 'react-native-elements';
import * as Linking from 'expo-linking';

const HotSearchTrending = () => {
    const handleBtnPress = () => {
        if ( !Linking.canOpenURL('sinaweibo://gotohome') ) {
            alert('please install weibo');
        }
        Linking.openURL('sinaweibo://gotohome').then();
    };
    return (
        <View>
            <Button onPress={handleBtnPress} title='weibo'/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {},
});


export default HotSearchTrending;
