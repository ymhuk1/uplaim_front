import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { ImageBackground, Image } from "expo-image";
import HeaderComponent from "../../components/HeaderComponent";
import NewButtonComponent from "../../components/NewButtonComponent";
import Carousel from "react-native-reanimated-carousel";

import {
  elemBackgroundColor,
  textBackgroundColor2,
  textDisabledColor,
  textPrimaryColor,
} from "../../components/ColorsComponent";
import Constants from "expo-constants";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { FONTS, HEIGHT, WIDTH } from "../../constants/theme";
import { Path, Svg } from "react-native-svg";

const apiBaseUrl = Constants.expoConfig.extra.API_PROD;

export default function Tariffs() {
  const [textValue, setTextValue] = useState("Тарифы");
  const [refreshing, setRefreshing] = useState(false);
  const [tariffs, setTariffs] = useState(null);
  const [subscriptions, setSubscriptions] = useState(null);
  const [allPrivilegeModal, setAllPrivilegeModal] = useState(false);
  const [clientData, setClientData] = useState(null);
  const [subscribeModal, setSubscribeModal] = useState(false);
  const [selectSubscriptions, setSelectSubscriptions] = useState(
    subscriptions ? subscriptions[0] : ""
  );
  const [finalSubscribeModal, setFinalSubscribeModal] = useState(false);
  // console.log("clientData", clientData.id);
  const router = useRouter();

  // вынести данные тарифа во «Все преимущества»

  const fetchData = () => {
    fetch(`${apiBaseUrl}api/tariffs`)
      .then((response) => response.json())
      .then((data) => {
        setTariffs(data);
        setRefreshing(false);
      })
      .catch((error) => {
        console.error("Ошибка при загрузке данных: ", error);
        setRefreshing(false);
      });
  };
  const fetchDataClient = async () => {
    try {
      const userDataStr = await SecureStore.getItemAsync("userData");
      if (userDataStr) {
        const userData = JSON.parse(userDataStr);

        const headers = {
          Authorization: userData.token,
          "Content-Type": "application/json",
        };
        const clientResponse = await fetch(`${apiBaseUrl}api/client`, {
          headers,
        });
        if (clientResponse.ok) {
          const clientData = await clientResponse.json();
          setClientData(clientData.client);
          await SecureStore.setItemAsync(
            "clientData",
            JSON.stringify(clientData.client)
          );
        } else {
          console.error("Ошибка при загрузке данных клиента");
        }
      }
    } catch (error) {
      console.error("Ошибка при получении запроса:", error);
    } finally {
      setRefreshing(false);
    }
  };

  const fetchSubscribe = (id) => {
    fetch(`${apiBaseUrl}api/subscriptions?tariff_id=${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Данные успешно получены:", data);
        if (data) {
          setSubscriptions(data);
          setSubscribeModal(!subscribeModal);
        }
        console.log("subscriptions", subscriptions);
        setRefreshing(false);
      })
      .catch((error) => {
        console.error("Ошибка при загрузке данных: ", error);
        setRefreshing(false);
      });
  };

  useEffect(() => {
    // loadUserData()
    fetchDataClient();
    fetchData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchDataClient();
    fetchData();
  };

  const associateTariff = async (tariff_id, subscribed_tariff_id) => {
    try {
      const apiUrl = `${apiBaseUrl}api/associate_tariff`;
      const response = await fetch(`${apiUrl}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_id: clientData.id,
          tariff_id: tariff_id,
          subscribed_tariff_id: subscribed_tariff_id,
        }),
      });

      setFinalSubscribeModal(!finalSubscribeModal);
      console.log("response", response);
      if (!response.ok) {
        throw new Error(
          `Failed to associate tariff. Status: ${response.status}`
        );
      }
    } catch (error) {
      console.error("Error associate tariff:", error.message);
    }
  };

  // console.log("tariffs: ", tariffs);
  const width = Dimensions.get("window").width;

  return (
    <View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
        contentContainerStyle={styles.container}
      >
        <ImageBackground
          source={require("../../assets/background.png")}
          contentFit={"cover"}
          style={styles.containerImg}
        >
          <View style={styles.containerView}>
            <HeaderComponent text={textValue} secondary={true} />
            {tariffs ? (
              <View style={styles.carousel}>
                <Carousel
                  vertical={false}
                  width={width}
                  height={width * 2}
                  mode="parallax"
                  data={tariffs}
                  windowSize={2}
                  panGestureHandlerProps={{
                    activeOffsetX: [-10, 10],
                  }}
                  // onSnapToItem={handleIndexChange}
                  // onSnapToItem={(index) => console.log('current index:', index)}
                  // defaultIndex={currentIndex}
                  renderItem={({ item }) => (
                    <View style={styles.containerSwiper}>
                      <View style={{ rowGap: 10, marginBottom: 15 }}>
                        <Text style={styles.tariffName}>{item.name}</Text>
                        <View
                          style={[
                            styles.tariffBorder,
                            { borderColor: item.color },
                          ]}
                        ></View>
                        <Image
                          contentFit="contain"
                          contentPosition="center"
                          transition={1000}
                          source={apiBaseUrl + item.icon}
                          width={75}
                          height={75}
                          style={styles.tariffLogo}
                        />
                      </View>
                      <View style={{ rowGap: 10, marginBottom: 30 }}>
                        <Text style={styles.tariffDesc}>
                          {item.description}
                        </Text>
                        <View style={styles.tariffDescTwoContainer}>
                          <Text style={styles.tariffDescTwo}>
                            {item.description_two}
                          </Text>
                          <View
                            style={[
                              styles.tariffNameDopContainer,
                              { backgroundColor: item.color },
                            ]}
                          >
                            <Text style={styles.tariffNameDopText}>
                              {item.name}
                            </Text>
                          </View>
                        </View>
                      </View>
                      <View
                        style={
                          item.name !== "Free"
                            ? styles.tariffCheck
                            : { rowGap: 50 }
                        }
                      >
                        {item.check_list &&
                          item.check_list.split(";").map((checkItem, index) => (
                            <View
                              key={index}
                              style={
                                item.name !== "Free"
                                  ? styles.tariffCheckContainer
                                  : [
                                      styles.tariffCheckContainer,
                                      { width: "95%" },
                                    ]
                              }
                            >
                              <Svg
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill={item.color}
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <Path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2ZM0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10ZM14.6783 6.2652C15.0841 6.6398 15.1094 7.27246 14.7348 7.67828L9.19634 13.6783C9.00704 13.8834 8.74064 14 8.46154 14C8.18244 14 7.91604 13.8834 7.72674 13.6783L5.2652 11.0116C4.89059 10.6058 4.9159 9.97313 5.32172 9.59853C5.72754 9.22393 6.3602 9.24923 6.7348 9.65505L8.46154 11.5257L13.2652 6.32172C13.6398 5.9159 14.2725 5.89059 14.6783 6.2652Z"
                                />
                              </Svg>
                              <Text style={styles.tariffCheckText}>
                                {checkItem.trim()}
                              </Text>
                            </View>
                          ))}
                      </View>
                      <View
                        style={{
                          rowGap: 15,
                        }}
                      >
                        <TouchableOpacity
                          onPress={() => {
                            setAllPrivilegeModal(!allPrivilegeModal);
                          }}
                        >
                          <Text style={styles.tariffAllPrivilege}>
                            Все преимущества
                          </Text>
                        </TouchableOpacity>
                        {/* {item.name && item.name !== "Free" && ( */}
                        <View>
                          {clientData &&
                          clientData.tariff.name !== item.name ? (
                            <View style={styles.tariffButtonContainer}>
                              <NewButtonComponent
                                style={styles.tariffButton}
                                title={"Подключить"}
                                filled={true}
                                height={64}
                                fontSize={18}
                                onPress={() => {
                                  fetchSubscribe(item.id);
                                }}
                              />
                            </View>
                          ) : (
                            <View style={styles.tariffButtonContainer}>
                              <NewButtonComponent
                                style={styles.tariffButton}
                                title={"Подключено"}
                                empty={true}
                                height={64}
                                fontSize={18}
                                onPress={() => {}}
                              />
                            </View>
                          )}
                        </View>
                        {/* )} */}
                        {clientData &&
                          clientData.tariff.name === item.name &&
                          item.name !== "Free" && (
                            <TouchableOpacity onPress={() => {}}>
                              <Text style={styles.tariffCancel}>
                                Отменить подписку
                              </Text>
                            </TouchableOpacity>
                          )}
                      </View>
                    </View>
                  )}
                />
              </View>
            ) : (
              <View></View>
            )}
          </View>
        </ImageBackground>
      </ScrollView>
      <Modal
        animationType="fade"
        transparent={true}
        visible={allPrivilegeModal}
      >
        <View style={styles.allPrivilegeModal}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => {
              setAllPrivilegeModal(!allPrivilegeModal);
            }}
          >
            <Image
              contentFit="contain"
              contentPosition="center"
              source={require("../../assets/closeModal.svg")}
              width={36}
              height={36}
            />
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={subscribeModal}
        style={styles.allSubscribeModal}
      >
        <View style={styles.allSubscribeModal}>
          <Text style={styles.subscribeHeaderText}>
            Получайте больше привилегий с Uplaim
          </Text>
          {subscriptions &&
            subscriptions.map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => {
                  setSelectSubscriptions(item);
                }}
                style={[
                  styles.containerItem,
                  item.id === selectSubscriptions.id &&
                    styles.containerSelectItem,
                ]}
              >
                <Text style={styles.containerItemDays}>
                  {item.duration} дней
                </Text>
                <Text
                  style={[
                    styles.containerItemPrice,
                    item.id === selectSubscriptions.id &&
                      styles.containerSelectItemPrice,
                  ]}
                >
                  {item.price}₽
                </Text>
              </TouchableOpacity>
            ))}
          <View style={styles.subscribeButton}>
            <NewButtonComponent
              title={
                selectSubscriptions
                  ? `Оформить за ${selectSubscriptions.price}₽`
                  : "Оформить"
              }
              filled={true}
              height={48}
              fontSize={18}
              onPress={() => {
                associateTariff(
                  selectSubscriptions.tariff_id,
                  selectSubscriptions.id
                );
                setSubscribeModal(!subscribeModal);
              }}
            />
          </View>
          <View style={styles.subscribeInfo}>
            <Text style={styles.subscribeInfoText}>
              Автопродление можно оформить в любое время. Оплата раз в месяц.
            </Text>
            <Text style={styles.subscribeInfoText}>
              Оформляя подписку вы соглашаетесь с Офертой и Соглашением.
            </Text>
          </View>

          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => {
              setSubscribeModal(!subscribeModal);
            }}
          >
            <Image
              contentFit="contain"
              contentPosition="center"
              source={require("../../assets/closeModal.svg")}
              width={36}
              height={36}
            />
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={finalSubscribeModal}
      >
        <View style={styles.finalSubscribeModal}>
          <Text style={styles.finalSubscribeModalText}>
            Поздравляем! Вы подключили Uplaim PRO. Пользуйтесь повышенными
            привилегиями уже сейчас.
          </Text>
          <View style={styles.finalSubscribeButton}>
            <NewButtonComponent
              title={"Хорошо"}
              filled={true}
              height={48}
              fontSize={18}
              onPress={() => {
                setFinalSubscribeModal(!finalSubscribeModal);
                onRefresh();
              }}
            />
          </View>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => {
              setSubscribeModal(!subscribeModal);
            }}
          >
            <Image
              contentFit="contain"
              contentPosition="center"
              source={require("../../assets/closeModal.svg")}
              width={36}
              height={36}
            />
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // minHeight: HEIGHT.height,
  },
  containerImg: {
    minHeight: HEIGHT.height,
  },
  containerView: {
    // height: 840,
  },
  carousel: {
    // backgroundColor: "green",
    // marginTop: 20,
  },
  containerSwiper: {
    flex: 1,
    backgroundColor: "#41357A",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: -80,
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderRadius: 16,
    marginHorizontal: 10,
  },
  tariffName: {
    fontFamily: FONTS.medium,
    // paddingTop: 30,
    fontSize: 36,
    color: textPrimaryColor,
    textAlign: "center",
  },
  tariffBorder: {
    alignSelf: "center",
    marginTop: 15,
    width: 54,
    borderWidth: 3,
    marginBottom: 10,
    borderRadius: 100,
  },
  tariffLogo: {
    alignSelf: "center",
    // marginVertical: 5,
  },
  tariffDesc: {
    textAlign: "center",
    // marginTop: 10,
    fontSize: 20,
    color: textPrimaryColor,
    // marginBottom: 5,
  },
  tariffDescTwoContainer: {
    alignSelf: "center",
    flexDirection: "row",
    // paddingBottom: 30,
  },
  tariffDescTwo: {
    fontSize: 20,
    color: textPrimaryColor,
  },
  tariffNameDopContainer: {
    paddingHorizontal: 8,
    marginHorizontal: 7,
    borderRadius: 8,
  },
  tariffNameDopText: {
    fontSize: 20,
    color: textPrimaryColor,
  },
  tariffCheck: {
    rowGap: 20,
    // justifyContent: "space-between",
    marginBottom: 10,
  },
  tariffCheckContainer: {
    // flex: 1,
    width: "90%",
    flexDirection: "row",
    columnGap: 10,
    // backgroundColor: "red",
    // marginBottom: 20,
  },
  tariffCheckText: {
    fontFamily: FONTS.regular,
    fontSize: 20,
    color: "white",
    // paddingBottom: 30,
  },
  tariffAllPrivilege: {
    color: "#4D5FFF",
    fontSize: 20,
    // marginVertical: 50,
    textAlign: "center",
  },
  tariffButtonContainer: {
    width: WIDTH.width - 80,
    marginHorizontal: 15,
  },
  tariffButton: {
    // width: "100%",
  },
  allPrivilegeModal: {
    backgroundColor: elemBackgroundColor,
    height: "98%",
    width: "90%",
    alignSelf: "center",
    borderRadius: 12,
  },
  closeButton: {
    position: "absolute",
    top: 0,
    right: 0,
    padding: 12,
  },
  tariffCancel: {
    color: "#4D5FFF",
    fontSize: 20,
    // marginVertical: 20,
    textAlign: "center",
    // marginTop: "auto",
    // justifyContent: "flex-end",
  },
  allSubscribeModal: {
    backgroundColor: elemBackgroundColor,
    // height: "50%",
    // width: "90%",
    alignSelf: "center",
    borderRadius: 12,
  },
  subscribeHeaderText: {
    color: textPrimaryColor,
    fontSize: 24,
    fontFamily: FONTS.medium,
    marginTop: 40,
    marginBottom: 20,
    textAlign: "center",
    marginHorizontal: 50,
  },
  containerItem: {
    borderColor: textDisabledColor,
    borderWidth: 1,
    borderRadius: 8,
    marginHorizontal: 20,
    flexDirection: "row",
    padding: 14,
    justifyContent: "space-between",
    marginBottom: 20,
  },
  containerSelectItem: {
    borderWidth: 2,
    borderColor: textBackgroundColor2,
  },
  containerItemDays: {
    color: textPrimaryColor,
    fontSize: 24,
  },
  containerItemPrice: {
    color: textPrimaryColor,
    fontSize: 24,
    fontFamily: FONTS.medium,
  },
  containerSelectItemPrice: {
    fontSize: 26,
    color: textBackgroundColor2,
  },
  subscribeButton: {
    marginHorizontal: 20,
  },
  subscribeInfo: {
    marginHorizontal: 40,
    marginVertical: 20,
  },
  subscribeInfoText: {
    textAlign: "center",
    marginBottom: 10,
    color: textDisabledColor,
  },
  finalSubscribeModal: {
    backgroundColor: elemBackgroundColor,
    // height: "50%",
    width: "90%",
    alignSelf: "center",
    borderRadius: 12,
  },
  finalSubscribeModalText: {
    textAlign: "center",
    marginVertical: 50,
    margin: 30,
    fontSize: 16,
    color: textPrimaryColor,
  },
  finalSubscribeButton: {
    marginBottom: 30,
    marginHorizontal: 20,
  },
});
