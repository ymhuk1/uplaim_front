import {
  ImageBackground,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { FONTS, HEIGHT, WIDTH } from "../../constants/theme";
import HeaderComponent from "../../components/HeaderComponent";
import {
  elemBackgroundColor,
  fuchsia,
  textPrimaryColor,
} from "../../components/ColorsComponent";
import { Path, Svg } from "react-native-svg";
import GiftNow from "../../components/GiftsNowComponent";
import Constants from "expo-constants";
import { useGlobalSearchParams, useRouter } from "expo-router";
import { Image } from "expo-image";
import * as SecureStore from "expo-secure-store";
import ActivatesModalComponent from "../../components/ActivatesModalComponent";

const apiBaseUrl = Constants.expoConfig.extra.API_PROD;

export default function Raffle() {
  const [textValue, setTextValue] = useState("Розыгрыш");
  const [prizes, setPrizes] = useState([]);
  const [competitions, setCompetitions] = useState([]);
  const [selectedPrize, setSelectedPrize] = useState();
  const [selectedPrizeId, setSelectedPrizeId] = useState();
  const [loading, setLoading] = useState(false);
  const [clientData, setClientData] = useState({});
  const [token, setToken] = useState(null);
  const [currentBalance, setCurrentBalance] = useState();
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const { id } = useGlobalSearchParams();

  const fetchCompetitions = (id) => {
    fetch(`${apiBaseUrl}api/competitions?client_id=${id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data === null) {
          console.error(
            "Произошла ошибка при получении данных конкурсов: данные конкурсов равны null"
          );
        } else {
          // console.log("Данные Competitions успешно получены:", data);
          setCompetitions(data);
        }
      })
      .catch((error) => {
        console.error("Произошла ошибка при получении данных:", error);
      });
  };

  const fetchData = async () => {
    const userDataStr = await SecureStore.getItemAsync("userData");
    try {
      if (userDataStr) {
        const userData = JSON.parse(userDataStr);
        setToken(userData);

        const headers = {
          Authorization: userData.token,
          "Content-Type": "application/json",
        };

        // Client
        const clientResponse = await fetch(`${apiBaseUrl}api/client`, {
          headers,
        });
        if (clientResponse.ok) {
          const clientData = await clientResponse.json();
          const id = clientData.client.id;
          setClientData(id);
          fetchCompetitions(id);
          // console.log("Данные клиента успешно получены:", id);

          await SecureStore.setItemAsync(
            "clientData",
            JSON.stringify(clientData)
          );
        } else {
          console.error("Ошибка при загрузке данных клиента");
        }

        // Prizes
        const prizesResponse = await fetch(`${apiBaseUrl}api/prizes`);
        if (prizesResponse.ok) {
          const data = await prizesResponse.json();
          console.log("Данные Prizes успешно получены:", data);
          setPrizes(data);
        } else {
          console.error("Произошла ошибка при получении данных призов");
        }
      }
      setLoading(true);
    } catch (error) {
      console.error("Ошибка при получении запроса:", error);
      setLoading(true);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
    if (id !== undefined && id !== "") {
      setSelectedPrizeId(Number(id));
    }
  }, [id]);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <ImageBackground
        source={require("../../assets/background.png")}
        contentFit={"cover"}
        style={styles.containerImg}
      >
        <View style={styles.container}>
          <HeaderComponent text={textValue} secondary={true} />
          <Text
            style={[
              styles.text__title,
              {
                color: loading ? competitions[id]?.color : textPrimaryColor,
              },
            ]}
          >
            {loading && competitions[id].name}
          </Text>
          <Text style={styles.text__subtitle}>
            Подведение итогов {loading && competitions[id].date_end} г.
          </Text>
          <View style={styles.description__container}>
            <Text style={styles.text__description}>
              Выполняйте задания, получайте билеты и участвуйте в розыгрыше
              призов.
            </Text>
            <Text style={styles.text__description}>
              Всего в розыгрыше {loading && competitions[id].prizes.length}{" "}
              призов.
            </Text>
          </View>
          <View style={styles.activateTicket__container}>
            <View style={styles.activateTicket__text_wrapper}>
              <Text style={styles.activateTicket__text}>У вас</Text>
              <View>
                <Svg
                  width="66"
                  height="23"
                  viewBox="0 0 45 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <Path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8.90903 0H0V5.23889C1.00411 5.71593 1.69811 6.73911 1.69811 7.92453C1.69811 9.10995 1.00411 10.1331 0 10.6102V15.7075H8.9079C8.97963 15.6558 9.0677 15.6253 9.16288 15.6253C9.25807 15.6253 9.34614 15.6558 9.41786 15.7075H45V10.6729C43.9204 10.2277 43.1604 9.16495 43.1604 7.92453C43.1604 6.68411 43.9204 5.62141 45 5.17615V0H9.41673C9.34522 0.0512418 9.25757 0.0814048 9.16288 0.0814048C9.06819 0.0814048 8.98055 0.0512418 8.90903 0ZM9.16288 0.626806C8.92191 0.626806 8.72656 0.822153 8.72656 1.06313V1.14494C8.72656 1.38591 8.92191 1.58126 9.16288 1.58126C9.40386 1.58126 9.5992 1.38591 9.5992 1.14494V1.06313C9.5992 0.822153 9.40386 0.626806 9.16288 0.626806ZM8.72656 2.56298C8.72656 2.32201 8.92191 2.12666 9.16288 2.12666C9.40386 2.12666 9.5992 2.32201 9.5992 2.56298V2.64479C9.5992 2.88576 9.40386 3.08111 9.16288 3.08111C8.92191 3.08111 8.72656 2.88576 8.72656 2.64479V2.56298ZM9.16288 3.62651C8.92191 3.62651 8.72656 3.82186 8.72656 4.06283V4.14464C8.72656 4.38562 8.92191 4.58096 9.16288 4.58096C9.40386 4.58096 9.5992 4.38562 9.5992 4.14464V4.06283C9.5992 3.82186 9.40386 3.62651 9.16288 3.62651ZM8.72656 5.56268C8.72656 5.32171 8.92191 5.12636 9.16288 5.12636C9.40386 5.12636 9.5992 5.32171 9.5992 5.56269V5.6445C9.5992 5.88547 9.40386 6.08082 9.16288 6.08082C8.92191 6.08082 8.72656 5.88547 8.72656 5.64449V5.56268ZM9.16288 6.62622C8.92191 6.62622 8.72656 6.82156 8.72656 7.06254V7.14435C8.72656 7.38532 8.92191 7.58067 9.16288 7.58067C9.40386 7.58067 9.5992 7.38532 9.5992 7.14435V7.06254C9.5992 6.82156 9.40386 6.62622 9.16288 6.62622ZM8.72656 8.56239C8.72656 8.32142 8.92191 8.12607 9.16288 8.12607C9.40386 8.12607 9.5992 8.32142 9.5992 8.56239V8.6442C9.5992 8.88517 9.40386 9.08052 9.16288 9.08052C8.92191 9.08052 8.72656 8.88517 8.72656 8.6442V8.56239ZM9.16288 9.62592C8.92191 9.62592 8.72656 9.82127 8.72656 10.0622V10.1441C8.72656 10.385 8.92191 10.5804 9.16288 10.5804C9.40386 10.5804 9.5992 10.385 9.5992 10.1441V10.0622C9.5992 9.82127 9.40386 9.62592 9.16288 9.62592ZM8.72656 11.5621C8.72656 11.3211 8.92191 11.1258 9.16288 11.1258C9.40386 11.1258 9.5992 11.3211 9.5992 11.5621V11.6439C9.5992 11.8849 9.40386 12.0802 9.16288 12.0802C8.92191 12.0802 8.72656 11.8849 8.72656 11.6439V11.5621ZM9.16288 12.6256C8.92191 12.6256 8.72656 12.821 8.72656 13.0619V13.1438C8.72656 13.3847 8.92191 13.5801 9.16288 13.5801C9.40386 13.5801 9.5992 13.3847 9.5992 13.1438V13.0619C9.5992 12.821 9.40386 12.6256 9.16288 12.6256ZM8.72656 14.5618C8.72656 14.3208 8.92191 14.1255 9.16288 14.1255C9.40386 14.1255 9.5992 14.3208 9.5992 14.5618V14.6436C9.5992 14.8846 9.40386 15.0799 9.16288 15.0799C8.92191 15.0799 8.72656 14.8846 8.72656 14.6436V14.5618Z"
                    fill={loading && competitions[id].color}
                  />
                </Svg>
                <Text style={styles.activateTicket__count}>
                  {loading && competitions[id].current_client_active_tickets}
                </Text>
              </View>
              <Text style={styles.activateTicket__text}>активных билета</Text>
            </View>
            <TouchableOpacity
              style={styles.activateTicket__button}
              onPress={() => {
                toggleModal();
                setCurrentBalance(loading && competitions[id]);
              }}
            >
              <Text style={styles.activateTicket__button_text}>
                Активировать билеты
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.raffle__text}>Призы в розыгрыше</Text>
          {loading &&
            competitions[id].prizes.map((item, index) => (
              <View style={styles.raffle__container}>
                <View
                  style={[
                    styles.giftsNow__inner,
                    { borderColor: competitions[id].color },
                  ]}
                  key={item.id}
                >
                  <View style={styles.giftsNow__img_ticket}>
                    <Svg
                      width="45"
                      height="16"
                      viewBox="0 0 45 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <Path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M8.90903 0H0V5.23889C1.00411 5.71593 1.69811 6.73911 1.69811 7.92453C1.69811 9.10995 1.00411 10.1331 0 10.6102V15.7075H8.9079C8.97963 15.6558 9.0677 15.6253 9.16288 15.6253C9.25807 15.6253 9.34614 15.6558 9.41786 15.7075H45V10.6729C43.9204 10.2277 43.1604 9.16495 43.1604 7.92453C43.1604 6.68411 43.9204 5.62141 45 5.17615V0H9.41673C9.34522 0.0512418 9.25757 0.0814048 9.16288 0.0814048C9.06819 0.0814048 8.98055 0.0512418 8.90903 0ZM9.16288 0.626806C8.92191 0.626806 8.72656 0.822153 8.72656 1.06313V1.14494C8.72656 1.38591 8.92191 1.58126 9.16288 1.58126C9.40386 1.58126 9.5992 1.38591 9.5992 1.14494V1.06313C9.5992 0.822153 9.40386 0.626806 9.16288 0.626806ZM8.72656 2.56298C8.72656 2.32201 8.92191 2.12666 9.16288 2.12666C9.40386 2.12666 9.5992 2.32201 9.5992 2.56298V2.64479C9.5992 2.88576 9.40386 3.08111 9.16288 3.08111C8.92191 3.08111 8.72656 2.88576 8.72656 2.64479V2.56298ZM9.16288 3.62651C8.92191 3.62651 8.72656 3.82186 8.72656 4.06283V4.14464C8.72656 4.38562 8.92191 4.58096 9.16288 4.58096C9.40386 4.58096 9.5992 4.38562 9.5992 4.14464V4.06283C9.5992 3.82186 9.40386 3.62651 9.16288 3.62651ZM8.72656 5.56268C8.72656 5.32171 8.92191 5.12636 9.16288 5.12636C9.40386 5.12636 9.5992 5.32171 9.5992 5.56269V5.6445C9.5992 5.88547 9.40386 6.08082 9.16288 6.08082C8.92191 6.08082 8.72656 5.88547 8.72656 5.64449V5.56268ZM9.16288 6.62622C8.92191 6.62622 8.72656 6.82156 8.72656 7.06254V7.14435C8.72656 7.38532 8.92191 7.58067 9.16288 7.58067C9.40386 7.58067 9.5992 7.38532 9.5992 7.14435V7.06254C9.5992 6.82156 9.40386 6.62622 9.16288 6.62622ZM8.72656 8.56239C8.72656 8.32142 8.92191 8.12607 9.16288 8.12607C9.40386 8.12607 9.5992 8.32142 9.5992 8.56239V8.6442C9.5992 8.88517 9.40386 9.08052 9.16288 9.08052C8.92191 9.08052 8.72656 8.88517 8.72656 8.6442V8.56239ZM9.16288 9.62592C8.92191 9.62592 8.72656 9.82127 8.72656 10.0622V10.1441C8.72656 10.385 8.92191 10.5804 9.16288 10.5804C9.40386 10.5804 9.5992 10.385 9.5992 10.1441V10.0622C9.5992 9.82127 9.40386 9.62592 9.16288 9.62592ZM8.72656 11.5621C8.72656 11.3211 8.92191 11.1258 9.16288 11.1258C9.40386 11.1258 9.5992 11.3211 9.5992 11.5621V11.6439C9.5992 11.8849 9.40386 12.0802 9.16288 12.0802C8.92191 12.0802 8.72656 11.8849 8.72656 11.6439V11.5621ZM9.16288 12.6256C8.92191 12.6256 8.72656 12.821 8.72656 13.0619V13.1438C8.72656 13.3847 8.92191 13.5801 9.16288 13.5801C9.40386 13.5801 9.5992 13.3847 9.5992 13.1438V13.0619C9.5992 12.821 9.40386 12.6256 9.16288 12.6256ZM8.72656 14.5618C8.72656 14.3208 8.92191 14.1255 9.16288 14.1255C9.40386 14.1255 9.5992 14.3208 9.5992 14.5618V14.6436C9.5992 14.8846 9.40386 15.0799 9.16288 15.0799C8.92191 15.0799 8.72656 14.8846 8.72656 14.6436V14.5618Z"
                        fill={item?.color}
                      />
                    </Svg>
                  </View>
                  <Image
                    contentFit="cover"
                    contentPosition={"center"}
                    transition={1000}
                    source={apiBaseUrl + item.photo}
                    style={styles.giftsNow__img}
                  />
                  <View style={styles.text__wrapper}>
                    <Text style={styles.giftsNow__title}>{item.name}</Text>
                    <Text style={styles.giftsNow__text2}>
                      {item.description}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          <Text style={[styles.raffle__text, { marginBottom: 10 }]}>
            Итоги розыгрыша
          </Text>
          <Text style={styles.text__description}>
            {`Победителей выберем с помощью генератора случайных чисел - ${
              loading && competitions[id].date_end
            } г. в 16:00 МСК.\n\nПришлем уведомление, когда будут результаты. С ними вы всегда сможете ознакомиться на этой странице.`}
          </Text>
          <TouchableOpacity onPress={()=>{}}>
            <Image
              contentFit="cover"
              contentPosition={"center"}
              transition={1000}
              source={loading && apiBaseUrl + competitions[id].prizes[0].photo}
              style={styles.raffle__img}
            />
          </TouchableOpacity>
          {isModalVisible && (
            <Modal
              visible={isModalVisible}
              animationType="fade"
              transparent={true}
            >
              <ActivatesModalComponent
                onClose={toggleModal}
                balance={loading && currentBalance?.quantity_ticket}
                ticketColor={loading && currentBalance?.color}
                name={loading && currentBalance?.name}
                date={loading && currentBalance?.date_end}
              />
            </Modal>
          )}
        </View>
      </ImageBackground>
    </ScrollView>
  );
}

const height = WIDTH.width * 0.45;

const styles = StyleSheet.create({
  containerImg: {
    minHeight: HEIGHT.height,
  },
  container: {
    marginHorizontal: 15,
  },
  text__title: {
    marginTop: 10,
    fontFamily: FONTS.medium,
    fontSize: 24,
    lineHeight: 24,
    color: textPrimaryColor,
    alignSelf: "center",
  },
  text__subtitle: {
    marginTop: 10,
    fontFamily: FONTS.regular,
    fontSize: 16,
    lineHeight: 20,
    color: textPrimaryColor,
    alignSelf: "center",
  },
  description__container: {
    marginTop: 20,
    rowGap: 10,
    marginBottom: 15,
  },
  text__description: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    color: textPrimaryColor,
  },
  activateTicket__container: {
    backgroundColor: elemBackgroundColor,
    paddingHorizontal: 30,
    paddingVertical: 7,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  activateTicket__text_wrapper: {
    flexDirection: "row",
    columnGap: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  activateTicket__count: {
    position: "absolute",
    bottom: 0,
    fontFamily: FONTS.medium,
    fontSize: 18,
    lineHeight: 20,
    color: textPrimaryColor,
    alignSelf: "center",
    // justifyContent: "center",
    // alignItems: "center",
  },
  activateTicket__text: {
    fontFamily: FONTS.medium,
    fontSize: 18,
    lineHeight: 20,
    color: textPrimaryColor,
    alignSelf: "center",
  },
  activateTicket__button: {
    marginTop: 10,
    paddingHorizontal: 30,
    paddingVertical: 7,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: fuchsia,
  },
  activateTicket__button_text: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    lineHeight: 14,
    color: fuchsia,
    alignSelf: "center",
  },
  raffle__text: {
    marginVertical: 20,
    fontFamily: FONTS.medium,
    fontSize: 18,
    lineHeight: 20,
    color: textPrimaryColor,
  },
  raffle__container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 15,
  },
  giftsNow__inner: {
    height: WIDTH.width * 0.48,
    width: (WIDTH.width - 45) / 2,
    backgroundColor: elemBackgroundColor,
    borderRadius: 12,
    borderWidth: 2,
  },
  giftsNow__img_ticket: {
    position: "absolute",
    alignSelf: "center",
    top: -8,
    zIndex: 99,
  },
  text__wrapper: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    justifyContent: "center",
  },
  giftsNow__title: {
    fontFamily: FONTS.medium,
    fontSize: 16,
    color: textPrimaryColor,
  },
  giftsNow__text: {
    marginTop: 5,
    fontFamily: FONTS.regular,
    fontSize: 14,
    color: textPrimaryColor,
    alignSelf: "center",
  },
  giftsNow__text2: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    color: textPrimaryColor,
  },
  giftsNow__img: {
    height: height / 1.7,
    width: "100%",
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
  },
  raffle__img: {
    flex: 1,
    marginTop: 10,
    height: height * 0.6,
    borderRadius: 10,
    marginBottom: 50,
  },
});
