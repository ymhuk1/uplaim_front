import React, { useState, useRef } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const SmsComponent = ({ placeholder, keyboardType, onSmsCodeChange }) => {
    const [code, setCode] = useState(['', '', '', '']);
    const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

    const handleChange = (text, index) => {
        const newCode = [...code];
        newCode[index] = text;
        setCode(newCode);

        if (text !== '' && index < inputRefs.length - 1) {
            inputRefs[index + 1].current.focus();
        } else if (text === '' && index > 0) {
            inputRefs[index - 1].current.focus();
        }

        // Передача smsCode наверх на SmsScreen
        onSmsCodeChange(newCode);
    };

    const handleBackspace = (index) => {
        if (index > 0) {
            inputRefs[index - 1].current.focus();
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.codeContainer}>
                {code.map((value, index) => (
                    <TextInput
                        key={index}
                        ref={inputRefs[index]}
                        style={styles.input}
                        placeholderTextColor={'rgba(255, 255, 255, 0.2)'}
                        placeholder={placeholder}
                        keyboardType={keyboardType}
                        value={value}
                        onChangeText={(text) => handleChange(text, index)}
                        onKeyPress={({ nativeEvent }) => {
                            if (nativeEvent.key === 'Backspace') {
                                handleBackspace(index);
                            }
                        }}
                        maxLength={1}
                    />
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    codeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    input: {
        width: 60,
        height: 60,
        borderRadius: 8,
        backgroundColor: 'rgba(18, 17, 35, 1)',
        color: 'white',
        textAlign: 'center',
        fontSize: 24,
        marginHorizontal: 5,
    },
});

export default SmsComponent;
