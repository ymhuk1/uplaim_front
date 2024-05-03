import React from "react";
import {
  Modal,
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { FONTS, HEIGHT, WIDTH } from "../constants/theme";
import NewButtonComponent from "./NewButtonComponent";
import { Image } from "expo-image";
import { textColor4, textPrimaryColor } from "./ColorsComponent";

const UniversalModal = ({
  isVisible,
  onClose,
  title,
  content,
  width,
  sourceImg,
  title2,
  balance,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.modalView}>
        <View style={styles.header}>
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
          <Text style={styles.text__title}>{title}</Text>
        </View>

        <View style={{ paddingHorizontal: 15, rowGap: 10, marginBottom: 10 }}>
          <Image
            contentFit="cover"
            contentPosition={"top"}
            height={200}
            width={width}
            source={sourceImg}
            borderRadius={10}
          />
          <Text style={styles.text__content}>{content}</Text>
          <View style={{ flexDirection: "row", alignItems: "baseline" }}>
            <Text
              style={[
                styles.text__title,
                {
                  fontFamily: FONTS.regular,
                  fontSize: 16,
                  marginRight: "auto",
                },
              ]}
            >
              {title2}
            </Text>
            <Text
              style={[styles.text__title, { fontSize: 20, marginRight: 5 }]}
            >
              {balance}
            </Text>
            <Image
              contentFit="cover"
              contentPosition={"top"}
              height={12}
              width={33}
              source={require("../assets/ticket-green.svg")}
            />
          </View>
          <Text style={[styles.text__content, { marginLeft: 4 }]}>
            Розыгрыш будет произведён 12.08.2024 в 20:00 МСК
          </Text>
        </View>

        <View style={styles.button}>
          <NewButtonComponent
            title="Хорошо"
            // onPress={onClose}
            filled={true}
            height={54}
            fontSize={18}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // minHeight: HEIGHT.height,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    backgroundColor: "#121123",
    // padding: 20,
    // paddingHorizontal: 15,
    borderRadius: 12,
    width: WIDTH.width - 30,
  },
  header: {
    // margin: 20,
    flexDirection: "row-reverse",
    paddingHorizontal: 15,
    paddingVertical: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },
  closePopup: {
    // position: "absolute",
    // top: 15,
    // right: 10,
  },
  text__title: {
    fontFamily: FONTS.medium,
    fontSize: 18,
    color: textPrimaryColor,
    // marginBottom: 10,
  },
  text__content: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: textColor4,
  },
  button: {
    paddingHorizontal: 15,
    marginBottom: 5,
  },
});

export default UniversalModal;
