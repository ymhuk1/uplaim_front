import {
  Clipboard,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Image, ImageBackground } from "expo-image";
import { COLORS, FONTS, HEIGHT, WIDTH } from "../../constants/theme";
import HeaderComponent from "../../components/HeaderComponent";
import {
  elemBackgroundColor,
  elemGradientColors,
  textColor4,
  textPrimaryColor,
} from "../../components/ColorsComponent";
import { LinearGradient } from "expo-linear-gradient";
import QRCodeComponent from "../../components/QRCodeComponent";
import PopupComponent from "../../components/PopupComponent";
import ModalComponent from "../../components/ModalComponent";
import Constants from "expo-constants";
import * as SecureStore from "expo-secure-store";

export default function Recommendations() {
  const [textValue, setTextValue] = useState("Рекомендации");
  const [isTooltipVisible, setTooltipVisible] = useState(false);
  const [isTooltipVisible2, setTooltipVisible2] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [referalCode, setReferalCode] = useState("");

  const toggleTooltip = () => {
    setTooltipVisible(!isTooltipVisible);
  };

  const toggleTooltip2 = () => {
    setTooltipVisible2(!isTooltipVisible2);
  };
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const apiBaseUrl = Constants.expoConfig.extra.API_PROD;

  useEffect(() => {
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
          console.log("Данные клиента успешно получены:", client.referral_link);
          setReferalCode(client.referral_link);
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

    fetchData();
  }, []);

  const handleCopyLink = async () => {
    try {
      await Clipboard.setString(
        `https://uplaim.com/referral?referral=${referalCode}`
      );
      // alert("Ссылка скопирована в буфер обмена");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <ScrollView
      // refreshControl={
      //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      // }
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <ImageBackground
        source={require("../../assets/background.png")}
        contentFit={"cover"}
        style={styles.containerImg}
      >
        <View style={styles.containerView}>
          <HeaderComponent text={textValue} secondary={true} />
          <View style={styles.header__container}>
            <View style={styles.header__inner}>
              <Image
                style={styles.header_img}
                source={require("../../assets/recommendations.svg")}
                contentFit="contain"
                contentPosition={"center"}
                transition={1000}
                width={WIDTH.width - 112}
                height={WIDTH.width - 112}
              />
              <Text style={styles.title}>
                Приглашай друзей{"\n"}в компанию!
              </Text>
            </View>
            <Text style={styles.title2}>и получай</Text>
          </View>
          <View style={styles.friends__container}>
            <View style={[styles.friends__inner, { paddingLeft: 10 }]}>
              <View style={styles.friends__inner_container}>
                <Image
                  style={[styles.friends__img, { alignItems: "center" }]}
                  contentFit="contain"
                  contentPosition={"center"}
                  transition={1000}
                  source={require("../../assets/user.svg")}
                />
                <Text
                  style={[styles.friends__text, { fontFamily: FONTS.regular }]}
                >
                  тебе
                </Text>
                <TouchableOpacity onPress={toggleTooltip}>
                  <Image
                    contentFit="contain"
                    contentPosition={"center"}
                    transition={1000}
                    source={require("../../assets/tooltip.svg")}
                    width={15}
                    height={15}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={[styles.friends__inner_container, { marginLeft: 2 }]}
              >
                <Image
                  contentFit="contain"
                  contentPosition={"center"}
                  transition={1000}
                  source={require("../../assets/ellipse.svg")}
                  width={12}
                  height={12}
                />
                <Text style={styles.friends__text}>300 баллов</Text>
              </View>
            </View>
            <View style={styles.friends__inner}>
              <View style={styles.friends__inner_container}>
                <Image
                  style={styles.friends__img}
                  contentFit="contain"
                  contentPosition={"center"}
                  transition={1000}
                  source={require("../../assets/users.svg")}
                />
                <Text
                  style={[styles.friends__text, { fontFamily: FONTS.regular }]}
                >
                  другу
                </Text>
              </View>
              <View style={styles.friends__inner_container}>
                <Image
                  contentFit="contain"
                  contentPosition={"center"}
                  transition={1000}
                  source={require("../../assets/ellipse.svg")}
                  width={12}
                  height={12}
                />
                <Text style={styles.friends__text}>150 баллов</Text>
              </View>
            </View>
          </View>
          <LinearGradient
            colors={elemGradientColors}
            style={styles.friendsBalls__container}
          >
            <Image
              style={styles.friendsBalls__img}
              contentFit="contain"
              contentPosition={"center"}
              source={require("../../assets/bags-shopping-green.svg")}
            />
            <Text style={styles.friends__text}>
              до 10% баллов{"\n"}от покупок друзей
            </Text>
          </LinearGradient>

          <View style={styles.linkQRC__container}>
            <View style={styles.linkQRC__inner}>
              <View style={styles.linkQRC__inner_info}>
                <Image
                  contentFit="contain"
                  contentPosition={"center"}
                  transition={1000}
                  source={require("../../assets/link.svg")}
                  width={24}
                  height={24}
                />
                <Text
                  style={styles.linkQRC__text_title}
                  // numberOfLines={2}
                >
                  Ссылка на{"\n"}персональные скидки
                </Text>
              </View>

              <TouchableOpacity
                style={styles.linkQRC__info_url}
                onPress={toggleTooltip2}
              >
                <Text
                  style={[styles.linkQRC__text, { fontSize: 14 }]}
                  numberOfLines={1}
                >
                  {`${apiBaseUrl}referral`}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleCopyLink()}>
                <Text style={styles.linkQRC__text}>Скопировать ссылку</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={[styles.linkQRC__inner, { flex: 100 }]}
              onPress={toggleModal}
            >
              <View style={styles.linkQRC__inner_qrc}>
                <Image
                  contentFit="contain"
                  contentPosition={"center"}
                  transition={1000}
                  source={require("../../assets/circuit.svg")}
                  width={24}
                  height={24}
                />
                <Text style={styles.linkQRC__text_title}>QR-код</Text>
              </View>
              <QRCodeComponent size={50} logoSize={20} />
              <Text style={styles.linkQRC__text}>Покажи другу</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.statistics__container}>
            <Image
              contentFit="contain"
              contentPosition={"center"}
              transition={1000}
              source={require("../../assets/statistics.svg")}
              width={24}
              height={24}
            />
            <Text style={styles.statistics__text}>
              Статистика{"\n"}по рекомендациям
            </Text>
          </View>

          <View style={styles.recommend__container}>
            <View style={styles.recommend__inner}>
              <Text
                style={[styles.recommend__balls_text, { marginRight: "auto" }]}
              >
                10
              </Text>
              <View style={styles.recommend__ellipsis}></View>
              <Text style={styles.recommend__text}>
                эффективных рекомендаций
              </Text>
            </View>

            <TouchableOpacity
              style={styles.recommend__img}
              onPress={toggleTooltip}
            >
              <Image
                contentFit="contain"
                contentPosition={"center"}
                transition={1000}
                source={require("../../assets/tooltip.svg")}
                style={styles.recommend__img}
              />
            </TouchableOpacity>
            <View style={styles.recommend__inner}>
              <Text
                style={[styles.recommend__balls_text, { marginRight: "auto" }]}
              >
                600
              </Text>
              <View style={styles.recommend__ellipsis}></View>
              <Text style={styles.recommend__text}>
                баллов за покупки друзей
              </Text>
            </View>
          </View>
        </View>
        {isTooltipVisible && (
          <Modal
            isVisible={isTooltipVisible}
            onBackdropPress={toggleTooltip}
            // style={styles.modal}
            animationType="fade"
          >
            <PopupComponent
              onClose={toggleTooltip}
              // height={220}
              textPopup1={"за эффективные рекомендации"}
            />
          </Modal>
        )}
        {isTooltipVisible2 && (
          <Modal
            isVisible={isTooltipVisible2}
            onBackdropPress={toggleTooltip2}
            // style={styles.modal}
            animationType="fade"
          >
            <ModalComponent
              onClose={toggleTooltip2}
              title={"Это ваша персональная ссылка"}
              description={
                "Отправьте ее друзьям, пусть они сами выберут, что оформить, а Вы получите бонус 300 баллов."
              }
              referalCode={referalCode}
            />
          </Modal>
        )}
        {isModalVisible && (
          <Modal
            isVisible={isModalVisible}
            onBackdropPress={toggleModal}
            // style={styles.modal}
            animationType="fade"
          >
            <ModalComponent
              onClose={toggleModal}
              title={"Покажите QR-код друзьям"}
              description={
                "Нужно отсканировать и выбрать что оформить, а Вы получите бонус 300 баллов."
              }
              qrCode={true}
              referalCode={referalCode}
            />
          </Modal>
        )}
      </ImageBackground>
    </ScrollView>
  );
}
// console.log();
let linkContainerWidth = WIDTH.width - 160;

