import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Image, ImageBackground } from "expo-image";
import { FONTS, HEIGHT, WIDTH } from "../../constants/theme";
import HeaderComponent from "../../components/HeaderComponent";
import {
  elemBackgroundColor,
  elemBackgroundColor2,
  fuchsia,
  inputBackgroundColor,
  textColor4,
  textPrimaryColor,
} from "../../components/ColorsComponent";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/MaterialIcons";
import CheckboxComponent from "../../components/CheckboxComponent";
import { router } from "expo-router";

export default function Basket() {
  const [textValue, setTextValue] = useState("Корзина");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isChecked, setIsChecked] = useState(true);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const toggleStatus = () => {
    setIsChecked(!isChecked);
  };

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={require("../../assets/background.png")}
          contentFit={"cover"}
          style={styles.containerImg}
        >
          <View style={[styles.basket__container, {marginBottom: isModalVisible? 150 : 0}]}>
            <HeaderComponent text={textValue} secondary={true} />
            <View style={styles.basket__top}>
              <Text style={styles.basket__text}>Заказ</Text>
              <TouchableOpacity onPress={() => {}}>
                <Image
                  contentFit="cover"
                  contentPosition={"center"}
                  transition={1000}
                  source={require("../../assets/basket.svg")}
                  height={25}
                  width={25}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.basket__items}>
              <View style={styles.basket__item}>
                <Image
                  contentFit="cover"
                  contentPosition={"center"}
                  transition={1000}
                  source={require("../../assets/temp-image/rolls.png")}
                  style={styles.items__basket_img}
                />
                <View style={styles.items__text_basket}>
                  <Text style={styles.items__text_name}>Пеперрони двойная</Text>
                  <Text style={styles.items__text_weight}>350 г</Text>
                  <Text style={styles.items__text_price}>999₽</Text>
                </View>
                <View style={styles.items__add_basket}>
                  <TouchableOpacity>
                    <Text style={styles.items__add_basket_text}>-</Text>
                  </TouchableOpacity>
                  <View style={styles.items__basket}>
                    <TextInput
                      style={styles.items__add_basket_text}
                      placeholder="0"
                      placeholderTextColor={textPrimaryColor}
                      maxLength={1}
                      caretHidden
                      inputMode="numeric"
                    ></TextInput>
                  </View>
                  <TouchableOpacity>
                    <Text style={styles.items__add_basket_text}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.basket__item}>
                <Image
                  contentFit="cover"
                  contentPosition={"center"}
                  transition={1000}
                  source={require("../../assets/temp-image/rolls.png")}
                  style={styles.items__basket_img}
                />
                <View style={styles.items__text_basket}>
                  <Text style={styles.items__text_name}>Пеперрони двойная</Text>
                  <Text style={styles.items__text_weight}>350 г</Text>
                  <Text style={styles.items__text_price}>999₽</Text>
                </View>
                <View style={styles.items__add_basket}>
                  <TouchableOpacity>
                    <Text style={styles.items__add_basket_text}>-</Text>
                  </TouchableOpacity>
                  <View style={styles.items__basket}>
                    <TextInput
                      style={styles.items__add_basket_text}
                      placeholder="0"
                      placeholderTextColor={textPrimaryColor}
                      maxLength={1}
                      caretHidden
                      inputMode="numeric"
                    ></TextInput>
                  </View>
                  <TouchableOpacity>
                    <Text style={styles.items__add_basket_text}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <Text style={styles.basket__text}>Дополнить заказ</Text>
            <View style={styles.items__container}>
              <View style={styles.items__inner}>
                <Image
                  contentFit="cover"
                  contentPosition={"center"}
                  transition={1000}
                  source={require("../../assets/temp-image/pizza.png")}
                  style={styles.items__img}
                />
                <View style={styles.items__text_container}>
                  <Text style={[styles.items__text, { marginBottom: "auto" }]}>
                    {"Маргарита\n с чесноком"}
                  </Text>
                  <Text style={[styles.items__text, { marginTop: 10 }]}>
                    999₽
                  </Text>
                  <Text style={styles.items__text_weight}>350 г</Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    toggleModal();
                  }}
                >
                  <View style={styles.items__add_container}>
                    <Image
                      contentFit="cover"
                      contentPosition={"center"}
                      transition={1000}
                      source={require("../../assets/add_icon.svg")}
                      style={styles.items__add_img}
                    />
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.items__inner}>
                <Image
                  contentFit="cover"
                  contentPosition={"center"}
                  transition={1000}
                  source={require("../../assets/temp-image/rolls.png")}
                  style={styles.items__img}
                />
                <View style={styles.items__text_container}>
                  <Text style={[styles.items__text, { marginBottom: "auto" }]}>
                    Пеперрони
                  </Text>
                  <Text style={styles.items__text}>999₽</Text>
                  <Text style={styles.items__text_weight}>350 г</Text>
                </View>
                <View style={styles.items__add_counter}>
                  <TouchableOpacity>
                    <Text style={styles.items__add_counter_text}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.items__add_counter_text}>1</Text>
                  <TouchableOpacity>
                    <Text style={styles.items__add_counter_text}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <TouchableOpacity>
              <View style={styles.basket__promo}>
                <Image
                  contentFit="cover"
                  contentPosition={"center"}
                  transition={1000}
                  source={require("../../assets/arrows.svg")}
                  height={12}
                  width={16}
                />
                <Text style={styles.basket__promo_text}>Промокод</Text>
                <Icon name="arrow-forward-ios" size={17} color={fuchsia} />
              </View>
            </TouchableOpacity>
            <View style={styles.basket__balls}>
              <CheckboxComponent
                isChecked={isChecked}
                onToggle={toggleStatus}
                title={"Списать накопленные баллы"}
                basket={true}
              />
            </View>
            <Text style={styles.basket__text}>Детализация</Text>
            <View style={{ rowGap: 20, marginBottom: 20 }}>
              <View style={styles.recommend__inner}>
                <Text style={styles.items__text_weight}>Доставка</Text>
                <View style={styles.recommend__ellipsis}></View>
                <Text style={[styles.basket__text, { marginVertical: 0 }]}>
                  Бесплатно
                </Text>
              </View>
              <View style={styles.recommend__inner}>
                <Text style={styles.items__text_weight}>Сумма заказа</Text>
                <View style={styles.recommend__ellipsis}></View>
                <Text style={[styles.basket__text, { marginVertical: 0 }]}>
                  999₽
                </Text>
              </View>
              <View style={styles.recommend__inner}>
                <Text style={styles.items__text_weight}>Будет начислено</Text>
                <View style={styles.recommend__ellipsis}></View>
                <Text style={[styles.basket__text, { marginVertical: 0 }]}>
                  159 баллов
                </Text>
              </View>
            </View>
          </View>
        </ImageBackground>
      </ScrollView>
      {isModalVisible && (
        <View style={styles.modal__container}>
          <StatusBar barStyle="light-content" backgroundColor="#121123" />
          <View style={styles.modal__inner}>
            <View style={styles.modal__top_container}>
              <Image
                contentFit="cover"
                contentPosition={"center"}
                transition={1000}
                source={require("../../assets/time.svg")}
                height={15}
                width={15}
                style={styles.modal__img}
              />
              <Text style={styles.modal__top_text}>30-40 мин</Text>
            </View>
            <Text style={[styles.modal__top_text, { marginVertical: 20 }]}>
              Добавьте еще 331₽ для оформления заказа.
            </Text>
            <View style={styles.modal__bottom_container}>
              <Text
                style={[
                  styles.modal__bottom_text,
                  { fontSize: 24, lineHeight: 24, marginRight: "auto" },
                ]}
              >
                999₽
              </Text>
              <TouchableOpacity
                onPress={() => {
                  router.push({ pathname: "/secondary/payMethods" });
                }}
              >
                <LinearGradient
                  location={[0.5, 0.5]}
                  start={[0, 0]}
                  end={[1, 1]}
                  colors={["#7012CF", "#3D4ABA"]}
                  style={styles.modal__bottom_btn}
                >
                  <Text style={styles.modal__bottom_text}>Оплатить</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  containerImg: {
    minHeight: HEIGHT.height,
  },
  basket__container: {
    marginHorizontal: 15,
  },
  basket__top: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  basket__text: {
    fontFamily: FONTS.medium,
    fontSize: 18,
    lineHeight: 20,
    color: textPrimaryColor,
    marginVertical: 20,
  },
  basket__items: {
    rowGap: 20,
  },
  basket__item: {
    flex: 1,
    flexDirection: "row",
    columnGap: 10,
    alignItems: "center",
    backgroundColor: elemBackgroundColor,
    borderRadius: 10,
  },
  items__basket_img: {
    width: WIDTH.width * 0.26,
    height: "100%",
    borderRadius: 10,
  },
  items__text_basket: {
    flex: 1,
    rowGap: 10,
    paddingVertical: 5,
  },
  items__text_name: {
    width: 100,
    fontFamily: FONTS.medium,
    fontSize: 16,
    lineHeight: 19,
    color: textPrimaryColor,
  },
  items__text_weight: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    lineHeight: 14,
    color: textColor4,
  },
  items__text_price: {
    fontFamily: FONTS.medium,
    fontSize: 24,
    lineHeight: 24,
    color: textPrimaryColor,
  },
  items__add_basket: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    columnGap: 20,
    marginLeft: "auto",
  },
  items__add_basket_text: {
    flex: 1,
    textAlign: "center",
    textAlignVertical: "center",
    fontFamily: FONTS.medium,
    fontSize: 19,
    lineHeight: 19,
    color: textPrimaryColor,
    width: "100%",
  },
  items__basket: {
    marginVertical: 20,
    paddingHorizontal: 12,
    backgroundColor: elemBackgroundColor2,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  items__container: {
    flexDirection: "row",
    columnGap: 15,
  },
  items__inner: {
    flex: 1,
    backgroundColor: elemBackgroundColor,
    borderRadius: 10,
  },
  items__img: {
    width: "100%",
    height: 122,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  items__text_container: {
    flex: 1,
    marginHorizontal: 7,
    marginVertical: 5,
  },
  items__text: {
    fontFamily: FONTS.medium,
    fontSize: 16,
    lineHeight: 24,
    color: textPrimaryColor,
  },
  items__add_container: {
    position: "absolute",
    bottom: 0,
    right: 0,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: elemBackgroundColor2,
    borderTopStartRadius: 10,
    borderBottomRightRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  items__add_img: {
    width: 18,
    height: 18,
  },
  items__add_counter: {
    position: "absolute",
    bottom: 0,
    right: 0,
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    columnGap: 20,
  },
  items__add_counter_text: {
    fontFamily: FONTS.medium,
    fontSize: 19,
    lineHeight: 19,
    color: textPrimaryColor,
  },
  recommend__inner: {
    position: "relative",
    flexDirection: "row",
    alignItems: "baseline",
  },
  recommend__img: {
    position: "absolute",
    top: 9,
    right: 4,
    height: 8,
    width: 8,
  },
  recommend__text: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: textPrimaryColor,
    lineHeight: 14,
  },
  recommend__balls_text: {
    fontFamily: FONTS.medium,
    fontSize: 24,
    color: textPrimaryColor,
    lineHeight: 24,
  },
  recommend__ellipsis: {
    flex: 1,
    borderBottomColor: "white",
    borderBottomWidth: 1,
    borderColor: textColor4,
    borderStyle: "dotted",
    marginHorizontal: 5,
  },
  modal__container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modal__inner: {
    backgroundColor: elemBackgroundColor2,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    width: WIDTH.width,
    height: HEIGHT.height * 0.16,
    padding: 15,
  },
  modal__top_container: {
    flexDirection: "row",
    marginLeft: "auto",
    columnGap: 6,
    alignItems: "center",
    paddingRight: 10,
  },
  modal__top_text: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    lineHeight: 14,
    color: textColor4,
  },
  modal__bottom_container: {
    flexDirection: "row",
    columnGap: 6,
    alignItems: "center",
    height: 54,
    borderRadius: 16,
    paddingLeft: 25,
    backgroundColor: inputBackgroundColor,
  },
  modal__bottom_btn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 25,
    borderBottomRightRadius: 16,
    borderTopRightRadius: 16,
  },
  modal__bottom_text: {
    fontFamily: FONTS.medium,
    fontSize: 18,
    lineHeight: 20,
    color: textPrimaryColor,
  },
  basket__promo: {
    marginVertical: 20,
    flexDirection: "row",
    columnGap: 15,
    alignItems: "center",
  },
  basket__promo_text: {
    fontFamily: FONTS.regular,
    fontSize: 16,
    lineHeight: 20,
    color: textPrimaryColor,
    marginRight: "auto",
  },
  basket__balls: {
    flexDirection: "row",
    alignItems: "center",
    // columnGap: 10,
  },
});
