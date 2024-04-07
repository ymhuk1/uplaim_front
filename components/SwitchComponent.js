import {Switch, View, StyleSheet, Text} from "react-native";
import {useState} from "react";
import ToggleSwitch from 'toggle-switch-react-native'
import {Image} from "expo-image";
import {textColor4, textPrimaryColor} from "./ColorsComponent";

export default function SwitchComponent({ isEnabled, onToggle }) {
    return (
        <View style={styles.container}>
            <Text style={[styles.text, isEnabled === false && {color: textPrimaryColor}]}>₽</Text>
            <ToggleSwitch
                isOn={isEnabled}
                onColor="#24224A"
                offColor="#24224A"
                onToggle={onToggle}
            />
            {isEnabled === true ? (
                <Image
                    contentFit="contain"
                    contentPosition={"center"}
                    source={require('../assets/up.svg')}
                    width={32}
                    height={24}
                    style={styles.icon}/>
                ) : (
                <Image
                    contentFit="contain"
                    contentPosition={"center"}
                    source={require('../assets/up_g.svg')}
                    width={32}
                    height={24}
                    style={styles.icon}/>
            )}


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: "row",
        marginVertical: 10,
    },
    text: {
        color: textColor4,
        fontSize: 24,
        fontWeight: "bold",
        marginRight: 10,
    },
    icon: {
        marginLeft: 10,
    },
});
