import React from 'react';
import RNEChartsPro from "react-native-echarts-pro";
import { View } from 'react-native';
import { Text } from 'react-native-elements';

const RankTrending = (props) => {
    const rankChartOptions = {
        title: {
            text: '排行榜趋势'
        },
        tooltips: {
            trigger: 'axis',
        },
        dataset: {
            source: props.source,
        },
        xAxis: {
            type: 'time',
            position: 'top',
            axisPointer: {
                label: {
                    show: true,
                },
            },
        },
        yAxis: {
            position: 'left',
            inverse: true,
        },
        series: [
            {
                type: 'line',
                encode: {
                    x: 'time',
                    y: 'rank',
                },
                label: {
                    show: true,
                    position: 'bottom',
                },
            },
        ],
    };
    return (
        <View>
            <Text>
                this is rank trending.
            </Text>
            <RNEChartsPro height={500} option={rankChartOptions} />
        </View>
    );
};

export default RankTrending;
