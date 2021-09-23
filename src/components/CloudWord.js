import React from 'react';
import { View, Animated, Text } from "react-native";

const CloudWord = (props) => {
    const {center, box, scale, pan, style, value} = props;
    return (
        <Animated.View>
            <Text style={style}>
                {value}
            </Text>
        </Animated.View>
    );
};

export default CloudWord;
