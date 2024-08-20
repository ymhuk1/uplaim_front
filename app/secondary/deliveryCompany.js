import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
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
  textBackgroundColor,
  textColor4,
  textDisabledColor,
  textPrimaryColor,
} from "../../components/ColorsComponent";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

export default function DeliveryCompany() {
  const [textValue, setTextValue] = useState("\nПиццерия\nДон Трамоне");
  const [isActive, setIsActive] = useState(false);
  const [categoryActive, setCategoryActive] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[2]}
        invertStickyHeaders={true}
      >
        <ImageBackground
          source={require("../../assets/background.png")}
          contentFit={"cover"}
          style={styles.containerImg}
        >
          <View style={[styles.container, { marginTop: -30, marginBottom: isModalVisible ? 150 : 0}]}>
            <HeaderComponent text={textValue} secondary={true} />
            <View style={styles.info__container}>
              <View style={styles.info__tag_top}>
                <Text
                  style={[
                    styles.tag__top_text,
                    {
                      backgroundColor: fuchsia,
                      borderRadius: 4,
                      paddingHorizontal: 7,
                      paddingVertical: 2,
                    },
                  ]}
                >
                  Топ 10
                </Text>
                <Text
                  style={[
                    styles.tag__top_text,
                    {
                      backgroundColor: textBackgroundColor,
                      borderRadius: 4,
                      paddingHorizontal: 7,
                      paddingVertical: 2,
                      marginRight: "auto",
                    },
                  ]}
                >
                  Доставка бесплатно
                </Text>
                {/* <TagComponent tags={company.tags} /> */}
                <Image
                  contentFit="cover"
                  contentPosition={"center"}
                  transition={1000}
                  source={require("../../assets/star.svg")}
                  height={17}
                  width={17}
                />
                <Text style={styles.ratingText}>
                  {/* {Math.floor(
                      company.reviews_rating ? company.reviews_rating * 10 : 0
                    ) / 10} */}
                  4.8
                </Text>
                <Image
                  contentFit="cover"
                  contentPosition={"center"}
                  transition={1000}
                  source={require("../../assets/slice.svg")}
                  height={16}
                  width={16}
                  style={{ marginLeft: 12 }}
                />
              </View>
              <View style={styles.info__img_container}>
                <Image
                  contentFit="cover"
                  contentPosition={"center"}
                  transition={1000}
                  source={require("../../assets/temp-image/pizza.png")}
                  style={styles.info__img}
                />
              </View>
              <View style={styles.info__tag_bottom}>
                <Image
                  contentFit="cover"
                  contentPosition={"center"}
                  transition={1000}
                  source={require("../../assets/time.svg")}
                  height={15}
                  width={15}
                />
                <Text
                  style={[
                    styles.ratingText,
                    { color: "#9A95B2", marginRight: "auto" },
                  ]}
                >
                  {/* {Math.floor(
                      company.reviews_rating ? company.reviews_rating * 10 : 0
                    ) / 10} */}
                  30-40 мин
                </Text>
                <Text
                  style={[
                    styles.tag__top_text,
                    {
                      backgroundColor: "#F2994A",
                      borderRadius: 4,
                      paddingHorizontal: 7,
                      paddingVertical: 2,
                    },
                  ]}
                >
                  50% баллами
                </Text>
                <Text
                  style={[
                    styles.tag__top_text,
                    {
                      backgroundColor: "#3D4ABA",
                      borderRadius: 4,
                      paddingHorizontal: 7,
                      paddingVertical: 2,
                    },
                  ]}
                >
                  10% кэшбек
                </Text>
                {/* <TagComponent tags={company.tags} /> */}
              </View>
            </View>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.category__container}
            >
              {[
                "Избранное",
                "Пицца",
                "Роллы",
                "Напитки",
                "Бутилированная вода",
              ].map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.category__text_container,
                    categoryActive === index &&
                      styles.category__text_containerActive,
                  ]}
                  onPress={() =>
                    setCategoryActive(categoryActive === index ? null : index)
                  }
                >
                  <Text
                    style={[
                      styles.category__text,
                      categoryActive === index && styles.category__text_active,
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <Text style={styles.text__title}>Пицца</Text>
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
                  <Text style={[styles.items__text, { marginTop: 5 }]}>999₽</Text>
                  <Text style={[styles.items__text, { color: textColor4 }]}>
                    350 г
                  </Text>
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
                  <Text style={[styles.items__text, { marginTop: 10 }]}>
                    999₽
                  </Text>
                  <Text style={[styles.items__text, { color: textColor4 }]}>
                    350 г
                  </Text>
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
            <Text style={styles.text__title}>Роллы</Text>
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
                  <Text style={[styles.items__text, { color: textColor4 }]}>
                    350 г
                  </Text>
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
                  <Text style={[styles.items__text, { color: textColor4 }]}>
                    350 г
                  </Text>
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
                  router.push({ pathname: "/secondary/basket" });
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
  container: {
    marginHorizontal: 15,
  },
  info__container: {
    marginTop: 15,
    backgroundColor: elemBackgroundColor,
    borderRadius: 10,
    paddingVertical: 10,
  },
  info__text_container: {
    paddingHorizontal: 10,
    marginBottom: 8,
  },
  info__text: {
    fontFamily: FONTS.medium,
    fontSize: 16,
    lineHeight: 23,
    color: textPrimaryColor,
  },
  info__tag_top: {
    flexDirection: "row",
    paddingHorizontal: 10,
    marginBottom: 10,
    columnGap: 7,
    alignItems: "center",
  },
  tag__top_text: {
    fontFamily: FONTS.medium,
    fontSize: 10,
    // lineHeight: 24,
    color: textPrimaryColor,
  },
  ratingText: {
    color: textPrimaryColor,
    fontFamily: FONTS.medium,
    fontSize: 14,
  },
  info__img_container: {},
  info__img: {
    width: WIDTH.width - 30,
    height: WIDTH.width * 0.6,
  },
  info__tag_bottom: {
    marginTop: 10,
    flexDirection: "row",
    paddingHorizontal: 10,
    columnGap: 7,
    alignItems: "center",
  },
  category__container: {
    marginTop: 20,
    paddingHorizontal: 10,
    marginBottom: 20,
    columnGap: 10,
  },
  category__text_container: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "#9A95B233",
    borderRadius: 6,
  },
  category__text_containerActive: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: textColor4,
    borderRadius: 6,
  },
  category__text: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    lineHeight: 14,
    color: textColor4,
  },
  category__text_active: {
    fontFamily: FONTS.medium,
    fontSize: 12,
    lineHeight: 14,
    color: elemBackgroundColor,
  },
  text__title: {
    fontFamily: FONTS.medium,
    fontSize: 16,
    lineHeight: 24,
    color: textPrimaryColor,
    marginBottom: 10,
  },
  items__container: {
    flexDirection: "row",
    columnGap: 15,
    marginBottom: 20,
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
});