const styles = StyleSheet.create({
  containerView: {
    // flex: 1,
  },
  containerImg: {
    minHeight: HEIGHT.height,
  },
  containerView: {
    marginHorizontal: 15,
  },
  header__container: {
    marginBottom: 15,
  },
  header__inner: {
    marginBottom: 10,
  },
  header_img: {
    alignSelf: "center",
  },
  title: {
    position: "absolute",
    bottom: 16,
    fontFamily: FONTS.medium,
    fontSize: 24,
    color: textPrimaryColor,
    alignSelf: "center",
    textAlign: "center",
    lineHeight: 24,
  },
  title2: {
    position: "absolute",
    bottom: 0,
    fontFamily: FONTS.regular,
    fontSize: 16,
    color: textPrimaryColor,
    alignSelf: "center",
    lineHeight: 20,
  },
  friends__container: {
    flexDirection: "row",
    columnGap: 15,
    marginBottom: 15,
  },
  friends__inner: {
    // width: (WIDTH.width - 45) / 2,
    flex: 1,
    borderRadius: 12,
    backgroundColor: elemBackgroundColor,
    paddingHorizontal: 12,
    paddingVertical: 10,
    rowGap: 10,
    // justifyContent: "center",
    // alignItems: "center",
    // backgroundColor: "green",
  },
  friends__img: {
    height: 24,
    width: 24,
    // backgroundColor: "blue",
  },
  friends__inner_container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    columnGap: 6,
    justifyContent: "flex-start",
    // backgroundColor: "red",
  },
  friends__text: {
    fontFamily: FONTS.medium,
    fontSize: 20,
    color: textPrimaryColor,
    lineHeight: 24,
  },
  friendsBalls__container: {
    flexDirection: "row",
    columnGap: 13,
    alignItems: "center",
    borderRadius: 16,
    // paddingHorizontal: 57,
    paddingVertical: 16,
    justifyContent: "center",
    marginBottom: 15,
  },
  friendsBalls__img: {
    height: 34,
    width: 34,
  },
  linkQRC__container: {
    flexDirection: "row",
    columnGap: 15,
    marginBottom: 30,
  },
  linkQRC__inner: {
    flex: 210,
    // paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: elemBackgroundColor,
    rowGap: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  linkQRC__inner_info: {
    flexDirection: "row",
    columnGap: 6,
    justifyContent: "center",
    paddingHorizontal: 15,
  },
  linkQRC__inner_qrc: {
    flexDirection: "row",
    columnGap: 6,
    alignItems: "center",
  },
  linkQRC__info_url: {
    // flex: 1,
    // width: "100%",
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 100,
    backgroundColor: COLORS.primary,
    alignItems: "center",
  },
  linkQRC__text_title: {
    fontFamily: FONTS.medium,
    fontSize: 14,
    lineHeight: 16,
    color: textPrimaryColor,
  },
  linkQRC__text: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    lineHeight: 14,
    color: textPrimaryColor,
  },
  statistics__container: {
    flexDirection: "row",
    columnGap: 7,
    marginBottom: 20,
  },
  statistics__text: {
    fontFamily: FONTS.medium,
    fontSize: 24,
    color: textPrimaryColor,
    lineHeight: 24,
  },
  recommend__container: {
    paddingLeft: 10,
    paddingRight: 15,
    paddingVertical: 15,
    borderRadius: 12,
    backgroundColor: elemBackgroundColor,
    marginBottom: 15,
    rowGap: 10,
  },
  recommend__inner: {
    position: "relative",
    flexDirection: "row",
    alignItems: "baseline",
  },
  recommend__img: {
    position: "absolute",
    top: 9,
    right: 4,
    height: 8,
    width: 8,
  },
  recommend__text: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: textPrimaryColor,
    lineHeight: 14,
    // backgroundColor: "red",
  },
  recommend__balls_text: {
    fontFamily: FONTS.medium,
    fontSize: 24,
    color: textPrimaryColor,
    lineHeight: 24,
    // backgroundColor: "red",
  },
  recommend__ellipsis: {
    flex: 1,
    borderBottomColor: "white",
    borderBottomWidth: 1,
    borderColor: textColor4,
    borderStyle: "dotted",
    marginHorizontal: 5,
  },
});
