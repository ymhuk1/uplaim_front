import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Modal, Pressable} from 'react-native';
import {Link, useLocalSearchParams} from "expo-router";
import {elemBackgroundColor, textColor3} from "./ColorsComponent";
import {Image} from "expo-image";

export default function ModalComponent({modal , setModalState })  {
    const [modalVisible, setModalVisible] = useState(false);
    const modalon = useLocalSearchParams()

    useEffect(() => {
        setModalVisible(modal);
    });

    return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.containerButtonClose}>
                            <Pressable
                                style={styles.buttonClose}
                                onPress={() => setModalState(false)}>
                                <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold', color: elemBackgroundColor}}>X</Text>
                            </Pressable>
                        </View>
                        <View style={styles.topContainer}>
                            <Image
                                contentFit="contain"
                                contentPosition={"center"}
                                transition={1000}
                                // source={ company.photo }
                                width={74}
                                height={74}
                                style={styles.logo}/>
                            <View style={styles.infoTopContainer}>
                                <View style={styles.textTopContainer}>
                                    <Text style={styles.textTop}>{}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
    )
};
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        height: 400,
        width: "94%",
        backgroundColor: elemBackgroundColor,
        borderRadius: 20,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonClose: {
        width: 40,
        borderRadius: 50,
        paddingHorizontal: 10,
        paddingVertical: 8,
        elevation: 2,
        backgroundColor: textColor3,
    },
    containerButtonClose: {
        alignItems: "flex-end",
        marginBottom: 15,
    },
    topContainer: {
        flexDirection: "row",
        marginVertical: 12,

    },
    infoTopContainer: {
        marginLeft: 15,
    },
    textTopContainer: {
        flexDirection: "row",
        alignItems: "flex-end",
        marginBottom: 15,
    },
    logo: {
        width: 74,
        height: 74,
    },
    textTop: {
        fontWeight: "bold",
        fontSize: 24,
        color: "white",
        marginBottom: -5,
        marginRight: 5,
    },
    description: {
        fontSize: 14,
        color: "white",
        marginBottom: 15,
    },
});

