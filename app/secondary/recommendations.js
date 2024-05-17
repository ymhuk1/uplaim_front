import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Image, ImageBackground } from "expo-image";
import { COLORS, FONTS, HEIGHT, WIDTH } from "../../constants/theme";
import HeaderComponent from "../../components/HeaderComponent";
import {
  elemBackgroundColor,
  elemGradientColors,
  textColor4,
  textPrimaryColor,
} from "../../components/ColorsComponent";
import { LinearGradient } from "expo-linear-gradient";
import QRCodeComponent from "../../components/QRCodeComponent";

export default function Recommendations() {
  const [textValue, setTextValue] = useState("Рекомендации");

  return (
    <ScrollView
      // refreshControl={
      //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      // }
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <ImageBackground
        source={require("../../assets/background.png")}
        contentFit={"cover"}
        style={styles.containerImg}
      >
        <View style={styles.containerView}>
          <HeaderComponent text={textValue} secondary={true} />
          <View style={styles.header__container}>
            <View style={styles.header__inner}>
              <Image
                style={styles.header_img}
                source={require("../../assets/recommendations.svg")}
                contentFit="contain"
                contentPosition={"center"}
                transition={1000}
                width={WIDTH.width - 112}
                height={WIDTH.width - 112}
              />
              <Text style={styles.title}>
                Приглашай друзей{"\n"}в компанию!
              </Text>
            </View>
            <Text style={styles.title2}>и получай</Text>
          </View>
          <View style={styles.friends__container}>
            <View style={styles.friends__inner}>
              <View style={styles.friends__inner_container}>
                <Image
                  style={styles.friends__img}
                  contentFit="contain"
                  contentPosition={"center"}
                  transition={1000}
                  source={require("../../assets/user.svg")}
                />
                <Text
                  style={[styles.friends__text, { fontFamily: FONTS.regular }]}
                >
                  тебе
                </Text>
                <Image
                  contentFit="contain"
                  contentPosition={"center"}
                  transition={1000}
                  source={require("../../assets/tooltip.svg")}
                  width={15}
                  height={15}
                />
              </View>
              <View style={styles.friends__inner_container}>
                <Image
                  contentFit="contain"
                  contentPosition={"center"}
                  transition={1000}
                  source={require("../../assets/ellipse.svg")}
                  width={12}
                  height={12}
                />
                <Text style={styles.friends__text}>300 баллов</Text>
              </View>
            </View>
            <View style={styles.friends__inner}>
              <View style={styles.friends__inner_container}>
                <Image
                  style={styles.friends__img}
                  contentFit="contain"
                  contentPosition={"center"}
                  transition={1000}
                  source={require("../../assets/users.svg")}
                />
                <Text
                  style={[styles.friends__text, { fontFamily: FONTS.regular }]}
                >
                  другу
                </Text>
              </View>
              <View style={styles.friends__inner_container}>
                <Image
                  contentFit="contain"
                  contentPosition={"center"}
                  transition={1000}
                  source={require("../../assets/ellipse.svg")}
                  width={12}
                  height={12}
                />
                <Text style={styles.friends__text}>150 баллов</Text>
              </View>
            </View>
          </View>
          <LinearGradient
            colors={elemGradientColors}
            style={styles.friendsBalls__container}
          >
            <Image
              style={styles.friendsBalls__img}
              contentFit="contain"
              contentPosition={"center"}
              source={require("../../assets/bags-shopping-green.svg")}
            />
            <Text style={styles.friends__text}>
              до 10% баллов{"\n"}от покупок друзей
            </Text>
          </LinearGradient>

          <View style={styles.linkQRC__container}>
            <View style={styles.linkQRC__inner}>
              <View style={styles.linkQRC__inner_info}>
                <Image
                  contentFit="contain"
                  contentPosition={"center"}
                  transition={1000}
                  source={require("../../assets/link.svg")}
                  width={24}
                  height={24}
                />
                <Text
                  style={styles.linkQRC__text_title}
                  // numberOfLines={2}
                >
                  Ссылка на{"\n"}персональные скидки
                </Text>
              </View>
              <TouchableOpacity style={styles.linkQRC__info_url}>
                <Text
                  style={[styles.linkQRC__text, { fontSize: 14 }]}
                  numberOfLines={1}
                >
                  www.website.com/pes..
                </Text>
              </TouchableOpacity>
              <Text style={styles.linkQRC__text}>Скопировать ссылку</Text>
            </View>
            <TouchableOpacity
              style={[
                styles.linkQRC__inner,
                { flex: 2 },
              ]}
            >
              <View style={styles.linkQRC__inner_qrc}>
                <Image
                  contentFit="contain"
                  contentPosition={"center"}
                  transition={1000}
                  source={require("../../assets/circuit.svg")}
                  width={24}
                  height={24}
                />
                <Text style={styles.linkQRC__text_title}>QR-код</Text>
              </View>
              <QRCodeComponent size={50} logoSize={20} />
              <Text style={styles.linkQRC__text}>Покажи другу</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.statistics__container}>
            <Image
              contentFit="contain"
              contentPosition={"center"}
              transition={1000}
              source={require("../../assets/statistics.svg")}
              width={24}
              height={24}
            />
            <Text style={styles.statistics__text}>
              Статистика{"\n"}по рекомендациям
            </Text>
          </View>

          <View style={styles.recommend__container}>
            <View style={styles.recommend__inner}>
              <Text
                style={[styles.recommend__balls_text, { marginRight: "auto" }]}
              >
                10
              </Text>
              <View style={styles.recommend__ellipsis}></View>
              <Text style={styles.recommend__text}>
                эффективных рекомендаций
              </Text>
            </View>
            <Image
              contentFit="contain"
              contentPosition={"center"}
              transition={1000}
              source={require("../../assets/tooltip.svg")}
              style={styles.recommend__img}
            />
            <View style={styles.recommend__inner}>
              <Text
                style={[styles.recommend__balls_text, { marginRight: "auto" }]}
              >
                600
              </Text>
              <View style={styles.recommend__ellipsis}></View>
              <Text style={styles.recommend__text}>
                баллов за покупки друзей
              </Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </ScrollView>
  );
}
// console.log();
let linkContainerWidth = WIDTH.width - 160;

