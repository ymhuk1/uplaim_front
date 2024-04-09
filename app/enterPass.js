import React, { useState, useEffect } from "react";
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
import { COLORS, SIZES } from "../constants/theme";

export default function EnterPassScreen() {
  const [passCode, setPassCode] = useState(["", "", "", ""]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [token, setToken] = useState("");

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

        const response = await fetch("https://admin.saveup.pro/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });

        const responseData = await response.json();

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
      style={styles.container}
      showsVerticalScrollIndicator={false}
      automaticallyAdjustKeyboardInsets={true}
    >
      <ImageBackground
        source={require("../assets/background.png")}
        contentFit="cover"
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

          <View style={styles.button}>
            <NewButtonComponent
              title={"Подтвердить"}
              filled={true}
              height={48}
              fontSize={18}
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary,
    flex: 1,
  },
  containerView: {
    alignItems: "center",
    paddingTop: 80,
    paddingBottom: 40,
  },
  iconContainer: {},
  icon: {
    maxWidth: 185,
    height: 40,
  },
  textContainer: {},
  text: {
    paddingTop: 100,
    textAlign: "center",
    maxWidth: 185,
    fontSize: SIZES.xLarge,
    fontWeight: "bold",
    color: COLORS.text,
  },
  smsButton: {
    paddingTop: 30,
    marginBottom: 35,
  },
  button: {
    marginBottom: 260,
  },
  textMenu: {
    flex: 1,
    fontSize: SIZES.medium,
    color: COLORS.text,
    marginLeft: 8,
    textAlign: "center",
  },
});
