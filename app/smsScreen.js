import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Alert,
  Button,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from "react-native";
import { ImageBackground, Image } from "expo-image";
import SmsComponent from "../components/SmsComponent";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";
import NewButtonComponent from "../components/NewButtonComponent";
import {
  styles,
  containerStyles,
  textContainerStyles,
  smsButtonstyles,
} from "../styles/smsScreenStyles";

export default function SmsScreen() {
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const [timer, setTimer] = useState(1); // Обратный отсчет в секундах (увеличил таймер до 30 секунд)
  const [showRetryText, setShowRetryText] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [token, setToken] = useState("");
  const [smsCode, setSmsCode] = useState(["", "", "", ""]);
  const [deviceInfo, setDeviceInfo] = useState("");

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const userDataStr = await SecureStore.getItemAsync("userData");
      if (userDataStr) {
        const userData = JSON.parse(userDataStr);
        setPhoneNumber(userData.phoneNumber);
        setToken(userData.token);
        setDeviceInfo(userData.deviceInfo);
      }
      console.log("userDataStr", userDataStr);
      console.log("setToken", setToken);
      console.log("token", token);
    } catch (error) {
      console.error("Ошибка при загрузке данных пользователя:", error);
    }
  };

  const handleSmsCodeChange = (newSmsCode) => {
    setSmsCode(newSmsCode);
  };

  const handleVerifyCode = async () => {
    const joinedSmsCode = smsCode.join("");
    try {
      const requestBody = {
        phone: phoneNumber,
        sms_code: joinedSmsCode,
        token: token,
      };
      console.log(
        "Отправляю запрос на верификацию SMS-кода с данными:",
        JSON.stringify(requestBody)
      );

      const response = await fetch(
        "https://admin.saveup.pro/api/verify-sms-code",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
          },
          body: JSON.stringify(requestBody),
        }
      );

      const responseData = await response.json();

      console.log("Получен ответ с сервера:", JSON.stringify(responseData));

      if (responseData.message === "SMS code verified") {
        router.push("passwordScreen");
      } else {
        Alert.alert(
          "Ошибка",
          "SMS-код не верифицирован. Пожалуйста, проверьте код и попробуйте снова."
        );
      }
    } catch (error) {
      console.error(
        "Ошибка при отправке запроса на верификацию SMS-кода:",
        error
      );
      Alert.alert("Ошибка", "Произошла ошибка при отправке запроса на сервер.");
    }
  };

  const sendSmsRequest = async () => {
    try {
      const requestBody = {
        phone: phoneNumber,
        device: {
          device: deviceInfo,
        },
      };

      console.log(
        "Sending SMS request with data:",
        JSON.stringify(requestBody)
      );

      const response = await fetch(
        "https://admin.saveup.pro/api/send_phone_number",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
          },
          body: JSON.stringify(requestBody),
        }
      );

      const responseData = await response.json();
      console.log("Received SMS response data:", responseData);

      if (responseData.message === "SMS code sent") {
        const receivedToken = responseData.token;
        setToken(receivedToken);
        setTimer(1);
        setShowRetryText(false);
      } else {
        Alert.alert("Ошибка", "Произошла ошибка при отправке SMS");
      }
    } catch (error) {
      console.error(
        "Ошибка при отправке запроса на повторную отправку SMS:",
        error
      );
      Alert.alert("Ошибка", "Произошла ошибка при отправке запроса на сервер.");
    }
  };

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => clearInterval(countdown);
    } else {
      setShowRetryText(true);
    }
  }, [timer]);

  return (
    <ScrollView
      style={containerStyles}
      showsVerticalScrollIndicator={false}
      automaticallyAdjustKeyboardInsets={true}
      contentContainerStyle={containerStyles}
    >
      <ImageBackground
        source={require("../assets/background.png")}
        scontentFit={"cover"}
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
          <View style={textContainerStyles}>
            <Text style={styles.text}>Код из СМС</Text>
          </View>
          <View style={styles.textContainer2}>
            <Text style={styles.text2}>
              Мы выслали СМС-код на номер +{phoneNumber}
            </Text>
          </View>
          <View style={smsButtonstyles}>
            <SmsComponent
              keyboardType="numeric"
              onSmsCodeChange={handleSmsCodeChange}
            />
          </View>
          <View style={styles.textContainer3}>
            <Text style={styles.text3}>
              {timer > 0
                ? `Не пришел код? Можно отправить сообщение ещё раз через ${timer} сек.`
                : "Не пришел код?\nПопробуйте еще раз"}
            </Text>
          </View>
          <View style={styles.textContainer4}>
            {showRetryText ? (
              <TouchableOpacity onPress={sendSmsRequest}>
                <Text style={styles.smsRepeat}>Повторить СМС</Text>
              </TouchableOpacity>
            ) : (
              <Text style={styles.smsRepeat}> </Text>
            )}
          </View>
          <View style={styles.button}>
            <NewButtonComponent
              title={"Подтвердить"}
              filled={true}
              height={54}
              fontSize={24}
              onPress={handleVerifyCode}
            />
          </View>
        </View>
        <StatusBar backgroundColor="transparent" barStyle="light-content" />
      </ImageBackground>
    </ScrollView>
  );
}
