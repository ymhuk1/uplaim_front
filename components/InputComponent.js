import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const InputComponent = ({ placeholder, keyboardType, value, onChangeText, error }) => {
    const [phone, setPhone] = React.useState('');

    const handleInputFocus = () => {
        if (error !== '') {
            onChangeText('');
        }
    };


    return (
        <View>
            <TextInput
                style={styles.input}
                placeholderTextColor="rgba(255, 255, 255, 0.2)"
                placeholder={placeholder}
                keyboardType={keyboardType}
                value={value}
                onChangeText={onChangeText}
                onFocus={handleInputFocus}
            />
            {error !== '' && (
                <Text style={styles.errorText}>{error}</Text>
            )}
        </View>
    );
};
const styles = StyleSheet.create({
    input: {
        padding: 10,
        paddingHorizontal: 15,
        width: 280,
        height: 48,
        borderRadius: 8,
        backgroundColor: 'rgba(18, 17, 35, 1)',
        color: 'white',
        marginBottom: 25,
    },
    errorText: {
        fontSize: 12,
        color: 'red',
        marginTop: -26,
        marginLeft: 5,
        paddingVertical: 5,
    },
});

export default InputComponent;
