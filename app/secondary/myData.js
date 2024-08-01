import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableOpacity,
  Modal,
  StatusBar,
  TextInput,
  ScrollView,
  // Picker,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Image, ImageBackground } from "expo-image";
import { FONTS, HEIGHT, WIDTH } from "../../constants/theme";
import HeaderComponent from "../../components/HeaderComponent";
import {
  elemBackgroundColor,
  elemBackgroundColor2,
  elemBackgroundColor3,
  fuchsia,
  inputBackgroundColor,
  textDisabledColor,
  textPrimaryColor,
} from "../../components/ColorsComponent";
import Icon from "react-native-vector-icons/MaterialIcons";
import { BlurView } from "expo-blur";
import NewButtonComponent from "../../components/NewButtonComponent";
import { TextInputMask } from "react-native-masked-text";
import * as SecureStore from "expo-secure-store";
import Constants from "expo-constants";

const apiBaseUrl = Constants.expoConfig.extra.API_PROD;

export default function MyData() {
  const [textValue, setTextValue] = useState("Мои данные");
  const [photoModalVisible, setPhotoModalVisible] = useState(false);
  const [nameModalVisible, setNameModalVisible] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [token, setToken] = useState({});
  const [clientData, setClientData] = useState({});
  console.log("clientData", clientData);

  const togglePhotoModal = () => {
    setPhotoModalVisible(!photoModalVisible);
  };

  const toggleNameModal = () => {
    setNameModalVisible(!nameModalVisible);
  };

  const postMyData = async () => {
    try {
      const requestBody = {
        name: name,
        last_name: lastName,
        phone: phoneNumber,
        email: email,
        date_of_birth: birthDay,
        gender: gender,
      };

      const url = `${apiBaseUrl}api/edit_client`;
      const userToken = await SecureStore.getItemAsync("userData");
      const token = userToken && JSON.parse(userToken).token;

      if (!token) {
        console.error("Город не может быть добавлен: токен не найден.");
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

  const fetchData = async () => {
    try {
      const userToken = await SecureStore.getItemAsync("userData");
      const token = userToken ? JSON.parse(userToken).token : null;

      if (!token) {
        console.error("Токен не найден.");
        return;
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
        // console.log("Данные клиента успешно получены:", client);
        setClientData(client);
      } else {
        console.error(
          "Ошибка при загрузке данных клиента:",
          clientResponse.status
        );
      }
    } catch (error) {
      console.error("Ошибка при получении данных клиента:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ImageBackground
      source={require("../../assets/background.png")}
      style={styles.container__view}
    >
      <View style={styles.container}>
        <HeaderComponent text={textValue} secondary={true} />
        <View style={styles.header__container}>
          <TouchableOpacity onPress={togglePhotoModal}>
            <Image
              contentFit="contain"
              contentPosition="center"
              transition={500}
              source={require("../../assets/no_photo.svg")}
              width={60}
              height={60}
            />
          </TouchableOpacity>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View style={styles.header__text_container}>
              <Text style={styles.text_light}>ФИО</Text>
              <Text style={styles.text_medium}>
                {clientData.name ? clientData.name : "Не указано"}{" "}
                {clientData.last_name ? clientData.last_name : "Не указано"}
              </Text>
            </View>
            <Icon name="arrow-forward-ios" size={40} color={fuchsia} />
          </View>
        </View>
        <View style={styles.info__container}>
          <View style={styles.info__container_inner}>
            <View style={styles.info__item}>
              <Text style={styles.text_light}>Телефон</Text>
              <Text style={styles.text_medium}>
                {!clientData.phone ? "Не указан" : clientData.phone}
              </Text>
            </View>
            <Icon name="arrow-forward-ios" size={40} color={fuchsia} />
          </View>
          <View style={styles.info__container_inner}>
            <View style={styles.info__item}>
              <Text style={styles.text_light}>E-mail</Text>
              <Text style={styles.text_medium}>
                {!clientData.email ? "Не указан" : clientData.email}
              </Text>
            </View>
            <Icon name="arrow-forward-ios" size={40} color={fuchsia} />
          </View>
          <View style={styles.info__container_inner}>
            <View style={styles.info__item}>
              <Text style={styles.text_light}>День рождения</Text>
              <Text style={styles.text_medium}>
                {!clientData.date_of_birth
                  ? "Не указан"
                  : clientData.date_of_birth}
              </Text>
            </View>
            <Icon name="arrow-forward-ios" size={40} color={fuchsia} />
          </View>
          <View style={styles.info__container_inner}>
            <View style={styles.info__item}>
              <Text style={styles.text_light}>Пол</Text>
              <Text style={styles.text_medium}>
                {!clientData.gender ? "Не указан" : clientData.gender}
              </Text>
            </View>
            <Icon name="arrow-forward-ios" size={40} color={fuchsia} />
          </View>
        </View>
        <View style={{ paddingHorizontal: 10, marginTop: 30 }}>
          <NewButtonComponent
            title={"Изменить данные"}
            filled={true}
            height={54}
            fontSize={18}
            onPress={toggleNameModal}
          />
        </View>
      </View>
      {photoModalVisible && (
        <Modal
          animationType="fade"
          isVisible={photoModalVisible}
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
            <StatusBar
              barStyle="light-content"
              backgroundColor={elemBackgroundColor2}
            />
            <View style={styles.photoModal__container}>
              <TouchableOpacity
                onPress={() => setPhotoModalVisible(false)}
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
              <View style={styles.photoModal__container_inner}>
                <View style={styles.photoModal__item}>
                  <TouchableOpacity>
                    <Text style={styles.text_medium}>Снять фото</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.photoModal__container_inner}>
                <View style={styles.photoModal__item}>
                  <TouchableOpacity>
                    <Text style={styles.text_medium}>Выбрать фото</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={[
                  styles.photoModal__container_inner,
                  { borderBottomWidth: 0 },
                ]}
              >
                <View style={styles.photoModal__item}>
                  <TouchableOpacity>
                    <Text style={styles.text_medium}>Удалить фото</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </BlurView>
        </Modal>
      )}
      {nameModalVisible && (
        <Modal
          animationType="fade"
          isVisible={nameModalVisible}
          transparent={true}
          style={styles.modal}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.containerModal}
          >
            <BlurView
              tint="dark"
              intensity={40}
              blurReductionFactor={10}
              experimentalBlurMethod={"dimezisBlurView"}
              style={styles.nameModal_blur}
            >
              <StatusBar
                barStyle="light-content"
                backgroundColor={elemBackgroundColor2}
              />
              <View style={styles.nameModal__container}>
                <TouchableOpacity
                  onPress={toggleNameModal}
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
                <View style={styles.nameModal__container_inner}>
                  <Text style={styles.nameModal__title}>
                    Данные пользователя
                  </Text>
                  <View style={styles.nameModal__item}>
                    <Text
                      style={[
                        styles.text_light,
                        { paddingTop: 10, paddingBottom: 3 },
                      ]}
                    >
                      Фамилия
                    </Text>
                    <TextInput
                      style={styles.input}
                      value={lastName}
                      onChangeText={setLastName}
                    />
                  </View>
                  <View style={styles.nameModal__item}>
                    <Text
                      style={[
                        styles.text_light,
                        { paddingTop: 10, paddingBottom: 3 },
                      ]}
                    >
                      Имя
                    </Text>
                    <TextInput
                      style={styles.input}
                      value={name}
                      onChangeText={setName}
                    />
                  </View>
                  {/* <View style={styles.nameModal__item}>
                    <Text
                      style={[
                        styles.text_light,
                        { paddingTop: 10, paddingBottom: 3 },
                      ]}
                    >
                      Отчество
                    </Text>
                    <TextInput style={styles.input} />
                  </View> */}
                  {/* <View style={styles.nameModal__item}>
                    <Text
                      style={[
                        styles.text_light,
                        { paddingTop: 10, paddingBottom: 3 },
                      ]}
                    >
                      Телефон
                    </Text>
                    <TextInputMask
                      style={styles.input}
                      keyboardType={"phone-pad"}
                      type={"custom"}
                      options={{ mask: "+7 999 999-99-99" }}
                      value={phoneNumber}
                      onChangeText={setPhoneNumber}
                      placeholder="+7 999 999-99-99"
                      placeholderTextColor={"#424242"}
                    />
                  </View> */}
                  <View style={styles.nameModal__item}>
                    <Text
                      style={[
                        styles.text_light,
                        { paddingTop: 10, paddingBottom: 3 },
                      ]}
                    >
                      E-mail
                    </Text>
                    <TextInput
                      style={styles.input}
                      keyboardType="email"
                      value={email}
                      onChangeText={setEmail}
                      placeholder="Email@email.com"
                      placeholderTextColor={"#424242"}
                    />
                  </View>
                  <View style={styles.nameModal__item}>
                    <Text
                      style={[
                        styles.text_light,
                        { paddingTop: 10, paddingBottom: 3 },
                      ]}
                    >
                      День рождения
                    </Text>
                    <TextInputMask
                      style={styles.input}
                      keyboardType={"numeric"}
                      type={"datetime"}
                      options={{ format: "DD-MM-YYYY" }}
                      value={birthDay}
                      onChangeText={setBirthDay}
                      placeholder="дд-мм-гггг"
                      placeholderTextColor={"#424242"}
                    />
                  </View>
                  <View style={styles.nameModal__item}>
                    <Text
                      style={[
                        styles.text_light,
                        { paddingTop: 10, paddingBottom: 3 },
                      ]}
                    >
                      Пол
                    </Text>
                    {/* <TextInput style={styles.input} /> */}
                    <View style={styles.nameModal__gender}>
                      <TouchableOpacity
                        onPress={() => setGender("Мужской")}
                        style={styles.gender}
                      >
                        <Text
                          style={[
                            styles.text_medium,
                            gender === "Женский" ? styles.genderDisabled : {},
                          ]}
                        >
                          Мужской
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => setGender("Женский")}
                        style={styles.gender}
                      >
                        <Text
                          style={[
                            styles.text_medium,
                            gender === "Мужской" ? styles.genderDisabled : {},
                          ]}
                        >
                          Женский
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                <View style={{ paddingHorizontal: 10 }}>
                  <NewButtonComponent
                    title={"Сохранить"}
                    filled={true}
                    height={54}
                    fontSize={18}
                    onPress={() => postMyData()}
                  />
                </View>
              </View>
            </BlurView>
          </ScrollView>
        </Modal>
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container__view: {
    height: HEIGHT.height,
  },
  container: {
    marginHorizontal: 15,
  },
  header__container: {
    flexDirection: "row",
    marginTop: 30,
    columnGap: 20,
    alignItems: "center",
    marginLeft: 10,
  },
  header__text_container: {
    rowGap: 10,
    marginRight: "auto",
  },
  text_light: {
    fontFamily: FONTS.light,
    fontSize: 14,
    lineHeight: 14,
    color: textPrimaryColor,
  },
  text_medium: {
    fontFamily: FONTS.medium,
    fontSize: 18,
    lineHeight: 20,
    color: textPrimaryColor,
  },
  ID__container: {
    marginTop: 15,
    marginLeft: 10,
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
  },
  info__container: {
    marginTop: 40,
    marginLeft: 10,
    rowGap: 20,
  },
  info__container_inner: {
    paddingBottom: 6,
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
    borderBottomWidth: 1,
    borderColor: "#9A95B2",
  },
  info__item: {
    rowGap: 10,
    marginRight: "auto",
  },
  containerBlur: {
    flex: 1,
    justifyContent: "flex-end",
  },
  closePopup: {
    alignItems: "flex-end",
  },
  photoModal__container: {
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 20,
    backgroundColor: elemBackgroundColor2,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    width: WIDTH.width,
  },
  photoModal__container_inner: {
    alignItems: "center",
    marginHorizontal: 15,
    borderBottomWidth: 1,
    borderColor: "#9A95B2",
  },
  photoModal__item: {
    paddingVertical: 12,
  },
  containerModal: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modal: {},
  nameModal_blur: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  nameModal__container: {
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 20,
    backgroundColor: elemBackgroundColor,
    borderRadius: 12,
    width: WIDTH.width,
  },
  nameModal__container_inner: {
    marginTop: 20,
    rowGap: 20,
    marginBottom: 25,
  },
  nameModal__title: {
    fontFamily: FONTS.medium,
    fontSize: 24,
    lineHeight: 24,
    color: textPrimaryColor,
    textAlign: "center",
  },
  nameModal__item: {
    backgroundColor: inputBackgroundColor,
    paddingHorizontal: 25,
    borderRadius: 100,
  },
  input: {
    color: textPrimaryColor,
    fontFamily: FONTS.medium,
    fontSize: 18,
    lineHeight: 20,
    paddingBottom: 10,
  },
  nameModal__gender: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    columnGap: 50,
    paddingBottom: 15,
  },
  genderDisabled: {
    opacity: 0.3,
  },
});
