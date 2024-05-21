import React, { useEffect, useState } from "react";
import {
  Alert,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import HeaderComponent from "../../components/HeaderComponent";
import ProgressComponent from "../../components/ProgressComponent";
import StoryComponent from "../../components/StoryComponent";
import {
  elemBackgroundColor,
  elemBackgroundColor3,
  textBackgroundColor,
  textBackgroundColor2,
  textColor3,
  textPrimaryColor,
} from "../../components/ColorsComponent";
import SliderComponent from "../../components/SliderComponent";
import * as SecureStore from "expo-secure-store";
import { ImageBackground, Image } from "expo-image";
import { Link, useRouter } from "expo-router";
import { Skeleton } from "moti/skeleton";
import { FONTS, SIZES, SKELETON } from "../../constants/theme";

export default function MainScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [stories, setStories] = useState([]);
  const [clientData, setClientData] = useState({});
  const [myCompanies, setMyCompanies] = useState({});
  const [categories, setCategories] = useState({});
  const [coupons, setCoupons] = useState({});
  const [token, setToken] = useState(null);
  const [notify, setNotify] = useState(true);

  const [skeleton, setSkeleton] = useState(true);

  const router = useRouter();

  const itemsPerSlide1 = 6;
  const itemsPerSlide2 = 4;
  const itemsPerSlide3 = 4;
  const itemHeight1 = 180;
  const itemHeight2 = 150;
  const itemHeight3 = 240;
  let slideHeight1 = 600;
  let slideHeight2 = 350;
  let slideHeight3 = 520;
  const groupedData1 = [];
  const groupedData2 = [];
  const groupedData3 = [];

  if (myCompanies.length === 1 || myCompanies.length === 0) {
    slideHeight1 = itemHeight1;
  } else if (myCompanies.length === 2 || myCompanies.length === 3) {
    slideHeight1 = itemHeight1 * 2 + 15;
  } else if (myCompanies.length >= 5) {
    slideHeight1 = 600;
  }

  for (let i = 0; i < myCompanies.length; i += itemsPerSlide1) {
    groupedData1.push(myCompanies.slice(i, i + itemsPerSlide1));
  }

  if (categories.length === 1 || categories.length === 2) {
    slideHeight2 = itemHeight2;
  } else if (categories.length === 3 || categories.length === 4) {
    slideHeight2 = 320;
  } else if (categories.length >= 5) {
    slideHeight2 = 350;
  }

  for (let i = 0; i < categories.length; i += itemsPerSlide2) {
    groupedData2.push(categories.slice(i, i + itemsPerSlide2));
  }

  if (coupons.length === 1 || coupons.length === 2) {
    slideHeight3 = itemHeight3;
  } else if (coupons.length === 3 || coupons.length === 4) {
    slideHeight3 = 500;
  } else if (coupons.length >= 5) {
    slideHeight3 = 530;
  }

  for (let i = 0; i < coupons.length; i += itemsPerSlide3) {
    groupedData3.push(coupons.slice(i, i + itemsPerSlide3));
  }

  function findBannerWithPriority(banners, priority) {
    return banners.find((banner) => banner.priority === priority.toString());
  }

  const fetchData = async () => {
    try {
      const userDataStr = await SecureStore.getItemAsync("userData");
      if (userDataStr) {
        const userData = JSON.parse(userDataStr);
        setToken(userData.token);

        const headers = {
          Authorization: userData.token,
          "Content-Type": "application/json",
        };

        // Story
        const storiesResponse = await fetch(
          "https://admin.uplaim.com/api/stories",
          { headers }
        );
        if (storiesResponse.ok) {
          const storiesData = await storiesResponse.json();
          setStories(storiesData.stories);
        } else {
          console.error("Ошибка при загрузке историй");
        }

        // Client
        const clientResponse = await fetch(
          "https://admin.uplaim.com/api/client",
          { headers }
        );
        if (clientResponse.ok) {
          const clientData = await clientResponse.json();
          setClientData(clientData.client);

          const hasUnreadNotification = await clientData.client.notify.some(
            (notifications) => notifications.read === false
          );
          setNotify(hasUnreadNotification);

          await SecureStore.setItemAsync(
            "clientData",
            JSON.stringify(clientData.client)
          );
        } else {
          console.error("Ошибка при загрузке данных клиента");
        }

        // My companies
        const myCompaniesResponse = await fetch(
          "https://admin.uplaim.com/api/my_companies",
          { headers }
        );
        if (myCompaniesResponse.ok) {
          const myCompaniesData = await myCompaniesResponse.json();
          setMyCompanies(myCompaniesData.my_companies);
        } else {
          console.error("Ошибка при загрузке данных моих компаний");
        }

        // Partners / Categories
        const categoriesResponse = await fetch(
          "https://admin.uplaim.com/api/categories",
          { headers }
        );
        if (categoriesResponse.ok) {
          const categoriesData = await categoriesResponse.json();
          setCategories(categoriesData.categories);
        } else {
          console.error("Ошибка при загрузке данных категорий");
        }

        // Coupons
        const couponsResponse = await fetch(
          "https://admin.uplaim.com/api/coupon",
          { headers }
        );
        if (couponsResponse.ok) {
          const couponsData = await couponsResponse.json();
          setCoupons(couponsData.coupons);
        } else {
          console.error("Ошибка при загрузке данных купонов");
        }
      }
    } catch (error) {
      console.error("Ошибка при получении запроса:", error);
    } finally {
      setRefreshing(false);
      setSkeleton(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    setSkeleton(true);
    fetchData();
  };

  useEffect(() => {
    setSkeleton(false);
    fetchData();
  }, []);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Skeleton.Group show={skeleton}>
        <ImageBackground
          source={require("../../assets/background.png")}
          contentFit={"cover"}
        >
          <View style={styles.containerView}>
            <HeaderComponent home={true} main={true} notify={notify} />
            <View style={styles.topContainer}>
              <View style={styles.leftContainer}>
                <Skeleton
                  // height={75}
                  // width={252}
                  colorMode="dark"
                  {...SKELETON}
                >
                  <View style={styles.textContainer}>
                    <Text style={styles.text}>
                      Привет, {clientData.name || "Гость"}!
                    </Text>
                  </View>

                  <View style={styles.bottomContainer}>
                    <View style={styles.background}>
                      <Image
                        contentFit="contain"
                        contentPosition={"center"}
                        transition={1000}
                        source={require("../../assets/up.svg")}
                        width={21}
                        height={15}
                        style={{ marginRight: 3 }}
                      />
                      <Text style={styles.upBalance}>
                        {clientData.up_balance}
                      </Text>
                    </View>

                    <View style={styles.background2}>
                      <Text style={styles.upBalance}>
                        {clientData.balance} ₽
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() =>
                        router.push({
                          pathname: "/secondary/gifts",
                        })
                      }
                    >
                      <Image
                        contentFit="contain"
                        contentPosition={"center"}
                        transition={1000}
                        source={require("../../assets/gift.svg")}
                        width={24}
                        height={24}
                      />
                    </TouchableOpacity>
                  </View>
                </Skeleton>
              </View>
              <View>
                <Skeleton
                  // height={65}
                  // width={65}
                  {...SKELETON}
                >
                  <TouchableOpacity
                    onPress={() =>
                      router.push({
                        pathname: "/secondary/tariffs",
                      })
                    }
                    style={styles.rightContainer}
                  >
                    <Text style={styles.balance}>∞</Text>
                    <ProgressComponent progress={0} color={"#56da7b"} />
                  </TouchableOpacity>
                </Skeleton>
              </View>
            </View>
            <Skeleton
              // height={112}
              // width={300}
              {...SKELETON}
            >
              {/* <View style={{ marginBottom: 30 }}> */}
              <StoryComponent
                data={stories}
                style={styles.story}
                stories={true}
              />
              {/* </View> */}
            </Skeleton>
            <TouchableOpacity
              onPress={() => router.push({ pathname: "/home/qrcode" })}
              style={styles.textContainer2}
            >
              <Skeleton
                // height={35}
                // width={220}
                {...SKELETON}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Image
                    contentFit="contain"
                    contentPosition={"center"}
                    transition={1000}
                    source={require("../../assets/briefcase.svg")}
                    width={24}
                    height={24}
                    style={{
                      marginBottom: 2,
                      marginRight: 3,
                    }}
                  />
                  <Text style={styles.text2}>Мои компании</Text>
                </View>
              </Skeleton>
            </TouchableOpacity>

            {myCompanies.length === 0 ? (
              <Skeleton
                // height={180}
                // width={"100%"}
                {...SKELETON}
              >
                <Link
                  href={"/secondary/categories"}
                  style={[
                    styles.view,
                    styles.viewLink,
                    { height: itemHeight1 },
                  ]}
                >
                  <View style={styles.addCompany}>
                    <Image
                      contentFit="contain"
                      contentPosition={"center"}
                      transition={1000}
                      source={require("../../assets/plus-company.svg")}
                      width={72}
                      height={72}
                      style={{
                        marginBottom: 2,
                        marginRight: 3,
                      }}
                    />
                    <Text style={styles.textAddCompany}>Добавить компанию</Text>
                  </View>
                </Link>
              </Skeleton>
            ) : (
              <Skeleton
                // height={180}
                // width={"100%"}
                {...SKELETON}
              >
                <SliderComponent
                  myCompany={true}
                  data={groupedData1}
                  itemsPerSlide={itemsPerSlide1}
                  itemHeight={itemHeight1}
                  slideHeight={slideHeight1}
                  addCompany={true}
                />
              </Skeleton>
            )}
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: "/secondary/categories",
                })
              }
              style={
                skeleton
                  ? styles.textContainer2
                  : [styles.textContainer2, { marginTop: 0 }]
              }
            >
              <Skeleton
                // height={35}
                // width={180}
                {...SKELETON}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Image
                    contentFit="contain"
                    contentPosition={"center"}
                    transition={1000}
                    source={require("../../assets/bags-shopping.svg")}
                    width={24}
                    height={24}
                    style={{
                      marginBottom: 2,
                      marginRight: 3,
                    }}
                  />
                  <Text style={styles.text2}>Партнеры</Text>
                </View>
              </Skeleton>
            </TouchableOpacity>
            <Skeleton
              // height={320}
              // width={"100%"}
              {...SKELETON}
            >
              <SliderComponent
                partners={true}
                data={groupedData2}
                itemsPerSlide={itemsPerSlide2}
                itemHeight={itemHeight2}
                slideHeight={slideHeight2}
              />
            </Skeleton>
            <Skeleton
              // height={115}
              // width={"100%"}
              {...SKELETON}
            >
              <TouchableOpacity
                onPress={() =>
                  router.push({
                    pathname: "/secondary/referral",
                  })
                }
                style={styles.referral}
              >
                <Text style={styles.referralHeader}>Реферальная программа</Text>
                <View style={styles.referralTopContainer}>
                  <View style={styles.referralDownContainer}>
                    <View style={styles.referralMini}>
                      <Image
                        contentFit="contain"
                        contentPosition={"center"}
                        transition={1000}
                        source={require("../../assets/credit-card-arrow.svg")}
                        width={24}
                        height={24}
                      />
                      <Text style={styles.referralTopText}>
                        Заработок в день
                      </Text>
                    </View>
                    <Text style={styles.referralBottomText}>3500 ₽</Text>
                  </View>
                  <View style={styles.referralDownContainer}>
                    <View style={styles.referralMini}>
                      <Image
                        contentFit="contain"
                        contentPosition={"center"}
                        transition={1000}
                        source={require("../../assets/users.svg")}
                        width={24}
                        height={24}
                      />
                      <Text style={styles.referralTopText}>
                        Всего приглашено
                      </Text>
                    </View>
                    <Text style={styles.referralBottomText}>15 человек</Text>
                  </View>
                  <View style={styles.referralDownContainer}>
                    <Image
                      contentFit="contain"
                      contentPosition={"center"}
                      transition={1000}
                      source={require("../../assets/arrow-left-max.svg")}
                      width={17}
                      height={31}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </Skeleton>
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: "/secondary/couponsList",
                })
              }
              style={styles.textContainer2}
            >
              <Skeleton
                // height={35}
                // width={"100%"}
                {...SKELETON}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Image
                    contentFit="contain"
                    contentPosition={"center"}
                    transition={1000}
                    source={require("../../assets/reciept.svg")}
                    width={24}
                    height={24}
                    style={{
                      marginBottom: 2,
                      marginRight: 3,
                    }}
                  />
                  <Text style={styles.text2}>Купоны и промокоды</Text>
                </View>
              </Skeleton>
            </TouchableOpacity>
            {coupons.length === 0 ? (
              <Text style={styles.textCouponsEmpty}>Пока нет купонов</Text>
            ) : (
              <Skeleton
                // height={250}
                //  width={"100%"}
                {...SKELETON}
              >
                <SliderComponent
                  coupon={true}
                  data={groupedData3}
                  itemsPerSlide={itemsPerSlide3}
                  itemHeight={itemHeight3}
                  slideHeight={slideHeight3}
                />
              </Skeleton>
            )}
          </View>
        </ImageBackground>
      </Skeleton.Group>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {},
  containerView: {
    marginHorizontal: 15,
    marginBottom: 80,
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
    marginTop: 30,
    // backgroundColor: "green",
  },
  leftContainer: {
    height: 64,
    alignContent: "space-between",
  },
  rightContainer: {
    width: 64,
    height: 64,
    // borderWidth: 6, // Ширина ободка
    // borderRadius: 32,
    // borderColor: "blue",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  bottomContainer: {
    alignItems: "flex-end",
    flexDirection: "row",
  },
  background: {
    backgroundColor: textBackgroundColor,
    paddingHorizontal: 15,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "baseline",
    marginRight: 10,
  },
  background2: {
    backgroundColor: textBackgroundColor2,
    paddingHorizontal: 15,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  textContainer: {
    // backgroundColor: "red",
  },
  textContainer2: {
    fontFamily: FONTS.medium,
    marginTop: 30,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  text: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.xLarge,
    lineHeight: 24,
    color: textPrimaryColor,
    marginBottom: 15,
  },
  text2: {
    fontFamily: FONTS.medium,
    fontSize: 24,
    lineHeight: 24,
    color: textPrimaryColor,
    marginLeft: 7,
  },
  upBalance: {
    fontFamily: FONTS.semibold,
    fontSize: 16,
    color: textPrimaryColor,
  },
  balance: {
    fontSize: 20,
    color: textPrimaryColor,
    fontFamily: FONTS.medium,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  banner: {
    borderRadius: 12,
    height: 150,
    marginBottom: 30,
  },
  story: {
    position: "absolute",
  },
  view: {
    width: "48%",
    borderRadius: 12,
    backgroundColor: "#24224A",
    marginBottom: 30,
  },
  viewLink: {
    textAlign: "center",
    textAlignVertical: "center",
  },
  addCompany: {
    alignItems: "center",
    marginTop: 40,
  },
  textAddCompany: {
    fontFamily: FONTS.regular,
    color: textColor3,
    marginTop: 30,
    fontSize: 12,
  },
  textCouponsEmpty: {
    fontFamily: FONTS.medium,
    fontSize: 24,
    textAlign: "center",
    color: textPrimaryColor,
    marginVertical: 30,
  },
  referral: {
    height: 115,
    backgroundColor: elemBackgroundColor,
    borderRadius: 12,
    width: "100%",
  },
  referralHeader: {
    fontFamily: FONTS.medium,
    marginVertical: 10,
    fontSize: 18,
    textAlign: "center",
    color: textPrimaryColor,
  },
  referralTopContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  referralMini: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
    marginBottom: 5,
  },
  referralDownContainer: {
    maxWidth: "100%",
  },
  referralTopText: {
    color: textPrimaryColor,
    fontFamily: FONTS.regular,
    fontSize: 12,
    marginLeft: 5,
  },
  referralBottomContainer: {
    flexDirection: "row",
  },
  referralBottomText: {
    fontFamily: FONTS.medium,
    color: textPrimaryColor,
    fontSize: SIZES.xLarge,
    lineHeight: 24,
    marginHorizontal: 15,
    marginTop: 2,
  },
});
