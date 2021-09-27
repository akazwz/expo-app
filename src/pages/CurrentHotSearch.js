import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet } from "react-native";
import {
    Box,
    FlatList,
    HStack,
    Text,
    StatusBar,
} from "native-base"
import { GetCurrentHotSearch, GetHotSearchesByDuration } from '../api/hot-search';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HotCloudWord from "../components/HotCloudWord";

const Item = (props) => {
    const {rank, content, link, hot, tag, icon} = props.search;
    // press
    const handleItemOnPress = () => {
        //props.navigation.navigate('HotSearchTrending', {content: content});
        alert(link);
    };
    // long press
    const handleItemOnLongPress = () => {
        alert(content + 'long');
    }
    return (
        <Box
            borderBottomWidth='1'
            _dark={{
                backgroundColor: 'black',
                borderColor: "gray.600",
            }}
            borderColor='coolGray.200'
            pl='4'
            pr='5'
            py='2'
        >
            <HStack>
                <Text
                    style={{
                        color: rank <= 3 ? '#F24949' : '#F28241',
                        fontWeight: rank <= 3 ? '700' : '300',
                        fontStyle: 'italic',
                    }}>
                    {rank}
                </Text>
                <Text style={styles.content}>{content}</Text>
                <Ionicons name='ios-flame' size={15} color='#F24949'/>
                <Text style={styles.hot}>{hot}</Text>
                {tag === '' ?
                    null :
                    <>
                        <Ionicons name='ios-pricetag' size={15} color='#F28241'/>
                        <Text style={styles.hot}>{tag}</Text>
                    </>
                }
                {icon === '' ?
                    null :
                    <Text
                    >
                        {icon}
                    </Text>
                }
            </HStack>
        </Box>
    );
};

const CurrentHotSearch = ({navigation}) => {
    const [wordData, setWordData] = useState([]);
    const [hotSearchData, setHotSearchData] = useState({
        time: 'time',
        searches: [],
    });

    const renderItem = ({item}) => {
        return (
            <Item search={item} navigation={navigation}/>
        );
    };

    useEffect(() => {
        GetCurrentHotSearch()
            .then(r => {
                const {code, data, msg} = r.data;
                if ( code !== 2000 ) {
                    alert('获取数据失败');
                }
                const {searches, time} = data;
                const wordArr = searches.slice(0, 20)
                let wordDataArr = [];
                wordArr.map((search) => {
                    const {content, hot} = search;
                    wordDataArr.push({name: content, value: hot})
                    return "";
                });
                setWordData(wordDataArr);
                setHotSearchData({
                    time: time,
                    searches: searches,
                });
            });
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar/>
            <FlatList
                ListHeaderComponent={<HotCloudWord data={wordData}/>}
                data={hotSearchData.searches}
                renderItem={renderItem}
                keyExtractor={item => {
                    const {rank} = item;
                    return rank.toString();
                }}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        flexDirection: 'row',
    },
    content: {
        fontSize: 15,
        marginLeft: 7,
    },
    hot: {
        fontSize: 13,
        fontWeight: '100',
    },
    icon: {
        width: 17,
        height: 17,
        color: "red"
    },
});

export default CurrentHotSearch;
