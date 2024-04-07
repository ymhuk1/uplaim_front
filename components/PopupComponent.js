import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {Image} from "expo-image";

const PopupComponent = ({ onClose, height, headerPopup, textPopup1, textPopup2 }) => {

    return (
        <View style={[styles.popupContainer, {height: height}]} >
            <Image
                contentFit="contain"
                contentPosition={"center"}
                transition={1000}
                source={ require('../assets/tooltip.svg') }
                width={45}
                height={45}
                style={styles.iconPopup}/>
            <Text style={styles.headerPopup}>{headerPopup}</Text>
            <Text style={styles.textPopup}>{textPopup1}</Text>
            <Text style={styles.textPopup}>{textPopup2}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closePopup}>
                <Image
                    contentFit="contain"
                    contentPosition={"center"}
                    transition={1000}
                    source={ require('../assets/close.svg') }
                    width={24}
                    height={24}/>
            </TouchableOpacity>
        </View>
    );
};

const styles = {
    popupContainer: {
        position: 'absolute',
        bottom: -20,
        // top: 20,
        backgroundColor: "#181629",
        borderTopRightRadius: 12,
        borderTopLeftRadius: 12,
        width: "100%",
        zIndex: 999,
        alignItems: "center",
        padding: 20,
    },
    iconPopup: {
        marginBottom: 15,
    },
    headerPopup: {
        fontSize: 24,
        fontWeight: "bold",
        color: "white",
        marginBottom: 20,
    },
    textPopup: {
        fontSize: 16,
        color: "white",
        marginBottom: 12,
    },
    closePopup: {
        position: "absolute",
        top: 10,
        right: 10
    },
};

export default PopupComponent;
