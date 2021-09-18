import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StatusBar, StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";
import { GetHotSearchesByDuration } from '../api/hot-search';

const Item = ({search}) => {
    const {content} = search;
    return (
        <View style={styles.item}>
            <Text style={styles.title}>{content}</Text>
        </View>
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
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
});

export default CurrentHotSearch;
