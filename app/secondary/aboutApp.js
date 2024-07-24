import {
  FlatList,
  Linking,
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewBase,
} from "react-native";
import React, { useState } from "react";
import { Image, ImageBackground } from "expo-image";
import { FONTS, HEIGHT } from "../../constants/theme";
import HeaderComponent from "../../components/HeaderComponent";
import {
  elemBackgroundColor,
  elemBackgroundColor2,
  elemBackgroundColor3,
  fuchsia,
  textPrimaryColor,
} from "../../components/ColorsComponent";
import Icon from "react-native-vector-icons/MaterialIcons";
import Constants from "expo-constants";
import WebView from "react-native-webview";

const apiBaseUrl = Constants.expoConfig.extra.API_PROD;

export default function About() {
  const [textValue, setTextValue] = useState("О приложении");
  const [pdfModalVisible, setPdfModalVisible] = useState(false);
  const [currentPdfFile, setCurrentPdfFile] = useState();

  const pdfSourseLinkAcceptance = {
    uri: `${apiBaseUrl}acceptance`,
    caches: true,
  };
  const pdfSourseLinkAgreement = {
    uri: `${apiBaseUrl}agreement`,
    caches: true,
  };
  const pdfSourseLinkPrivacy = { uri: `${apiBaseUrl}privacy`, caches: true };

  const pdfModalToggle = () => {
    setPdfModalVisible(!pdfModalVisible);
  };

  return (
    <ImageBackground
      source={require("../../assets/background.png")}
      contentFit={"cover"}
      style={styles.containerImg}
    >
      <View style={styles.container}>
        <HeaderComponent text={textValue} secondary={true} />
        <View style={styles.info__container}>
          <View style={styles.info__container_inner}>
            <Image
              contentFit="contain"
              contentPosition={"center"}
              transition={1000}
              source={require("../../assets/file.svg")}
              width={25}
              height={25}
            />
            <TouchableOpacity
              onPress={() =>
                pdfModalToggle() ||
                setCurrentPdfFile(pdfSourseLinkAcceptance.uri)
              }
              style={styles.info__item}
            >
              <View style={styles.info__item}>
                <Text style={styles.text_medium}>Руководство пользователя</Text>
              </View>
            </TouchableOpacity>
            <Icon name="arrow-forward-ios" size={40} color={fuchsia} />
          </View>
          <View style={styles.info__container_inner}>
            <Image
              contentFit="contain"
              contentPosition={"center"}
              transition={1000}
              source={require("../../assets/file.svg")}
              width={25}
              height={25}
            />
            <TouchableOpacity
              onPress={() =>
                pdfModalToggle() ||
                setCurrentPdfFile(pdfSourseLinkAgreement.uri)
              }
              style={styles.info__item}
            >
              <View style={styles.info__item}>
                <Text style={styles.text_medium}>Договоры и согласия</Text>
              </View>
            </TouchableOpacity>
            <Icon name="arrow-forward-ios" size={40} color={fuchsia} />
          </View>
          <View style={styles.info__container_inner}>
            <Image
              contentFit="contain"
              contentPosition={"center"}
              transition={1000}
              source={require("../../assets/file.svg")}
              width={25}
              height={25}
            />
            <TouchableOpacity
              onPress={() =>
                pdfModalToggle() || setCurrentPdfFile(pdfSourseLinkPrivacy.uri)
              }
              style={styles.info__item}
            >
              <View style={styles.info__item}>
                <Text style={styles.text_medium}>
                  Политика конфиденциальности
                </Text>
              </View>
            </TouchableOpacity>
            <Icon name="arrow-forward-ios" size={40} color={fuchsia} />
          </View>
          <View style={styles.logo__container}>
            <Image
              contentFit="contain"
              contentPosition={"center"}
              transition={1000}
              source={require("../../assets/icon.svg")}
              width={30}
              height={30}
            />
            <Text style={styles.text_medium}>Версия v1.0.3</Text>
          </View>
          <View>
            <Text style={styles.text_light}>
              Для безопасности ваших данных все функции и возможности приложения
              доступны только для устройств с оригинальной версией операционной
              системы iOS. На устройствах с jailbreak приложением можно
              пользоваться в ограниченном режиме.
            </Text>
          </View>
        </View>
      </View>
      {pdfModalVisible && (
        <Modal
          animationType="fade"
          isVisible={pdfModalVisible}
          transparent={true}
        >
          <View style={styles.pdfView}>
            <TouchableOpacity
              onPress={() => pdfModalToggle()}
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
            <WebView source={{ uri: currentPdfFile }}/>
          </View>
        </Modal>
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
  },
  containerImg: {
    minHeight: HEIGHT.height,
  },
  info__container_inner: {
    paddingBottom: 6,
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
    borderBottomWidth: 1,
    borderColor: "#9A95B2",
  },
  info__container: {
    marginTop: 30,
    marginLeft: 10,
    rowGap: 20,
  },
  info__item: {
    rowGap: 10,
    marginRight: "auto",
  },
  text_light: {
    fontFamily: FONTS.light,
    fontSize: 12,
    lineHeight: 16,
    color: textPrimaryColor,
  },
  text_medium: {
    fontFamily: FONTS.regular,
    fontSize: 16,
    lineHeight: 20,
    color: textPrimaryColor,
  },
  logo__container: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
  },
  pdfView: {
    flex: 1,
    minHeight: HEIGHT.height,
    backgroundColor: elemBackgroundColor3,
    paddingVertical: 10,
    rowGap: 10,
    borderRadius: 20,
  },
  closePopup: {
    alignItems: "flex-end",
    paddingRight: 10,
  },
});
