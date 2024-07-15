import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { Image, ImageBackground } from "expo-image";
import HeaderComponent from "../../components/HeaderComponent";
import { FONTS, HEIGHT } from "../../constants/theme";
import { elemBackgroundColor, textColor4, textPrimaryColor } from "../../components/ColorsComponent";
import NewButtonComponent from "../../components/NewButtonComponent";

export default function Franchise() {
  const [textValue, setTextValue] = useState("Франшиза");
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
            ></TextInput>
            <TextInput
              keyboardType="number-pad"
              style={styles.input}
              placeholder="Телефон"
              placeholderTextColor={textColor4}
            ></TextInput>
          </View>
          <View style={{ marginTop: 25, paddingHorizontal: 20 }}>
            <NewButtonComponent
              title={"Оставить заявку"}
              filled={true}
              height={54}
              fontSize={18}
              onPress={() => {}}
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
