import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { FONTS, HEIGHT, WIDTH } from "../../constants/theme";
import HeaderComponent from "../../components/HeaderComponent";
import {
  elemBackgroundColor,
  textPrimaryColor,
} from "../../components/ColorsComponent";
import { Image, ImageBackground } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";

export default function MyFinances({ disabled }) {
  const [textValue, setTextValue] = useState("Мои финансы");

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
          <View style={styles.finance__card}>
            <View style={styles.finance__card_header}>
              <View style={{ flex: 3, alignItems: "flex-start" }}>
                <Image
                  contentFit="contain"
                  contentPosition={"center"}
                  transition={1000}
                  source={require("../../assets/icon.png")}
                  width={50}
                  height={50}
                />
              </View>
              <Text
                style={[
                  styles.finance__card_title,
                  { flex: 4, alignItems: "center" },
                ]}
              >
                1520₽
              </Text>
            </View>
            <View style={styles.finance__card_buttons}>
              <TouchableOpacity>
                <LinearGradient
                  location={[0.5, 0.5]}
                  start={[0.4, -0.9]}
                  // end={[  0.1, 0.5 ]}
                  colors={
                    disabled ? ["#7c7f86", "#5F5F65"] : ["#7434b7", "#7730e5"]
                  }
                  style={styles.button}
                >
                  <Text style={styles.button_text}>+ пополнить</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity>
                <LinearGradient
                  location={[0.5, 0.5]}
                  start={[0.4, -0.9]}
                  // end={[  0.1, 0.5 ]}
                  colors={
                    disabled ? ["#7c7f86", "#5F5F65"] : ["#7434b7", "#7730e5"]
                  }
                  style={styles.button}
                >
                  <Text style={styles.button_text}>- вывести</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
            <TouchableOpacity>
              <Text style={styles.text1}>Транзакции</Text>
            </TouchableOpacity>
            <View style={styles.transactions}>
              <View style={styles.transaction}>
                <Image
                  contentFit="contain"
                  contentPosition={"center"}
                  transition={1000}
                  source={require("../../assets/addition.svg")}
                  width={18}
                  height={18}
                />
                <View style={{ marginRight: "auto", marginLeft: 10 }}>
                  <Text style={styles.text2}>Пополнение</Text>
                  <Text style={styles.text3}>8:30 27 июля</Text>
                </View>
                <Text style={styles.text__balance}>+100₽</Text>
              </View>

              <View style={styles.transaction}>
                <Image
                  contentFit="contain"
                  contentPosition={"center"}
                  transition={1000}
                  source={require("../../assets/conclusion.svg")}
                  width={18}
                  height={18}
                />
                <View style={{ marginRight: "auto", marginLeft: 10 }}>
                  <Text style={styles.text2}>Вывод</Text>
                  <Text style={styles.text3}>8:30 27 июля</Text>
                </View>
                <Text style={styles.text__balance}>-100₽</Text>
              </View>
            </View>
          </View>
          <View style={{ rowGap: 10 }}>
            <Text style={styles.title}>Мои карты</Text>
            <Text style={styles.text2}>для ввода и вывода средств</Text>
          </View>
          <View style={styles.finance__card}>
            <Text
              style={[
                styles.text2,
                {
                  fontSize: 35,
                  lineHeight: 35,
                  textAlign: "center",
                  marginTop: 20,
                  marginBottom: 80,
                },
              ]}
            >
              **** **** **** 5069
            </Text>
            <View style={styles.finance__card_buttons}>
              <TouchableOpacity>
                <LinearGradient
                  location={[0.5, 0.5]}
                  start={[0.4, -0.9]}
                  // end={[  0.1, 0.5 ]}
                  colors={
                    disabled ? ["#7c7f86", "#5F5F65"] : ["#7434b7", "#7730e5"]
                  }
                  style={styles.button}
                >
                  <Text style={styles.button_text}>Подробности о карте</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity>
                <LinearGradient
                  location={[0.5, 0.5]}
                  start={[0.4, -0.9]}
                  // end={[  0.1, 0.5 ]}
                  colors={
                    disabled ? ["#7c7f86", "#5F5F65"] : ["#7434b7", "#7730e5"]
                  }
                  style={styles.button}
                >
                  <Text style={styles.button_text}>Удалить карту</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {},
  container__view: {
    minHeight: HEIGHT.height,
  },
  container__inner: {
    marginHorizontal: 15,
  },
  finance__card: {
    marginTop: 25,
    backgroundColor: elemBackgroundColor,
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginBottom: 20,
  },
  finance__card_header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  finance__card_title: {
    color: textPrimaryColor,
    fontFamily: FONTS.medium,
    fontSize: 24,
    lineHeight: 24,
  },
  finance__card_buttons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    columnGap: 15,
    marginBottom: 10,
  },
  button: {
    width: (WIDTH.width - 80) / 2,
    backgroundColor: elemBackgroundColor,
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderRadius: 12,
  },
  button_text: {
    color: textPrimaryColor,
    fontFamily: FONTS.medium,
    fontSize: 14,
    lineHeight: 16,
    textAlign: "center",
  },
  text1: {
    color: textPrimaryColor,
    fontFamily: FONTS.medium,
    fontSize: 16,
    lineHeight: 24,
  },
  text2: {
    color: textPrimaryColor,
    fontFamily: FONTS.medium,
    fontSize: 14,
    lineHeight: 16,
  },
  text3: {
    color: textPrimaryColor,
    fontFamily: FONTS.regular,
    fontSize: 12,
    lineHeight: 24,
  },
  transactions: {
    marginTop: 15,
    rowGap: 10,
  },
  transaction: {
    flexDirection: "row",
    // alignItems: "center",
  },
  text__balance: {
    color: textPrimaryColor,
    fontFamily: FONTS.medium,
    fontSize: 14,
    lineHeight: 16,
  },
  title: {
    color: textPrimaryColor,
    fontFamily: FONTS.medium,
    fontSize: 24,
    lineHeight: 24,
  },
});
