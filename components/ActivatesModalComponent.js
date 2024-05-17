import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Image, ImageBackground } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import {
  buttonGradientColors,
  elemBackgroundColor3,
  elemGradientColors,
  textColor4,
  textPrimaryColor,
} from "./ColorsComponent";
import { FONTS, WIDTH } from "../constants/theme";
import { BlurView } from "expo-blur";

export default function ActivatesModalComponent({ onClose, disabled }) {
  return (
    <BlurView
      tint="dark"
      intensity={40}
      blurReductionFactor={10}
      experimentalBlurMethod={"dimezisBlurView"}
      style={styles.container}
    >
      <StatusBar
        barStyle="light-content"
        backgroundColor={elemBackgroundColor3}
        translucent={true}
      />
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient
          colors={elemGradientColors}
          style={styles.containerView}
        >
          <TouchableOpacity onPress={onClose} style={styles.closePopup}>
            <Image
              contentFit="contain"
              contentPosition={"center"}
              transition={1000}
              source={require("../assets/close.svg")}
              width={36}
              height={36}
            />
          </TouchableOpacity>
          <View style={styles.header}>
            <Text style={styles.header__title}>Магазин билетов</Text>
          </View>
          <View style={styles.container__inner}>
            <View style={{ alignItems: "center" }}>
              <Image
                source={require("../assets/ticket-green.svg")}
                height={23}
                width={66}
              />
            </View>
            <View style={styles.ticket__image}>
              <Image
                source={require("../assets/gifts/multiple.svg")}
                height={24}
                width={24}
                style={{ marginTop: 8 }}
              />
              <Text style={styles.balance__text}>10</Text>
            </View>
            <View style={{ rowGap: 6 }}>
              <TouchableOpacity>
                <Text style={styles.text__plus}>+</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.text__minus}>-</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.button}>
              <LinearGradient
                location={[0.5, 0.5]}
                start={[0.4, -0.9]}
                colors={
                  disabled ? ["#7c7f86", "#5F5F65"] : ["#7434b7", "#7730e5"]
                }
                style={{ marginLeft: "auto", borderRadius: 8 }}
              >
                <Text style={styles.text__button}>Активировать</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
          <Text style={[styles.accsess__text]}>10 шт. доступно</Text>
          <LinearGradient
            location={[0.5, 0.5]}
            start={[0.4, -0.9]}
            // colors={disabled ? ["#7c7f86", "#5F5F65"] : ["#7434b7", "#7730e5"]}
            colors={elemGradientColors}
            style={{
              borderRadius: 10,
              borderWidth: 1,
              borderColor: elemBackgroundColor3,
              borderStyle: "solid",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  alignItems: "center",
                  padding: 6,
                  backgroundColor: "rgba(154, 149, 178, 0.2)",
                  borderRadius: 10,
                  marginLeft: 10,
                }}
              >
                <Image
                  contentFit="contain"
                  contentPosition={"center"}
                  transition={1000}
                  source={require("../assets/tooltip.svg")}
                  width={18}
                  height={18}
                />
              </View>
              <Text
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                  width: WIDTH.width - 83,
                  textAlign: "justify",
                  fontFamily: FONTS.regular,
                  fontSize: 12,
                  color: textPrimaryColor,
                }}
              >
                Вы можете не активировать сразу все билеты. Их можно будет
                использовать и в розыгрышах в будущем. Но не забывайте, что чем
                больше билетов активировано для розыгрыша, тем больше шансов на
                выигрыш.
              </Text>
            </View>
          </LinearGradient>
        </LinearGradient>
      </ScrollView>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: WIDTH.width,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  containerView: {
    height: 340,
    paddingHorizontal: 15,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  header: {
    borderBottomColor: "#24224A",
    borderBottomWidth: 1,
    borderStyle: "solid",
    width: WIDTH.width - 30,
  },
  header__title: {
    fontFamily: FONTS.medium,
    fontSize: 24,
    color: textPrimaryColor,
    marginBottom: 10,
    marginTop: 45,
  },
  closePopup: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 999,
  },
  container__inner: {
    flexDirection: "row",
    // justifyContent: "space-between",
    columnGap: 15,
    alignItems: "center",
    marginTop: 20,
    // marginBottom: 20,
  },
  ticket__text: {
    color: textPrimaryColor,
    position: "absolute",
    fontFamily: FONTS.medium,
    fontSize: 16,
  },
  balance__text: {
    color: textPrimaryColor,
    fontSize: 18,
    fontFamily: FONTS.medium,
  },
  accsess__text: {
    // textAlign: "center",
    color: textColor4,
    fontFamily: FONTS.regular,
    fontSize: 12,
    marginLeft: 105,
    marginTop: 5,
    marginBottom: 20,
  },
  ticket__image: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    columnGap: 10,
  },
  text__minus: {
    backgroundColor: "rgba(154, 149, 178, 0.2)",
    height: 22,
    width: 26,
    textAlign: "center",
    borderRadius: 4,
    color: textPrimaryColor,
  },
  text__plus: {
    backgroundColor: "#9A95B2",
    height: 22,
    width: 26,
    textAlign: "center",
    borderRadius: 4,
  },
  button: {
    marginLeft: "auto",
  },
  text__button: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: textPrimaryColor,
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 8,
  },
});
