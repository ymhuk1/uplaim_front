import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
} from "react-native";
import {
  buttonGradientColors,
  elemBackgroundColor,
  elemBackgroundColor3,
  elemGradientColors,
  textPrimaryColor,
} from "../../components/ColorsComponent";
import { FONTS, HEIGHT, WIDTH } from "../../constants/theme";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import TicketsComponent from "../../components/TicketsComponent";
import HeaderComponent from "../../components/HeaderComponent";
import NewButtonComponent from "../../components/NewButtonComponent";
import { router } from "expo-router";
import TicketsModalComponent from "../../components/TicketsModalComponent";
import Constants from "expo-constants";
import * as SecureStore from "expo-secure-store";

const apiBaseUrl = Constants.expoConfig.extra.API_PROD;

const Tickets = () => {
  const [textValue, setTextValue] = useState("Ваши билеты");
  const [isTooltipVisible, setTooltipVisible] = useState(false);
  const [clientData, setClientData] = useState({});
  const [activatedTickets, setActivatedTickets] = useState([]);
  const [notActivatedTickets, setNotActivatedTickets] = useState([]);
  const [token, setToken] = useState(null);
  console.log("activatedTickets", notActivatedTickets.length);

  const fetchMyTickets = (id) => {
    fetch(`${apiBaseUrl}api/my_tickets?client_id=${id}`)
      .then((response) => response.json())
      .then((data) => {
        setActivatedTickets(data.activate);
        setNotActivatedTickets(data.not_activate);
        // console.log("Данные успешно получены:", data.not_activate);
      })
      .catch((error) => {
        console.log("Произошла ошибка при получении данных:", error);
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

          await SecureStore.setItemAsync(
            "clientData",
            JSON.stringify(clientData)
          );
          setClientData(clientData.client);
          const id = clientData.client.id;
          fetchMyTickets(id);
          // console.log("clientData", clientData.client.id);
        } else {
          console.error("Ошибка при загрузке данных клиента");
        }
      }
    } catch (error) {
      console.error("Произошла ошибка при получении данных:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const toggleTooltip = () => {
    setTooltipVisible(!isTooltipVisible);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {textValue && (
        <View style={styles.ticket__container}>
          <HeaderComponent text={textValue} secondary={true} />
          {notActivatedTickets.length > 0 ? (
            <TicketsComponent
              buttonTitle={"Активировать"}
              ticketsTitle={"Неактивированные билеты"}
              onButtonPress={() =>
                router.push({ pathname: "/secondary/allRaffles" })
              }
              widthButton={142}
              height={35}
              notActivatedTickets={notActivatedTickets}
            />
          ) : (
            <Text
              style={{
                marginTop: 20,
                color: textPrimaryColor,
                textAlign: "center",
                fontSize: 18,
              }}
            >
              У вас пока нет билетов
            </Text>
          )}
          {
            <View style={styles.activated__ticket}>
              <LinearGradient
                colors={elemGradientColors}
                style={
                  activatedTickets.length > 0 && styles.activated__ticket_inner
                }
              >
                {activatedTickets.map((activated) =>
                  activated.tickets.map((item, index) => (
                    <View>
                      <Text style={styles.activated__title}>
                        Активированные билеты
                      </Text>
                      <View
                        key={index}
                        style={[
                          styles.activated__tickets_block,
                          { borderColor: activated.color },
                        ]}
                      >
                        <Text
                          style={[
                            styles.block__text,
                            { color: activated.color },
                          ]}
                        >
                          Билеты розыгрыша {activated.name_competition} (
                          {activated.date_end}
                          ):
                        </Text>
                        <View style={styles.block__numbers}>
                          {activated.tickets.slice(0, 3).map((item, index) => (
                            <View style={styles.block__number_left} key={index}>
                              <Text style={[styles.text__numbers]}>
                                {item.length === null ? "0" : item.name}
                              </Text>
                            </View>
                          ))}
                          {activated.tickets.slice(3).map((item, index) => (
                            <View
                              style={styles.block__number_right}
                              key={index}
                            >
                              <Text style={[styles.text__numbers]}>
                                {item.length === null ? "0" : item.name}
                              </Text>
                            </View>
                          ))}
                        </View>
                        <TouchableOpacity
                          style={[
                            styles.block__button,
                            { borderColor: activated.color },
                          ]}
                        >
                          <Text style={styles.text__button}>Все билеты</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))
                )}
              </LinearGradient>
            </View>
          }
          <View style={styles.button}>
            <NewButtonComponent
              title={"Магазин билетов"}
              filled={true}
              height={54}
              fontSize={18}
              onPress={() => toggleTooltip()}
            />
          </View>
        </View>
      )}
      {isTooltipVisible && (
        <Modal
          visible={isTooltipVisible}
          animationType="slide"
          transparent={true}
        >
          <TicketsModalComponent onClose={toggleTooltip} />
        </Modal>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: elemBackgroundColor,
    height: HEIGHT.height,
  },
  ticket__container: {
    minHeight: HEIGHT.height,
    borderRadius: 8,
    paddingHorizontal: 15,
  },
  ticket__title: {
    fontFamily: FONTS.medium,
    fontSize: 24,
    color: textPrimaryColor,
    marginBottom: 10,
  },
  activated__ticket: {
    marginTop: 15,
  },
  activated__ticket_inner: {
    height: "auto",
    paddingHorizontal: 15,
    borderRadius: 8,
    // borderWidth: 1,
    // borderColor: elemBackgroundColor3,
    // borderStyle: "solid",
    // borderRadius: 10,
  },
  activated__title: {
    fontFamily: FONTS.medium,
    fontSize: 16,
    color: textPrimaryColor,
    marginVertical: 6,
  },
  activated__tickets_block: {
    marginBottom: 15,
  },
  block__text: {
    fontFamily: FONTS.medium,
    fontSize: 14,
    color: "#50FF9A",
    width: 317,
  },
  block__numbers: {
    flexDirection: "row",
    marginBottom: 10,
  },
  block__number_left: {
    // width: 100,
    marginRight: "auto",
  },
  block__number_right: {
    width: 100,
  },
  text__numbers: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: textPrimaryColor,
  },
  block__button: {
    borderRadius: 16,
    borderWidth: 1,
    borderStyle: "solid",
    alignSelf: "center",
  },
  text__button: {
    fontFamily: FONTS.medium,
    fontSize: 14,
    color: textPrimaryColor,
    paddingHorizontal: 50,
    paddingVertical: 10,
  },
  button: {
    width: WIDTH.width - 30,
    marginVertical: 15,
  },
});

export default Tickets;
