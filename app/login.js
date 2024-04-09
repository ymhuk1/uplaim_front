import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  StatusBar,
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
import { COLORS, SIZES } from "../constants/theme";
import loadingSkeleton, {
  LoadingSkeleton,
} from "../components/SkeletonLoaderComponent";

const apiBaseUrl = Constants.expoConfig.extra.API_PROD;

export default function LoginScreen() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [isChecked, setIsChecked] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [checkboxError, setCheckboxError] = useState("");
  const [token, setToken] = useState(null);
  const [skeletonLoading, setSkeletonLoading] = useState(false);
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

      const response = await fetch(apiBaseUrl + "/api/send_phone_number", {
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
          setSkeletonLoading(true);
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
      setSkeletonLoading(false);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      automaticallyAdjustKeyboardInsets={true}
      contentContainerStyle={styles.container}
    >
      {skeletonLoading ? (
        <LoadingSkeleton />
      ) : (
        <ImageBackground
          source={require("../assets/background.png")}
          contentFit={"cover"}
          style={styles.containerViewIMG}
        >
          <View style={styles.containerView}>
            <View>
              <Image
                contentFit="contain"
                contentPosition="center"
                transition={1000}
                source={require("../assets/logo.svg")}
                width={210}
                height={50}
              />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.text}>Войти с помощью</Text>
            </View>

            <View style={styles.iconSocialIn}>
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

            <View style={styles.textContainer}>
              <Text style={styles.text}>или зарегистрироваться</Text>
            </View>
            <View style={styles.input}>
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
            <View>
              <CheckboxComponent
                isChecked={isChecked}
                onToggle={setIsChecked}
                error={checkboxError}
                title={"Я согласен с Политикой конфиденциальности"}
              />
            </View>
            <View style={styles.button}>
              <NewButtonComponent
                title={"Войти"}
                filled={true}
                height={48}
                fontSize={18}
                onPress={handleLogin}
              />
            </View>
          </View>
          <StatusBar backgroundColor="transparent" barStyle="light-content" />
        </ImageBackground>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary,
    flex: 1,
  },
  containerViewIMG: {},
  containerView: {
    alignItems: "center",
    paddingVertical: 80,
  },
  logo: {
    width: 190,
    height: 50,
  },
  iconSocialIn: {
    paddingHorizontal: 50,
    flexDirection: "row",
  },
  iconBack: {
    marginHorizontal: 10,
    borderRadius: 20,
    backgroundColor: COLORS.iconBack,
    height: 80,
    width: 80,
  },
  iconSocial: {
    height: 40,
    width: 40,
    margin: 20,
  },
  textContainer: {
    paddingVertical: 40,
  },
  text: {
    fontSize: SIZES.medium,
    color: COLORS.text,
  },
  button: {
    width: 260,
    paddingVertical: 40,
  },
});
