import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { Image, ImageBackground } from "expo-image";
import HeaderComponent from "../../components/HeaderComponent";
import { FONTS, HEIGHT } from "../../constants/theme";
import {
  elemBackgroundColor,
  textColor4,
  textPrimaryColor,
} from "../../components/ColorsComponent";
import NewButtonComponent from "../../components/NewButtonComponent";
import Constants from "expo-constants";
import { TextInputMask } from "react-native-masked-text";

const apiBaseUrl = Constants.expoConfig.extra.API_PROD;

export default function Franchise() {
  const [textValue, setTextValue] = useState("Франшиза");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const franchisePostData = async () => {
    try {
      const requestBody = {
        name: name,
        phone: phone.replace(/[^0-9]/g, ""),
      };

      const url = `${apiBaseUrl}api/create_request`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Заявка успешно отправлена:", data);
      } else {
        console.error("Произошла ошибка при отправке заявки:", data);
      }
    } catch (error) {
      console.error("Произошла ошибка при отправке заявки:", error);
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <ImageBackground
        source={require("../../assets/background.png")}
        style={styles.container__view}
      >
        <View style={styles.container__inner}>
          <HeaderComponent text={textValue} secondary={true} />
          <Text style={styles.title}>Оставить заявку сейчас</Text>
          <View style={styles.input__container}>
            <TextInput
              style={styles.input}
              placeholder="Имя"
              placeholderTextColor={textColor4}
              value={name}
              onChangeText={setName}
            />
            <TextInputMask
              keyboardType="phone-pad"
              style={styles.input}
              type="custom"
              options={{ mask: "+7 999 999-99-99" }}
              placeholder="Телефон"
              placeholderTextColor={textColor4}
              value={phone}
              onChangeText={setPhone}
            />
          </View>
          <View style={{ marginTop: 25, paddingHorizontal: 20 }}>
            <NewButtonComponent
              title={"Оставить заявку"}
              filled={true}
              height={54}
              fontSize={18}
              onPress={() => franchisePostData()}
            />
          </View>
        </View>
      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container__view: {
    minHeight: HEIGHT.height,
  },
  container__inner: {
    marginHorizontal: 15,
  },
  logoContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  title: {
    marginTop: 20,
    fontFamily: FONTS.regular,
    fontSize: 16,
    lineHeight: 20,
    color: textPrimaryColor,
    alignSelf: "center",
  },
  input__container: {
    marginTop: 20,
    alignItems: "center",
    rowGap: 15,
  },
  input: {
    color: textPrimaryColor,
    paddingVertical: 15,
    paddingHorizontal: 120,
    borderRadius: 100,
    backgroundColor: "#121123",
    alignItems: "center",
  },
});
