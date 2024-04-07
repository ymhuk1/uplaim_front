import {RefreshControl, ScrollView, StyleSheet, Text, View} from "react-native";
import HeaderComponent from "../../components/HeaderComponent";
import {Image, ImageBackground} from "expo-image";
import React, {useState} from "react";
import {textPrimaryColor} from "../../components/ColorsComponent";
import NewButtonComponent from "../../components/NewButtonComponent";
import QRCodeComponent from "../../components/QRCodeComponent";
import {useRouter} from "expo-router";


export default function RecommendPage() {
    const [textValue, setTextValue] = useState('');
    const [refreshing, setRefreshing] = useState(false);

    const router = useRouter();

    const onRefresh = () => {
        setRefreshing(true);
    };
    return (
        <ScrollView
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }
            style={styles.container} showsVerticalScrollIndicator={false}>
            <ImageBackground
                source={require('../../assets/background.png')}
                contentFit={"cover"}>
                <View style={styles.containerView}>
                    <HeaderComponent text={textValue} secondary={true}/>
                    <View style={styles.logoContainer}>
                        <Image
                        contentFit="contain"
                        contentPosition={"center"}
                        transition={1000}
                        source={require('../../assets/logo.svg')}
                        width={250}
                        height={50}/>
                        <Text style={styles.textContainer}>Рекомендуйте партнеров SaveUp</Text>
                        <NewButtonComponent title={'Выбрать партнера'} filled={true} height={48} fontSize={18} onPress={() => router.push({ pathname: "/secondary/findCompany"})}/>
                    </View>
                    <View style={styles.thirdContainer}>
                        <View style={styles.leftThirdContainer}>
                            <View style={styles.infoLeftThirdContainer}>
                                <Image
                                    contentFit="contain"
                                    contentPosition={"center"}
                                    transition={1000}
                                    source={require('../../assets/link.svg')}
                                    width={24}
                                    height={24}/>
                                <Text style={styles.textTwo}>Ссылка на персональные&nbsp;скидки</Text>
                            </View>
                            <View style={styles.linkLeftThirdContainer}>
                                <Text style={styles.textLinkLeftThirdContainer}>www.website.com/pes..</Text>
                            </View>
                            <View style={styles.copyLinkLeftThirdContainer}>
                                <Text style={styles.copyLinkLeftThirdText}>Скопировать ссылку</Text>
                            </View>
                        </View>
                        <View style={styles.rightThirdContainer}>
                            <View style={styles.infoRightThirdContainer}>
                                <Image
                                    contentFit="contain"
                                    contentPosition={"center"}
                                    transition={1000}
                                    source={require('../../assets/circuit.svg')}
                                    width={24}
                                    height={24}/>
                                <Text style={styles.textThird}>QR-код</Text>
                            </View>
                            <View style={styles.qrcodeRightThirdContainer}>
                                <QRCodeComponent size={50} logoSize={20} style={styles.qrcode}/>
                            </View>
                            <Text style={styles.textThird}>Покажи другу</Text>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
    },
    containerView: {
        marginHorizontal: 15,
        marginBottom: 80,
        height: 770,
    },
    logoContainer: {
        marginTop: 150,
        marginBottom: 40,
        alignItems: "center",
    },
    textContainer: {
        marginVertical: 60,
        color: textPrimaryColor,
        fontWeight: "bold",
        fontSize: 24,
        textAlign: "center",
        width: 300,
    },
    thirdContainer: {
        marginVertical: 15,
        flexDirection: "row",
        justifyContent: 'space-between',
    },
    leftThirdContainer: {
        backgroundColor: "#24224A",
        height: 140,
        width: "62%",
        borderRadius: 12,

    },
    rightThirdContainer: {
        backgroundColor: "#24224A",
        height: 140,
        width: "34%",
        borderRadius: 12,
    },
    infoLeftThirdContainer: {
        flexDirection: "row",
        margin: 10,
    },
    textTwo: {
        fontSize: 14,
        color: "white",
        marginLeft: 6,
    },
    textThird: {
        fontSize: 14,
        color: "white",
        marginLeft: 6,
        textAlign: "center",
    },
    linkLeftThirdContainer: {
        backgroundColor: "#1B1A37",
        borderRadius: 50,
        marginHorizontal: 12,
        padding: 12,
    },
    textLinkLeftThirdContainer: {
        fontSize: 14,
        color: "white",
    },
    copyLinkLeftThirdContainer: {
        margin: 30,
        marginTop: 10,
    },
    copyLinkLeftThirdText: {
        fontSize: 14,
        color: "white",
    },
    infoRightThirdContainer: {
        flexDirection: "row",
        margin: 10,
    },
    qrcodeRightThirdContainer: {
        alignItems: "center",
        marginBottom: 15,
    },
    qrcode: {

    },
})