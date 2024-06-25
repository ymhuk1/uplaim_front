import {
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
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
import { Path, Svg } from "react-native-svg";

export default function ActivatesModalComponent({ onClose, disabled, modal, balance, ticketColor }) {
  const [modalVisible, setModalVisible] = useState(modal);
  const [quantity, setQuantityCount] = useState(0);

  const balanceIncrement = () => {
    setQuantityCount(Math.min(quantity + 1, 9999));
  };
  const balanceDecrement = () => {
    setQuantityCount(Math.max(quantity - 1, 0));
  };

  useEffect(() => {
    setModalVisible(modal);
  });

  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible}>
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
                <Svg
                  width="75"
                  height="23"
                  viewBox="0 0 45 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <Path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8.90903 0H0V5.23889C1.00411 5.71593 1.69811 6.73911 1.69811 7.92453C1.69811 9.10995 1.00411 10.1331 0 10.6102V15.7075H8.9079C8.97963 15.6558 9.0677 15.6253 9.16288 15.6253C9.25807 15.6253 9.34614 15.6558 9.41786 15.7075H45V10.6729C43.9204 10.2277 43.1604 9.16495 43.1604 7.92453C43.1604 6.68411 43.9204 5.62141 45 5.17615V0H9.41673C9.34522 0.0512418 9.25757 0.0814048 9.16288 0.0814048C9.06819 0.0814048 8.98055 0.0512418 8.90903 0ZM9.16288 0.626806C8.92191 0.626806 8.72656 0.822153 8.72656 1.06313V1.14494C8.72656 1.38591 8.92191 1.58126 9.16288 1.58126C9.40386 1.58126 9.5992 1.38591 9.5992 1.14494V1.06313C9.5992 0.822153 9.40386 0.626806 9.16288 0.626806ZM8.72656 2.56298C8.72656 2.32201 8.92191 2.12666 9.16288 2.12666C9.40386 2.12666 9.5992 2.32201 9.5992 2.56298V2.64479C9.5992 2.88576 9.40386 3.08111 9.16288 3.08111C8.92191 3.08111 8.72656 2.88576 8.72656 2.64479V2.56298ZM9.16288 3.62651C8.92191 3.62651 8.72656 3.82186 8.72656 4.06283V4.14464C8.72656 4.38562 8.92191 4.58096 9.16288 4.58096C9.40386 4.58096 9.5992 4.38562 9.5992 4.14464V4.06283C9.5992 3.82186 9.40386 3.62651 9.16288 3.62651ZM8.72656 5.56268C8.72656 5.32171 8.92191 5.12636 9.16288 5.12636C9.40386 5.12636 9.5992 5.32171 9.5992 5.56269V5.6445C9.5992 5.88547 9.40386 6.08082 9.16288 6.08082C8.92191 6.08082 8.72656 5.88547 8.72656 5.64449V5.56268ZM9.16288 6.62622C8.92191 6.62622 8.72656 6.82156 8.72656 7.06254V7.14435C8.72656 7.38532 8.92191 7.58067 9.16288 7.58067C9.40386 7.58067 9.5992 7.38532 9.5992 7.14435V7.06254C9.5992 6.82156 9.40386 6.62622 9.16288 6.62622ZM8.72656 8.56239C8.72656 8.32142 8.92191 8.12607 9.16288 8.12607C9.40386 8.12607 9.5992 8.32142 9.5992 8.56239V8.6442C9.5992 8.88517 9.40386 9.08052 9.16288 9.08052C8.92191 9.08052 8.72656 8.88517 8.72656 8.6442V8.56239ZM9.16288 9.62592C8.92191 9.62592 8.72656 9.82127 8.72656 10.0622V10.1441C8.72656 10.385 8.92191 10.5804 9.16288 10.5804C9.40386 10.5804 9.5992 10.385 9.5992 10.1441V10.0622C9.5992 9.82127 9.40386 9.62592 9.16288 9.62592ZM8.72656 11.5621C8.72656 11.3211 8.92191 11.1258 9.16288 11.1258C9.40386 11.1258 9.5992 11.3211 9.5992 11.5621V11.6439C9.5992 11.8849 9.40386 12.0802 9.16288 12.0802C8.92191 12.0802 8.72656 11.8849 8.72656 11.6439V11.5621ZM9.16288 12.6256C8.92191 12.6256 8.72656 12.821 8.72656 13.0619V13.1438C8.72656 13.3847 8.92191 13.5801 9.16288 13.5801C9.40386 13.5801 9.5992 13.3847 9.5992 13.1438V13.0619C9.5992 12.821 9.40386 12.6256 9.16288 12.6256ZM8.72656 14.5618C8.72656 14.3208 8.92191 14.1255 9.16288 14.1255C9.40386 14.1255 9.5992 14.3208 9.5992 14.5618V14.6436C9.5992 14.8846 9.40386 15.0799 9.16288 15.0799C8.92191 15.0799 8.72656 14.8846 8.72656 14.6436V14.5618Z"
                    fill={ticketColor}
                  />
                </Svg>
              </View>
              <View style={styles.ticket__image}>
                <Image
                  source={require("../assets/gifts/multiple.svg")}
                  height={24}
                  width={24}
                  style={{ marginTop: 8 }}
                />
                <Text style={styles.balance__text}>{quantity}</Text>
              </View>
              <View style={{ rowGap: 6 }}>
                <TouchableOpacity onPress={balanceIncrement}>
                  <Text style={styles.text__plus}>+</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={balanceDecrement}>
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
            <Text style={[styles.accsess__text]}>{balance} шт. доступно</Text>
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
                  использовать и в розыгрышах в будущем. Но не забывайте, что
                  чем больше билетов активировано для розыгрыша, тем больше
                  шансов на выигрыш.
                </Text>
              </View>
            </LinearGradient>
          </LinearGradient>
        </ScrollView>
      </BlurView>
    </Modal>
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
