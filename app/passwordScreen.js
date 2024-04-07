import React, { useState, useEffect } from 'react';
import {View, StyleSheet, Text, ScrollView, Alert, Dimensions, TouchableOpacity} from 'react-native';
import ButtonComponent from "../components/ButtonComponent";
import SmsComponent from "../components/SmsComponent";
import * as SecureStore from 'expo-secure-store';
import {router} from "expo-router";
import { ImageBackground, Image } from 'expo-image'
import {handleLogout} from '../components/utils/utils'
import NewButtonComponent from "../components/NewButtonComponent";
export default function PasswordScreen() {
    const [passCode, setPassCode] = useState(['', '', '', '']);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [token, setToken] = useState('');

    const handlePassCodeChange = (newPassCode) => {
        setPassCode(newPassCode);
    };

    useEffect(() => {
        // Загрузка данных пользователя из SecureStore
        const loadUserData = async () => {
            try {
                const userDataStr = await SecureStore.getItemAsync('userData');
                if (userDataStr) {
                    const userData = JSON.parse(userDataStr);
                    setPhoneNumber(userData.phoneNumber);
                    setToken(userData.token);
                }
            } catch (error) {
                console.error('Ошибка при загрузке данных пользователя:', error);
            }
        };

        loadUserData();
    }, []);

    const handleCreatePassword = async () => {
        const joinedPassCode = passCode.join('');

        try {
            if (!phoneNumber || !token) {
                Alert.alert('Ошибка', 'Данные не загружены. Пожалуйста, попробуйте снова.');
                return;
            }

            const requestBody = {
                phone: phoneNumber,
                password: joinedPassCode,
                token: token,
            };

            console.log('Отправляю запрос на создание пароля с данными:', JSON.stringify(requestBody));

            const response = await fetch('https://admin.saveup.pro/api/create-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': '*/*',
                },
                body: JSON.stringify(requestBody),
            });

            const responseData = await response.json();

            console.log('Получен ответ с сервера:', JSON.stringify(responseData));

            if (responseData.message === 'Password created') {
                router.push('enterPass');
            } else {
                Alert.alert('Ошибка', 'Не удалось создать пароль. Пожалуйста, попробуйте снова.');
            }
        } catch (error) {
            console.error('Ошибка при отправке запроса на создание пароля:', error);
            Alert.alert('Ошибка', 'Произошла ошибка при отправке запроса на сервер.');
        }
    };

    return (
        <ScrollView style={styles.container}
                    showsVerticalScrollIndicator={false}
                    automaticallyAdjustKeyboardInsets={true}>
            <ImageBackground
                source={require('../assets/background.png')}
                contentFit="cover"
            >
                <View style={styles.containerView}>

                    <View style={styles.iconContainer}>
                        <Image
                            contentFit="contain"
                            contentPosition="center"
                            transition={1000}
                            source={require('../assets/logo.svg')}
                            width={186}
                            height={40}/>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>Придумайте пароль</Text>
                    </View>

                    <View style={styles.smsButton}>
                        <SmsComponent
                            keyboardType="numeric"
                            onSmsCodeChange={handlePassCodeChange}
                        />
                    </View>

                    <View style={styles.button}>
                        <NewButtonComponent title={'Подтвердить'} filled={true} height={48} fontSize={18} onPress={handleCreatePassword}/>

                    </View>
                    <TouchableOpacity onPress={handleLogout}>
                        <Text style={styles.textMenu}>Выход</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#181629',
    },
    containerView: {
        alignItems: "center",
        paddingTop: 80,
        paddingBottom: 60,
        flex: 1
    },
    iconContainer: {
    },
    icon: {
        maxWidth: 185,
        height: 40
    },
    textContainer: {
    },
    text: {
        paddingTop: 100,
        textAlign: "center",
        maxWidth: 185,
        fontSize: 24,
        fontWeight: "bold",
        color: 'white',
    },
    smsButton: {
        paddingVertical: 30,
    },
    button: {
        paddingVertical: 150,
    },
    textMenu: {
        fontSize: 16,
        color: "white",
        marginLeft: 8,
        textAlign: "center",
    },
});
