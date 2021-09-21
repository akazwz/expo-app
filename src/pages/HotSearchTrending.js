import React, { useEffect, useState } from 'react';
import { TouchableOpacity, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Text, Input, Divider } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RNEChartsPro from "react-native-echarts-pro";

import moment from 'moment';
import { GetHotSearchesByContent } from '../api/hot-search';
import { Wave, Flow } from 'react-native-animated-spinkit'
import RankTrending from '../components/RankTrending';
import SearchBar from '../components/SearchBar';

const HotSearchTrending = ({route, navigation}) => {
    const {content} = route.params;
    const start = '2021-08-20-00-00';
    moment.locale('zh-cn');
    const stop = moment().format('YYYY-MM-DD-HH-mm');
    const defaultDataset = [['time', 'rank', 'hot']];
    const [hotSearchesDataset, setHotSearchesDataset] = useState(defaultDataset);
    const [searchText, setSearchText] = useState(content);
    const [placeHolder, setPlaceHolder] = useState('大家都在搜:王一博被扛走了');
    const [topicLead, setTopicLead] = useState('');
    const [showTopicLead, setShowTopicLead] = useState(false);
    const [showChart, setShowChart] = useState(false);
    const [showData, setShowData] = useState(false);
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
                const {searches} = data[0];
                const {topic_lead} = searches[0];
                setTopicLead(topic_lead);
                setShowTopicLead(true);
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

    const handleSearchText = (value) => {
        setSearchText(value);
    }

    // tab跳转
    useEffect(() => {
        if ( content !== '' ) {
            getHotSearches(content, start, stop);
            setShowData(true);
            setSearchText(content);
        }
    }, [content]);

    return (
        <View style={{backgroundColor: 'white', borderWidth: 0}}>
            <SearchBar
                navigation={navigation}
                placeHolder={placeHolder}
                handleSearchText={handleSearchText}
                searchText={searchText}
            />
            <Text>
                searchText: {searchText}
            </Text>
            <Divider/>
            {showData ? <View>
                <View style={{margin: 10}}>
                    {showTopicLead ? <Text>{topicLead}</Text> : <Flow color='#8C8C8C' style={{alignSelf: 'center'}}/>}
                </View>
                <Divider/>
                {showChart ? <RankTrending source={hotSearchesDataset}/>
                    : <View style={{width: '100%', height: '90%', justifyContent: 'center'}}>
                        <Wave color='#8C8C8C' style={{alignSelf: 'center'}}/>
                    </View>}
            </View> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {},
});

export default HotSearchTrending;
