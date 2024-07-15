import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FONTS, WIDTH } from "../constants/theme";
import {
  elemBackgroundColor3,
  elemGradientColors,
  textPrimaryColor,
} from "./ColorsComponent";
import { useEffect, useState } from "react";
import Constants from "expo-constants";
import { Path, Svg } from "react-native-svg";
import * as SecureStore from "expo-secure-store";

const apiBaseUrl = Constants.expoConfig.extra.API_PROD;

function TicketsComponent({
  buttonTitle,
  ticketsTitle,
  disabled,
  widthElement,
  widthButton,
  height,
}) {
  const [clientData, setClientData] = useState({});
  const [token, setToken] = useState(null);
  const [notActivatedTickets, setNotActivatedtickets] = useState({});

  const fetchMyTickets = async (id) => {
    fetch(`${apiBaseUrl}api/my_tickets?client_id=${id}`)
      .then((response) => response.json())
      .then((data) => {
        setNotActivatedtickets(data.not_activate);
        // console.log("Данные успешно получены:", data);
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

  return (
    <View style={styles.container} width={widthElement}>
      <LinearGradient
        colors={elemGradientColors}
        style={[
          styles.tickets,
          ticketsTitle ? { flexDirection: "row" } : { flexDirection: "column" },
        ]}
      >
        <View
          style={ticketsTitle ? styles.ticket__inner2 : styles.ticket__inner}
        >
          {ticketsTitle ? (
            <View style={{ marginBottom: 5 }}>
              <Text style={styles.ticket__title}>{ticketsTitle}</Text>
            </View>
          ) : null}
          {notActivatedTickets.length > 0 ? (
            notActivatedTickets.slice(0, 3).map((item, index) => (
              <View
                key={index}
                style={[
                  styles.ticket__img,
                  !ticketsTitle
                    ? { paddingHorizontal: (widthElement - 145) / 2 }
                    : null,
                ]}
              >
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
                    d="M8.90903 0H0V5.23889C1.00411 5.71593 1.69811 6.73911 1.69811 7.92453C1.69811 9.10995 1.00411 10.1331 0 10.6102V15.7075H8.9079C8.97963 15.6558 9.0677 15.6253 9.16288 15.6253C9.25807 15.6253 9.34614 15.6558 9.41786 15.7075H45V10.6729C43.9204 10.2277 43.1604 9.16495 43.1604 7.92453C43.1604 6.68411 43.9204 5.62141 45 5.17615V0H9.41673C9.34522 0.0512418 9.25757 0.0814048 9.16288 0.0814048C9.06819 0.0814048 8.98055 0.0512418 8.90903 0ZM9.16288 0.626806C8.92191 0.626806 8.72656 0.822153 8.72656 1.06313V1.14494C8.72656 1.38591 8.92191 1.58126 9.16288 1.58126C9.40386 1.58126 9.5992 1.38591 9.5992 1.14494V1.06313C9.5992 0.822153 9.40386 0.626806 9.16288 0.626806ZM8.72656 2.56298C8.72656 2.32201 8.92191 2.12666 9.16288 2.12666C9.40386 2.12666 9.5992 2.32201 9.5992 2.56298V2.64479C9.5992 2.88576 9.40386 3.08111 9.16288 3.08111C8.92191 3.08111 8.72656 2.88576 8.72656 2.64479V2.56298ZM9.16288 3.62651C8.92191 3.62651 8.72656 3.82186 8.72656 4.06283V4.14464C8.72656 4.38562 8.92191 4.58096 9.16288 4.58096C9.40386 4.58096 9.5992 4.38562 9.5992 4.14464V4.06283C9.5992 3.82186 9.40386 3.62651 9.16288 3.62651Z"
                    fill={item.color}
                  />
                </Svg>
                <Text style={styles.ticket__text}>
                  {item.quantity_tickets}{" "}
                  {item.quantity_tickets === 1 ? "билет" : "билета"}
                </Text>
              </View>
            ))
          ) : (
              <Text style={styles.ticket__text}>У вас пока нет билетов</Text>
          )}
        </View>
        <View
          style={[
            styles.ticket__button,
            ticketsTitle ? { paddingTop: 20 } : null,
          ]}
        >
          <TouchableOpacity
            onPress={
              ticketsTitle
                ? () => router.push({ pathname: "/secondary/allRaffles" })
                : () => router.push({ pathname: "/secondary/tickets" })
            }
          >
            <LinearGradient
              location={[0.5, 0.5]}
              start={[0.4, -0.9]}
              // end={[  0.1, 0.5 ]}
              colors={
                disabled ? ["#7c7f86", "#5F5F65"] : ["#7434b7", "#7730e5"]
              }
              style={[
                styles.button,
                {
                  width: widthButton,
                  height: height,
                },
                ticketsTitle
                  ? {
                      marginRight: 5,
                    }
                  : { justifyContent: "center", marginVertical: 5 },
              ]}
            >
              <Text style={styles.ticket__text}>{buttonTitle}</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
}
let ticketsWidth2 = WIDTH.width - 180;
let ticketsWidth = WIDTH.width - 30;
let giftsWidthImg = (WIDTH.width - 60) / 3;

const styles = StyleSheet.create({
  container: {},
  tickets: {
    height: 110,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: elemBackgroundColor3,
    borderStyle: "solid",
    borderRadius: 10,
  },
  ticket__title: {
    marginTop: 4,
    fontFamily: FONTS.medium,
    fontSize: 16,
    color: textPrimaryColor,
  },
  ticket__inner: {
    paddingHorizontal: 10,
  },
  ticket__inner2: {
    paddingHorizontal: 15,
  },
  ticket__img: {
    flexDirection: "row",
    columnGap: 5,
    alignItems: "center",
  },
  ticket__text: {
    textAlign: "center",
    fontFamily: FONTS.regular,
    fontSize: 14,
    color: textPrimaryColor,
  },
  ticket__button: {
    paddingHorizontal: 10,
    marginLeft: "auto",
    justifyContent: "center",
  },
  button: {
    borderRadius: 10,
    justifyContent: "center",
  },
});

export default TicketsComponent;
