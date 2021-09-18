import React from 'react';
import { View, StyleSheet } from "react-native";
import { Button, Text, Divider } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const HomeScreen = ({navigation}) => {
    return (
        <View style={styles.homeView}>
            <Text h3>Home Screen</Text>
            <Divider/>
            <Button
                icon={
                    <Icon
                        name='arrow-right'
                        size={15}
                        color='white'
                    />
                }
                title='Go to ImageShare'
                onPress={() => {
                    navigation.navigate('ImageShare');
                }}
            />
            <Divider/>
            <Button
                icon={
                    <Icon
                        name='arrow-right'
                        size={15}
                        color='white'
                    />
                }
                title='Go to Share'
                onPress={() => {
                    navigation.navigate('Share');
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create(
    {
        homeView: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        }
    }
);

export default HomeScreen;
