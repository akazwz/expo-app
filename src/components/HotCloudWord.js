import React, { useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-elements';
import CloudWord from "./CloudWord";

const HotCloudWord = () => {
    const fadeAnim = useRef(new Animated.Value(1)).current;

    const fadeIn = () => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 2000,
        }).start();
    };

    const fadeOut = () => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 2000,
        }).start();
    };

    const words = ['zwz', 'edc', 'wen'];

    return (
        <View style={styles.container}>
            <Animated.View style={{
                flexDirection: 'row',
            }}>
                {words.map((word, index) => {
                    return (
                        <CloudWord
                            style={{
                                fontSize: 30,
                                color: 'dark',
                                margin: 10,
                            }}
                            key={word}
                            value={word}
                        />
                    );
                })}
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row'
    },
    fadingContainer: {
        backgroundColor: 'powderblue',
    },
});

export default HotCloudWord;
