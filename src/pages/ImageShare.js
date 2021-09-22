import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { ActivityIndicator, Platform, StyleSheet, ScrollView } from 'react-native';
import { Image, Text, Button } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';
import uploadToAnonymousFilesAsync from 'anonymous-files';
import Icon from "react-native-vector-icons/FontAwesome";

const ImageShare = ({navigation}) => {
    const [selectedImage, setSelectedImage] = useState(null);
    let openImagePickerAsync = async() => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if ( permissionResult.granted === false ) {
            alert("Permission to access camera roll is requires!");
            return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync();
        console.log(pickerResult);

        const {cancelled, uri} = pickerResult;
        if ( cancelled === true ) {
            return;
        }

        if ( Platform.OS === 'web' ) {
            let remoteUri = await uploadToAnonymousFilesAsync(uri);
            setSelectedImage({localUri: uri, remoteUri});
        } else {
            setSelectedImage({localUri: uri, remoteUri: null});
        }
    };

    let openShareDialogAsync = async() => {
        if ( !(await Sharing.isAvailableAsync()) ) {
            alert(`The image is available for sharing at: ${selectedImage.remoteUri}`);
            return;
        }
        await Sharing.shareAsync(selectedImage.localUri);
    };

    if ( selectedImage !== null ) {
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <Image
                    source={{uri: selectedImage.localUri}}
                    style={styles.thumbnail}
                    placeholderContent={<ActivityIndicator/>}
                />
                <Button
                    icon={<Icon name='share-alt'/>}
                    title='ShareScreen this photo'
                    onPress={openShareDialogAsync}
                />
            </ScrollView>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container} scrollEnabled={true}>
            <Image
                source={{uri: "https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2677520025.webp"}}
                style={styles.post}
                placeholderContent={<ActivityIndicator/>}
            />
            <Text h4 h4Style={styles.instructions}>
                To share a photo from your phone with a friend, just press the button below!
            </Text>

            <Button
                icon={
                    <Icon name='image'/>
                }
                title='Pick a photo'
                onPress={openImagePickerAsync}
            />

            <Button
                icon={
                    <Icon name='arrow-left'/>
                }
                title='Go back'
                onPress={() => navigation.goBack()}
            />

            <Button
                title='Change route params'
                onPress={() => navigation.setParams({
                    p: 'change p',
                })}
            />

            <Button
                title='Done'
                onPress={() => navigation.navigate({
                    name: 'Home',
                    params: {post: 'this is post',},
                    merge: true,
                })}
            />
            <StatusBar style='auto'/>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    post: {
        width: 270,
        height: 400,
        marginBottom: 10,
    },
    instructions: {
        color: '#888',
        marginHorizontal: 15,
    },
    button: {
        backgroundColor: "blue",
        padding: 20,
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 20,
        color: '#fff',
    },
    thumbnail: {
        width: 300,
        height: 300,
        resizeMode: "contain",
    },
});

export default ImageShare;
