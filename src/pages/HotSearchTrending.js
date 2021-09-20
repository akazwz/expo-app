import React, { useEffect, useState } from 'react';
import { TouchableOpacity, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Text, Input } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RNEChartsPro from "react-native-echarts-pro";
import moment from 'moment';
import * as Linking from 'expo-linking';
import Constants from 'expo-constants';
import { GetHotSearchesByContent } from '../api/hot-search';
import RankTrending from '../components/RankTrending';
import SearchBar from '../components/SearchBar';

const HotSearchTrending = ({navigation}) => {
    const start = '2021-08-20-00-00';
    moment.locale('zh-cn');
    const stop = moment().format('YYYY-MM-DD-HH-mm');
    const defaultDataset = [['time', 'rank', 'hot']];
    const [hotSearchesDataset, setHotSearchesDataset] = useState(defaultDataset);
    const [showChart, setShowChart] = useState(false);
    const [searchText, setSearchText] = useState();

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

    return (
        <View style={{backgroundColor: 'white', borderWidth: 0}}>
            <SearchBar showCancel={true} navigation={navigation}/>
            {showChart ? <RankTrending source={hotSearchesDataset}/> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {},
});

export default HotSearchTrending;
