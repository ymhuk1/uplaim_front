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
import { Image } from "expo-image";
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

export default function TicketsModalComponent({ onClose, disabled, modal }) {
  const [modalVisible, setModalVisible] = useState(modal);

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
                <Image
                  source={require("../assets/ticket-green.svg")}
                  height={23}
                  width={66}
                />
                <Text style={styles.ticket__text}>900 ₽</Text>
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
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  columnGap: 4,
                }}
              >
                <Image
                  source={require("../assets/gifts/equally.png")}
                  height={24}
                  width={24}
                  style={{ marginTop: 8 }}
                />
                <Text style={styles.balance__text}>9000 ₽</Text>
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
                  <Text style={styles.text__button}>Купить</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
            <Text style={[styles.accsess__text]}>20 шт. доступно</Text>

            <View style={styles.container__inner}>
              <View
                style={{
                  // alignItems: "center",
                  position: "relative",
                  justifyContent: "center",
                }}
              >
                <Image
                  source={require("../assets/ticket-fuksia.svg")}
                  height={23}
                  width={66}
                />
                <Text
                  style={[
                    styles.ticket__text,
                    {
                      left: 14,
                    },
                  ]}
                >
                  10
                </Text>
                <Image
                  source={require("../assets/gifts/gift-up.svg")}
                  height={12}
                  width={18}
                  style={{ position: "absolute", right: 14 }}
                />
              </View>
              <Image
                source={require("../assets/gifts/multiple.svg")}
                height={24}
                width={24}
                style={{ marginTop: 8 }}
              />
              <Text style={styles.balance__text}>10</Text>
              <View style={{ rowGap: 5 }}>
                <TouchableOpacity>
                  <Text style={styles.text__plus}>+</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.text__minus}>-</Text>
                </TouchableOpacity>
              </View>
              <Image
                source={require("../assets/gifts/equally.png")}
                height={24}
                width={24}
                style={{ marginTop: 8 }}
              />
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "baseline",
                  columnGap: 4,
                }}
              >
                <Text style={styles.balance__text}>100</Text>
                <Image
                  source={require("../assets/up.svg")}
                  height={14}
                  width={22}
                />
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
                  <Text
                    style={[styles.text__button, { paddingHorizontal: 14 }]}
                  >
                    Обменять
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
            <Text style={[styles.accsess__text]}>10 шт. доступно</Text>
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
    height: 300,
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
    columnGap: 5,
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
    marginLeft: 85,
    marginBottom: 10,
  },
  ticket__image: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
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
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
  },
});
