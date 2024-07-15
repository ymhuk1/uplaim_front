import {
  Modal,
  RefreshControl,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Image, ImageBackground } from "expo-image";
import React, { useEffect, useState } from "react";
import { FONTS, HEIGHT, SKELETON, WIDTH } from "../../constants/theme";
import { elemGradientColors } from "../../components/ColorsComponent";
import { LinearGradient } from "expo-linear-gradient";
import NewButtonComponent from "../../components/NewButtonComponent";
import FitnessGift from "../../components/FitnessCardComponent";
import Accordion from "../../components/AccordeonComponent";
import {
  styles,
  giftsWidthImg,
  ticketsWidth,
  upBalanceWidth,
} from "../../styles/giftStyles";
import { router } from "expo-router";
import GiftsNow from "../../components/GiftsNowComponent";
import TicketsComponent from "../../components/TicketsComponent";
import HeaderComponent from "../../components/HeaderComponent";
import UniversalModal from "../../components/ModalWindowComponent";
import ActivatesModalComponent from "../../components/ActivatesModalComponent";
import Constants from "expo-constants";
import * as SecureStore from "expo-secure-store";
import { Path, Svg } from "react-native-svg";
import { Skeleton } from "moti/skeleton";

const apiBaseUrl = Constants.expoConfig.extra.API_PROD;

