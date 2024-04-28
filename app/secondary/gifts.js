import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Image, ImageBackground } from "expo-image";
import React, { useState } from "react";
import { FONTS, HEIGHT, WIDTH } from "../../constants/theme";
import HeaderComponent from "../../components/HeaderComponent";
import {
  elemBackgroundColor,
  elemBackgroundColor3,
  elemGradientColors,
  fuchsia,
  textColor4,
  textPrimaryColor,
} from "../../components/ColorsComponent";
import { LinearGradient } from "expo-linear-gradient";
import NewButtonComponent from "../../components/NewButtonComponent";

export default function Gifts() {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
  };
  return (
    <ScrollView
      // refreshControl={
      //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      // }
      contentContainerStyle={styles.container}
    >
      <ImageBackground
        source={require("../../assets/background.png")}
        contentFit={"cover"}
        style={styles.containerImg}
      >
        <View style={styles.containerView}>
          <Text style={styles.textTitle1}>Выигрывай с нами!</Text>
          <View style={styles.upBalanceContainer}>
            <LinearGradient
              colors={elemGradientColors}
              style={styles.upBalance}
            >
              <Text style={styles.upbalance__text}>У Вас</Text>
              <View
                style={{ flexDirection: "row-reverse", alignItems: "center" }}
              >
                <Image
                  height={18}
                  width={24}
                  source={require("../../assets/up.svg")}
                />
                <Text style={styles.balance__text}>300</Text>
              </View>
            </LinearGradient>
            <LinearGradient colors={elemGradientColors} style={styles.tickets}>
              {[
                {
                  source: require("../../assets/ticket-green.svg"),
                  count: 10,
                },
                {
                  source: require("../../assets/ticket-orange.svg"),
                  count: 5,
                },
                {
                  source: require("../../assets/ticket-fuksia.svg"),
                  count: 0,
                },
              ].map(({ source, count }) => (
                <View key={count} style={styles.ticket__inner}>
                  <Image height={15} width={45} source={source} />
                  <Text style={styles.ticket__text}>{count} билетов</Text>
                </View>
              ))}
              <View style={styles.ticket__button}>
                <NewButtonComponent
                  title={"Мои билеты"}
                  filled={true}
                  height={27}
                  width={WIDTH.width - 201}
                  fontSize={12}
                  onPress={() => {}}
                />
              </View>
            </LinearGradient>
          </View>

          <Text style={styles.textTitle2}>Сейчас в розыгрыше</Text>

          <View style={styles.giftsNow}>
            {[
              {
                sourceImg: require("../../assets/gifts/iphone.png"),
                sourceTicket: require("../../assets/ticket-green.svg"),
                text: "Apple iPhone 14",
              },
              {
                sourceImg: require("../../assets/gifts/macbook.png"),
                sourceTicket: require("../../assets/ticket-orange.svg"),
                text: "Apple iPhone 14",
              },
              {
                sourceImg: require("../../assets/gifts/car.png"),
                sourceTicket: require("../../assets/ticket-fuksia.svg"),
                text: "Apple iPhone 14",
              },
            ].map(({ sourceImg, sourceTicket, text }) => (
              <View key={text} style={styles.giftsNow__img}>
                <View style={styles.giftsNow__img_ticket}>
                  <Image height={15} width={45} source={sourceTicket} />
                </View>
                <Image
                  contentFit="cover"
                  contentPosition={"top"}
                  height={105}
                  width={giftsWidthImg}
                  source={sourceImg}
                  borderTopRightRadius={12}
                  borderTopLeftRadius={12}
                />
                <Text style={styles.giftsNow__text}>{text}</Text>
              </View>
            ))}
          </View>
          <TouchableOpacity>
            <View style={styles.prize__container}>
              <Text style={styles.text__prize}>Все разыгрываемые призы</Text>
            </View>
          </TouchableOpacity>

          <Text style={styles.textTitle2}>Текущие розыгрыши</Text>

          <View style={styles.currentGifts}>
            <View
              style={[styles.currentGifts__inner, { borderColor: "#50FF9A" }]}
            >
              <View style={styles.currentGifts__img}>
                <Image
                  height={60}
                  width={60}
                  source={require("../../assets/gifts/pizza.jpg")}
                  borderRadius={8}
                />
              </View>
              <View style={styles.currentGifts__text}>
                <Text style={styles.currentGifts__text_title}>Лови момент</Text>
                <Text style={styles.currentGifts__text_date}>
                  Розыгрыш 12.08.2024
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    columnGap: 5,
                  }}
                >
                  <Image
                    height={24}
                    width={24}
                    source={require("../../assets/gift-green.svg")}
                  />
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
                      { backgroundColor: "#27AE60" },
                    ]}
                  >
                    Участвовать
                  </Text>
                </TouchableOpacity>
                <Text style={styles.currentGifts__button_ticket}>
                  Активных билетов: 2
                </Text>
              </View>
            </View>
            <View
              style={[styles.currentGifts__inner, { borderColor: "#F2994A" }]}
            >
              <View style={styles.currentGifts__img}>
                <Image
                  height={60}
                  width={60}
                  source={require("../../assets/gifts/scooter.jpg")}
                  borderRadius={8}
                />
              </View>
              <View style={styles.currentGifts__text}>
                <Text style={styles.currentGifts__text_title}>Лови момент</Text>
                <Text style={styles.currentGifts__text_date}>
                  Розыгрыш 12.08.2024
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    columnGap: 5,
                  }}
                >
                  <Image
                    height={24}
                    width={24}
                    source={require("../../assets/gift-orange.svg")}
                  />
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
                      { backgroundColor: "#F2994A" },
                    ]}
                  >
                    Участвовать
                  </Text>
                </TouchableOpacity>
                <Text style={styles.currentGifts__button_ticket}>
                  Активных билетов: 1
                </Text>
              </View>
            </View>
            <View
              style={[styles.currentGifts__inner, { borderColor: "#F456FE" }]}
            >
              <View style={styles.currentGifts__img}>
                <Image
                  height={60}
                  width={60}
                  source={require("../../assets/gifts/telephone.jpg")}
                  borderRadius={8}
                />
              </View>
              <View style={styles.currentGifts__text}>
                <Text style={styles.currentGifts__text_title}>Лови момент</Text>
                <Text style={styles.currentGifts__text_date}>
                  Розыгрыш 12.08.2024
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    columnGap: 5,
                  }}
                >
                    <Image
                      height={24}
                      width={24}
                      source={require("../../assets/gift-pink.svg")}
                    />
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
                      { backgroundColor: "#F456FE" },
                    ]}
                  >
                    Участвовать
                  </Text>
                </TouchableOpacity>
                <Text style={styles.currentGifts__button_ticket}>
                  Активных билетов: 0
                </Text>
              </View>
            </View>
          </View>

          <TouchableOpacity>
            <View style={styles.prize__container}>
              <Text style={styles.text__prize}>Все розыгрыши</Text>
            </View>
          </TouchableOpacity>
          <Text style={styles.textTitle2}>Зарабатывай</Text>
          <Text style={styles.textTitle2}>История начислений</Text>
          <Text style={styles.textTitle2}>Ответы на вопросы</Text>
        </View>
      </ImageBackground>
    </ScrollView>
  );
}

