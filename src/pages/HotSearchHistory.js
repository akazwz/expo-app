import React from 'react';
import { View } from 'react-native';
import HotCloudWord from '../components/HotCloudWord';
import { Button, useColorMode } from 'native-base';

const HotSearchHistory = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <View>
            <Button onPress={toggleColorMode}>T</Button>
        </View>
    );
};

export default HotSearchHistory;
