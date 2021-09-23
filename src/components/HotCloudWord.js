import React, { useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-elements';
import RNEChartsPro from "react-native-echarts-pro";

const HotCloudWord = () => {
    const rankChartOptions = {
        series: [{
            type: 'wordCloud',
            shape: 'circle',
            left: 'center',
            top: 'center',
            width: '70%',
            height: '80%',
            right: null,
            bottom: null,
            sizeRange: [12, 60],
            rotationRange: [-90, 90],
            rotationStep: 45,
            gridSize: 8,
            drawOutOfBound: false,
            layoutAnimation: true,
            textStyle: {
                fontFamily: 'sans-serif',
                fontWeight: 'bold',
                color: function () {
                    // Random color
                    return 'rgb(' + [
                        Math.round(Math.random() * 160),
                        Math.round(Math.random() * 160),
                        Math.round(Math.random() * 160)
                    ].join(',') + ')';
                }
            },
            emphasis: {
                focus: 'self',

                textStyle: {
                    textShadowBlur: 10,
                    textShadowColor: '#333'
                }
            },
            data: [{
                name: 'Farrah Abraham',
                value: 366,
                // Style of single text
                textStyle: {}
            }]
        }]
    };
    return (
        <View style={{alignItems: 'center'}}>
            <Text h4>word cloud</Text>
            <RNEChartsPro height={500} option={rankChartOptions} />
        </View>
    );
};

export default HotCloudWord;
