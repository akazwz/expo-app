import React from 'react';
import { View, StyleSheet } from "react-native";
import { Button, Text, Divider } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const HomeScreen = ({route, navigation}) => {
    const {post} = route.params;
    return (
        <View style={styles.homeView}>
            <Text h3>Home Screen</Text>
            <Text h3>
                {JSON.stringify(post)}
            </Text>
            <Divider orientation='horizontal' inset={true} insetType='middle' />
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
                    navigation.navigate('ImageShare', {
                        p: 'this is p',
                    });
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
