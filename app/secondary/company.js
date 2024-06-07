import {Link, useGlobalSearchParams, useRouter} from "expo-router";
import React, {useEffect, useState} from "react";
import {RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View,} from "react-native";
import {Image, ImageBackground} from "expo-image";
import Swiper from "react-native-swiper";
import * as SecureStore from "expo-secure-store";
import {LinearGradient} from "expo-linear-gradient";
import Constants from "expo-constants";

import HeaderComponent from "../../components/HeaderComponent";
import SliderComponent from "../../components/SliderComponent";
import SocialLinkComponent from "../../components/SocialLinkComponent";
import TagComponent from "../../components/TagComponent";
import SliderPhotoComponent from "../../components/SliderPhotoComponent";
import {
  elemBackgroundColor,
  elemBackgroundColor3,
  elemGradientColors,
  textDisabledColor,
  textPrimaryColor,
} from "../../components/ColorsComponent";
import NewButtonComponent from "../../components/NewButtonComponent";
import {Rating} from "react-native-ratings";
import {FONTS} from "../../constants/theme";

const apiBaseUrl = Constants.expoConfig.extra.API_PROD;

export default function Company() {
  const { id } = useGlobalSearchParams();

  const [textValue, setTextValue] = useState("Страница компании");
  const [refreshing, setRefreshing] = useState(false);
  const [company, setCompany] = useState({});
  const [clientData, setClientData] = useState({});
  const [isAssociated, setIsAssociated] = useState(false);
  const [buttonText, setButtonText] = useState("Присоединиться");

  const router = useRouter();

  const companyId = id;

  const itemsPerSlide1 = 2;
  const itemHeight1 = 170;
  const slideHeight1 = 190;
  const groupedData1 = [];

  const itemsPerSlide3 = 4;
  const itemHeight3 = 240;
  let slideHeight3 = 520;
  const groupedData3 = [];

  // const roundedReviewsRating = company.reviews_rating !== null ? Math.floor(company.reviews_rating * 10) / 10 : 0;
  // company.reviews_rating = roundedReviewsRating;

  if (company?.news && company.news.length > 0) {
    for (let i = 0; i < company.news.length; i += itemsPerSlide1) {
      groupedData1.push(company?.news.slice(i, i + itemsPerSlide1));
    }
  }

  if (company?.coupons && company.coupons.length > 0) {
    if (company.coupons.length === 1 || company.coupons.length === 2) {
      slideHeight3 = itemHeight3;
    } else if (company.coupons.length === 3 || company.coupons.length === 4) {
      slideHeight3 = 500;
    } else if (company.coupons.length >= 5) {
      slideHeight3 = 530;
    }
  }

  if (company?.coupons && company.coupons.length > 0) {
    for (let i = 0; i < company.coupons.length; i += itemsPerSlide3) {
      groupedData3.push(company.coupons.slice(i, i + itemsPerSlide3));
    }
  }

  const {another_photo} = company;


  const companyBalls = clientData.balls || [];

  const getBallValue = (companyId, paramName) => {
    const ball = companyBalls.find((item) => item.company_id === companyId);
    return ball ? ball[paramName] : 0;
  };

  function getBallsText(clientBalls) {
    // Определяем последние две цифры числа, чтобы определить окончание
    const lastTwoDigits = clientBalls % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
      return "баллов"; // Для чисел от 11 до 19 всегда "баллов"
    }

    // Определяем последнюю цифру
    const lastDigit = clientBalls % 10;

    if (lastDigit === 1) {
      return "балл";
    } else if (lastDigit >= 2 && lastDigit <= 4) {
      return "балла";
    } else {
      return "баллов";
    }
  }

  const associateCompany = async () => {
    try {
      const url = `${apiBaseUrl}api/associate_company`;

      const userToken = await SecureStore.getItemAsync("userData");
      const token = userToken ? JSON.parse(userToken).token : null;

      if (!token) {
        console.error("Токен не найден.");
        return;
      }

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          client_id: clientData.id,
          company_id: company.id,
        }),
      });

      if (response.ok) {
        console.log("Присоединение успешно!");
        setIsAssociated(true);
        setButtonText("Рекомендовать");
      } else {
        console.error("Ошибка при присоединении:", response.status);
      }
    } catch (error) {
      console.error("Ошибка при выполнении запроса:", error);
    }
  };

  const fetchData = async () => {
    try {
      const userToken = await SecureStore.getItemAsync("userData");
      const token = userToken ? JSON.parse(userToken).token : null;

      if (!token) {
        console.error("Токен не найден.");
        return;
      }

      // Fetch для данных компании
      const companyUrl = `${apiBaseUrl}api/companies/${companyId}`;

      const companyResponse = await fetch(companyUrl, {
        headers: {
          Authorization: token,
        },
      });

      if (companyResponse.ok) {
        const companyData = await companyResponse.json();
        console.log("Данные компании успешно получены:", companyData);
        setCompany(companyData);

      } else {
        console.error(
          "Ошибка при загрузке данных компании:",
          companyResponse.status
        );
      }

      // Fetch для данных клиента
      const clientUrl = `${apiBaseUrl}api/client`;

      const clientResponse = await fetch(clientUrl, {
        headers: {
          Authorization: token,
        },
      });

      if (clientResponse.ok) {
        const clientData = await clientResponse.json();
        const { client } = clientData;
        console.log('Данные клиента успешно получены:', client);

        setClientData(client);
      } else {
        console.error(
          "Ошибка при загрузке данных клиента:",
          clientResponse.status
        );
      }
    } catch (error) {
      console.error("Ошибка при выполнении запросов:", error);
    } finally {
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  const main_photo = `${apiBaseUrl}${company?.main_photo}`;

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <ImageBackground
        source={require("../../assets/background.png")}
        contentFit={"cover"}
      >
        <View style={styles.containerView}>
          <HeaderComponent text={textValue} secondary={true} />
          <View style={styles.topContainer}>
            <Image
              contentFit="contain"
              contentPosition={"center"}
              transition={1000}
              source={main_photo}
              width={74}
              height={74}
              style={styles.logo}
            />
            <View style={styles.infoTopContainer}>
              <View style={styles.textTopContainer}>
                <Text style={styles.textTop}>{company.name}</Text>
                <Link
                  href={{
                    pathname: "/secondary/about-company",
                    params: { id: id },
                  }}
                >
                  <Image
                    contentFit="contain"
                    contentPosition={"center"}
                    transition={1000}
                    source={require("../../assets/circle-information.svg")}
                    width={27}
                    height={27}
                  />
                </Link>
              </View>
              <TagComponent tags={company.tags} />
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
              >
                <Rating
                  type="custom"
                  imageSize={14}
                  readonly={true}
                  ratingTextColor="white"
                  tintColor="#201e3b"
                  ratingColor="#F456FE"
                  ratingBackgroundColor="#9A95B2"
                  startingValue={
                    company.reviews_rating === null ? 0 : company.reviews_rating
                  }
                />
                <Text style={styles.ratingText}>
                  {Math.floor(company.reviews_rating * 10) / 10}
                </Text>
              </View>
            </View>
          </View>
          <Text style={styles.description}>{company.description}</Text>
          {another_photo?.length !== 0 && (
              <View style={styles.sliderContainer}>
                <SliderPhotoComponent
                    photos={another_photo ? another_photo : []}
                    style={styles.slider}
                />
              </View>
          )}
          <View style={styles.buttonContainer}>
            {clientData.companies &&
            clientData.companies.some((c) => c.id === company.id) ? (
              <NewButtonComponent
                title={"Рекомендовать"}
                filled={true}
                height={54}
                fontSize={18}
                onPress={() => {
                  router.push({ pathname: "/secondary/recommendations" });
                }}
              />
            ) : (
              <NewButtonComponent
                title={buttonText}
                filled={true}
                height={48}
                fontSize={18}
                onPress={associateCompany}
              />
            )}
          </View>

          <View style={styles.tariffContainer}>
            <Swiper style={styles.wrapper} loop={false} showsPagination={false}>
              {Array.isArray(company.tariffs) &&
                company.tariffs.map((tariff, index) => {
                  const isClientTariff =
                    clientData.tariff &&
                    clientData.tariff.name === tariff.clients_tariff_name;

                  return (
                    <View style={styles.tariffContainerInner} key={tariff.id}>
                      <Link
                        href={{
                          pathname: "/secondary/recommendLevel",
                          params: { id: companyId },
                        }}
                        style={{ marginBottom: -10 }}
                      >
                        <View
                          style={[
                            styles.tariffActual,
                            { backgroundColor: tariff.color },
                          ]}
                        >
                          <Text style={[styles.tariffActualText]}>
                            {tariff.name}
                          </Text>
                        </View>
                      </Link>
                      <LinearGradient
                        colors={elemGradientColors}
                        style={styles.tariffBalls}
                      >
                        <View style={styles.tariffBallsContainer}>
                          <Text style={styles.tariffBallsTextDop}>
                            из {getBallValue(company.id, "hide_ball")}
                          </Text>
                          <View style={styles.tariffBallsMain}>
                            <Image
                              contentFit="contain"
                              contentPosition={"center"}
                              transition={1000}
                              source={require("../../assets/ellipse.svg")}
                              width={16}
                              height={16}
                            />
                            <Text style={styles.tariffBallsText}>
                              {getBallValue(company.id, "ball") +
                                " " +
                                getBallsText()}
                            </Text>
                          </View>
                        </View>
                      </LinearGradient>
                      <View style={styles.tariffColumn}>
                        <LinearGradient
                          colors={elemGradientColors}
                          style={styles.tariffColumnItem}
                        >
                          <Text style={styles.tariffColumnTextUp}>
                            {company.max_pay_point[tariff.clients_tariff_name]}%
                          </Text>
                          <Text style={styles.tariffColumnTextDown}>
                            Списание баллами
                          </Text>
                        </LinearGradient>
                        <LinearGradient
                          colors={elemGradientColors}
                          style={styles.tariffColumnItem}
                        >
                          <Text style={styles.tariffColumnTextUp}>
                            {company.cashback[tariff.clients_tariff_name]}%
                          </Text>
                          <Text style={styles.tariffColumnTextDown}>
                            Кешбэк
                          </Text>
                        </LinearGradient>
                      </View>
                      {isClientTariff ? (
                        <View style={styles.tariffPaginationRow}>
                          <View style={styles.tariffPaginationActive}></View>
                          {Array.isArray(company.tariffs) &&
                            company.tariffs.map((tariff, index) => (
                              <View
                                key={index}
                                style={
                                  index === 0 ? "" : styles.tariffPagination
                                }
                              ></View>
                            ))}
                        </View>
                      ) : (
                        <TouchableOpacity
                          style={styles.tariffConnect}
                          onPress={() =>
                              router.push({
                                pathname: "/secondary/tariffs",
                                params: { id: tariff.id },
                              })
                          }
                        >
                          <Text style={[styles.tariffConnectText, {color: tariff.color}]}>
                            {tariff.clients_tariff_name === "Free"
                              ? ""
                              : "Подключить " + tariff.clients_tariff_name}
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  );
                })}
            </Swiper>
          </View>
          {company.external_links?.length !== 0 && (
            <View>
              <View style={styles.textContainer2}>
                <Image
                  contentFit="contain"
                  contentPosition={"center"}
                  transition={1000}
                  source={require("../../assets/message-circle.svg")}
                  width={24}
                  height={24}
                />
                <Text style={styles.text2}>Сайт и соцсети</Text>
              </View>
              <SocialLinkComponent links={company.external_links || []} />
            </View>
          )}
          {company.news?.length !== 0 && (
              <View>
                <TouchableOpacity
                    onPress={() =>
                        router.push({
                          pathname: "/secondary/newsCompany",
                          params: { id: companyId },
                        })
                    }
                    style={styles.textContainer2}
                >
                  <Image
                      contentFit="contain"
                      contentPosition={"center"}
                      transition={1000}
                      source={require("../../assets/reciept.svg")}
                      width={24}
                      height={24}
                  />
                  <Text style={styles.text2}>Новости и акции</Text>
                </TouchableOpacity>
                <SliderComponent
                    companySlider={true}
                    data={groupedData1}
                    itemsPerSlide={itemsPerSlide1}
                    itemHeight={itemHeight1}
                    slideHeight={slideHeight1}
                />
              </View>
          )}
          {company.coupons?.length !== 0 && (
              <View>
                <View style={styles.textContainer2}>
                  <Image
                      contentFit="contain"
                      contentPosition={"center"}
                      transition={1000}
                      source={require("../../assets/reciept.svg")}
                      width={24}
                      height={24}
                  />
                  <Text style={styles.text2}>Купоны и промокоды</Text>
                </View>
                <SliderComponent
                    coupon={true}
                    data={groupedData3}
                    itemsPerSlide={itemsPerSlide3}
                    itemHeight={itemHeight3}
                    slideHeight={slideHeight3}
                />
              </View>
          )}
          <View style={styles.textContainer2}>
            <Image
              contentFit="contain"
              contentPosition={"center"}
              transition={1000}
              source={require("../../assets/reciept.svg")}
              width={24}
              height={24}
            />
            <Text style={styles.text2}>Количество друзей</Text>
          </View>
          <View style={styles.countFriends}>
            <View style={styles.countFriendsRow}>
              <Text style={styles.countFriendsTextLeft}>На 1 уровне</Text>
              <Text style={styles.countFriendBorder}> </Text>
              <Text style={styles.countFriendsTextRight}>15</Text>
            </View>
            <View style={styles.countFriendsRow}>
              <Text style={styles.countFriendsTextLeft}>На 2 уровне</Text>
              <Text style={styles.countFriendBorder}> </Text>
              <Text style={styles.countFriendsTextRight}>20</Text>
            </View>
            <View style={styles.countFriendsRow}>
              <Text style={styles.countFriendsTextLeft}>На 3 уровне</Text>
              <Text style={styles.countFriendBorder}> </Text>
              <Text style={styles.countFriendsTextRight}>30</Text>
            </View>
          </View>

          <View style={styles.bannerSave}>
            <Image
              contentFit="contain"
              contentPosition={"center"}
              transition={1000}
              source={require("../../assets/bottom-menu/qrcode_gr.svg")}
              width={74}
              height={74}
            />
            <View style={styles.bannerSaveInfo}>
              <Text style={styles.bannerSaveSum}>13456 ₽</Text>
              <Text style={styles.bannerSaveText}>
                вы сэкономили с SAVEUP в этой компании
              </Text>
            </View>
          </View>

          <View style={styles.banner}></View>
        </View>
      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {},
  containerView: {
    marginHorizontal: 15,
  },
  topContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 12,
  },
  infoTopContainer: {
    marginLeft: 15,
  },
  textTopContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    // marginBottom: 15,
  },
  logo: {
    borderRadius: 100,
    width: 74,
    height: 74,
  },
  textTop: {
    fontFamily: FONTS.medium,
    fontSize: 24,
    color: "white",
    marginBottom: -5,
    marginRight: 5,
  },
  ratingText: {
    color: "white",
    fontFamily: FONTS.medium,
    fontSize: 14,
  },
  description: {
    fontSize: 14,
    color: "white",
    marginBottom: 15,
  },
  slider: {

  },
  buttonContainer: {
    alignItems: "center",
    // marginTop: -10,
    marginBottom: 20,
  },
  tariffContainer: {
    height: 270,
    backgroundColor: elemBackgroundColor,
    borderRadius: 12,
    marginBottom: 30,
    alignItems: "center",
    paddingVertical: 12,
  },
  tariffContainerInner: {
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 2,
  },
  tariffActual: {
    // paddingVertical: 1,
    borderRadius: 8,
    marginBottom: -10,
    zIndex: 10,
  },
  tariffBalls: {
    height: 70,
    borderWidth: 1,
    borderColor: elemBackgroundColor3,
    borderStyle: "solid",
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    paddingVertical: 10,
    marginBottom: 15,
  },
  tariffBallsContainer: {
    alignItems: "flex-end",
  },
  tariffBallsMain: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  tariffColumn: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 5,
  },
  tariffColumnItem: {
    borderWidth: 1,
    borderColor: elemBackgroundColor3,
    borderStyle: "solid",
    borderRadius: 10,
    width: "47%",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  tariffConnect: {
    width: 100,
  },
  tariffActualText: {
    paddingHorizontal: 10,
    fontSize: 18,
    color: textPrimaryColor,
  },
  tariffBallsTextDop: {
    fontSize: 12,
    color: textDisabledColor,
    marginBottom: -5,
  },
  tariffBallsText: {
    fontSize: 24,
    fontFamily: FONTS.medium,
    color: textPrimaryColor,
    marginLeft: 10,
  },
  tariffColumnTextUp: {
    fontSize: 24,
    fontFamily: FONTS.medium,
    color: textPrimaryColor,
    marginBottom: 5,
    textAlign: "center",
  },
  tariffColumnTextDown: {
    fontSize: 12,
    fontFamily: FONTS.medium,
    color: textPrimaryColor,
    textAlign: "center",
  },
  tariffConnectText: {
    textAlign: "center",
  },

  sliderContainer: {
    marginBottom: -10,
  },
  textContainer2: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  text2: {
    fontSize: 24,
    fontFamily: FONTS.medium,
    color: "white",
    marginLeft: 7,
  },
  socialLogoContainer: {
    flexDirection: "row",
  },
  socialLogo: {
    marginLeft: 12,
    marginBottom: 30,
  },
  banner: {
    height: 90,
    width: "100%",
    backgroundColor: "#24224A",
    borderRadius: 12,
    marginBottom: 30,
  },
  bannerSave: {
    height: 100,
    width: "100%",
    backgroundColor: "#24224A",
    borderRadius: 12,
    marginBottom: 20,
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  bannerSaveInfo: {
    marginLeft: 20,
    width: 200,
  },
  bannerSaveSum: {
    fontSize: 20,
    color: textPrimaryColor,
    fontFamily: FONTS.medium,
  },
  bannerSaveText: {
    fontSize: 16,
    color: textPrimaryColor,
  },
  countFriends: {
    height: 140,
    borderRadius: 12,
    backgroundColor: elemBackgroundColor,
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginBottom: 20,
  },
  countFriendsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 10,
    alignItems: "flex-end",
  },
  countFriendBorder: {
    borderBottomWidth: 1,
    borderBottomColor: textDisabledColor,
    flexGrow: 1,
    marginHorizontal: 15,
    marginBottom: 2,
    borderStyle: "dotted",
  },
  countFriendsTextLeft: {
    fontSize: 12,
    color: textPrimaryColor,
  },
  countFriendsTextRight: {
    fontSize: 20,
    fontFamily: FONTS.medium,
    color: textPrimaryColor,
  },
  wrapper: {
    height: 250,
    backgroundColor: elemBackgroundColor,
    borderRadius: 12,
    marginBottom: 10,
    zIndex: 1000,
  },
  dot: {
    backgroundColor: "rgba(255,255,255,.05)",
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
    zIndex: 1000,
  },
  activeDot: {
    backgroundColor: "rgba(255,255,255,.2)",
    width: 16,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
    zIndex: 1000,
  },
  pagination: {
    bottom: 5,
    position: "absolute",
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  tariffPaginationRow: {
    flexDirection: "row",
    marginTop: 12,
  },
  tariffPaginationActive: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: textDisabledColor,
    marginRight: 1,
    opacity: 0.5,
  },
  tariffPagination: {
    opacity: 0.5,
    marginHorizontal: 2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: textDisabledColor,
  },
});
