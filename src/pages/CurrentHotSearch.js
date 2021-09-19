import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StatusBar, StyleSheet, View } from "react-native";
import { ListItem, Avatar, Text } from "react-native-elements";
import { GetHotSearchesByDuration } from '../api/hot-search';

const Item = ({search}) => {
    const {content, rank} = search;
    return (
        <ListItem bottomDivider style={styles.item}>
            <Avatar
                rounded
                title={rank}
                titleStyle={{color: 'black'}}
                containerStyle={{backgroundColor: 'grey'}}
            />
            <Text style={styles.title}>{content}</Text>
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
                console.log('some' + code);
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
        marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        backgroundColor: '#f9c2ff',
    },
    title: {
        fontSize: 16,
    },
});

export default CurrentHotSearch;
