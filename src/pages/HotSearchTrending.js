import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, StatusBar, View } from 'react-native';
import { Button, Text } from 'react-native-elements';
import RNEChartsPro from "react-native-echarts-pro";
import moment from 'moment';
import * as Linking from 'expo-linking';
import { GetHotSearchesByContent } from '../api/hot-search';
import RankTrending from '../components/RankTrending';

const HotSearchTrending = () => {
    const start = '2021-08-20-00-00';
    moment.locale('zh-cn');
    const stop = moment().format('YYYY-MM-DD-HH-mm');
    const defaultDataset = [['time', 'rank', 'hot']];
    const [hotSearchesDataset, setHotSearchesDataset] = useState(defaultDataset);
    const [showChart, setShowChart] = useState(false);
    const getHotSearches = (cont, start, stop) => {
        GetHotSearchesByContent(cont, start, stop)
            .then((res) => {
                if ( res.status !== 200 ) {
                    alert('获取数据失败');
                }
                const {code, data, msg} = res.data
                if ( code !== 2000 ) {
                    alert('获取数据失败');
                }
                for ( let i = 0; i < data.length; i ++ ) {
                    const hotSearch = data[i];
                    const {time, searches} = hotSearch;
                    const singleSearch = searches[0];
                    const {rank, hot} = singleSearch;
                    defaultDataset.push(
                        [time, rank, hot]
                    );
                }
                setHotSearchesDataset(defaultDataset);
                setShowChart(true);
            }).catch(() => {
            alert('获取数据失败');
        });
    };
    useEffect(() => {
    }, []);
    const handleBtnPress = () => {
        getHotSearches('王一博被扛走了', start, stop);
    };
    return (
        <View>
            <Button onPress={handleBtnPress} title='refresh'/>
            {showChart ? <RankTrending source={hotSearchesDataset}/>: null}

        </View>
    );
};

const styles = StyleSheet.create({
    container: {},
});

export default HotSearchTrending;
