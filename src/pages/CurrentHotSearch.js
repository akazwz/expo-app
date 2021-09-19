import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StatusBar, StyleSheet, View } from "react-native";
import { ListItem, Avatar, Text, Chip } from "react-native-elements";
import { GetHotSearchesByDuration } from '../api/hot-search';
import Ionicons from 'react-native-vector-icons/Ionicons';


const Item = ({search}) => {
    const {content, rank, hot, tag} = search;

    const handleItemOnPress = () => {
        alert(content);
    };

    const handleItemOnLongPress = () => {
        alert(content + 'long');
    }

    return (
        <ListItem
            bottomDivider
            onPress={handleItemOnPress}
            onLongPress={handleItemOnLongPress}
        >
            <Text style={{
                color: rank <= 3 ? '#F24949' : '#F28241',
                fontWeight: rank <= 3 ? '700' : '300',
                fontStyle: 'italic',
            }}>
                {rank}
            </Text>
            <ListItem.Content>
                <View style={styles.item}>
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
                </View>
            </ListItem.Content>
        </ListItem>
    );
};

const CurrentHotSearch = () => {
    const [hotSearchData, setHotSearchData] = useState({
        time: 'time',
        imageFile: 'image file',
        searches: [],
    });

    const renderItem = ({item}) => {
        return (
            <Item search={item}/>
        );
    };

    useEffect(() => {
        const start = '';
        const stop = '';
        GetHotSearchesByDuration(start, stop)
            .then(r => {
                const {code, data, msg} = r.data;
                if ( code !== 2000 ) {
                    alert('获取数据失败');
                }
                const {image_file, searches, time} = data;
                setHotSearchData({
                    time: time,
                    imageFile: image_file,
                    searches: searches,
                });
            });
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
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
    },
    hot: {
        fontSize: 13,
        fontWeight: '100',
    }
});

export default CurrentHotSearch;
