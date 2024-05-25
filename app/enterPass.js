import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Alert,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import ButtonComponent from "../components/ButtonComponent";
import SmsComponent from "../components/SmsComponent";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";
import { ImageBackground, Image } from "expo-image";
import { handleLogout } from "../components/utils/utils";
import NewButtonComponent from "../components/NewButtonComponent";
import {
  styles,
  containerStyles,
  buttonStyles,
} from "../styles/enterPassStyles";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import Constants from "expo-constants";

const apiBaseUrl = Constants.expoConfig.extra.API_PROD;

export default function EnterPassScreen() {
  const [passCode, setPassCode] = useState(["", "", "", ""]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [token, setToken] = useState("");

  const [fontsLoaded, fontError] = useFonts({
    "Rubik-Light": require("../assets/fonts/Rubik-Light.ttf"),
    "Rubik-Medium": require("../assets/fonts/Rubik-Medium.ttf"),
    "Rubik-Regular": require("../assets/fonts/Rubik-Regular.ttf"),
    "Rubik-Bold": require("../assets/fonts/Rubik-Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const handlePassCodeChange = (newPassCode) => {
    setPassCode(newPassCode);
  };

  const handleLogin = async () => {
    const joinedPassCode = passCode.join("");

    try {
      // Загрузка данных пользователя из SecureStore
      const userDataStr = await SecureStore.getItemAsync("userData");
      if (userDataStr) {
        const userData = JSON.parse(userDataStr);
        const requestBody = {
          phone: userData.phoneNumber,
          password: joinedPassCode,
          token: userData.token,
        };

        console.log(
          "Отправляю запрос на вход с данными:",
          JSON.stringify(requestBody)
        );

        const response = await fetch(`${apiBaseUrl}api/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });


        const responseData = await response.json();
        console.log(responseData)

        console.log("Получен ответ с сервера:", JSON.stringify(responseData));

        if (responseData.message === "Login successful") {
          router.push("/home/main");
        } else {
          Alert.alert(
            "Ошибка",
            "Не удалось войти. Пожалуйста, проверьте пароль и попробуйте снова."
          );
        }
      }
    } catch (error) {
      console.error("Ошибка при отправке запроса на вход:", error);
      Alert.alert("Ошибка", "Произошла ошибка при отправке запроса на сервер.");
    }
  };

  return (
    <ScrollView
      style={containerStyles}
      showsVerticalScrollIndicator={false}
      automaticallyAdjustKeyboardInsets={true}
      contentContainerStyle={containerStyles}
    >
      <ImageBackground
        source={require("../assets/background.png")}
        contentFit="cover"
        style={styles.containerViewIMG}
      >
        <View style={styles.containerView}>
          <View style={styles.iconContainer}>
            <Image
              contentFit="contain"
              contentPosition="center"
              transition={1000}
              source={require("../assets/logo.svg")}
              width={186}
              height={40}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Введите пароль</Text>
          </View>

          <View style={styles.smsButton}>
            <SmsComponent
              keyboardType="numeric"
              onSmsCodeChange={handlePassCodeChange}
            />
          </View>

          <View style={buttonStyles}>
            <NewButtonComponent
              title={"Подтвердить"}
              filled={true}
              height={54}
              fontSize={24}
              onPress={handleLogin}
            />
          </View>
          <TouchableOpacity onPress={handleLogout}>
            <Text style={styles.textMenu}>Выход</Text>
          </TouchableOpacity>
        </View>
        <StatusBar backgroundColor="transparent" barStyle="light-content" />
      </ImageBackground>
    </ScrollView>
  );
}
