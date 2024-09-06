import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { FONTS, HEIGHT } from "../../constants/theme";
import {
  elemBackgroundColor,
  textColor4,
  textPrimaryColor,
} from "../../components/ColorsComponent";
import HeaderComponent from "../../components/HeaderComponent";
import { Image } from "expo-image";
import ActivatesModalComponent from "../../components/ActivatesModalComponent";
import Constants from "expo-constants";
import { Path, Svg } from "react-native-svg";
import * as SecureStore from "expo-secure-store";

const apiBaseUrl = Constants.expoConfig.extra.API_PROD;

export default function AllRaffles() {
  const [textValue, setTextValue] = useState("Все розыгрыши");
  const [isModalVisible, setModalVisible] = useState(false);
  const [competitions, setCompetitions] = useState([]);
  const [currentBalance, setCurrentBalance] = useState();
  const [loading, setLoading] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const fetchCompetitions = async (id) => {
    try {
      const response = await fetch(
        `${apiBaseUrl}api/competitions?client_id=${id}`
      );
      if (!response.ok) {
        throw new Error(
          `Ошибка при загрузке данных конкурсов: ${response.statusText}`
        );
      }
      const data = await response.json();
      console.log("Данные Competitions успешно получены:", data);
      setCompetitions(data);
      setLoading(true);
    } catch (error) {
      console.error("Произошла ошибка при получении данных:", error);
    }
  };

  useEffect(() => {
    const fetchDataAsync = async () => {
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
          if (!clientResponse.ok) {
            throw new Error("Ошибка при загрузке данных клиента");
          }
          const clientData = await clientResponse.json();
          fetchCompetitions(clientData.client.id);
        }
        setLoading(true);
      } catch (error) {
        console.error("Произошла ошибка при получении данных:", error);
      }
    };
    fetchDataAsync();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.container__rafles}>
        <HeaderComponent text={textValue} secondary={true} />
        <View style={styles.currentGifts}>
          {competitions.map((item, index) => (
            <View
              key={index}
              style={[styles.currentGifts__inner, { borderColor: item.color }]}
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
                <Text style={styles.currentGifts__text_title}>{item.name}</Text>
                <Text style={styles.text_date}>Розыгрыш {item.date_end}</Text>
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
                    {item.prizes.length === 0 ? 0 : item.prizes.length} призов
                  </Text>
                </View>
              </View>
              <View style={styles.currentGifts__button}>
                <TouchableOpacity
                  onPress={() => {
                    toggleModal();
                    setCurrentBalance(item);
                  }}
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
                  Активных билетов: {item.current_client_active_tickets}
                </Text>
              </View>
            </View>
          ))}
        </View>
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: elemBackgroundColor,
    height: HEIGHT.height,
  },
  container__rafles: {
    minHeight: HEIGHT.height,
    paddingHorizontal: 15,
  },
  currentGifts: {
    marginBottom: 5,
  },
  currentGifts__inner: {
    flexDirection: "row",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderWidth: 2,
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 10,
  },
  currentGifts__img: {
    borderWidth: 1,
    borderColor: textColor4,
    borderRadius: 8,
  },
  currentGifts__text_title: {
    fontFamily: FONTS.medium,
    fontSize: 16,
    color: textPrimaryColor,
  },
  currentGifts__text: {
    alignItems: "start",
    justifyContent: "center",
    marginLeft: 8,
    marginRight: "auto",
  },
  text_date: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: textColor4,
  },
  currentGifts__text_prizes: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: textPrimaryColor,
    alignSelf: "flex-end",
    justifyContent: "center",
  },
  currentGifts__button: {
    alignItems: "flex-end",
    marginRight: 4,
  },
  currentGifts__button_text: {
    width: 94,
    fontFamily: FONTS.regular,
    textAlign: "center",
    fontSize: 12,
    color: textPrimaryColor,
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderRadius: 7,
    marginBottom: 4,
  },
  currentGifts__button_ticket: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: textPrimaryColor,
  },
});
