import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { FONTS, HEIGHT, WIDTH } from "../constants/theme";
import NewButtonComponent from "./NewButtonComponent";
import { Image, ImageBackground } from "expo-image";
import {
  elemBackgroundColor3,
  textColor4,
  textPrimaryColor,
} from "./ColorsComponent";
import { BlurView } from "expo-blur";

const UniversalModal = ({
  isVisible,
  onClose,
  title,
  content,
  width,
  sourceImg,
  title2,
  balance,
  buttonTitle,
  dateText,
  balanceUp,
  modal,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

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
        style={styles.container}
      >
        <StatusBar
          barStyle="light-content"
          backgroundColor={"#121123"}
          translucent={true}
        />
        <ImageBackground style={styles.container} blurRadius={10}>
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

            <View
              style={{ paddingHorizontal: 15, rowGap: 10, marginBottom: 10 }}
            >
              <Image
                contentFit="cover"
                contentPosition={"top"}
                height={240}
                width={width}
                source={sourceImg}
                borderRadius={10}
              />
              <Text style={styles.text__content}>{content}</Text>
              <View style={{}}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
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
                    style={[
                      styles.text__title,
                      { fontSize: 20, marginRight: 5 },
                    ]}
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
                {balanceUp ? (
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
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
                      style={[
                        styles.text__title,
                        { fontSize: 20, marginRight: 5 },
                      ]}
                    >
                      {balanceUp}
                    </Text>
                    <Image
                      contentFit="cover"
                      contentPosition={"top"}
                      height={14}
                      width={22}
                      source={require("../assets/up.svg")}
                    />
                  </View>
                ) : null}
              </View>
              <Text style={[styles.text__content, { marginLeft: 4 }]}>
                {dateText}
              </Text>
            </View>

            <View style={styles.button}>
              <NewButtonComponent
                title={buttonTitle}
                // onPress={onClose}
                filled={true}
                height={54}
                fontSize={18}
              />
            </View>
          </View>
        </ImageBackground>
      </BlurView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // minHeight: HEIGHT.height,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  modalView: {
    backgroundColor: "#121123",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    width: WIDTH.width,
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
