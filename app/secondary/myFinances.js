import {
  Keyboard,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { FONTS, HEIGHT, WIDTH } from "../../constants/theme";
import HeaderComponent from "../../components/HeaderComponent";
import {
  elemBackgroundColor,
  fuchsia,
  inputBackgroundColor,
  textPrimaryColor,
} from "../../components/ColorsComponent";
import { Image, ImageBackground } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import * as SecureStore from "expo-secure-store";
import Constants from "expo-constants";
import { BlurView } from "expo-blur";
import NewButtonComponent from "../../components/NewButtonComponent";
import { TextInputMask } from "react-native-masked-text";

export default function MyFinances({ disabled }) {
  const [textValue, setTextValue] = useState("Мои финансы");
  const [token, setToken] = useState();
  const [clientData, setClientData] = useState();
  const [cardData, setCardData] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [creditCardNumber, setCreditCardNumber] = useState("");
  const [creditCardCvc, setCreditCardCvc] = useState("");
  const [creditCardDate, setCreditCardDate] = useState("");
  const [isPrimary, setIsPrimary] = useState(false);
  const [creditCardStatus, setCreditCardStatus] = useState();
  const [error, setError] = useState("");
  // console.log("creditCardStatus", creditCardStatus);
  console.log("cardData", cardData);

  const apiBaseUrl = Constants.expoConfig.extra.API_PROD;

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const fetchData = async () => {
    try {
      const userDataStr = await SecureStore.getItemAsync("userData");
      if (userDataStr) {
        const userData = JSON.parse(userDataStr);
        setToken(userData);

        const headers = {
          Authorization: userData.token,
          "Content-Type": "application/json",
        };

        //Client
        const clientResponse = await fetch(`${apiBaseUrl}api/client`, {
          headers,
        });
        if (clientResponse.ok) {
          const clientData = await clientResponse.json();
          setClientData(clientData.client);
          console.log("Данные клиента успешно получены:", clientData.client);
          await SecureStore.setItemAsync(
            "clientData",
            JSON.stringify(clientData)
          );
          if (clientData.client.payment_methods) {
            setCardData(clientData.client.payment_methods);
            setCreditCardStatus(
              clientData.client.payment_methods[0].is_primary
            );
          }
        } else {
          console.error("Ошибка при загрузке данных клиента");
        }
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  const postCardData = async () => {
    try {
      if (creditCardStatus === true) {
        console.log("Основная карта уже установлена");
        setIsPrimary(false);
      } else if (creditCardStatus === undefined || creditCardStatus === false) {
        console.log("Основная карта установлена");
        setIsPrimary(true);
      }

      if (!creditCardNumber || !creditCardCvc || !creditCardDate) {
        console.log("Заполните все поля");
        setError("Заполните все поля!");
        return;
      }

      if (creditCardNumber.length < 16) {
        console.log("Номер карты должен содержать 16 цифр");
        setError("Номер карты должен содержать 16 цифр!");
        return;
      }

      if (creditCardCvc.length < 3) {
        console.log("CVC должен содержать 3 цифры");
        setError("CVC должен содержать 3 цифры!");
        return;
      }

      if (creditCardDate.length < 5) {
        console.log("Дата должна содержать 5 цифр");
        setError("Дата должна содержать 4 цифры!");
        return;
      }

      const cardExists = cardData.some(
        (card) => card.card_number === creditCardNumber
      );
      if (cardExists) {
        console.log("Карта с таким номером уже существует");
        setError("Карта с таким номером уже существует!");
        return;
      } else {
        setError("Карта успешно добавлена!");
      }

      const requestBody = {
        payment_methods: {
          method_type: "card",
          card_number: creditCardNumber,
          expiry_data: creditCardDate,
          cvv: creditCardCvc,
          sbp_phone: "string",
          bik: "string",
          visible: true,
          is_primary: isPrimary,
        },
      };

      const url = `${apiBaseUrl}api/edit_client`;
      const userToken = await SecureStore.getItemAsync("userData");
      const token = userToken && JSON.parse(userToken).token;

      if (!token) {
        console.error("Данные не добавлены: токен не найден.");
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
        console.log("Данные успешно добавлены:", response);
      }
    } catch (error) {
      console.error("Ошибка при обновлении данных:", error.message);
    } finally {
      fetchData();
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
        <View style={styles.container__inner}>
          <HeaderComponent text={textValue} secondary={true} />
          <View style={styles.finance__card}>
            <Text style={styles.text1}>Ваш баланс</Text>
            <View style={styles.finance__card_header}>
              <Image
                contentFit="contain"
                contentPosition={"center"}
                transition={1000}
                source={require("../../assets/icon.svg")}
                width={32}
                height={32}
              />
              <Text style={styles.finance__card_title}>
                {clientData ? clientData.balance : 0} ₽
              </Text>
            </View>
            <View style={styles.finance__card_buttons}>
              <TouchableOpacity>
                <LinearGradient
                  location={[0.5, 0.5]}
                  start={[0.4, -0.9]}
                  end={[0.1, 0.5]}
                  colors={
                    disabled ? ["#7c7f86", "#5F5F65"] : ["#7434b7", "#7730e5"]
                  }
                  style={styles.button}
                >
                  <Text style={styles.button_text}>+ пополнить</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity>
                <LinearGradient
                  location={[0.5, 0.5]}
                  start={[0.4, -0.9]}
                  end={[0.1, 0.5]}
                  colors={
                    disabled ? ["#7c7f86", "#5F5F65"] : ["#7434b7", "#7730e5"]
                  }
                  style={styles.button}
                >
                  <Text style={styles.button_text}>- вывести</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => {}}>
              <Text style={styles.text1}>Транзакции</Text>
            </TouchableOpacity>
            <View style={styles.transactions}>
              <View style={styles.transaction}>
                <Image
                  contentFit="contain"
                  contentPosition={"center"}
                  transition={1000}
                  source={require("../../assets/addition.svg")}
                  width={18}
                  height={18}
                />
                <View style={{ marginRight: "auto", marginLeft: 10 }}>
                  <Text style={styles.text2}>Пополнение</Text>
                  <Text style={styles.text3}>8:30 27 июля</Text>
                </View>
                <Text style={styles.text__balance}>+100₽</Text>
              </View>

              <View style={styles.transaction}>
                <Image
                  contentFit="contain"
                  contentPosition={"center"}
                  transition={1000}
                  source={require("../../assets/conclusion.svg")}
                  width={18}
                  height={18}
                />
                <View style={{ marginRight: "auto", marginLeft: 10 }}>
                  <Text style={styles.text2}>Вывод</Text>
                  <Text style={styles.text3}>8:30 27 июля</Text>
                </View>
                <Text style={styles.text__balance}>-100₽</Text>
              </View>
            </View>
          </View>
          <View style={{ rowGap: 10 }}>
            <Text style={styles.title}>Мои карты</Text>
            <Text style={styles.text2}>для ввода и вывода средств</Text>
          </View>
          <ScrollView horizontal>
            <View style={styles.cards__container}>
              {cardData.length > 0 ? (
                cardData
                  .sort((a, b) =>
                    a.is_primary === b.is_primary ? 0 : a.is_primary ? -1 : 1
                  )
                  .map((item, index) => (
                    <LinearGradient
                      location={[0.1, 1]}
                      start={[1, 1]}
                      end={[0, 0]}
                      colors={[
                        disabled
                          ? "#7c7f86"
                          : "#" +
                            Math.floor(Math.random() * 16777215).toString(16),
                        disabled
                          ? "#5F5F65"
                          : "#" +
                            Math.floor(Math.random() * 16777215).toString(16),
                      ]}
                      // colors={
                      //   disabled ? ["#7c7f86", "#5F5F65"] : ["#7012CF", "#3D4ABA"]
                      // }
                      // colors={
                      //   disabled ? ["#7c7f86", "#5F5F65"] : ["#26329C", "#3D4ABA"]
                      // }
                      // colors={
                      //   disabled ? ["#7c7f86", "#5F5F65"] : ["#D12038", "#DB7784"]
                      // }
                      style={styles.card__container}
                      key={index}
                    >
                      <View style={styles.card__top}>
                        <Image
                          contentFit="contain"
                          contentPosition={"center"}
                          transition={1000}
                          source={require("../../assets/card.svg")}
                          width={20}
                          height={20}
                        />
                        <TouchableOpacity
                          onPress={() => {}}
                          style={styles.closePopup}
                        >
                          <Image
                            contentFit="contain"
                            contentPosition={"center"}
                            transition={1000}
                            source={require("../../assets/close.svg")}
                            width={20}
                            height={20}
                          />
                        </TouchableOpacity>
                      </View>
                      <View style={styles.card__bottom}>
                        <Text style={styles.card__text}>
                          * {item.card_number ? item.card_number.slice(-4) : ""}
                        </Text>
                        <Image
                          contentFit="contain"
                          contentPosition={"center"}
                          transition={1000}
                          source={require("../../assets/mastercard.svg")}
                          width={48}
                          height={30}
                        />
                      </View>
                    </LinearGradient>
                  ))
              ) : (
                <View style={{ marginLeft: 30, marginVertical: 10 }}>
                  <Text style={styles.title}>У вас пока нет карт</Text>
                </View>
              )}
              {/* <LinearGradient
                location={[0.1, 1]}
                start={[1, 1]}
                end={[0, 0]}
                colors={
                  disabled ? ["#7c7f86", "#5F5F65"] : ["#26329C", "#3D4ABA"]
                }
                style={styles.card__container}
              >
                <View style={styles.card__top}>
                  <Image
                    contentFit="contain"
                    contentPosition={"center"}
                    transition={1000}
                    source={require("../../assets/card.svg")}
                    width={20}
                    height={20}
                  />
                  <TouchableOpacity
                    onPress={() => {}}
                    style={styles.closePopup}
                  >
                    <Image
                      contentFit="contain"
                      contentPosition={"center"}
                      transition={1000}
                      source={require("../../assets/close.svg")}
                      width={20}
                      height={20}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.card__bottom}>
                  <Text style={styles.card__text}>* 1695</Text>
                  <Image
                    contentFit="contain"
                    contentPosition={"center"}
                    transition={1000}
                    source={require("../../assets/mastercard.svg")}
                    width={48}
                    height={30}
                  />
                </View>
              </LinearGradient>
              <LinearGradient
                location={[0.1, 1]}
                start={[1, 1]}
                end={[0, 0]}
                colors={
                  disabled ? ["#7c7f86", "#5F5F65"] : ["#D12038", "#DB7784"]
                }
                style={styles.card__container}
              >
                <View style={styles.card__top}>
                  <Image
                    contentFit="contain"
                    contentPosition={"center"}
                    transition={1000}
                    source={require("../../assets/card.svg")}
                    width={20}
                    height={20}
                  />
                  <TouchableOpacity
                    onPress={() => {}}
                    style={styles.closePopup}
                  >
                    <Image
                      contentFit="contain"
                      contentPosition={"center"}
                      transition={1000}
                      source={require("../../assets/close.svg")}
                      width={20}
                      height={20}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.card__bottom}>
                  <Text style={styles.card__text}>* 1695</Text>
                  <Image
                    contentFit="contain"
                    contentPosition={"center"}
                    transition={1000}
                    source={require("../../assets/mastercard.svg")}
                    width={48}
                    height={30}
                  />
                </View>
              </LinearGradient> */}
            </View>
          </ScrollView>
          <TouchableOpacity onPress={() => toggleModal()}>
            <View style={styles.newCardAdd__container}>
              <View style={styles.newCardAdd__inner}>
                <Text style={styles.newCardAdd__plus}>+</Text>
              </View>
              <Text style={styles.newCardAdd__text}>Новая карта</Text>
            </View>
          </TouchableOpacity>
        </View>
        {isModalVisible && (
          <Modal
            animationType="fade"
            isVisible={isModalVisible}
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
              <View style={styles.modal__container}>
                <TouchableOpacity onPress={() => toggleModal() || setError("")}>
                  <Image
                    contentFit="contain"
                    contentPosition={"center"}
                    transition={1000}
                    source={require("../../assets/close.svg")}
                    width={40}
                    height={40}
                    style={styles.close__modal}
                  />
                </TouchableOpacity>
                <Text style={styles.modal__text}>Добавление карты</Text>
                <View style={styles.modal__inputs__container}>
                  {error && <Text style={styles.modal__error}>{error}</Text>}
                  <View style={styles.innut__wrap_top}>
                    <Image
                      contentFit="contain"
                      contentPosition={"center"}
                      transition={1000}
                      source={require("../../assets/card.svg")}
                      width={20}
                      height={20}
                    />
                    <TextInputMask
                      style={[styles.input, { minWidth: "100%" }]}
                      placeholder="Номер карты"
                      placeholderTextColor={textPrimaryColor}
                      keyboardType="numeric"
                      type={"custom"}
                      options={{
                        obfuscated: false,
                        mask: "9999 9999 9999 9999",
                      }}
                      maxLength={19}
                      value={creditCardNumber}
                      onChangeText={setCreditCardNumber}
                    />
                  </View>
                  <View style={styles.innut__wrap_bottom}>
                    <View style={styles.input__wrap}>
                      <TextInputMask
                        style={styles.input}
                        keyboardType="numeric"
                        type={"datetime"}
                        options={{ format: "MM/YY" }}
                        placeholder="ММ/ГГ"
                        maxLength={5}
                        placeholderTextColor={textPrimaryColor}
                        value={creditCardDate}
                        onChangeText={setCreditCardDate}
                      />
                    </View>
                    <View
                      style={[
                        styles.input__wrap,
                        { flex: 100, flexDirection: "row" },
                      ]}
                    >
                      <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        placeholder="CVC"
                        maxLength={3}
                        placeholderTextColor={textPrimaryColor}
                        value={creditCardCvc}
                        onChangeText={setCreditCardCvc}
                        secureTextEntry={true}
                        onFocus={Keyboard.isVisible}
                      />
                      <Image
                        contentFit="contain"
                        contentPosition={"center"}
                        transition={1000}
                        source={require("../../assets/tooltip.svg")}
                        width={20}
                        height={20}
                      />
                    </View>
                  </View>
                </View>
                <NewButtonComponent
                  title={"Добавить карту"}
                  filled={true}
                  height={60}
                  fontSize={19}
                  onPress={postCardData || setError("")}
                />
              </View>
            </BlurView>
          </Modal>
        )}
      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {},
  container__view: {
    minHeight: HEIGHT.height,
  },
  container__inner: {
    marginHorizontal: 15,
  },
  finance__card: {
    marginTop: 15,
    backgroundColor: elemBackgroundColor,
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginBottom: 20,
  },
  finance__card_header: {
    columnGap: 15,
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "center",
    marginVertical: 20,
  },
  finance__card_title: {
    color: textPrimaryColor,
    fontFamily: FONTS.medium,
    fontSize: 32,
    lineHeight: 32,
  },
  finance__card_buttons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    columnGap: 15,
    marginBottom: 15,
  },
  button: {
    width: (WIDTH.width - 80) / 2,
    backgroundColor: elemBackgroundColor,
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderRadius: 12,
  },
  button_text: {
    color: textPrimaryColor,
    fontFamily: FONTS.medium,
    fontSize: 14,
    lineHeight: 16,
    textAlign: "center",
  },
  text1: {
    color: textPrimaryColor,
    fontFamily: FONTS.medium,
    fontSize: 16,
    lineHeight: 24,
  },
  text2: {
    color: textPrimaryColor,
    fontFamily: FONTS.medium,
    fontSize: 14,
    lineHeight: 16,
  },
  text3: {
    color: textPrimaryColor,
    fontFamily: FONTS.regular,
    fontSize: 12,
    lineHeight: 24,
  },
  transactions: {
    marginTop: 15,
    rowGap: 15,
  },
  transaction: {
    flexDirection: "row",
    // alignItems: "center",
  },
  text__balance: {
    color: textPrimaryColor,
    fontFamily: FONTS.medium,
    fontSize: 14,
    lineHeight: 16,
  },
  title: {
    color: textPrimaryColor,
    fontFamily: FONTS.medium,
    fontSize: 24,
    lineHeight: 24,
  },
  newCardAdd__container: {
    width: WIDTH.width - 30,
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderWidth: 1,
    borderColor: "#9A95B2",
    borderStyle: "solid",
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    columnGap: 10,
  },
  newCardAdd__inner: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    backgroundColor: elemBackgroundColor,
    borderRadius: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  newCardAdd__plus: {
    color: fuchsia,
    fontFamily: FONTS.light,
    fontSize: 24,
    lineHeight: 24,
  },
  newCardAdd__text: {
    textAlign: "center",
    alignItems: "center",
    fontFamily: FONTS.medium,
    fontSize: 18,
    color: textPrimaryColor,
  },
  cards__container: {
    flexDirection: "row",
    columnGap: 10,
    marginTop: 20,
    marginBottom: 25,
  },
  card__container: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 12,
    minWidth: 140,
  },
  card__top: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 35,
  },
  card__bottom: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    columnGap: 20,
  },
  card__text: {
    color: textPrimaryColor,
    fontFamily: FONTS.regular,
    fontSize: 20,
    lineHeight: 20,
    marginRight: "auto",
  },
  closePopup: {
    position: "absolute",
    top: -4,
    right: -4,
    // alignItems: "flex-end",
  },
  containerBlur: {
    flex: 1,
    height: HEIGHT.height,
    justifyContent: "center",
    alignItems: "center",
  },
  modal__container: {
    // width: WIDTH.width,
    marginHorizontal: 30,
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: elemBackgroundColor,
    borderRadius: 12,
    paddingBottom: 20,
  },
  close__modal: {
    position: "absolute",
    right: -10,
    top: -5,
  },
  modal__text: {
    marginTop: 45,
    color: textPrimaryColor,
    fontFamily: FONTS.medium,
    fontSize: 24,
    lineHeight: 24,
    textAlign: "center",
    marginBottom: 25,
  },
  modal__inputs__container: {
    rowGap: 20,
    marginBottom: 20,
  },
  innut__wrap_top: {
    flexDirection: "row",
    columnGap: 10,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: inputBackgroundColor,
    borderRadius: 100,
  },
  innut__wrap_bottom: {
    flexDirection: "row",
    columnGap: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  input__wrap: {
    flex: 170,
    columnGap: 10,
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: inputBackgroundColor,
    borderRadius: 100,
  },
  input: {
    minWidth: 50,
    fontFamily: FONTS.regular,
    color: textPrimaryColor,
    fontSize: 20,
    lineHeight: 20,
  },
  modal__error: {
    textAlign: "center",
    color: "red",
    fontFamily: FONTS.regular,
    fontSize: 14,
    lineHeight: 14,
  },
});
