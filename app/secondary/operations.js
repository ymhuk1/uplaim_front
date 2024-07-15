import {
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { FONTS, HEIGHT } from "../../constants/theme";
import HeaderComponent from "../../components/HeaderComponent";
import { textPrimaryColor } from "../../components/ColorsComponent";
import NewTagComponent from "../../components/NewTagComponent";
import { ImageBackground, Image } from "expo-image";
import Constants from "expo-constants";
import * as SecureStore from "expo-secure-store";
import { BlurView } from "expo-blur";

export default function Operations() {
  const [textValue, setTextValue] = useState("Операции");
  const [availableTags, setAvailableTags] = useState("Тип операции");
  const [periodTags, setPeriodTags] = useState("Выбрать период");
  const [token, setToken] = useState(null);
  const [clientData, setClientData] = useState(null);
  const [transactions, setTransactions] = useState({});
  const [modalVisible, setModalVisible] = useState(false);

  const apiBaseUrl = Constants.expoConfig.extra.API_PROD;

  const handleModal = () => {
    setModalVisible(!modalVisible);
  };

  const transactionsResponse = async (id) => {
    const userDataStr = await SecureStore.getItemAsync("userData");
    try {
      if (userDataStr) {
        const userData = JSON.parse(userDataStr);
        setToken(userData);
        const headers = {
          Authorization: userData.token,
          "Content-Type": "application/json",
        };
        const response = await fetch(
          `${apiBaseUrl}api/transactions?client_id=${id}&balls=1&cash=1&up=1`
        );
        if (response.ok) {
          const data = await response.json();
          // console.log("Операции успешно получены:", data);
          setTransactions(data);
        } else {
          console.error("Ошибка при загрузке данных операции");
        }
      }
    } catch (error) {
      console.error("Ошибка при получении данных операции:", error.message);
    }
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
          transactionsResponse(id);
          await SecureStore.setItemAsync(
            "clientData",
            JSON.stringify(clientData)
          );

          // console.log("clientData", clientData.client.transactions);
          setClientData(clientData.client);
        } else {
          console.error("Ошибка при загрузке данных клиента");
        }
      }
    } catch (error) {
      console.error("Ошибка при получении данных клиента:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <ImageBackground
        source={require("../../assets/background.png")}
        style={styles.container__view}
      >
        <View style={styles.container__operations}>
          <HeaderComponent text={textValue} secondary={true} />
          <View
            style={{
              flexDirection: "row",
              marginTop: 20,
              marginLeft: 15,
              marginBottom: 10,
              columnGap: 20,
            }}
          >
            <TouchableOpacity
              onPress={() => handleModal()}
              style={styles.button__tag}
            >
              {/* <NewTagComponent
                tag={availableTags}
                valueOnChange={(selectedValue) => (
                  selectedValue, "availableTags"
                )}
              /> */}
              <Text style={styles.text__tag}>{availableTags}</Text>
            </TouchableOpacity>
            <NewTagComponent
              tag={periodTags}
              valueOnChange={(selectedValue) => (
                selectedValue, "availableTags"
              )}
            />
          </View>
          {transactions.length > 0 &&
            clientData.transactions.map((item, index) => (
              <View style={styles.block} key={index}>
                <Image
                  contentFit="contain"
                  contentPosition={"center"}
                  transition={1000}
                  source={require("../../assets/gifts/fitness.svg")}
                  width={33}
                  height={33}
                  style={{ borderRadius: 10 }}
                />
                <View style={{ marginRight: "auto" }}>
                  <Text style={styles.text__title}>
                    {item.transaction_type === "deposit"
                      ? "Зачисление денег"
                      : "начисление баллов"}
                    {/* {clientData.companies[0].name} */}
                  </Text>
                  <Text style={styles.text__description}>
                    Выполнение задания
                  </Text>
                </View>
                <View style={[styles.block, { columnGap: 5 }]}>
                  <Text style={styles.text__balls}>{item.balance}</Text>
                  <Text style={styles.text__description}>₽</Text>
                </View>
              </View>
            ))}
          {/* <View>
            <Text style={styles.title}>Сегодня</Text>
            <View style={styles.block}>
              <Image
                contentFit="contain"
                contentPosition={"center"}
                transition={1000}
                source={require("../../assets/gifts/fitness.svg")}
                width={33}
                height={33}
                style={{ borderRadius: 10 }}
              />
              <View style={{ marginRight: "auto" }}>
                <Text style={styles.text__title}>Фитнес-центр</Text>
                <Text style={styles.text__description}>начисление баллов</Text>
              </View>
              <View style={[styles.block, { columnGap: 5 }]}>
                <Image
                  contentFit="contain"
                  contentPosition={"center"}
                  transition={1000}
                  source={require("../../assets/ellipse.svg")}
                  width={12}
                  height={12}
                />
                <Text style={styles.text__balls}>300</Text>
                <Text style={styles.text__description}>баллов</Text>
              </View>
            </View>
            <View style={styles.block}>
              <Image
                contentFit="contain"
                contentPosition={"center"}
                transition={1000}
                source={require("../../assets/gifts/fitness.svg")}
                width={33}
                height={33}
                style={{ borderRadius: 10 }}
              />
              <View style={{ marginRight: "auto" }}>
                <Text style={styles.text__title}>Фитнес-центр</Text>
                <Text style={styles.text__description}>списание баллов</Text>
              </View>
              <View style={[styles.block, { columnGap: 5 }]}>
                <Image
                  contentFit="contain"
                  contentPosition={"center"}
                  transition={1000}
                  source={require("../../assets/ellipse.svg")}
                  width={12}
                  height={12}
                />
                <Text style={styles.text__balls}>300</Text>
                <Text style={styles.text__description}>баллов</Text>
              </View>
            </View>
            <View style={styles.block}>
              <Image
                contentFit="contain"
                contentPosition={"center"}
                transition={1000}
                source={require("../../assets/gifts/fitness.svg")}
                width={33}
                height={33}
                style={{ borderRadius: 10 }}
              />
              <View style={{ marginRight: "auto" }}>
                <Text style={styles.text__title}>Зачисление денег</Text>
                <Text style={styles.text__description}>
                  доход от реферальной прораммы
                </Text>
              </View>
              <View style={[styles.block, { columnGap: 5 }]}>
                <Text style={styles.text__balls}>125,25</Text>
                <Text style={styles.text__description}>₽</Text>
              </View>
            </View>
            <View style={styles.block}>
              <Image
                contentFit="contain"
                contentPosition={"center"}
                transition={1000}
                source={require("../../assets/gifts/fitness.svg")}
                width={33}
                height={33}
                style={{ borderRadius: 10 }}
              />
              <View
                style={{
                  marginRight: "auto",
                }}
              >
                <Text style={styles.text__title}>Зачисление</Text>
                <Text style={styles.text__description}>выполнение задания</Text>
              </View>
              <View style={[styles.block, { columnGap: 5 }]}>
                <Text style={styles.text__balls}>300</Text>
                <Image
                  height={10}
                  width={15}
                  transition={1000}
                  source={require("../../assets/up.svg")}
                />
              </View>
            </View>
            <Text style={styles.title}>7 августа</Text>
            <View style={styles.block}>
              <Image
                contentFit="contain"
                contentPosition={"center"}
                transition={1000}
                source={require("../../assets/gifts/fitness.svg")}
                width={33}
                height={33}
                style={{ borderRadius: 10 }}
              />
              <View style={{ marginRight: "auto" }}>
                <Text style={styles.text__title}>Фитнес-центр</Text>
                <Text style={styles.text__description}>начисление баллов</Text>
              </View>
              <View style={[styles.block, { columnGap: 5 }]}>
                <Image
                  contentFit="contain"
                  contentPosition={"center"}
                  transition={1000}
                  source={require("../../assets/ellipse.svg")}
                  width={12}
                  height={12}
                />
                <Text style={styles.text__balls}>300</Text>
                <Text style={styles.text__description}>баллов</Text>
              </View>
            </View>
            <Text style={styles.title}>3 августа</Text>
            <View style={styles.block}>
              <Image
                contentFit="contain"
                contentPosition={"center"}
                transition={1000}
                source={require("../../assets/gifts/fitness.svg")}
                width={33}
                height={33}
                style={{ borderRadius: 10 }}
              />
              <View style={{ marginRight: "auto" }}>
                <Text style={styles.text__title}>Фитнес-центр</Text>
                <Text style={styles.text__description}>начисление баллов</Text>
              </View>
              <View style={[styles.block, { columnGap: 5 }]}>
                <Image
                  contentFit="contain"
                  contentPosition={"center"}
                  transition={1000}
                  source={require("../../assets/ellipse.svg")}
                  width={12}
                  height={12}
                />
                <Text style={styles.text__balls}>300</Text>
                <Text style={styles.text__description}>баллов</Text>
              </View>
            </View>
            <View style={styles.block}>
              <Image
                contentFit="contain"
                contentPosition={"center"}
                transition={1000}
                source={require("../../assets/gifts/fitness.svg")}
                width={33}
                height={33}
                style={{ borderRadius: 10 }}
              />
              <View style={{ marginRight: "auto" }}>
                <Text style={styles.text__title}>Списание денег</Text>
                <Text style={styles.text__description}>оплата тарифа PRO</Text>
              </View>
              <View style={[styles.block, { columnGap: 5 }]}>
                <Text style={styles.text__balls}>-169</Text>
                <Text style={styles.text__description}>₽</Text>
              </View>
            </View>
          </View> */}
          {modalVisible && (
            <Modal
              animationType="fade"
              isVisible={modalVisible}
              transparent={true}
              style={styles.modal}
            >
              <BlurView
                tint="dark"
                intensity={40}
                blurReductionFactor={10}
                experimentalBlurMethod={"dimezisBlurView"}
                style={styles.containerBlur}
              >
                <StatusBar barStyle="light-content" backgroundColor="#121123" />
                <View style={styles.modalContent}>
                  <TouchableOpacity
                    onPress={() => setModalVisible(false)}
                    style={styles.closePopup}
                  >
                    <Image
                      contentFit="contain"
                      contentPosition={"center"}
                      transition={1000}
                      source={require("../../assets/close.svg")}
                      width={40}
                      height={40}
                    />
                  </TouchableOpacity>
                  <Text style={styles.modalText}>Тип операции</Text>
                  <View style={styles.citysContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => {}}>
                      <Text style={styles.cityText}>Баллы</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => {}}>
                      <Text style={styles.cityText}>Деньги</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => {}}>
                      <Text style={styles.cityText}>UP</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </BlurView>
            </Modal>
          )}
        </View>
      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container__view: {
    minHeight: HEIGHT.height,
  },
  container__operations: {
    marginHorizontal: 15,
  },
  title: {
    color: textPrimaryColor,
    fontFamily: FONTS.medium,
    fontSize: 16,
    lineHeight: 24,
    marginTop: 10,
    marginLeft: 15,
    marginBottom: 9,
  },
  text__title: {
    color: textPrimaryColor,
    fontFamily: FONTS.medium,
    fontSize: 14,
    lineHeight: 16,
  },
  text__description: {
    color: textPrimaryColor,
    fontFamily: FONTS.regular,
    fontSize: 12,
    lineHeight: 14,
  },
  text__balls: {
    color: textPrimaryColor,
    fontFamily: FONTS.medium,
    fontSize: 18,
    lineHeight: 20,
  },
  block: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
    marginBottom: 10,
    // marginTop: 10,
  },
  modal: {},
  modalContent: {
    position: "absolute",
    width: "100%",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    // height: 300,
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "#121123",
    bottom: 0,
  },
  modalText: {
    fontFamily: FONTS.medium,
    fontSize: 18,
    lineHeight: 20,
    color: textPrimaryColor,
  },
  citysContainer: {
    rowGap: 20,
    marginVertical: 20,
  },
  cityText: {
    fontFamily: FONTS.regular,
    fontSize: 16,
    lineHeight: 20,
    color: "white",
    marginLeft: 12,
  },
  closePopup: {
    alignItems: "flex-end",
  },
  containerBlur: {
    flex: 1,
    height: HEIGHT.height,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  button__tag: {
    // alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#343148",
    height: 28,
    // paddingVertical: 2,
    paddingHorizontal: 10,
    borderRadius: 4,
  },
  text__tag: {
    color: "#9A95B2",
    fontFamily: FONTS.regular,
    fontSize: 14,
    lineHeight: 14,
    backgroundColor: "#343148",
  },
});
