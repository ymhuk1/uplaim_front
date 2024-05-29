import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Constants from "expo-constants";
import React, { useEffect, useState } from "react";
import HeaderComponent from "../../components/HeaderComponent";
import { Image, ImageBackground } from "expo-image";
import {
  elemBackgroundColor,
  textPrimaryColor,
} from "../../components/ColorsComponent";
import * as SecureStore from "expo-secure-store";
import { FONTS } from "../../constants/theme";

const apiBaseUrl = Constants.expoConfig.extra.API_PROD;

export default function Referral() {
  const [textValue, setTextValue] = useState("Ваш заработок");
  const [refreshing, setRefreshing] = useState(false);
  const [clientData, setClientData] = useState(null);
  const [referral, setReferral] = useState(null);
  const [earning, setEarning] = useState(null);
  const [openPeople, setOpenPeople] = useState(true);

  const fetchData = async () => {
    try {
      const clientInfo = await SecureStore.getItemAsync("clientData");
      if (clientInfo) {
        setClientData(JSON.parse(clientInfo).client);

        // уровни и количество приглашенных
        const referralResponse = await fetch(
          `${apiBaseUrl}api/referral?client_id=${JSON.parse(clientInfo).client.id}`
        );

        if (!referralResponse.ok) {
          throw new Error(
            `Failed to fetch referral. Status: ${referralResponse.status}`
          );
        }
        const referralData = await referralResponse.json();
        console.log("referralData: ", referralData);
        setReferral(referralData.list_referred);
      }

      // reward
      const rewardResponse = await fetch(
        `${apiBaseUrl}api/my_reward?client_id=${JSON.parse(clientInfo).client.id}`
      );

      if (!rewardResponse.ok) {
        throw new Error(
          `Failed to fetch my_reward. Status: ${rewardResponse.status}`
        );
      }
      const rewardData = await rewardResponse.json();
      setEarning(rewardData.total_value);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log("referral: ", referral);

  return (
    <View>
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
              <View style={styles.topMini}>
                <View style={styles.topMiniHead}>
                  <Image
                    contentFit="contain"
                    contentPosition={"center"}
                    transition={1000}
                    source={require("../../assets/credit-card-alt-3.svg")}
                    width={24}
                    height={24}
                  />
                  <Text style={styles.topMiniHeadText}>Ваш баланс</Text>
                </View>
                <Text style={styles.topMiniText}>
                  {clientData && clientData?.balance} ₽
                </Text>
              </View>
              <View style={styles.topMini}>
                <View style={styles.topMiniHead}>
                  <Image
                    contentFit="contain"
                    contentPosition={"center"}
                    transition={1000}
                    source={require("../../assets/credit-card-arrow.svg")}
                    width={24}
                    height={24}
                  />
                  <Text style={styles.topMiniHeadText}>Заработок в день</Text>
                </View>
                <Text style={styles.topMiniText}>
                  {earning ? earning : "0"} ₽
                </Text>
              </View>
            </View>
            {clientData && clientData.name === "Free" ? (
              <View style={styles.tariffFreeContainer}>
                <Text style={styles.tariffFreeHeader}>
                  Для получения вознаграждения подключите тариф
                </Text>
                <View style={styles.tariffFreeInfo}>
                  <View style={styles.tariffFreeLeft}>
                    <Text
                      style={[
                        styles.tariffFreeName,
                        { backgroundColor: "red" },
                      ]}
                    >
                      Pro
                    </Text>
                    <Text
                      style={[
                        styles.tariffFreeName,
                        { backgroundColor: "blue" },
                      ]}
                    >
                      Premium
                    </Text>
                    <Text
                      style={[
                        styles.tariffFreeName,
                        { backgroundColor: "orange" },
                      ]}
                    >
                      VIP
                    </Text>
                  </View>
                  <View style={styles.tariffFreeRight}>
                    <Text style={styles.tariffFreeInfoText}>
                      и зарабатывайте 150 ₽ в день{" "}
                    </Text>
                    <Text style={styles.tariffFreeInfoText}>
                      и зарабатывайте 256 ₽ в день{" "}
                    </Text>
                    <Text style={styles.tariffFreeInfoText}>
                      и зарабатывайте 369 ₽ в день{" "}
                    </Text>
                  </View>
                </View>
                <Text style={styles.tariffFreeDopText}>
                  Вознаграждение также зависит от количества друзей
                </Text>
              </View>
            ) : (
              <View>
                {referral &&
                  referral.map((item) => (
                    <View>
                      <View style={styles.levelContainer}>
                        <View style={styles.levelTopContainer}>
                          <View style={styles.levelLeft}>
                            <View style={styles.levelLeftContainer}>
                              <View style={styles.levelLeftTextContainer}>
                                <Text
                                  style={styles.levelLeftNameText}
                                >{`${item.level} уровень`}</Text>
                                <Text
                                  style={styles.levelLeftPeopleText}
                                >{`${item.quantity} человек`}</Text>
                              </View>
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
                          <View style={styles.levelRight}>
                            <Text
                              style={styles.levelLeftDiscountText}
                            >{`${item.reward}%`}</Text>
                            <Text style={styles.levelLeftDopText}>
                              с уровня
                            </Text>
                          </View>
                        </View>
                        <View style={styles.levelBottomContainer}>
                          <View style={styles.tariffsContainer}>
                            {item.tariff_counts.map((tariff) => (
                              <View
                                key={tariff.tariff}
                                style={[
                                  styles.tariffContainer,
                                  { backgroundColor: tariff.color },
                                ]}
                              >
                                <Text style={styles.tariffNameText}>
                                  {tariff.tariff} {tariff.count}
                                </Text>
                              </View>
                            ))}
                          </View>
                          {item.level === "1" ? (
                            <TouchableOpacity
                              onPress={() => {
                                setOpenPeople(!openPeople);
                              }}
                            >
                              <Image
                                style={[
                                  !openPeople
                                    ? { transform: [{ rotate: "180deg" }] }
                                    : "",
                                ]}
                                contentFit="contain"
                                contentPosition="center"
                                transition={1000}
                                source={require("../../assets/arrow-circle-down.svg")}
                                width={24}
                                height={24}
                              />
                            </TouchableOpacity>
                          ) : (
                            <View></View>
                          )}
                        </View>
                      </View>
                      {openPeople && (
                        <View>
                          {item.level === "1" ? (
                            <View style={styles.peoplesContainer}>
                              {item.people.map((people, index) => (
                                <View
                                  key={people.tariff_name}
                                  style={[
                                    styles.peopleContainer,
                                    index % 3 === 2 ? styles.lastInRow : null,
                                  ]}
                                >
                                  <Text style={styles.peopleName}>
                                    {people.name}{" "}
                                    {people.surname
                                      ? people.surname.substring(0, 1)
                                      : ""}
                                    .
                                  </Text>
                                  <View
                                    style={[
                                      styles.peopleTariffContainer,
                                      { backgroundColor: people.tariff_color },
                                    ]}
                                  >
                                    <Text style={styles.peopleTariffName}>
                                      {people.tariff_name}
                                    </Text>
                                  </View>
                                </View>
                              ))}
                            </View>
                          ) : (
                            <View></View>
                          )}
                        </View>
                      )}
                    </View>
                  ))}
              </View>
            )}
          </View>
        </ImageBackground>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  containerView: {
    marginHorizontal: 15,
    minHeight: 1050,
    flex: 1,
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  topMini: {
    backgroundColor: elemBackgroundColor,
    borderRadius: 12,
    width: "48%",
    height: 80,
    padding: 10,
  },
  topMiniHead: {
    flexDirection: "row",
    alignItems: "center",
  },
  topMiniHeadText: {
    color: textPrimaryColor,
    fontSize: 12,
    marginLeft: 5,
  },
  topMiniText: {
    marginTop: 3,
    color: textPrimaryColor,
    fontSize: 24,
    fontFamily: FONTS.medium,
  },
  tariffFreeContainer: {
    backgroundColor: elemBackgroundColor,
    borderRadius: 12,
    height: 260,
    padding: 15,
  },
  tariffFreeHeader: {
    color: textPrimaryColor,
    fontSize: 18,
    fontFamily: FONTS.medium,
    textAlign: "center",
    marginBottom: 15,
  },
  tariffFreeInfo: {
    flexDirection: "row",
  },
  tariffFreeLeft: {
    marginRight: 10,
  },
  tariffFreeRight: {},
  tariffFreeBack: {
    marginBottom: 10,
  },
  tariffFreeName: {
    color: textPrimaryColor,
    fontSize: 12,
    fontFamily: FONTS.medium,
    marginBottom: 10,
    borderRadius: 8,
    paddingVertical: 2,
    paddingHorizontal: 7,
  },
  tariffFreeInfoText: {
    color: textPrimaryColor,
    fontSize: 14,
    marginBottom: 15,
  },
  tariffFreeDopText: {
    marginTop: 15,
    color: textPrimaryColor,
    fontSize: 16,
    textAlign: "center",
  },
  levelContainer: {
    height: 110,
    backgroundColor: elemBackgroundColor,
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
  },
  levelTopContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  levelLeftContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  levelLeft: {},
  levelLeftTextContainer: {
    marginRight: 15,
  },
  levelLeftNameText: {
    color: textPrimaryColor,
    fontSize: 24,
    fontFamily: FONTS.medium,
  },
  levelLeftPeopleText: {
    color: textPrimaryColor,
    fontSize: 14,
  },
  levelRight: {},
  levelLeftDiscountText: {
    color: textPrimaryColor,
    fontSize: 24,
    fontFamily: FONTS.medium,
  },
  levelLeftDopText: {
    color: textPrimaryColor,
    fontSize: 14,
  },
  levelBottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tariffsContainer: {
    flexDirection: "row",
  },
  tariffContainer: {
    marginRight: 10,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 8,
  },
  tariffNameText: {
    color: textPrimaryColor,
    fontSize: 14,
  },
  peoplesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  peopleContainer: {
    marginRight: 10,
    marginBottom: 10,
    padding: 7,
    alignItems: "center",
    backgroundColor: elemBackgroundColor,
    width: "31%",
    borderRadius: 8,
  },
  lastInRow: {
    marginRight: 0,
  },
  peopleName: {
    color: textPrimaryColor,
    fontSize: 14,
    fontFamily: FONTS.medium,
    marginBottom: 5,
  },
  peopleTariffContainer: {
    marginRight: 10,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 8,
  },
  peopleTariffName: {
    color: textPrimaryColor,
    fontSize: 14,
  },
});