export default function Gifts() {
  const [refreshing, setRefreshing] = useState(false);
  const [textValue, setTextValue] = useState("Выигрывай с нами!");
  const [isTooltipVisible, setTooltipVisible] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [clientData, setClientData] = useState({});
  const [token, setToken] = useState(null);
  const [notify, setNotify] = useState(true);
  const [competitions, setCompetitions] = useState({});
  const [prizes, setPrizes] = useState({});
  const [tasks, setTasks] = useState({});
  const [transactions, setTransactions] = useState({});
  const [questions, setQuestions] = useState({});
  const [currentBalance, setCurrentBalance] = useState();
  const [skeleton, setSkeleton] = useState(true);

  // Competitions
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

  //All transactions tasks
  const fetchAllTransactions = (id) => {
    fetch(`${apiBaseUrl}api/all_transaction_tasks?client_id=${id}`)
      .then((response) => response.json())
      .then((data) => {
        setTransactions(data);
        // console.log("Данные Transactions успешно получены:", data);
      })
      .catch((error) => {
        console.error(
          "Произошла ошибка при получении данных транзакции:",
          error
        );
      });
  };

  const fetchData = async (id) => {
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
          setClientData(clientData.client);
          const id = clientData.client.id;
          fetchCompetitions(id);
          fetchAllTransactions(id);
          // console.log("Данные клиента успешно получены:", clientData.client);
          const hasUnreadNotification = await clientData.client.notify.some(
            (notifications) => notifications.read === false
          );
          setNotify(hasUnreadNotification);

          await SecureStore.setItemAsync(
            "clientData",
            JSON.stringify(clientData)
          );

          // console.log("clientData", clientData.client.id);
        } else {
          console.error("Ошибка при загрузке данных клиента");
        }

        //Prizes
        const prizesResponse = await fetch(`${apiBaseUrl}api/prizes`);
        if (prizesResponse.ok) {
          const data = await prizesResponse.json();
          // console.log("Данные Prizes успешно получены:", data);
          setPrizes(data);
        } else {
          console.error("Произошла ошибка при получении данных призов");
        }

        // All tasks
        const allTasksResponse = await fetch(`${apiBaseUrl}api/all_tasks`);
        if (allTasksResponse.ok) {
          const data = await allTasksResponse.json();
          // console.log("Данные Tasks успешно получены:", data);
          setTasks(data);
        } else {
          console.error("Произошла ошибка при получении данных задач");
        }

        //All questions
        const allQuestionsResponse = await fetch(
          `${apiBaseUrl}api/all_questions`
        );
        if (allQuestionsResponse.ok) {
          const data = await allQuestionsResponse.json();
          // console.log("Данные Questions успешно получены:", data);
          setQuestions(data);
        } else {
          console.error("Произошла ошибка при получении данных вопросов");
        }

        //Tickets on sell
        // const ticketsOnSellResponse = await fetch(
        //   `${apiBaseUrl}api/tickets_on_sell`
        // );
        // if (ticketsOnSellResponse.ok) {
        //   const data = await ticketsOnSellResponse.json();
        //   // console.log("Данные ticketsOnSell успешно получены:", data);
        //   setTicketsOnSell(data);
        // } else {
        //   console.error(
        //     "Произошла ошибка при получении данных билетов на продажу"
        //   );
        // }
      }
    } catch (error) {
      console.error("Произошла ошибка при получении данных:", error);
    } finally {
      setRefreshing(false);
      setSkeleton(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const toggleTooltip = () => {
    setTooltipVisible(!isTooltipVisible);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const onRefresh = () => {
    setRefreshing(true);
    setSkeleton(true);
    fetchData();
  };

  return (
    <View>
      <ScrollView
        // style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        // contentContainerStyle={styles.container}
      >
        <ImageBackground
          source={require("../../assets/background.png")}
          contentFit={"cover"}
          style={styles.containerImg}
        >
          <View style={styles.containerView}>
            <Skeleton.Group show={skeleton}>
              <HeaderComponent
                text={textValue}
                secondary={true}
                skeleton={skeleton}
              />
              <View style={styles.upBalanceContainer}>
                <Skeleton {...SKELETON}>
                  <LinearGradient
                    colors={elemGradientColors}
                    style={styles.upBalance}
                  >
                    <Text style={styles.upbalance__text}>У Вас</Text>
                    <View
                      style={{
                        flexDirection: "row-reverse",
                        alignItems: "center",
                      }}
                    >
                      <Image
                        height={18}
                        width={28}
                        transition={1000}
                        source={require("../../assets/up.svg")}
                      />
                      <Text style={styles.balance__text}>
                        {clientData.up_balance}
                      </Text>
                    </View>
                  </LinearGradient>
                </Skeleton>
                <Skeleton {...SKELETON}>
                  <TicketsComponent
                    buttonTitle={"Мои билеты"}
                    widthElement={ticketsWidth}
                    widthButton={ticketsWidth - 20}
                    height={27}
                  />
                </Skeleton>
              </View>
              <View style={{ marginTop: 20 }}>
                <Skeleton height={40} {...SKELETON}>
                  <Text style={styles.textTitle2}>Сейчас в розыгрыше</Text>
                </Skeleton>
              </View>
              <Skeleton {...SKELETON}>
                <ScrollView
                  showsHorizontalScrollIndicator={false}
                  decelerationRate="normal"
                  horizontal
                >
                  {competitions.length > 0 &&
                    competitions.map((competition) =>
                      competition.prizes.map((item, index) => (
                        <View
                          style={{
                            flexDirection: "row",
                            marginRight: 15,
                            marginTop: 8,
                            marginBottom: 15,
                          }}
                          key={index}
                        >
                          <TouchableOpacity>
                            <GiftsNow
                              sourceImg={apiBaseUrl + item.photo}
                              sourceTicket={competition.color}
                              text={item.name}
                              height={154}
                              imageHeight={105}
                              width={giftsWidthImg}
                            />
                          </TouchableOpacity>
                        </View>
                      ))
                    )}
                </ScrollView>
              </Skeleton>
              <View style={{ marginTop: 10 }}>
                <TouchableOpacity
                  onPress={() =>
                    router.push({ pathname: "/secondary/allGifts" })
                  }
                >
                  <Skeleton {...SKELETON}>
                    <View style={styles.prize__container}>
                      <Text style={styles.text__prize}>
                        Все разыгрываемые призы
                      </Text>
                    </View>
                  </Skeleton>
                </TouchableOpacity>
              </View>
              <View style={{ marginTop: 20 }}>
                <Skeleton height={40} {...SKELETON}>
                  <Text style={styles.textTitle2}>Текущие розыгрыши</Text>
                </Skeleton>
              </View>
              <View style={styles.currentGifts}>
                {competitions.length > 0 &&
                  competitions.slice(0, 3).map((item, index) => (
                    <Skeleton height={90} {...SKELETON}>
                      <View
                        key={index}
                        style={[
                          styles.currentGifts__inner,
                          { borderColor: item.color },
                        ]}
                      >
                        <View style={styles.currentGifts__img}>
                          <Image
                            height={60}
                            width={60}
                            source={apiBaseUrl + item.photo}
                            borderRadius={8}
                          />
                        </View>
                        <View style={styles.currentGifts__text}>
                          <Text style={styles.currentGifts__text_title}>
                            {item.name}
                          </Text>
                          <Text style={styles.text_date}>
                            Розыгрыш {item.date_end}
                          </Text>
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              columnGap: 5,
                            }}
                          >
                            <Svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <Path
                                d="M12 8V20M12 7H8.46429C7.94332 7 7.4437 6.78929 7.07533 6.41421C6.70695 6.03914 6.5 5.53043 6.5 5C6.5 4.46957 6.70695 3.96086 7.07533 3.58579C7.4437 3.21071 7.94332 3 8.46429 3C11.2143 3 12 7 12 7ZM12 7H15.5357C16.0567 7 16.5563 6.78929 16.9247 6.41421C17.293 6.03914 17.5 5.53043 17.5 5C17.5 4.46957 17.293 3.96086 16.9247 3.58579C16.5563 3.21071 16.0567 3 15.5357 3C12.7857 3 12 7 12 7ZM5 12H19V17.8C19 18.9201 19 19.4802 18.782 19.908C18.5903 20.2843 18.2843 20.5903 17.908 20.782C17.4802 21 16.9201 21 15.8 21H8.2C7.07989 21 6.51984 21 6.09202 20.782C5.71569 20.5903 5.40973 20.2843 5.21799 19.908C5 19.4802 5 18.9201 5 17.8V12ZM4.6 12H19.4C19.9601 12 20.2401 12 20.454 11.891C20.6422 11.7951 20.7951 11.6422 20.891 11.454C21 11.2401 21 10.9601 21 10.4V8.6C21 8.03995 21 7.75992 20.891 7.54601C20.7951 7.35785 20.6422 7.20487 20.454 7.10899C20.2401 7 19.9601 7 19.4 7H4.6C4.03995 7 3.75992 7 3.54601 7.10899C3.35785 7.20487 3.20487 7.35785 3.10899 7.54601C3 7.75992 3 8.03995 3 8.6V10.4C3 10.9601 3 11.2401 3.10899 11.454C3.20487 11.6422 3.35785 11.7951 3.54601 11.891C3.75992 12 4.03995 12 4.6 12Z"
                                stroke={item.color}
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </Svg>
                            <Text style={styles.currentGifts__text_prizes}>
                              {item.prizes.length === 0
                                ? 0
                                : item.prizes.length}{" "}
                              призов
                            </Text>
                          </View>
                        </View>
                        <View style={styles.currentGifts__button}>
                          <TouchableOpacity
                            onPress={() =>
                              toggleModal() || setCurrentBalance(item)
                            }
                          >
                            <Text
                              style={[
                                styles.currentGifts__button_text,
                                { backgroundColor: item.color },
                              ]}
                            >
                              Участвовать
                            </Text>
                          </TouchableOpacity>
                          <Text style={styles.currentGifts__button_ticket}>
                            Активных билетов:{" "}
                            {item.current_client_active_tickets}
                          </Text>
                        </View>
                      </View>
                    </Skeleton>
                  ))}
              </View>
              <TouchableOpacity
                onPress={() =>
                  router.push({ pathname: "/secondary/allRaffles" })
                }
              >
                <Skeleton {...SKELETON}>
                  <View style={styles.prize__container}>
                    <Text style={styles.text__prize}>Все розыгрыши</Text>
                  </View>
                </Skeleton>
              </TouchableOpacity>
              <View style={{ marginTop: 10, marginBottom: 10 }}>
                <Skeleton {...SKELETON}>
                  <View style={styles.makeMoney}>
                    <Text style={styles.makeMoney__text}>Зарабатывай</Text>
                    <Image
                      height={26}
                      width={40}
                      source={require("../../assets/gifts/gift-up.svg")}
                    />
                    <Text style={styles.makeMoney__text}>и</Text>
                    <View style={styles.makeMoney__tickets}>
                      <Image
                        height={29}
                        width={82}
                        source={require("../../assets/ticket-green.svg")}
                      />
                      <Image
                        height={29}
                        width={82}
                        source={require("../../assets/ticket-orange.svg")}
                        style={{
                          marginLeft: 3,
                          position: "absolute",
                          top: -3,
                        }}
                      />
                      <Image
                        height={29}
                        width={82}
                        source={require("../../assets/ticket-fuksia.svg")}
                        style={{
                          marginLeft: 7,
                          position: "absolute",
                          top: -6,
                        }}
                      />
                    </View>
                  </View>
                  <Text style={styles.ticket__text}>
                    Выполняйте данные задания и получайте UP или билеты для
                    розыгрыша.
                  </Text>
                </Skeleton>
              </View>
              {tasks.length > 0 &&
                tasks.slice(0, 3).map((item, index) => (
                  <View key={index} style={{ marginBottom: 5 }}>
                    <Skeleton {...SKELETON}>
                      <FitnessGift
                        imageSource={apiBaseUrl + item.photo}
                        balanceImageSource={
                          item.reward_type === "up"
                            ? require("../../assets/up.svg")
                            : null
                        }
                        balanceSource={item.reward_type}
                        statusImageSource={
                          item.status !== "activate"
                            ? require("../../assets/gifts/clock.svg")
                            : require("../../assets/gifts/success.svg")
                        }
                        title={item.name}
                        description={item.description}
                        count={item.quantity === null ? "1" : item.quantity}
                        maxCount={item.quantity === null ? "1" : item.quantity}
                        endDate={"до " + item.date_end.slice(0, 10)}
                        balance={item.reward}
                        balanceImageHeight={12}
                        balanceImageWidth={35}
                        onClose={toggleTooltip}
                      />
                    </Skeleton>
                  </View>
                ))}
              <View style={{ marginTop: 15, marginBottom: 20 }}>
                <TouchableOpacity
                  onPress={() =>
                    router.push({ pathname: "/secondary/allTasks" })
                  }
                >
                  <Skeleton {...SKELETON}>
                    <View style={styles.prize__container}>
                      <Text style={styles.text__prize}>Все задания</Text>
                    </View>
                  </Skeleton>
                </TouchableOpacity>
              </View>
              <Skeleton
                height={40}
                {...SKELETON}
              >
                <Text style={styles.textTitle2}>История начислений</Text>
              </Skeleton>
              {transactions.length > 0
                ? transactions.map((item, index) => (
                  <View style={{ rowGap: 12, marginBottom: 20 }} key={index}>
                      <Skeleton {...SKELETON}>
                        <Text style={[styles.ticket__text, { marginBottom: 10 }]}>
                          {item.created_at.slice(0, 10)}
                        </Text>
                        <FitnessGift
                          imageSource={apiBaseUrl + item["task"].photo}
                          balanceImageSource={
                            item.reward_type === "up"
                              ? require("../../assets/up.svg")
                              : null
                          }
                          balanceSource={item["task"].reward_type}
                          description={item["task"].name}
                          balance={item["task"].reward}
                          balanceImageHeight={12}
                          balanceImageWidth={33}
                        />
                      </Skeleton>
                    </View>
                  ))
                : null}
              {transactions.length > 0 ? (
                <TouchableOpacity
                  onPress={() =>
                    router.push({ pathname: "/secondary/accrualHistory" })
                  }
                >
                  <Skeleton {...SKELETON}>
                    <View style={styles.prize__container}>
                      <Text style={styles.text__prize}>Все начисления</Text>
                    </View>
                  </Skeleton>
                </TouchableOpacity>
              ) : (
                <Skeleton {...SKELETON}>
                  <Text
                    style={[
                      styles.currentGifts__text_title,
                      { textAlign: "center", marginVertical: 10 },
                    ]}
                  >
                    Пока нет начислений
                  </Text>
                </Skeleton>
              )}
              <View style={{ marginTop: 20 }}>
                <Skeleton
                  height={40}
                  {...SKELETON}
                >
                  <Text style={styles.textTitle2}>Ответы на вопросы</Text>
                </Skeleton>
              </View>
              <View style={styles.accordion__container}>
                {questions.length > 0 &&
                  questions.map((item, index) => (
                    <View style={{ marginBottom: 20 }} key={index}>
                      <Skeleton {...SKELETON}>
                        <Accordion
                          title={item.question}
                          content={item.answer}
                          width={"auto"}
                        />
                      </Skeleton>
                    </View>
                  ))}
              </View>
              {isTooltipVisible && (
                <Modal
                  visible={isTooltipVisible}
                  animationType="slide"
                  transparent={true}
                >
                  <UniversalModal
                    onClose={toggleTooltip}
                    title={tasks[0].name}
                    title2={"Получаете"}
                    buttonTitle={"К покупкам"}
                    balance={tasks[0].reward}
                    balanceUp={tasks[0].reward_type}
                    content={tasks[0].description}
                    sourceImg={apiBaseUrl + tasks[0].photo}
                    dateText={tasks[0].short_description}
                  />
                </Modal>
              )}
              {isModalVisible && (
                <Modal
                  visible={isModalVisible}
                  animationType="slide"
                  transparent={true}
                >
                  <ActivatesModalComponent
                    onClose={toggleModal}
                    balance={currentBalance?.quantity_ticket}
                    ticketColor={currentBalance?.color}
                  />
                </Modal>
              )}
            </Skeleton.Group>
          </View>
          <StatusBar
            backgroundColor="transparent"
            barStyle="light-content"
            translucent={true}
          />
        </ImageBackground>
      </ScrollView>
    </View>
  );
}
