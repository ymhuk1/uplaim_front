import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StatusBar, Modal } from "react-native";
import { Image } from "expo-image";
import NewButtonComponent from "./NewButtonComponent";
import styles from "../styles/feedbackComponentStyle";
import FeedbackInput from "./feedbackInputComponent";
import { AirbnbRating } from "react-native-ratings";
import Constants from "expo-constants";
import * as SecureStore from "expo-secure-store";
import { useGlobalSearchParams } from "expo-router";
import { BlurView } from "expo-blur";
import { elemBackgroundColor3 } from "./ColorsComponent";

const apiBaseUrl = Constants.expoConfig.extra.API_PROD;

const FeedbackComponent = ({
  onClose,
  height,
  headerPopup1,
  headerPopup2,
  modal,
}) => {
  const { id } = useGlobalSearchParams();

  const [rating, setRating] = useState(0);
  const [advantages, setAdvantages] = useState("");
  const [disadvantages, setDisadvantages] = useState("");
  const [comment, setComment] = useState("");
  const [clientData, setClientData] = useState({});
  const [company, setCompany] = useState({});
  const [error, setError] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const companyId = id;

  const postReview = async () => {
    try {
      if (!clientData.id || !company.id) {
        console.error(
          "Отзыв не может быть добавлен: не загружены данные о клиенте или компании."
        );
        return;
      }

      if (!rating) {
        setError("Отзыв не может быть добавлен: не указана оценка.");
        return;
      } else {
        setError("Вы уже оставили отзыв об этой компании");
      }

      const requestBody = {
        client_id: clientData.id,
        company_id: company.id,
        rating,
        advantages,
        disadvantages,
        comment,
      };

      const url = `${apiBaseUrl}api/create_review`;
      const userToken = await SecureStore.getItemAsync("userData");
      const token = userToken && JSON.parse(userToken).token;

      if (!token) {
        console.error("Отзыв не может быть добавлен: токен не найден.");
        return;
      }

      const config = {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: token },
      };
      const response = await fetch(url, {
        ...config,
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        console.log("Отзыв успешно добавлен!");
        onClose();
      }
    } catch (error) {
      console.error("Ошибка при выполнении отзыва:", error);
    }
  };

  const fetchData = async () => {
    try {
      const userData = await SecureStore.getItemAsync("userData");
      if (!userData)
        throw new Error(
          "Не удалось получить данные: Пользовательские данные не найдены"
        );

      const token = JSON.parse(userData)?.token;
      if (!token)
        throw new Error("Не удалось получить данные: токен не найден");

      const urls = {
        company: `${apiBaseUrl}api/companies/${companyId}`,
        client: `${apiBaseUrl}api/client`,
      };

      const responses = await Promise.all(
        Object.entries(urls).map(async ([key, url]) => {
          const res = await fetch(url, { headers: { Authorization: token } });
          if (!res.ok) throw new Error(`Не удалось получить ${key} данные`);
          const data = await res.json();
          return { [key]: data };
        })
      );

      const { company, client } = responses.reduce(
        (acc, curr) => ({ ...acc, ...curr }),
        {}
      );
      setCompany(company?.company || null);
      setClientData(client?.client || null);
    } catch (error) {
      console.error("Не удалось получить данные:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
    setModalVisible(modal);
  }, []);

  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible}>
      <BlurView
        tint="dark"
        intensity={40}
        blurReductionFactor={10}
        experimentalBlurMethod={"dimezisBlurView"}
        style={styles.container}
      >
        <StatusBar
          barStyle="light-content"
          backgroundColor={elemBackgroundColor3}
          translucent={true}
        />
        <View style={styles.popupContainer}>
          <Text style={styles.headerPopup}>{headerPopup1}</Text>
          <View style={styles.rating}>
            <AirbnbRating
              showRating={false}
              rating={rating}
              setRating={setRating}
              defaultRating={0}
              selectedColor="#F456FE"
              unSelectedColor="#9A95B2"
              size={27.5}
              onFinishRating={(rating) => setRating(rating)}
              error={error}
            />
            <Text
              style={{
                color: "red",
                fontSize: 12,
              }}
            >
              {error}
            </Text>
          </View>
          <Text style={styles.headerPopup}>{headerPopup2}</Text>

          <View style={styles.textPopupContainer}>
            <View style={styles.textPopup}>
              <FeedbackInput
                placeholder="Преимущества"
                value={advantages}
                onChangeText={setAdvantages}
              />
            </View>
            <View style={styles.textPopup}>
              <FeedbackInput
                placeholder="Недостатки"
                value={disadvantages}
                onChangeText={setDisadvantages}
              />
            </View>
            <View style={styles.textPopup2}>
              <FeedbackInput
                placeholder="Комментарий"
                value={comment}
                onChangeText={setComment}
              />
            </View>
          </View>
          <TouchableOpacity onPress={onClose} style={styles.closePopup}>
            <Image
              contentFit="contain"
              contentPosition={"center"}
              transition={1000}
              source={require("../assets/close.svg")}
              width={36}
              height={36}
            />
          </TouchableOpacity>
          <View style={styles.button}>
            <NewButtonComponent
              title={"Оставить отзыв"}
              filled={true}
              height={54}
              fontSize={24}
              onPress={postReview}
            />
          </View>
        </View>
      </BlurView>
    </Modal>
  );
};

export default FeedbackComponent;