const styles = StyleSheet.create({
  containerView: {
    // flex: 1,
  },
  containerImg: {
    minHeight: HEIGHT.height,
  },
  containerView: {
    marginHorizontal: 15,
  },
  header__container: {
    marginBottom: 15,
  },
  header__inner: {
    marginBottom: 10,
  },
  header_img: {
    alignSelf: "center",
  },
  title: {
    position: "absolute",
    bottom: 16,
    fontFamily: FONTS.medium,
    fontSize: 24,
    color: textPrimaryColor,
    alignSelf: "center",
    textAlign: "center",
    lineHeight: 24,
  },
  title2: {
    position: "absolute",
    bottom: 0,
    fontFamily: FONTS.regular,
    fontSize: 16,
    color: textPrimaryColor,
    alignSelf: "center",
    lineHeight: 20,
  },
  friends__container: {
    flexDirection: "row",
    columnGap: 15,
    marginBottom: 15,
  },
  friends__inner: {
    width: (WIDTH.width - 45) / 2,
    borderRadius: 12,
    backgroundColor: elemBackgroundColor,
    padding: 12,
    rowGap: 10,
    justifyContent: "center",
  },
  friends__img: {
    height: 24,
    width: 24,
  },
  friends__inner_container: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 5,
  },
  friends__text: {
    fontFamily: FONTS.medium,
    fontSize: 20,
    color: textPrimaryColor,
    lineHeight: 24,
  },
  friendsBalls__container: {
    flexDirection: "row",
    columnGap: 13,
    alignItems: "center",
    borderRadius: 16,
    paddingHorizontal: 57,
    paddingVertical: 16,
    justifyContent: "center",
    marginBottom: 15,
  },
  friendsBalls__img: {
    height: 34,
    width: 34,
  },
  linkQRC__container: {
    flexDirection: "row",
    columnGap: 15,
    marginBottom: 30,
  },
  linkQRC__inner: {
    flex: 3,
    // width: linkContainerWidth,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: elemBackgroundColor,
    rowGap: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  linkQRC__inner_info: {
    flexDirection: "row",
    columnGap: 6,
    justifyContent: "center",
    paddingHorizontal: 15,
  },
  linkQRC__inner_qrc: {
    flexDirection: "row",
    columnGap: 6,
    alignItems: "center",
  },
  linkQRC__info_url: {
    width: "100%",
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 100,
    backgroundColor: COLORS.primary,
    alignItems: "center",
  },
  linkQRC__text_title: {
    fontFamily: FONTS.medium,
    fontSize: 14,
    lineHeight: 16,
    color: textPrimaryColor,
  },
  linkQRC__text: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    lineHeight: 14,
    color: textPrimaryColor,
  },
  statistics__container: {
    flexDirection: "row",
    columnGap: 7,
    marginBottom: 20,
  },
  statistics__text: {
    fontFamily: FONTS.medium,
    fontSize: 24,
    color: textPrimaryColor,
    lineHeight: 24,
  },
  recommend__container: {
    paddingLeft: 10,
    paddingRight: 15,
    paddingVertical: 15,
    borderRadius: 12,
    backgroundColor: elemBackgroundColor,
    marginBottom: 15,
    rowGap: 10,
  },
  recommend__inner: {
    position: "relative",
    flexDirection: "row",
    alignItems: "baseline",
    // backgroundColor: "green",
  },
  recommend__img: {
    position: "absolute",
    top: 18,
    right: 8,
    height: 8,
    width: 8,
  },
  recommend__text: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: textPrimaryColor,
    lineHeight: 14,
    // backgroundColor: "red",
  },
  recommend__balls_text: {
    fontFamily: FONTS.medium,
    fontSize: 24,
    color: textPrimaryColor,
    lineHeight: 24,
    // backgroundColor: "red",
  },
  recommend__ellipsis: {
    flex: 1,
    borderBottomColor: "white",
    borderBottomWidth: 1,
    borderColor: textColor4,
    borderStyle: "dotted",
    marginHorizontal: 5,
  },
});
