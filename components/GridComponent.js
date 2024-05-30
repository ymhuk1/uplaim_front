import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
  StatusBar,
} from "react-native";
import {
  elemBackgroundColor,
  elemGradientColors,
  elemGradientColors2,
  textColor3,
  textDisabledColor,
  textPrimaryColor,
} from "./ColorsComponent";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import Constants from "expo-constants";
import { Link, useRouter } from "expo-router";
import ModalComponent from "./ModalComponent";
import ButtonComponent from "./ButtonComponent";
import NewButtonComponent from "./NewButtonComponent";
import TagComponent from "./TagComponent";
import QRCodeComponent from "./QRCodeComponent";
import { BlurView } from "expo-blur";
import { FONTS, HEIGHT } from "../constants/theme";

const apiBaseUrl = Constants.expoConfig.extra.API_PROD;

const GridComponent = ({
  data,
  itemsPerSlide,
  itemHeight,
  myCompany,
  partners,
  coupon,
  companySlider,
  addCompany,
  companyTariffs,
  qrcode,
  hide,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [itemState, setItemState] = useState({});
  const [openQRCode, setOpenQRCode] = useState(false);
  const [hideButtonGet, setHideButtonGet] = useState(true);

  const router = useRouter();

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength - 3) + "...";
    } else {
      return text;
    }
  };
  const formatDate = (rawDate) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    const formattedDate = new Date(rawDate)
      .toLocaleDateString("en-US", options)
      .replace(/\//g, ".");
    return formattedDate;
  };

  function getBallsText(clientBalls) {
    // Определяем последние две цифры числа, чтобы определить окончание
    const lastTwoDigits = clientBalls % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
      return "баллов"; // Для чисел от 11 до 19 всегда "баллов"
    }

    // Определяем последнюю цифру
    const lastDigit = clientBalls % 10;

    if (lastDigit === 1) {
      return "балл";
    } else if (lastDigit >= 2 && lastDigit <= 4) {
      return "балла";
    } else {
      return "баллов";
    }
  }

  const handleClick = (item) => {
    setModalVisible(true);
    setItemState(item);
  };

  return (
    <View style={styles.container}>
      {data.slice(0, itemsPerSlide).map((item) => (
        <View key={item.id} style={[styles.view, { height: itemHeight }]}>
          {myCompany && (
            <View style={styles.elemContainer}>
              <View style={styles.itemActivity}>
                <View
                  style={[
                    styles.backActivity,
                    { backgroundColor: `${item.color}20` },
                  ]}
                >
                  <Text style={[styles.activity, { color: item.color }]}>
                    {item.category.name}
                  </Text>
                </View>
              </View>
              <Link
                href={{
                  pathname: "/secondary/company",
                  params: { id: item.id },
                }}
                style={styles.logoContainer}
              >
                <View>
                  {item.main_photo ? (
                    <Image
                      contentFit="contain"
                      contentPosition={"center"}
                      transition={1000}
                      source={apiBaseUrl + item.main_photo}
                      width={80}
                      height={80}
                      borderRadius={10}
                    />
                  ) : (
                    <View style={styles.textNameContainer}>
                      <Text style={styles.nameCompany}>{item.name}</Text>
                    </View>
                  )}
                </View>
              </Link>
              <View style={styles.ballsContainer}>
                {/*<Ellipse />*/}
                <Image
                  contentFit="contain"
                  contentPosition={"center"}
                  transition={1000}
                  source={require("../assets/ellipse.svg")}
                  width={14}
                  height={14}
                />
                <Text style={styles.balls}>
                  {item.client_balls !== undefined ? item.client_balls : 0}{" "}
                  {getBallsText(item.client_balls)}
                </Text>
              </View>
            </View>
          )}
          {partners && (
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: "/home/companyList",
                  params: { id: item.id },
                })
              }
            >
              <View style={styles.partnersContainer} key={item.id}>
                <View style={styles.logoPartners}>
                  <Image
                    contentFit="contain"
                    contentPosition={"center"}
                    transition={1000}
                    source={apiBaseUrl + item.icon}
                    width={50}
                    height={50}
                    style={styles.logoCategory}
                  />
                </View>
                <View
                  style={[styles.borderPartners, { borderColor: item.color }]}
                ></View>
                <View>
                  <Text style={styles.textPartners}>{item.name}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          {coupon && (
            <TouchableOpacity
              onPress={() => handleClick(item)}
              style={styles.elemContainer}
            >
              <View style={styles.itemActivity}>
                <View
                  style={[
                    styles.backActivity,
                    { backgroundColor: `${item.color}20` },
                  ]}
                >
                  <Text style={[styles.activity, { color: item.color }]}>
                    {item.category}
                  </Text>
                </View>
              </View>
              <View>
                <View style={styles.logoContainer}>
                  <Image
                    contentFit="contain"
                    contentPosition={"center"}
                    source={
                      item.photo
                        ? apiBaseUrl + item.photo
                        : require("../assets/no-photo-coupon.png")
                    }
                    width={80}
                    height={80}
                    style={styles.logo}
                    borderRadius={10}
                  />
                </View>
                <View style={styles.couponContainer}>
                  <Text style={styles.nameCoupon}>{item.name}</Text>
                  <Text style={styles.deskCoupon} numberOfLines={2}>
                    {item.description}
                  </Text>
                  <Text style={styles.dateCoupon}>{formatDate(item.date)}</Text>
                </View>
              </View>
              <View style={styles.centeredView}>
                <Modal
                  animationType="fade"
                  transparent={true}
                  visible={modalVisible}
                >
                  <BlurView
                    tint="dark"
                    intensity={40}
                    blurReductionFactor={10}
                    experimentalBlurMethod={"dimezisBlurView"}
                    style={styles.centeredView}
                  >
                    <StatusBar
                      barStyle="light-content"
                      backgroundColor={"#121123"}
                      translucent={true}
                    />
                    <View style={styles.centeredView}>
                      <View style={styles.modalView}>
                        <View style={styles.containerButtonClose}>
                          <TouchableOpacity
                            style={styles.buttonClose}
                            onPress={() => setModalVisible(!modalVisible)}
                          >
                            <Image
                              contentFit="contain"
                              contentPosition={"center"}
                              transition={1000}
                              source={require("../assets/close.svg")}
                              width={36}
                              height={36}
                            />
                          </TouchableOpacity>
                        </View>
                        <View style={styles.topContainer}>
                          <Image
                            contentFit="contain"
                            contentPosition={"center"}
                            transition={1000}
                            source={
                              item.photo
                                ? apiBaseUrl + item.photo
                                : require("../assets/no-photo-coupon.png")
                            }
                            width={74}
                            height={74}
                            style={styles.logo}
                            borderRadius={10}
                          />
                          <View style={styles.infoTopContainer}>
                            <View style={styles.textTopContainer}>
                              <Text style={styles.textTop}>{item.name}</Text>
                            </View>
                            {/* <TagComponent tags={item.company.tags}/> */}
                          </View>
                        </View>
                        <Text style={styles.description}>
                          {itemState.description}
                        </Text>
                        <Text style={styles.descriptionSmall}>
                          Для активации промокода нажмите на кнопку Получить. С
                          вас спишется 10UP за активацию промокода.
                        </Text>
                        {hideButtonGet && (
                          <NewButtonComponent
                            title={"Получить"}
                            filled={true}
                            height={48}
                            fontSize={18}
                            onPress={() => {
                              setOpenQRCode(!openQRCode);
                              setHideButtonGet(!hideButtonGet);
                            }}
                          />
                        )}
                        {openQRCode && (
                          <View style={styles.codeContainer}>
                            <QRCodeComponent
                              data="532 783"
                              size={280}
                              logoSize={88}
                              style={styles.codeStyle}
                            />
                          </View>
                        )}
                      </View>
                    </View>
                  </BlurView>
                </Modal>
              </View>
            </TouchableOpacity>
          )}
          {companySlider && (
            <View style={styles.companySliderContainer}>
              <View style={styles.companyPhotoContainer}>
                <Image
                  contentFit="cover"
                  contentPosition={"center"}
                  transition={1000}
                  source={apiBaseUrl + item.photo}
                  width={165}
                  height={96}
                  style={styles.companyPhoto}
                />
              </View>
              <View style={styles.companyDescContainer}>
                <Text style={styles.companyDesc}>
                  {item.name
                    ? truncateText(item.name, 55)
                    : ""}
                </Text>
              </View>
            </View>
          )}
          {qrcode && (
            <View
              style={[
                styles.elemContainerQR,
                hide === true && { opacity: 0.3 },
              ]}
            >
              <View style={styles.itemActivity}>
                <View
                  style={[
                    styles.backActivity,
                    { backgroundColor: `${item.color}20` },
                  ]}
                >
                  <Text style={[styles.activity, { color: item.color }]}>
                    {item.name}
                  </Text>
                </View>
              </View>
              <Link
                href={{
                  pathname: "/secondary/company",
                  params: { id: item.id },
                }}
                style={styles.logoContainer}
              >
                <View>
                  {item.main_photo ? (
                    <Image
                      contentFit="contain"
                      contentPosition={"center"}
                      transition={1000}
                      source={apiBaseUrl + item.main_photo}
                      width={80}
                      height={80}
                      borderRadius={10}
                    />
                  ) : (
                    <View style={styles.textNameContainer}>
                      <Text style={styles.nameCompany}>{item.name}</Text>
                    </View>
                  )}
                </View>
              </Link>
              <View style={styles.textNameCompanyContainer}>
                <Text style={styles.textNameCompany}>{item.name}</Text>
              </View>
              <View style={styles.ballsContainerQR}>
                <View style={styles.ballsHideContainer}>
                  {hide === true ? (
                    <Text style={styles.ballsHideText}></Text>
                  ) : (
                    <Text style={styles.ballsHideText}>
                      из{" "}
                      {item.client_hide_balls !== undefined
                        ? item.client_hide_balls
                        : 0}{" "}
                      {getBallsText(item.client_hide_balls)}
                    </Text>
                  )}
                </View>
                <View style={styles.ballsClientContainer}>
                  <Image
                    contentFit="contain"
                    contentPosition={"center"}
                    transition={1000}
                    source={require("../assets/ellipse.svg")}
                    width={14}
                    height={14}
                  />
                  {hide === true ? (
                    <Text style={styles.ballsClientText}>
                      {item.client_hide_balls !== undefined
                        ? item.client_hide_balls
                        : 0}{" "}
                      {getBallsText(item.client_hide_balls)}
                    </Text>
                  ) : (
                    <Text style={styles.ballsClientText}>
                      {item.client_balls !== undefined ? item.client_balls : 0}{" "}
                      {getBallsText(item.client_balls)}
                    </Text>
                  )}
                </View>
              </View>
              <View style={styles.dopInfoCashbackContainer}>
                <LinearGradient
                  style={styles.dopInfoCashback}
                  colors={elemGradientColors2}
                >
                  <Text style={styles.dopInfoCashbackText}>Кешбэк 10%</Text>
                </LinearGradient>
                <Image
                  contentFit="contain"
                  contentPosition={"center"}
                  transition={1000}
                  source={require("../assets/arrow-right.svg")}
                  width={18}
                  height={18}
                />
              </View>
            </View>
          )}
        </View>
      ))}
      {addCompany && (
        <Link
          href={"/secondary/categories"}
          style={[styles.view, styles.viewLink, { height: itemHeight }]}
        >
          <View style={styles.addCompany}>
            <Image
              contentFit="contain"
              contentPosition={"center"}
              transition={1000}
              source={require("../assets/plus-company.svg")}
              width={72}
              height={72}
              style={{ marginBottom: 2, marginRight: 3 }}
            />
            <Text style={styles.textAddCompany}>Добавить компанию</Text>
          </View>
        </Link>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  view: {
    width: "48%",
    borderRadius: 12,
    backgroundColor: "#24224A",
    marginBottom: 15,
  },
  viewLink: {
    textAlign: "center",
    textAlignVertical: "center",
  },
  addCompany: {
    alignItems: "center",
    marginTop: 40,
  },
  textAddCompany: {
    color: textColor3,
    marginTop: 30,
    fontSize: 12,
  },
  text: {},
  elemContainer: {},
  itemActivity: {
    alignItems: "flex-start",
  },
  backActivity: {
    margin: 10,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  activity: {
    fontSize: 12,
    lineHeight: 14,
    padding: 5,
    paddingHorizontal: 10,
  },
  logoContainer: {
    marginTop: 5,
    marginBottom: 15,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  logoCategory: {
    width: 50,
    height: 50,
    resizeMode: "cover",
  },
  textNameContainer: {
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
  },
  nameCompany: {
    color: textPrimaryColor,
    fontSize: 16,
    fontFamily: FONTS.medium,
  },
  ballsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  balls: {
    marginLeft: 10,
    fontSize: 16,
    // fontWeight:
    color: "white",
  },
  partnersContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  logoPartners: {
    marginTop: 30,
  },
  borderPartners: {
    marginTop: 20,
    width: 30,
    borderWidth: 1.5,
    marginBottom: 10,
    borderRadius: 100,
  },
  textPartners: {
    fontSize: 16,
    fontFamily: FONTS.medium,
    color: "white",
  },
  couponContainer: {
    alignItems: "center",
  },
  nameCoupon: {
    color: "white",
    fontSize: 16,
    fontFamily: FONTS.medium,
  },
  deskCoupon: {
    marginVertical: 7,
    color: "white",
    fontSize: 14,
    fontWeight: "300",
    width: 120,
    textAlign: "center",
  },
  dateCoupon: {
    fontSize: 12,
    fontWeight: "300",
    color: "#9A95B2",
  },
  companySliderContainer: {},
  companyPhotoContainer: {},
  companyDescContainer: {},
  companyPhoto: {
    height: 100,
    width: "100%",
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
  },
  companyDesc: {
    fontSize: 14,
    color: "white",
    margin: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    width: "100%",
  },
  modalView: {
    // height: 400,
    width: "94%",
    backgroundColor: elemBackgroundColor,
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonClose: {
    // position: "absolute",
    // top: 10,
    // right: 10,
  },
  containerButtonClose: {
    alignItems: "flex-end",
    marginBottom: 15,
  },
  topContainer: {
    flexDirection: "row",
  },
  infoTopContainer: {
    marginLeft: 15,
  },
  textTopContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 15,
  },
  logo: {
    width: 74,
    height: 74,
  },
  textTop: {
    fontFamily: FONTS.medium,
    fontSize: 24,
    color: "white",
    marginBottom: -5,
    marginRight: 5,
  },
  description: {
    fontSize: 24,
    fontFamily: FONTS.medium,
    color: "white",
    marginVertical: 15,
  },
  descriptionSmall: {
    fontSize: 14,
    color: "#9A95B2",
    marginBottom: 20,
  },
  textNameCompanyContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  textNameCompany: {
    color: textPrimaryColor,
    fontSize: 16,
    fontFamily: FONTS.medium,
  },
  ballsContainerQR: {
    backgroundColor: textColor3,
    borderRadius: 8,
    marginHorizontal: 10,
  },
  ballsHideContainer: {
    alignItems: "flex-end",
    paddingHorizontal: 5,
  },
  ballsHideText: {
    fontSize: 12,
    color: textDisabledColor,
  },
  ballsClientContainer: {
    flexDirection: "row",
    padding: 5,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  ballsClientText: {
    marginLeft: 5,
    color: textPrimaryColor,
    fontSize: 16,
  },
  elemContainerQR: {},
  dopInfoCashbackContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
    marginHorizontal: 20,
  },
  dopInfoCashback: {
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 8,
  },
  dopInfoCashbackText: {
    color: textPrimaryColor,
    fontSize: 12,
  },
  codeContainer: {
    alignItems: "center",
    paddingTop: 40,
    backgroundColor: "#24224A",
    // marginHorizontal: 15,
    borderRadius: 12,
    justifyContent: "center",
    marginBottom: 30,
  },
});

export default GridComponent;
