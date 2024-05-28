import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import HeaderComponent from "../../components/HeaderComponent";
import { Image, ImageBackground } from "expo-image";
import { useEffect, useState } from "react";
import { router, useGlobalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import {
  elemBackgroundColor,
  elemBackgroundColor3,
  elemGradientColors,
  textDisabledColor,
  textPrimaryColor,
} from "../../components/ColorsComponent";
import * as SecureStore from "expo-secure-store";
import Constants from "expo-constants";
import { getBallsText } from "../../components/utils/utils";
import NewButtonComponent from "../../components/NewButtonComponent";
import { FONTS } from "../../constants/theme";

const apiBaseUrl = Constants.expoConfig.extra.API_PROD;

export default function RecommendLevel() {
  const [textValue, setTextValue] = useState("Уровень рекомендаций");
  const [refreshing, setRefreshing] = useState(false);
  const [clientData, setClientData] = useState({});
  const [company, setCompany] = useState({});

  const { id } = useGlobalSearchParams();
  console.log("params!!!: " + id);

  const companyId = id;
  console.log("companyId: ", companyId);

  const companyBalls = clientData.balls || [];

  const getBallValue = (companyId, paramName) => {
    const ball = companyBalls.find((item) => item.company_id === companyId);
    return ball ? ball[paramName] : 0;
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
        const { company } = companyData;
        console.log("Данные компании успешно получены:", company);
        setCompany(company);
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
        console.log("Данные клиента успешно получены:", client);
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
    fetchData();
    setRefreshing(true);
  };

  useEffect(() => {
    fetchData();
  }, []);

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
            <View style={styles.tariffContainer}>
              <View style={styles.wrapper}>
                {Array.isArray(company.tariffs) &&
                  company.tariffs.map((tariff, index) => {
                    const isClientTariff =
                      clientData.tariff &&
                      clientData.tariff.name === tariff.name;
                    if (isClientTariff) {
                      return (
                        <View style={styles.tariffContainerInner} key={index}>
                          <TouchableOpacity
                            style={{ zIndex: 10 }}
                            onPress={() =>
                              router.push("/secondary/recommendLevel")
                            }
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
                          </TouchableOpacity>
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
                                {tariff.write_of_balls}%
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
                                {tariff.cashback}%
                              </Text>
                              <Text style={styles.tariffColumnTextDown}>
                                Кешбэк
                              </Text>
                            </LinearGradient>
                          </View>
                          {isClientTariff ? (
                            <Text style={styles.tariffConnectText}></Text>
                          ) : (
                            <TouchableOpacity
                              style={styles.tariffConnect}
                              // onPress={() => handleConnectPremium(tariff.name)} // Здесь нужно обработать нажатие
                            >
                              <Text style={styles.tariffConnectText}>
                                Подключить {tariff.clients_tariff_name}
                              </Text>
                            </TouchableOpacity>
                          )}
                        </View>
                      );
                    }
                  })}
              </View>
            </View>
            <View>
              <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Уровень привилегий</Text>
              </View>
              {Array.isArray(company.tariffs) &&
                company.tariffs.map((tariff, index) => {
                  const isClientTariff =
                    clientData.tariff && clientData.tariff.name !== tariff.name;
                  if (isClientTariff) {
                    return (
                      <View style={styles.tariffContainerPrivilege}>
                        <View style={styles.wrapper}>
                          <View
                            style={styles.tariffContainerInnerPrivilege}
                            key={index}
                          >
                            <View style={styles.tariffColumnPrivilege}>
                              <View style={styles.tariffDescPrivilege}>
                                <View
                                  style={[
                                    styles.tariffPrivilege,
                                    { backgroundColor: tariff.color },
                                  ]}
                                >
                                  <Text style={[styles.tariffPrivilegeText]}>
                                    {tariff.name}
                                  </Text>
                                </View>
                                <Text style={[styles.tariffPrivilegeDopText]}>
                                  Как получить?
                                </Text>
                              </View>

                              <LinearGradient
                                colors={elemGradientColors}
                                style={styles.tariffColumnItemPrivilege}
                              >
                                <Text style={styles.tariffColumnTextUp}>
                                  {tariff.write_of_balls}%
                                </Text>
                                <Text style={styles.tariffColumnTextDown}>
                                  Списание баллами
                                </Text>
                              </LinearGradient>
                              <LinearGradient
                                colors={elemGradientColors}
                                style={styles.tariffColumnItemPrivilege}
                              >
                                <Text style={styles.tariffColumnTextUp}>
                                  {tariff.cashback}%
                                </Text>
                                <Text style={styles.tariffColumnTextDown}>
                                  Кешбэк
                                </Text>
                              </LinearGradient>
                            </View>
                          </View>
                        </View>
                      </View>
                    );
                  }
                })}
            </View>
            <View style={styles.connectTariff}>
              <Text style={styles.connectTariffText}>Подключить тариф PRO</Text>
            </View>
            <View style={styles.taskContainer}>
              <LinearGradient
                style={styles.taskRowContainer}
                colors={elemGradientColors}
              >
                <View style={styles.taskRowContent}>
                  <Text style={styles.taskRowText}>или</Text>
                  <View style={styles.taskRowMain}>
                    <Text style={styles.taskRowMainText}>
                      Пригласить еще 4 из 5 друзей
                    </Text>
                    <View style={styles.taskMainStatus}>
                      <Image
                        contentFit="contain"
                        contentPosition={"center"}
                        transition={1000}
                        source={require("../../assets/circle-status.svg")}
                        width={64}
                        height={64}
                        style={styles.taskMainStatusImage}
                      />
                      <Text style={styles.taskMainStatusText}>20%</Text>
                    </View>
                  </View>
                </View>
              </LinearGradient>
              <LinearGradient
                style={styles.taskRowContainer}
                colors={elemGradientColors}
              >
                <View style={styles.taskRowContent}>
                  <Text style={styles.taskRowText}>или</Text>
                  <View style={styles.taskRowMain}>
                    <Text style={styles.taskRowMainText}>
                      Совершите операций на сумму 2575 ₽ из 5000 ₽
                    </Text>
                    <View style={styles.taskMainStatus}>
                      <Image
                        contentFit="contain"
                        contentPosition={"center"}
                        transition={1000}
                        source={require("../../assets/circle-status.svg")}
                        width={64}
                        height={64}
                        style={styles.taskMainStatusImage}
                      />
                      <Text style={styles.taskMainStatusText}>20%</Text>
                    </View>
                  </View>
                </View>
              </LinearGradient>
              <LinearGradient
                style={styles.taskRowContainer}
                colors={elemGradientColors}
              >
                <View style={styles.taskRowContent}>
                  <Text style={styles.taskRowText}>или</Text>
                  <View style={styles.taskRowMain}>
                    <Text style={styles.taskRowMainText}>
                      Совершите операций вместе с друзьями на сумму 2575 ₽ из
                      50000 ₽
                    </Text>
                    <View style={styles.taskMainStatus}>
                      <Image
                        contentFit="contain"
                        contentPosition={"center"}
                        transition={1000}
                        source={require("../../assets/circle-status.svg")}
                        width={64}
                        height={64}
                        style={styles.taskMainStatusImage}
                      />
                      <Text style={styles.taskMainStatusText}>20%</Text>
                    </View>
                  </View>
                </View>
              </LinearGradient>
            </View>

            <View style={styles.button}>
              <NewButtonComponent
                title={"Рекомендовать"}
                filled={true}
                height={48}
                fontSize={18}
              />
            </View>
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
    minHeight: 1000,
  },
  tariffContainer: {
    height: 210,
    backgroundColor: elemBackgroundColor,
    borderRadius: 12,
    marginBottom: 10,
    alignItems: "center",
    // paddingHorizontal: 15,
    paddingVertical: 12,
  },
  tariffContainerInner: {
    alignItems: "center",
    marginHorizontal: 25,
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

  tariffContainerPrivilege: {
    height: 120,
    backgroundColor: elemBackgroundColor,
    borderRadius: 12,
    marginBottom: 15,
    alignItems: "center",
    paddingVertical: 15,
  },
  tariffContainerInnerPrivilege: {
    alignItems: "center",
    marginHorizontal: 25,
  },
  tariffColumnPrivilege: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  tariffColumnItemPrivilege: {
    borderWidth: 1,
    borderColor: elemBackgroundColor3,
    borderStyle: "solid",
    borderRadius: 10,
    width: "31%",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  headerText: {
    fontSize: 24,
    fontFamily: FONTS.medium,
    color: "white",
    marginBottom: 2,
  },
  tariffDescPrivilege: {
    paddingVertical: 15,
    justifyContent: "space-between",
  },
  tariffPrivilege: {
    borderRadius: 8,
    width: 80,
    alignItems: "center",
  },
  tariffPrivilegeText: {
    paddingHorizontal: 10,
    fontSize: 18,
    color: textPrimaryColor,
  },
  tariffPrivilegeDopText: {
    fontSize: 14,
    color: textPrimaryColor,
  },
  connectTariff: {
    alignItems: "center",
    marginBottom: 10,
  },
  connectTariffText: {
    color: textPrimaryColor,
    fontSize: 16,
  },
  taskContainer: {},
  taskRowContainer: {
    borderWidth: 1,
    borderColor: elemBackgroundColor3,
    borderStyle: "solid",
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
  },
  taskRowContent: {},
  taskRowText: {
    textAlign: "center",
    color: textPrimaryColor,
    marginBottom: 10,
  },
  taskRowMain: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  taskRowMainText: {
    color: textPrimaryColor,
    fontSize: 18,
    width: "70%",
  },
  button: {},
  taskMainStatus: {
    justifyContent: "center",
    alignItems: "center",
  },
  taskMainStatusImage: {},
  taskMainStatusText: {
    position: "absolute",
    color: textPrimaryColor,
    fontWeight: "bold",
  },
});
