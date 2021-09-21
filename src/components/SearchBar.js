import React, { useEffect, useRef, useState } from 'react';
import { Input, Text } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity, View } from 'react-native';
import Constants from 'expo-constants';

const SearchBar = (props) => {
    const [showCancelState, setShowCancelState] = useState(false);
    const [inputTextAlign, setInputTextAlign] = useState('center');
    const {showCancel, navigation, placeHolder, searchText, handleSearchText} = props;
    const input = useRef();
    useEffect(() => {
        setShowCancelState(showCancel);
    }, [showCancel]);

    const handleHandleInputOnFocus = () => {
        setShowCancelState(true);
        setInputTextAlign('left');
        handleSearchText('');
        input.current.clear();
        navigation.setOptions({
            headerStatusBarHeight: 0,
        });
    };

    const handleCancelOnPress = () => {
        setShowCancelState(false);
        input.current.clear();
        input.current.blur();
        navigation.setOptions({
            headerStatusBarHeight: Constants.statusBarHeight,
        });
        handleSearchText('');
    };

    const handleInputTextOnChange = (value) => {
        handleSearchText(value);
    };

    useEffect(() => {
    }, []);

    return (
        <View style={{flexDirection: 'row', marginTop: 10, marginBottom: 10}}>
            <Input
                ref={input}
                value={searchText}
                onChangeText={handleInputTextOnChange}
                onFocus={handleHandleInputOnFocus}
                returnKeyType='search'
                onSubmitEditing={() => {
                    setInputTextAlign('left');
                    handleSearchText(searchText);
                }}
                leftIcon={
                    <Ionicons
                        name='ios-search'
                        size={17}
                        color='#8C8C8C'
                    />
                }
                placeholder={placeHolder}
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
                    textAlign: inputTextAlign,
                    fontSize: 15,
                }}
            />
            {showCancelState ?
                <TouchableOpacity
                    style={{
                        paddingStart: 5,
                        paddingEnd: 15
                    }}
                    onPress={handleCancelOnPress}
                >
                    <Text style={{
                        fontSize: 17,
                        textAlignVertical: 'center',
                        lineHeight: 37,
                        color: '#1D8FF2',
                        fontWeight: '400',
                    }}>取消</Text>
                </TouchableOpacity> : null}
        </View>
    );
};

export default SearchBar;
