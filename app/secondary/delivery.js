import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Image, ImageBackground } from "expo-image";
import { FONTS, HEIGHT, WIDTH } from "../../constants/theme";
import HeaderComponent from "../../components/HeaderComponent";
import SearchComponent from "../../components/SearchComponent";
import {
  elemBackgroundColor,
  fuchsia,
  textBackgroundColor,
  textPrimaryColor,
} from "../../components/ColorsComponent";
import GiftNow from "../../components/GiftsNowComponent";
import Constants from "expo-constants";
import TagComponent from "../../components/TagComponent";
import { router, useGlobalSearchParams } from "expo-router";

const apiBaseUrl = Constants.expoConfig.extra.API_PROD;
let giftsWidthImg = (WIDTH.width - 50) / 3;

export default function Delivery() {
  const { id } = useGlobalSearchParams();
  const [textValue, setTextValue] = useState("Доставка еды");
  const [refreshing, setRefreshing] = useState(false);
  const [company, setCompany] = useState({});

  const companyId = id;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch(`${apiBaseUrl}api/companies/${companyId}`)
      .then((response) => {
        response.json();
      })
      .then((response) => response.json())
      .then((data) => {
        setCompany(data);
        setRefreshing(false);
      })
      .catch((error) => {
        setRefreshing(false);
      });
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <ImageBackground
        source={require("../../assets/background.png")}
        contentFit={"cover"}
        style={styles.containerImg}
      >
        <View style={styles.container}>
          <HeaderComponent text={textValue} secondary={true} />
          <View style={styles.search__container}>
            <SearchComponent main={true} />
          </View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={styles.scroll__container}>
              <TouchableOpacity>
                <View style={styles.scroll__inner}>
                  <Image
                    contentFit="cover"
                    contentPosition={"center"}
                    transition={1000}
                    source={require("../../assets/temp-image/pizza.png")}
                    style={styles.scroll__image}
                  />
                  <View style={styles.scroll__text__container}>
                    <Text style={styles.scroll__text}>Пицца</Text>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View
                  style={[
                    styles.scroll__inner,
                    { borderColor: fuchsia, borderWidth: 1.5 },
                  ]}
                >
                  <Image
                    contentFit="cover"
                    contentPosition={"center"}
                    transition={1000}
                    source={require("../../assets/temp-image/rolls.png")}
                    style={styles.scroll__image}
                  />
                  <View style={styles.scroll__text__container}>
                    <Text style={styles.scroll__text}>Роллы</Text>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View style={styles.scroll__inner}>
                  <Image
                    contentFit="cover"
                    contentPosition={"center"}
                    transition={1000}
                    source={require("../../assets/temp-image/chinise_food.png")}
                    style={styles.scroll__image}
                  />
                  <View style={styles.scroll__text__container}>
                    <Text style={styles.scroll__text}>{"Китайская\n еда"}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
          <TouchableOpacity
            onPress={() => router.push({ pathname: "./deliveryCompany" })}
          >
            <View style={styles.info__container}>
              <View style={styles.info__text_container}>
                <Text style={styles.info__text}>Пиццерия</Text>
                <Text style={styles.info__text}>Дон Трамоне</Text>
              </View>
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
                  height={15}
                  width={15}
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
          </TouchableOpacity>
          <View style={[styles.info__container, { marginBottom: 20 }]}>
            <View style={styles.info__text_container}>
              <Text style={styles.info__text}>Пиццерия</Text>
              <Text style={styles.info__text}>Дон Трамоне</Text>
            </View>
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
                height={15}
                width={15}
              />
              <Text style={styles.ratingText}>
                {/* {Math.floor(
                  company.reviews_rating ? company.reviews_rating * 10 : 0
                ) / 10} */}
                4.8
              </Text>
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
    marginHorizontal: 15,
  },
  search__container: {
    marginTop: 10,
  },
  scroll__container: {
    marginTop: 20,
    flexDirection: "row",
    columnGap: 10,
  },
  scroll__inner: {
    flex: 1,
    width: giftsWidthImg,
    backgroundColor: elemBackgroundColor,
    alignItems: "center",
    borderRadius: 15,
  },
  scroll__image: {
    width: "100%",
    height: 80,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  scroll__text__container: {
    flex: 1,
    marginHorizontal: 12,
    marginVertical: 5,
    // padding: 5,
    justifyContent: "center",
  },
  scroll__text: {
    fontFamily: FONTS.medium,
    fontSize: 14,
    lineHeight: 15,
    color: textPrimaryColor,
    textAlign: "center",
  },
  info__container: {
    marginTop: 20,
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
    columnGap: 5,
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
    columnGap: 5,
    alignItems: "center",
  },
});
