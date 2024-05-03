import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { FONTS, HEIGHT } from "../../constants/theme";
import { elemBackgroundColor, textColor4, textPrimaryColor } from "../../components/ColorsComponent";
import HeaderComponent from "../../components/HeaderComponent";
import { Image } from "expo-image";

export default function AllRaffles() {
  const [textValue, setTextValue] = useState("Все розыгрыши");

  return (
    <ScrollView style={styles.container}>
      <View style={styles.container__rafles}>
        <HeaderComponent text={textValue} secondary={true} />
        <View style={styles.currentGifts}>
          {[
            {
              srcImg: require("../../assets/gifts/pizza.jpg"),
              srcTicket: require("../../assets/gift-green.svg"),
              borderColor: "#50FF9A",
              activeTickets: 2,
            },
            {
              srcImg: require("../../assets/gifts/scooter.jpg"),
              srcTicket: require("../../assets/gift-orange.svg"),
              borderColor: "#F2994A",
              activeTickets: 1,
            },
            {
              srcImg: require("../../assets/gifts/telephone.jpg"),
              srcTicket: require("../../assets/gift-pink.svg"),
              borderColor: "#F456FE",
              activeTickets: 0,
            },
            {
              srcImg: require("../../assets/gifts/eat.png"),
              srcTicket: require("../../assets/gift-red.svg"),
              borderColor: "#D12038",
              activeTickets: 0,
            },
          ].map(({ srcImg, srcTicket, borderColor, activeTickets }) => (
            <View
              key={srcImg}
              style={[styles.currentGifts__inner, { borderColor }]}
            >
              <View style={styles.currentGifts__img}>
                <Image
                  height={60}
                  width={60}
                  source={srcImg}
                  borderRadius={8}
                />
              </View>
              <View style={styles.currentGifts__text}>
                <Text style={styles.currentGifts__text_title}>Лови момент</Text>
                <Text style={styles.text_date}>Розыгрыш 12.08.2024</Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    columnGap: 5,
                  }}
                >
                  <Image height={24} width={24} source={srcTicket} />
                  <Text style={styles.currentGifts__text_prizes}>
                    50 призов
                  </Text>
                </View>
              </View>
              <View style={styles.currentGifts__button}>
                <TouchableOpacity>
                  <Text
                    style={[
                      styles.currentGifts__button_text,
                      { backgroundColor: borderColor },
                    ]}
                  >
                    Участвовать
                  </Text>
                </TouchableOpacity>
                <Text style={styles.currentGifts__button_ticket}>
                  Активных билетов: {activeTickets}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: elemBackgroundColor,
    height: HEIGHT.height,
  },
  container__rafles: {
    minHeight: HEIGHT.height,
    paddingHorizontal: 15,
  },
  currentGifts: {
    marginBottom: 5,
  },
  currentGifts__inner: {
    flexDirection: "row",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderWidth: 2,
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 10,
  },
  currentGifts__img: {
    borderWidth: 1,
    borderColor: textColor4,
    borderRadius: 8,
  },
  currentGifts__text_title: {
    fontFamily: FONTS.medium,
    fontSize: 16,
    color: textPrimaryColor,
  },
  currentGifts__text: {
    alignItems: "start",
    justifyContent: "center",
    marginLeft: 8,
    marginRight: "auto",
  },
  text_date: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: textColor4,
  },
  currentGifts__text_prizes: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: textPrimaryColor,
    alignSelf: "flex-end",
    justifyContent: "center",
  },
  currentGifts__button: {
    alignItems: "flex-end",
    marginRight: 4,
  },
  currentGifts__button_text: {
    width: 94,
    fontFamily: FONTS.regular,
    textAlign: "center",
    fontSize: 12,
    color: textPrimaryColor,
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderRadius: 7,
    marginBottom: 4,
  },
  currentGifts__button_ticket: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: textPrimaryColor,
  },
});
