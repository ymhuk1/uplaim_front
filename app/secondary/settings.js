import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { FONTS, HEIGHT } from "../../constants/theme";
import HeaderComponent from "../../components/HeaderComponent";
import { textPrimaryColor } from "../../components/ColorsComponent";

export default function Settings() {
  const [textValue, setTextValue] = useState("Настройки");
  const [form, setForm] = useState({
    form1: false,
    form2: true,
    form3: false,
  });
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
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <Text style={[styles.title, { marginRight: "auto" }]}>
              Настройка
            </Text>
            <Switch value={form} onValueChange={setForm} />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={[styles.title, { marginRight: "auto" }]}>
              Настройка
            </Text>
            <Switch value={form} onValueChange={setForm} />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={[styles.title, { marginRight: "auto" }]}>
              Уведомления
            </Text>
            <Switch value={form} onValueChange={setForm} />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text
              style={[styles.title, { marginRight: "auto", marginLeft: 10 }]}
            >
              Начисления
            </Text>
            <Switch value={form} onValueChange={setForm} />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text
              style={[styles.title, { marginRight: "auto", marginLeft: 10 }]}
            >
              Акции
            </Text>
            <Switch value={form} onValueChange={setForm} />
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
  title: {
    color: textPrimaryColor,
    fontFamily: FONTS.medium,
    fontSize: 16,
    lineHeight: 20,
  },
});
