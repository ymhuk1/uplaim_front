import {Modal, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {elemBackgroundColor, textColor3, textPrimaryColor} from "./ColorsComponent";
import {Image} from "expo-image";
import React, {useEffect} from "react";


export default function ErrorModalComponent({ onRequestClose, textError, visible}) {

    useEffect(() => {
        // Закрыть модальное окно через 5 секунд
        const timeoutId = setTimeout(() => {
            onRequestClose();
        }, 3000);

        // Очистить таймаут при размонтировании компонента или изменении видимости модального окна
        return () => clearTimeout(timeoutId);
    }, [onRequestClose, visible]);

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onRequestClose}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={styles.containerTextError}>
                        <Text style={styles.textError}>{textError}</Text>
                    </View>
                    <TouchableOpacity style={styles.closeButton} onPress={onRequestClose}>
                        <Image
                            contentFit="contain"
                            contentPosition="center"
                            source={ require('../assets/closeModal.svg') }
                            width={36}
                            height={36}
                        />
                    </TouchableOpacity>
                </View>

            </View>
        </Modal>

    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        bottom: 40,
    },
    modalView: {
        height: 60,
        width: '90%',
        backgroundColor: textColor3,
        borderRadius: 20,
        paddingLeft: 30,
        justifyContent: "center",
    },
    containerTextError: {
    },
    textError: {
        color: textPrimaryColor,
    },
    closeButton: {
        position: 'absolute',
        right: 0,
        padding: 12,
    },
})