let ticketsWidth = WIDTH.width - 180;
let upBalanceWidth = WIDTH.width - ticketsWidth - 45;
let giftsWidthImg = (WIDTH.width - 60) / 3;

const styles = StyleSheet.create({
  container: {
  // minHeight: "100%",
  },
  containerImg: {
    height: HEIGHT.height,
  },
  containerView: {
    // flex: 1,
    marginHorizontal: 15,
  },
  textTitle1: {
    marginTop: 50,
    marginBottom: 15,
    fontFamily: FONTS.medium,
    fontSize: 24,
    color: textPrimaryColor,
  },
  textTitle2: {
    marginTop: 20,
    marginBottom: 16,
    fontFamily: FONTS.medium,
    fontSize: 24,
    color: textPrimaryColor,
  },
  upBalanceContainer: {
    justifyContent: "center",
    flexDirection: "row",
    columnGap: 15,
  },
  upBalance: {
    height: 111,
    width: upBalanceWidth,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: elemBackgroundColor3,
    borderStyle: "solid",
    borderRadius: 10,
  },
  upbalance__text: {
    fontFamily: FONTS.regular,
    fontSize: 16,
    color: textPrimaryColor,
    marginBottom: 12,
  },
  balance__text: {
    fontFamily: FONTS.medium,
    fontSize: 30,
    color: textPrimaryColor,
    marginRight: 6,
  },
  tickets: {
    paddingTop: 10,
    height: 111,
    width: ticketsWidth,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: elemBackgroundColor3,
    borderStyle: "solid",
    borderRadius: 10,
  },
  ticket__inner: {
    paddingHorizontal: (ticketsWidth - 125) / 2,
    flexDirection: "row",
    alignItems: "center",
    columnGap: 8,
  },
  ticket__text: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    color: textPrimaryColor,
  },
  ticket__button: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 4,
    marginBottom: 4,
  },
  giftsNow: {
    position: "relative",
    flexDirection: "row",
    justifyContent: "center",
    columnGap: 15,
    marginBottom: 15,
  },
  giftsNow__img: {
    height: 154,
    width: giftsWidthImg,
    backgroundColor: elemBackgroundColor,
    borderRadius: 12,
    borderStartStartRadius: 0,
  },
  giftsNow__img_ticket: {
    position: "absolute",
    alignSelf: "center",
    top: -8,
    zIndex: 99,
  },
  giftsNow__text: {
    marginTop: 5,
    width: 65,
    fontFamily: FONTS.regular,
    fontSize: 14,
    color: textPrimaryColor,
    alignSelf: "center",
    textAlign: "center",
  },
  prize__container: {
    width: WIDTH.width - 30,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderWidth: 1,
    borderColor: fuchsia,
    borderStyle: "solid",
    borderRadius: 20,
  },
  text__prize: {
    textAlign: "center",
    alignItems: "center",
    fontFamily: FONTS.medium,
    fontSize: 18,
    color: textPrimaryColor,
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
    // justifyContent: "space-between",
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
  currentGifts__text_date: {
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
