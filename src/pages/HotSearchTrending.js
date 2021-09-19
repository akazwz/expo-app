import React, { useEffect, useState } from 'react';
import { TouchableOpacity, ScrollView, StyleSheet, StatusBar, View } from 'react-native';
import { Button, Text, Input } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
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
    const handleBtnPress = () => {
        getHotSearches('王一博被扛走了', start, stop);
    };
    return (
        <View>
            <View style={{flexDirection: 'row'}}>
                <Input
                    leftIcon={
                        <Ionicons
                            name='ios-search'
                            size={17}
                            color='#8C8C8C'
                        />
                    }
                    placeholder={'大家正在搜: 王一博被扛走了'}
                    placeholderTextColor='#8C8C8C'
                    leftIconContainerStyle={{
                        marginLeft: '3%'
                    }}
                    inputContainerStyle={{
                        borderWidth: 0,
                        borderBottomWidth: 0,
                        borderRadius: 9,
                        height: 35,
                        backgroundColor: '#D9D9D9'
                    }}
                    containerStyle={{
                        height: 37,
                        flex: 1,
                    }}
                    inputStyle={{
                        textAlign: 'left',
                        fontSize: 17,
                    }}
                />
                <TouchableOpacity>
                    <Text style={{fontSize: 17}}>取消</Text>
                </TouchableOpacity>
            </View>
            {showChart ? <RankTrending source={hotSearchesDataset}/> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {},
});

export default HotSearchTrending;
