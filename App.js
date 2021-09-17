import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';
import uploadToAnonymousFilesAsync from 'anonymous-files';

export default function App() {
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
            <View style={styles.container}>
                <Image
                    source={{uri: selectedImage.localUri}}
                    style={styles.thumbnail}
                />
                <TouchableOpacity
                    onPress={openShareDialogAsync}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>
                        Share this photo
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Image
                source={{uri: "https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2677520025.webp"}}
                style={styles.post}
            />
            <Text style={styles.instructions}>
                To share a photo from your phone with a friend, just press the button below!
            </Text>

            <TouchableOpacity
                onPress={openImagePickerAsync}
                style={styles.button}
            >
                <Text style={styles.buttonText}>
                    Pick a photo
                </Text>

            </TouchableOpacity>

            <StatusBar style='auto'/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        fontSize: 18,
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
