import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  RefreshControl,
} from "react-native";
import { Image, ImageBackground } from "expo-image";

import QRCodeComponent from "../../components/QRCodeComponent";
import SliderComponent from "../../components/SliderComponent";
import * as SecureStore from "expo-secure-store";
import { textPrimaryColor } from "../../components/ColorsComponent";
import { FONTS, HEIGHT } from "../../constants/theme";
import Constants from "expo-constants";

const apiBaseUrl = Constants.expoConfig.extra.API_PROD;

export default function Qrcode() {
  const [refreshing, setRefreshing] = useState(false);
  const [myCompanies, setMyCompanies] = useState({});
  const [token, setToken] = useState(null);

  const itemsPerSlide1 = 4;
  const itemHeight1 = 265;
  let slideHeight1 = 550;
  const groupedData1 = [];

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

        // My companies
        const myCompaniesResponse = await fetch(
          `${apiBaseUrl}api/my_companies`,
          { headers }
        );
        if (myCompaniesResponse.ok) {
          const myCompaniesData = await myCompaniesResponse.json();
          setMyCompanies(myCompaniesData);
        } else {
          console.error("Ошибка при загрузке данных моих компаний");
        }
      }
    } catch (error) {
      console.error("Ошибка при получении запроса:", error);
    } finally {
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  useEffect(() => {
    setRefreshing(true);
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
      <ImageBackground
        source={require("../../assets/background.png")}
        contentFit={"cover"}
      >
        <View style={styles.containerView}>
          <View style={styles.textContainerHead}>
            <Text style={styles.textHead}>Мой QR-код</Text>
          </View>
          <View style={styles.codeContainer}>
            <QRCodeComponent
              data="532 783"
              size={280}
              logoSize={88}
              style={styles.codeStyle}
            />
          </View>
          <View style={styles.textContainer2}>
            <Image
              contentFit="contain"
              contentPosition="center"
              source={require("../../assets/briefcase.svg")}
              width={24}
              height={24}
            />
            <Text style={styles.text2}>Мои компании</Text>
          </View>
          {myCompanies.length > 0 ? (
            <SliderComponent
              qrcode={true}
              data={groupedData1}
              itemsPerSlide={itemsPerSlide1}
              itemHeight={itemHeight1}
              slideHeight={slideHeight1}
            />
          ) : (
            <View
              style={{ marginTop: 10, marginBottom: 25, alignItems: "center" }}
            >
              <Text style={styles.text}>Вы пока не добавили компании</Text>
            </View>
          )}
          <View style={styles.textContainer2}>
            <Image
              contentFit="contain"
              contentPosition="center"
              source={require("../../assets/coins.svg")}
              width={24}
              height={24}
            />
            <Text style={styles.text2}>Неактивные баллы</Text>
          </View>
          {myCompanies.length > 0 ? (
            <SliderComponent
              qrcode={true}
              hide={true}
              data={groupedData1}
              itemsPerSlide={itemsPerSlide1}
              itemHeight={itemHeight1}
              slideHeight={slideHeight1}
            />
          ) : (
            <View
              style={{ marginTop: 10, marginBottom: 25, alignItems: "center" }}
            >
              <Text style={styles.text}>У вас нет неактивных баллов</Text>
            </View>
          )}
        </View>
      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {},
  containerView: {
    minHeight: HEIGHT.height,
    marginHorizontal: 15,
    // marginBottom: 80,
    marginTop: 60,
  },
  textContainerHead: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  textHead: {
    fontSize: 24,
    lineHeight: 24,
    fontFamily: FONTS.medium,
    color: textPrimaryColor,
    marginLeft: 7,
  },
  codeContainer: {
    alignItems: "center",
    paddingTop: 40,
    backgroundColor: "#24224A",
    borderRadius: 12,
    justifyContent: "center",
    marginBottom: 30,
  },
  textContainer: {
    paddingTop: 300,
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    color: "white",
  },
  textContainer2: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  text2: {
    fontSize: 24,
    lineHeight: 24,
    fontFamily: FONTS.medium,
    color: "white",
    marginLeft: 7,
  },
  codeStyle: {
    marginTop: 40,
  },
});
