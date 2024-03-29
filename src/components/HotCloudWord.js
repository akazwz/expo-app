import React from 'react';
import { View } from 'react-native';
import RNEChartsPro from "react-native-echarts-pro";
import { useColorMode } from 'native-base';

const HotCloudWord = (props) => {
    const colors = [
        '#be123c',
        '#881337',
        '#b91c1c',
        '#c2410c',
        '#fb923c',
        '#164e63',
        '#22d3ee',
        '#c026d3',
        '#a855f7',
    ];
    const chartOptions = {
        title: {},
        series: [{
            type: 'wordCloud',
            shape: 'circle',
            maskImage: false,
            left: 'center',
            top: 'center',
            width: '90%',
            height: '90%',
            right: null,
            bottom: null,
            sizeRange: [15, 50],
            rotationRange: [- 90, 90],
            rotationStep: 45,
            gridSize: 8,
            drawOutOfBound: false,
            layoutAnimation: true,
            textStyle: {
                fontFamily: 'sans-serif',
                fontWeight: 'bold',
                color: function() {
                    return 'rgb(' + [
                        Math.round(Math.random()*160),
                        Math.round(Math.random()*160),
                        Math.round(Math.random()*160)
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
            data: props.data
        }]
    };
    return (
        <View style={{alignItems: 'center'}}>
            <RNEChartsPro height={210} option={chartOptions}/>
        </View>
    );
};

export default HotCloudWord;
