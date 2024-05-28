import {TouchableOpacity, ScrollView, StyleSheet, Text, View} from "react-native";
import React from "react";
import {Image, ImageBackground} from "expo-image";
import {textPrimaryColor} from "../../components/ColorsComponent";
import * as SecureStore from "expo-secure-store";
import {router, useRouter} from "expo-router";
import { FONTS, HEIGHT, SIZES } from "../../constants/theme";




export default function ProfileScreen() {

    const router = useRouter()
    const handleLogout = async () => {
        try {
            await SecureStore.deleteItemAsync('userData');
            await SecureStore.deleteItemAsync('token');

            router.replace('login');
        } catch (error) {
            console.error('Ошибка при выходе:', error.message);
        }
    };

    return (
        <ScrollView
            style={styles.container} showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
            <ImageBackground
                source={require('../../assets/background.png')}
                contentFit={"cover"}
                style={styles.containerImg}
                >
                <View style={styles.containerView}>
                    <View style={styles.textContainerHead}>
                        <Text style={styles.textHead}>Настройки профиля</Text>
                    </View>
                    <View style={styles.topContainer}>
                        <View style={styles.leftContainer}>
                            <Image
                                contentFit="contain"
                                contentPosition="center"
                                source={ require('../../assets/no_photo.svg') }
                                width={60}
                                height={60}
                            />
                        </View>
                        <View style={styles.rightContainer}>
                            <View style={styles.textContainer}>
                                <Text style={styles.text}>Константин</Text>
                                <Text style={styles.minText}>Рефералов: 113</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.menuContainer}>
                        <View style={styles.itemMenuContainer}>
                            <View style={styles.iconMenuContainer}>
                                <Image
                                    contentFit="contain"
                                    contentPosition="center"
                                    source={ require('../../assets/profile/location-pin.svg') }
                                    width={24}
                                    height={24}
                                />
                            </View>
                            <View style={styles.textMenuContainer}>
                                <Text style={styles.textMenu}>Москва</Text>
                            </View>
                        </View>
                        <View style={styles.itemMenuContainer}>
                            <View style={styles.iconMenuContainer}>
                                <Image
                                    contentFit="contain"
                                    contentPosition="center"
                                    source={ require('../../assets/profile/chart-pie-simple.svg') }
                                    width={24}
                                    height={24}
                                />
                            </View>
                            <View style={styles.textMenuContainer}>
                                <TouchableOpacity onPress={() => router.push({ pathname: "/secondary/tariffs"})} >
                                    <Text style={styles.textMenu}>Мой тариф</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                        <View style={styles.itemMenuContainer}>
                            <View style={styles.iconMenuContainer}>
                                <Image
                                    contentFit="contain"
                                    contentPosition="center"
                                    source={ require('../../assets/profile/refresh-ccw-clock.svg') }
                                    width={24}
                                    height={24}
                                />
                            </View>
                            <View style={styles.textMenuContainer}>
                                <Text style={styles.textMenu}>История</Text>
                            </View>
                        </View>
                        <View style={styles.itemMenuContainer}>
                            <View style={styles.iconMenuContainer}>
                                <Image
                                    contentFit="contain"
                                    contentPosition="center"
                                    source={ require('../../assets/profile/cart-check.svg') }
                                    width={24}
                                    height={24}
                                />
                            </View>
                            <View style={styles.textMenuContainer}>
                                <Text style={styles.textMenu}>Мои заказы</Text>
                            </View>
                        </View>
                        <View style={styles.itemMenuContainer}>
                            <View style={styles.iconMenuContainer}>
                                <Image
                                    contentFit="contain"
                                    contentPosition="center"
                                    source={ require('../../assets/profile/cart-check.svg') }
                                    width={24}
                                    height={24}
                                />
                            </View>
                            <View style={styles.textMenuContainer}>
                                <Text style={styles.textMenu}>Мои купоны и промокоды</Text>
                            </View>
                        </View>
                        <View style={styles.itemMenuContainer}>
                            <View style={styles.iconMenuContainer}>
                                <Image
                                    contentFit="contain"
                                    contentPosition="center"
                                    source={ require('../../assets/profile/message-square-chat.svg') }
                                    width={24}
                                    height={24}
                                />
                            </View>
                            <View style={styles.textMenuContainer}>
                                <Text style={styles.textMenu}>Сообщения</Text>
                            </View>
                        </View>
                        <View style={styles.itemMenuContainer}>
                            <View style={styles.iconMenuContainer}>
                                <Image
                                    contentFit="contain"
                                    contentPosition="center"
                                    source={ require('../../assets/profile/wallet-alt.svg') }
                                    width={24}
                                    height={24}
                                />
                            </View>
                            <View style={styles.textMenuContainer}>
                                <Text style={styles.textMenu}>Мои финансы</Text>
                            </View>
                        </View>
                        <View style={styles.itemMenuContainer}>
                            <View style={styles.iconMenuContainer}>
                                <Image
                                    contentFit="contain"
                                    contentPosition="center"
                                    source={ require('../../assets/profile/gear.svg') }
                                    width={24}
                                    height={24}
                                />
                            </View>
                            <View style={styles.textMenuContainer}>
                                <Text style={styles.textMenu}>Настройки</Text>
                            </View>
                        </View>
                        <View style={styles.itemMenuContainer}>
                            <View style={styles.iconMenuContainer}>
                                <Image
                                    contentFit="contain"
                                    contentPosition="center"
                                    source={ require('../../assets/profile/mobile-signal.svg') }
                                    width={24}
                                    height={24}
                                />
                            </View>
                            <View style={styles.textMenuContainer}>
                                <Text style={styles.textMenu}>Обратная связь</Text>
                            </View>
                        </View>
                        <View style={styles.itemMenuContainer}>
                            <View style={styles.iconMenuContainer}>
                                <Image
                                    contentFit="contain"
                                    contentPosition="center"
                                    source={ require('../../assets/profile/crown.svg') }
                                    width={24}
                                    height={24}
                                />
                            </View>
                            <View style={styles.textMenuContainer}>
                                <Text style={styles.textMenu}>Франшиза</Text>
                            </View>
                        </View>
                        <View style={styles.itemMenuContainer}>
                            <View style={styles.iconMenuContainer}>
                                <Image
                                    contentFit="contain"
                                    contentPosition="center"
                                    source={ require('../../assets/profile/circle-information.svg') }
                                    width={24}
                                    height={24}
                                />
                            </View>
                            <View style={styles.textMenuContainer}>
                                <Text style={styles.textMenu}>О приложении</Text>
                            </View>
                        </View>
                        <View style={styles.itemMenuContainer}>
                            <View style={styles.iconMenuContainer}>
                                <Image
                                    contentFit="contain"
                                    contentPosition="center"
                                    source={ require('../../assets/profile/circle-information.svg') }
                                    width={24}
                                    height={24}
                                />
                            </View>
                            <TouchableOpacity onPress={handleLogout}
                                style={styles.textMenuContainer}>
                                <Text style={styles.textMenu}>Выход</Text>
                            </TouchableOpacity>
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
    containerImg: {
        minHeight: HEIGHT.height,
    },
    containerView: {
        marginHorizontal: 15,
        marginBottom: 80,
        marginTop: 60,
        minHeight: 700,
    },
    textContainerHead: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 30,
    },
    textHead: {
        fontFamily: FONTS.medium,
        fontSize: 24,
        lineHeight: 24,
        color: textPrimaryColor,
        marginLeft: 7,
    },
    topContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 25,
    },
    leftContainer: {
        marginRight: 20,
    },
    rightContainer: {

    },
    textContainer: {

    },
    text: {
        fontFamily: FONTS.medium,
        fontSize: SIZES.xLarge,
        lineHeight: 24,
        color: 'white',
    },
    minText: {
        color: '#DFDFE9',
    },
    menuContainer: {
        marginHorizontal: 15,

    },
    itemMenuContainer: {
        flexDirection: "row",
        marginBottom: 20,
    },
    iconMenuContainer: {

    },
    textMenuContainer: {

    },
    textMenu: { 
        fontFamily: FONTS.regular,
        fontSize: SIZES.medium,
        color: "white",
        marginLeft: 8,
        textAlign: "center",
    },
})












