import {
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Modal,
  StatusBar,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Image, ImageBackground } from "expo-image";
import {
  elemBackgroundColor,
  textPrimaryColor,
} from "../../components/ColorsComponent";
import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router";
import { FONTS, HEIGHT, SIZES } from "../../constants/theme";
import Constants from "expo-constants";
import { BlurView } from "expo-blur";

const apiBaseUrl = Constants.expoConfig.extra.API_PROD;

export default function ProfileScreen() {
  const [clientData, setClientData] = useState({});
  const [token, setToken] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [cities, setCities] = useState("");
  const [currentCity, setCurrentCity] = useState("");

  const handleModal = () => {
    setModalVisible(!modalVisible);
  };

  const changeCity = async (city) => {
    if (city !== null) {
      await postCurrentCity(city);
    }
    fetchData();
    handleModal();
  };

  const router = useRouter();
  const handleLogout = async () => {
    try {
      await SecureStore.deleteItemAsync("userData");
      await SecureStore.deleteItemAsync("token");

      router.replace("login");
    } catch (error) {
      console.error("Ошибка при выходе:", error.message);
    }
  };

  const postCurrentCity = async (city) => {
    try {
      const requestBody = {
        city: city,
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

      const data = await response.json();
      if (response.ok) {
        console.log("Город успешно добавлен:", response.city);
      }
    } catch (error) {
      console.error("Ошибка при изменении города:", error);
    }
  };

  const fetchCity = async () => {
    fetch(`${apiBaseUrl}api/get_cities`)
      .then((response) => response.json())
      .then((data) => {
        // console.log("Города успешно получены:", data);
        setCities(data);
      })
      .catch((error) => {
        console.error("Ошибка при получении города:", error);
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
          setClientData(clientData.client);
          // console.log("Данные клиента успешно получены:", clientData);
          if (clientData.client.city) {
            const cityName = clientData.client.city.name;
            setCurrentCity(cityName);
          }
          await SecureStore.setItemAsync(
            "clientData",
            JSON.stringify(clientData)
          );
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
    fetchCity();
  }, []);

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <ImageBackground
        source={require("../../assets/background.png")}
        contentFit={"cover"}
        style={styles.containerImg}
      >
        <View style={styles.containerView}>
          <View style={styles.textContainerHead}>
            <Text style={styles.textHead}>Настройки профиля</Text>
          </View>
          <View style={styles.topContainer}>
            <View style={styles.leftContainer}>
              <Image
                contentFit="contain"
                contentPosition="center"
                source={require("../../assets/no_photo.svg")}
                width={60}
                height={60}
              />
            </View>
            <View style={styles.rightContainer}>
              <View style={styles.textContainer}>
                <TouchableOpacity
                  onPress={() => router.push({ pathname: "/secondary/myData" })}
                >
                  <Text style={styles.text}>
                    {clientData.name ? clientData.name : "Гость"}
                  </Text>
                </TouchableOpacity>
                <Text style={styles.minText}>Рефералов: 113</Text>
              </View>
            </View>
          </View>
          <View style={styles.menuContainer}>
            <View style={styles.itemMenuContainer}>
              <View style={styles.iconMenuContainer}>
                <Image
                  contentFit="contain"
                  contentPosition="center"
                  source={require("../../assets/profile/location-pin.svg")}
                  width={24}
                  height={24}
                />
              </View>
              <TouchableOpacity
                style={styles.textMenuContainer}
                onPress={() => handleModal()}
              >
                <Text style={styles.textMenu}>
                  {clientData.city === null ? "Город не выбран" : currentCity}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.itemMenuContainer}>
              <View style={styles.iconMenuContainer}>
                <Image
                  contentFit="contain"
                  contentPosition="center"
                  source={require("../../assets/profile/chart-pie-simple.svg")}
                  width={24}
                  height={24}
                />
              </View>
              <View style={styles.textMenuContainer}>
                <TouchableOpacity
                  onPress={() =>
                    router.push({ pathname: "/secondary/tariffs" })
                  }
                >
                  <Text style={styles.textMenu}>Мой тариф</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.itemMenuContainer}>
              <View style={styles.iconMenuContainer}>
                <Image
                  contentFit="contain"
                  contentPosition="center"
                  source={require("../../assets/profile/refresh-ccw-clock.svg")}
                  width={24}
                  height={24}
                />
              </View>
              <View style={styles.textMenuContainer}>
                <TouchableOpacity
                  onPress={() =>
                    router.push({ pathname: "/secondary/operations" })
                  }
                >
                  <Text style={styles.textMenu}>История</Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* <View style={styles.itemMenuContainer}>
              <View style={styles.iconMenuContainer}>
                <Image
                  contentFit="contain"
                  contentPosition="center"
                  source={require("../../assets/profile/cart-check.svg")}
                  width={24}
                  height={24}
                />
              </View>
              <View style={styles.textMenuContainer}>
                <Text style={styles.textMenu}>Мои заказы</Text>
              </View>
            </View> */}
            <View style={styles.itemMenuContainer}>
              <View style={styles.iconMenuContainer}>
                <Image
                  contentFit="contain"
                  contentPosition="center"
                  source={require("../../assets/profile/cart-check.svg")}
                  width={24}
                  height={24}
                />
              </View>
              <TouchableOpacity
                style={styles.textMenuContainer}
                onPress={() =>
                  router.push({
                    pathname: "/secondary/couponsList",
                  })
                }
              >
                <Text style={styles.textMenu}>Мои купоны и промокоды</Text>
              </TouchableOpacity>
            </View>
            {/* <View style={styles.itemMenuContainer}>
              <View style={styles.iconMenuContainer}>
                <Image
                  contentFit="contain"
                  contentPosition="center"
                  source={require("../../assets/profile/message-square-chat.svg")}
                  width={24}
                  height={24}
                />
              </View>
              <View style={styles.textMenuContainer}>
                <Text style={styles.textMenu}>Сообщения</Text>
              </View>
            </View> */}
            <View style={styles.itemMenuContainer}>
              <View style={styles.iconMenuContainer}>
                <Image
                  contentFit="contain"
                  contentPosition="center"
                  source={require("../../assets/profile/wallet-alt.svg")}
                  width={24}
                  height={24}
                />
              </View>
              <View style={styles.textMenuContainer}>
                <TouchableOpacity
                  onPress={() =>
                    router.push({ pathname: "/secondary/myFinances" })
                  }
                >
                  <Text style={styles.textMenu}>Мои финансы</Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* <View style={styles.itemMenuContainer}>
              <View style={styles.iconMenuContainer}>
                <Image
                  contentFit="contain"
                  contentPosition="center"
                  source={require("../../assets/profile/gear.svg")}
                  width={24}
                  height={24}
                />
              </View>
              <View style={styles.textMenuContainer}>
                <TouchableOpacity
                  onPress={() =>
                    router.push({ pathname: "/secondary/settings" })
                  }
                >
                  <Text style={styles.textMenu}>Настройки</Text>
                </TouchableOpacity>
              </View>
            </View> */}
            {/* <View style={styles.itemMenuContainer}>
              <View style={styles.iconMenuContainer}>
                <Image
                  contentFit="contain"
                  contentPosition="center"
                  source={require("../../assets/profile/mobile-signal.svg")}
                  width={24}
                  height={24}
                />
              </View>
              <View style={styles.textMenuContainer}>
                <Text style={styles.textMenu}>Обратная связь</Text>
              </View>
            </View> */}
            <View style={styles.itemMenuContainer}>
              <View style={styles.iconMenuContainer}>
                <Image
                  contentFit="contain"
                  contentPosition="center"
                  source={require("../../assets/profile/crown.svg")}
                  width={24}
                  height={24}
                />
              </View>
              <TouchableOpacity
                style={styles.textMenuContainer}
                onPress={() =>
                  router.push({ pathname: "/secondary/franchise" })
                }
              >
                <Text style={styles.textMenu}>Франшиза</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.itemMenuContainer}>
              <View style={styles.iconMenuContainer}>
                <Image
                  contentFit="contain"
                  contentPosition="center"
                  source={require("../../assets/profile/circle-information.svg")}
                  width={24}
                  height={24}
                />
              </View>
              <TouchableOpacity
                style={styles.textMenuContainer}
                onPress={() => router.push({ pathname: "/secondary/aboutApp" })}
              >
                <Text style={styles.textMenu}>О приложении</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.itemMenuContainer}>
              <View style={styles.iconMenuContainer}>
                <Image
                  contentFit="contain"
                  contentPosition="center"
                  source={require("../../assets/profile/circle-information.svg")}
                  width={24}
                  height={24}
                />
              </View>
              <TouchableOpacity
                onPress={handleLogout}
                style={styles.textMenuContainer}
              >
                <Text style={styles.textMenu}>Выход</Text>
              </TouchableOpacity>
            </View>
          </View>
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
                  <Text style={styles.modalText}>Выбор города:</Text>
                  <View style={styles.citysContainer}>
                    {cities.length > 0 &&
                      cities.map((item, index) => (
                        <TouchableOpacity
                          style={styles.button}
                          onPress={() => changeCity(item.name)}
                          key={index}
                        >
                          <Text style={styles.cityText}>{item.name}</Text>
                        </TouchableOpacity>
                      ))}
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
  container: {},
  containerImg: {
    minHeight: HEIGHT.height,
  },
  containerView: {
    marginHorizontal: 15,
    marginBottom: 80,
    marginTop: 60,
    minHeight: 700,
  },
  textContainerHead: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  textHead: {
    fontFamily: FONTS.medium,
    fontSize: 24,
    lineHeight: 24,
    color: textPrimaryColor,
    marginLeft: 7,
  },
  topContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
  },
  leftContainer: {
    marginRight: 20,
  },
  rightContainer: {},
  textContainer: {},
  text: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.xLarge,
    lineHeight: 24,
    color: "white",
  },
  minText: {
    color: "#DFDFE9",
  },
  menuContainer: {
    marginHorizontal: 15,
  },
  itemMenuContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  iconMenuContainer: {},
  textMenuContainer: {},
  textMenu: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.medium,
    color: "white",
    marginLeft: 8,
    textAlign: "center",
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
});
