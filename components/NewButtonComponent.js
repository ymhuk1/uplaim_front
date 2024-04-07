import React from 'react';
import { View, TouchableOpacity, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {textColor4, textDisabledColor, textPrimaryColor} from "./ColorsComponent";
import head from "expo-router/head";

const GradientButton = ({ title, onPress, width, height, fontSize, disabled }) => {
    return (
        <TouchableOpacity onPress={onPress} disabled={onPress === null}>
                <LinearGradient
                    location={[  0.5, 0.5 ]}
                    start={[  0.4, -0.9 ]}
                    // end={[  0.1, 0.5 ]}
                    colors={disabled ? ['#7c7f86', '#5F5F65'] : ['#7434b7', '#7730e5']}
                    style={[styles.button, {width: width, height: height}]}>
                    {onPress === null ? (
                        <ActivityIndicator size="small" color="white" />
                    ) : (
                        <Text style={[styles.buttonText, {fontSize: fontSize}]}>{title}</Text>
                    )}
                </LinearGradient>
        </TouchableOpacity>
    );
};

const NewButtonComponent = ({ title, onPress, loading, width, filled, empty, height, fontSize, disabled }) => {
    return (
        <View style={styles.containerButton}>
            {filled && (
            <View>
                <GradientButton
                    onPress={loading ? null : onPress}
                    title={title}
                    width={width}
                    height={height}
                    fontSize={fontSize}
                    disabled={disabled}
                />
            </View>
             )}
            {empty && (
                <TouchableOpacity onPress={onPress} disabled={onPress === null}>
                        <View style={[disabled ? styles.buttonEmptyDisabled : styles.buttonEmpty, {width: width, height: height}]}>
                            <Text style={[disabled ? styles.buttonTextDisabled : styles.buttonText, {fontSize: fontSize}]}>{title}</Text>
                        </View>
                </TouchableOpacity>
            )}

        </View>
    );
};

const styles = StyleSheet.create({
    containerButton: {
    },
    button: {
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    buttonEmpty: {
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: textColor4,
        alignSelf: 'stretch',
    },
    buttonText: {
        color: 'white',
        paddingHorizontal: 10,
        marginBottom: 3,
        textAlign: "center",
    },
    buttonEmptyDisabled: {
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: textDisabledColor,
        alignSelf: 'stretch',
    },
    buttonTextDisabled: {
        color: textDisabledColor,
        paddingHorizontal: 10,
        marginBottom: 3,
        textAlign: "center",
    }
});

export default NewButtonComponent;
