import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Image, ImageBackground } from "expo-image";
import { FONTS, HEIGHT } from "../../constants/theme";
import HeaderComponent from "../../components/HeaderComponent";
import {
  fuchsia,
  textColor4,
  textPrimaryColor,
} from "../../components/ColorsComponent";
import { LinearGradient } from "expo-linear-gradient";
import NewButtonComponent from "../../components/NewButtonComponent";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function PayMethods() {
  const [textValue, setTextValue] = useState("Cпособ оплаты");
  const [isChecked1, setIsChecked1] = useState(true);
  const [isChecked2, setIsChecked2] = useState(false);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <ImageBackground
        source={require("../../assets/background.png")}
        contentFit={"cover"}
        style={styles.containerImg}
      >
        <View style={styles.container}>
          <HeaderComponent text={textValue} secondary={true} />
          <View style={styles.container__inner}>
            <TouchableOpacity style={styles.container__wrapper}>
              <Image
                contentFit="cover"
                contentPosition={"center"}
                transition={1000}
                source={require("../../assets/icon.svg")}
                height={30}
                width={40}
              />
              <View style={styles.text__wrapper}>
                <Text style={styles.text__title}>Оплата со счета</Text>
                <Text style={styles.text__subtitle}>На вашем счете 199.50</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.container__wrapper}>
              <Image
                contentFit="cover"
                contentPosition={"center"}
                transition={1000}
                source={require("../../assets/card-pink.svg")}
                height={20}
                width={26}
              />
              <View style={[styles.text__wrapper, { marginRight: "auto" }]}>
                <Text style={styles.text__title}>Банковской картой</Text>
              </View>
              <View style={styles.cards__container}>
                <LinearGradient
                  location={[0.5, 0.5]}
                  start={[1, 1]}
                  end={[0, 0]}
                  colors={["#7012CF", "#3D4ABA"]}
                  style={styles.card__container}
                >
                  <View style={styles.card__top}>
                    <Image
                      contentFit="contain"
                      contentPosition={"center"}
                      transition={1000}
                      source={require("../../assets/card.svg")}
                      width={11}
                      height={9}
                    />
                  </View>
                  <View style={styles.card__bottom}>
                    <Text style={styles.card__text}>
                      {/* * {item.card_number ? item.card_number.slice(-4) : ""} */}
                      * 1695
                    </Text>
                    <Image
                      contentFit="contain"
                      contentPosition={"center"}
                      transition={1000}
                      source={require("../../assets/mastercard.svg")}
                      width={32}
                      height={17}
                    />
                  </View>
                </LinearGradient>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.container__wrapper}>
              <Image
                contentFit="cover"
                contentPosition={"center"}
                transition={1000}
                source={require("../../assets/slice.svg")}
                height={32}
                width={32}
              />
              <View style={styles.text__wrapper}>
                <Text style={styles.text__title}>Оплата долями</Text>
                <Text style={styles.text__subtitle}>
                  300₽ платите сразу, остальное 3 частями
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.container__wrapper}>
              <Image
                contentFit="cover"
                contentPosition={"center"}
                transition={1000}
                source={require("../../assets/sbp.svg")}
                height={35}
                width={25}
              />
              <View style={styles.text__wrapper}>
                <Text style={styles.text__title}>Оплата по СБП</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.delivery__container}>
            <Text style={styles.text__title_delivery}>Доставка</Text>
            <Text style={styles.text__subtitle_delivery}>Куда</Text>
          </View>
          <View style={styles.adress__container}>
            <View style={styles.adress__inner}>
              <View
                style={
                  isChecked1
                    ? styles.adress__wrapper
                    : [styles.adress__wrapper, { borderColor: textColor4 }]
                }
              >
                <TouchableOpacity
                  onPress={() => {}}
                  style={
                    isChecked1
                      ? styles.adress__checkBox
                      : [
                          styles.adress__checkBox,
                          {
                            backgroundColor: "transparent",
                            borderWidth: 0,
                          },
                        ]
                  }
                ></TouchableOpacity>
              </View>
              <Text style={styles.adress__text}>
                Москва, Ак. Королева 15, кв.135
              </Text>
            </View>
            <View style={styles.adress__inner}>
              <View
                style={
                  isChecked2
                    ? styles.adress__wrapper
                    : [styles.adress__wrapper, { borderColor: textColor4 }]
                }
              >
                <TouchableOpacity
                  onPress={() => {}}
                  style={
                    isChecked2
                      ? styles.adress__checkBox
                      : [
                          styles.adress__checkBox,
                          {
                            backgroundColor: "transparent",
                            borderWidth: 0,
                          },
                        ]
                  }
                ></TouchableOpacity>
              </View>
              <Text style={styles.adress__text}>Москва, Кирова 15, кв.135</Text>
            </View>
          </View>
          <View style={styles.delivery__address_container}>
            <View style={styles.delivery__address_inner}>
              <Image
                contentFit="cover"
                contentPosition={"center"}
                transition={1000}
                source={require("../../assets/add_icon2.svg")}
                height={20}
                width={20}
              />
              <Text style={styles.adress__text}>Добавить новый адрес</Text>
            </View>
            <View style={styles.delivery__address_inner}>
              <Image
                contentFit="cover"
                contentPosition={"center"}
                transition={1000}
                source={require("../../assets/add_describe.svg")}
                height={20}
                width={20}
              />
              <Text style={styles.adress__text}>Комментарий к заказу</Text>
            </View>
            <View style={styles.delivery__address_inner}>
              <Image
                contentFit="cover"
                contentPosition={"center"}
                transition={1000}
                source={require("../../assets/telephone.svg")}
                height={20}
                width={20}
              />
              <Text style={styles.adress__text}>+79812456389</Text>
            </View>
          </View>
          <View style={styles.button__container}>
            <NewButtonComponent
              title={"Оформить заказ"}
              onPress={() => {}}
              filled={true}
              height={50}
            />
          </View>
        </View>
      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  containerImg: {
    minHeight: HEIGHT.height,
  },
  container: {
    flex: 1,
    marginHorizontal: 15,
  },
  container__inner: {
    marginTop: 15,
    rowGap: 12,
  },
  container__wrapper: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 15,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: textColor4,
    borderRadius: 16,
    height: 70,
  },
  text__wrapper: {
    rowGap: 10,
  },
  text__title: {
    fontFamily: FONTS.medium,
    fontSize: 18,
    lineHeight: 20,
    color: textPrimaryColor,
  },
  text__subtitle: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    lineHeight: 14,
    color: textPrimaryColor,
  },
  delivery__container: {
    rowGap: 24,
    marginTop: 20,
    marginBottom: 30,
  },
  text__title_delivery: {
    fontFamily: FONTS.medium,
    fontSize: 24,
    lineHeight: 24,
    color: textPrimaryColor,
  },
  text__subtitle_delivery: {
    fontFamily: FONTS.medium,
    fontSize: 18,
    lineHeight: 20,
    color: textPrimaryColor,
  },
  cards__container: {
    // flexDirection: "row",
    // columnGap: 5,
    // marginTop: 5,
    // marginBottom: 25,
  },
  card__container: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 4,
  },
  card__top: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  card__bottom: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    columnGap: 10,
  },
  card__text: {
    color: textPrimaryColor,
    fontFamily: FONTS.regular,
    fontSize: 10,
    lineHeight: 10,
    marginRight: "auto",
  },
  adress__container: {
    rowGap: 25,
    paddingBottom: 25,
    borderBottomWidth: 1,
    borderBottomColor: "#9A95B233",
    marginBottom: 25,
  },
  adress__inner: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 15,
  },
  adress__wrapper: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: fuchsia,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  adress__checkBox: {
    width: 13,
    height: 13,
    borderWidth: 1,
    borderColor: fuchsia,
    backgroundColor: fuchsia,
    borderRadius: 100,
  },
  adress__text: {
    fontFamily: FONTS.regular,
    fontSize: 16,
    lineHeight: 20,
    color: textPrimaryColor,
  },
  delivery__address_container: {
    rowGap: 25,
  },
  delivery__address_inner: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 15,
  },
  button__container: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 20,
  },
});
