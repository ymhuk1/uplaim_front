import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { Image, ImageBackground } from "expo-image";
import Constants from "expo-constants";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";

import CheckboxComponent from "../components/CheckboxComponent";
import InputComponent from "../components/InputComponent";
import ButtonComponent from "../components/ButtonComponent";
import NewButtonComponent from "../components/NewButtonComponent";
import { handleLogout } from "../components/utils/utils";
import {
  styles,
  containerStyles,
  inputStyles,
  buttonStyles,
  textContainerStyles,
  logoStyles,
  iconStyles,
  checkboxStyles,
  containerViewIMGStyles,
} from "../styles/loginStyles";

const apiBaseUrl = Constants.expoConfig.extra.API_PROD;

export default function LoginScreen() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [isChecked, setIsChecked] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [checkboxError, setCheckboxError] = useState("");
  const [token, setToken] = useState(null);
  const deviceInfo = Constants.deviceName;

  // console.log("height: ", Dimensions.get("window").height)

  useEffect(() => {
    loadToken();
  }, []);

  const loadToken = async () => {
    try {
      const savedToken = await SecureStore.getItemAsync("token");
      if (savedToken) {
        setToken(savedToken);
      }
    } catch (error) {
      console.error("Error loading token:", error);
    }
  };

  const handleLogin = async () => {
    try {
      // router.push('home/main');

      if (!isChecked) {
        setCheckboxError("Подтвердите согласие с Политикой конфиденциальности");
        return;
      }

      if (!phoneNumber) {
        setError("Заполните поле номера");
        return;
      }

      setError("");
      setCheckboxError("");
      setLoading(true);

      // Request
      const requestBody = {
        phone: phoneNumber,
        referral_code: referralCode,
        device: {
          device: deviceInfo,
        },
      };

      console.log("Sending request with data:", JSON.stringify(requestBody));

      const response = await fetch(`${apiBaseUrl}api/send_phone_number`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Received response data:", responseData);

        // Handle response data
        if (responseData.message === "SMS code sent") {
          const receivedToken = responseData.token;
          const userData = {
            phoneNumber,
            token: receivedToken,
            deviceInfo,
          };

          await SecureStore.setItemAsync("userData", JSON.stringify(userData));
          setToken(receivedToken);
          router.push("smsScreen");
        } else {
          setError("Произошла ошибка при отправке SMS");
        }
      } else {
        console.error("Request failed with status:", response.status);
        setError(
          `Произошла ошибка при отправке запроса. Код ошибки: ${response.status}`
        );
      }
    } catch (error) {
      console.error("Error during request:", error);

      // Network error handling
      if (error.message === "Network request failed") {
        setError("Произошла ошибка сети. Проверьте подключение к интернету.");
      } else {
        setError(`Произошла ошибка при отправке запроса: ${error.message}`);
      }
    } finally {
      setLoading(false);
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
        contentFit={"cover"}
        style={containerViewIMGStyles}
      >
        <View style={styles.containerView}>
          <View style={logoStyles}>
            <Image
              contentFit="contain"
              contentPosition="center"
              transition={1000}
              source={require("../assets/logo.svg")}
              width={210}
              height={50}
            />
          </View>
          <View style={textContainerStyles}>
            <Text style={styles.text}>Войти с помощью</Text>
          </View>

          <View style={iconStyles}>
            <View style={styles.iconBack}>
              <Image
                contentFit="contain"
                contentPosition={"center"}
                transition={1000}
                source={require("../assets/google.svg")}
                style={styles.iconSocial}
              />
            </View>
            <View style={styles.iconBack}>
              <Image
                contentFit="contain"
                contentPosition={"center"}
                transition={1000}
                source={require("../assets/apple.svg")}
                style={styles.iconSocial}
              />
            </View>
            <View style={styles.iconBack}>
              <Image
                contentFit="contain"
                contentPosition={"center"}
                transition={1000}
                source={require("../assets/vk.svg")}
                style={styles.iconSocial}
              />
            </View>
          </View>

          <View style={textContainerStyles}>
            <Text style={styles.text}>или зарегистрироваться</Text>
          </View>
          <View style={inputStyles}>
            <InputComponent
              placeholder="Введите номер"
              keyboardType="numeric"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              error={error}
            />
            <InputComponent
              placeholder="Реферальный код"
              value={referralCode}
              onChangeText={setReferralCode}
            />
          </View>
          <View style={checkboxStyles}>
            <CheckboxComponent
              isChecked={isChecked}
              onToggle={setIsChecked}
              error={checkboxError}
              title={"Я согласен с Политикой конфиденциальности"}
            />
          </View>
          <View style={buttonStyles}>
            <NewButtonComponent
              title={"Войти"}
              filled={true}
              height={54}
              fontSize={24}
              onPress={handleLogin}
              loading={loading}
            />
            {/* <ActivityIndicator visible={loading} size={"large"} color={"#7434b7"}/> */}
          </View>
        </View>
        <StatusBar backgroundColor="transparent" barStyle="light-content" />
      </ImageBackground>
    </ScrollView>
  );
}
