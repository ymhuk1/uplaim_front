import React from 'react';
import { View, TouchableOpacity, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FONTS } from '../constants/theme';

const GradientButton = ({ title, onPress, width }) => {
    return (
        <TouchableOpacity onPress={onPress} disabled={onPress === null}>
            <LinearGradient
                colors={['#AB5FC4', '#7012CF']}
                style={[styles.button, {width: width}]}>
                {onPress === null ? (
                    <ActivityIndicator size="small" color="white" />
                ) : (
                    <Text style={styles.buttonText}>{title}</Text>
                )}
            </LinearGradient>
        </TouchableOpacity>
    );
};

const ButtonComponent = ({ title, onPress, loading, width }) => {
    return (
        <View>
            <GradientButton
                onPress={loading ? null : onPress}
                title={title}
                width={width}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        height: 48,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontFamily: FONTS.medium,
        color: 'white',
        fontSize: 24,
        paddingHorizontal: 30,
        marginBottom: 3,
    },
});

export default ButtonComponent;
