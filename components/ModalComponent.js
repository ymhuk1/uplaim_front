import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { Link, useLocalSearchParams } from "expo-router";
import {
  elemBackgroundColor,
  textColor3,
  textPrimaryColor,
} from "./ColorsComponent";
import { Image } from "expo-image";
import { COLORS, FONTS, HEIGHT, WIDTH } from "../constants/theme";
import { BlurView } from "expo-blur";
import NewButtonComponent from "./NewButtonComponent";
import QRCodeComponent from "../components/QRCodeComponent";

export default function ModalComponent({
  setModalState,
  onClose,
  modal,
  title,
  description,
  qrCode,
}) {
  const [textValue, setTextValue] = useState("Рекомендации");
  const [modalVisible, setModalVisible] = useState(false);
  // const modalon = useLocalSearchParams();

  useEffect(() => {
    setModalVisible(modal);
  });

  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible}>
      <BlurView
        tint="dark"
        intensity={40}
        blurReductionFactor={10}
        experimentalBlurMethod={"dimezisBlurView"}
        style={styles.centeredView}
      >
        <View style={styles.modalView}>
          <View style={styles.containerButtonClose}>
            <TouchableOpacity style={styles.buttonClose} onPress={onClose}>
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
          <View style={qrCode ? styles.topContainer : [styles.topContainer, { paddingBottom: 0 }]}>
            <Text style={styles.textTop}>{title}</Text>
            <Text style={styles.description} numberOfLines={3}>
              {description}
            </Text>
            {!qrCode ? (
              <View style={styles.link__container}>
                <Text style={styles.link__text} numberOfLines={1}>
                  www.website.com/pes..
                </Text>
                <Image
                  contentFit="contain"
                  contentPosition={"center"}
                  transition={1000}
                  source={require("../assets/copy-link.svg")}
                  width={16}
                  height={16}
                />
              </View>
            ) : null}
            {!qrCode ? (
              <NewButtonComponent
                title={"Поделиться ссылкой"}
                filled={true}
                height={54}
                fontSize={18}
              />
            ) : null}
            {qrCode ? (
              <View style={styles.qrcode}>
                <QRCodeComponent size={280} logoSize={88} />
              </View>
            ) : null}
          </View>
        </View>
      </BlurView>
    </Modal>
  );
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    // height: 330,
    // flex: 1,
    width: WIDTH.width - 30,
    backgroundColor: elemBackgroundColor,
    borderRadius: 20,
    padding: 10,
  },
  buttonClose: {
    // width: 40,
    // borderRadius: 50,
    // paddingHorizontal: 10,
    // paddingVertical: 8,
    // elevation: 2,
    // backgroundColor: textColor3,
  },
  containerButtonClose: {
    alignItems: "flex-end",
  },
  topContainer: {
    // flexDirection: "row",
    paddingHorizontal: 15,
    paddingBottom: 20,
    // backgroundColor: "green"
  },
  textTop: {
    fontFamily: FONTS.medium,
    fontSize: 24,
    color: textPrimaryColor,
    lineHeight: 24,
    marginBottom: 12,
  },
  description: {
    textAlign: "justify",
    fontFamily: FONTS.regular,
    fontSize: 16,
    color: textPrimaryColor,
    marginBottom: 20,
  },
  link__container: {
    flexDirection: "row",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 100,
    backgroundColor: COLORS.primary,
    // alignItems: "center",
    marginBottom: 20,
  },
  link__text: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    // lineHeight: 14,
    color: textPrimaryColor,
    marginRight: "auto",
  },
  qrcode: {
    // flex: 1,
    // marginBottom: 10,
    alignItems: "center",
  },
});
