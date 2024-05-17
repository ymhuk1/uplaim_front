import React from "react";
import { View, Text, TouchableOpacity, StatusBar } from "react-native";
import { Image } from "expo-image";
import { elemBackgroundColor3 } from "./ColorsComponent";
import { BlurView } from "expo-blur";
import { FONTS, HEIGHT, WIDTH } from "../constants/theme";

const PopupComponent = ({
  onClose,
  height,
  headerPopup,
  textPopup1,
  textPopup2,
}) => {
  return (
    <BlurView
      tint="dark"
      intensity={40}
      blurReductionFactor={10}
      experimentalBlurMethod={"dimezisBlurView"}
      style={styles.blur__container}
    >
      <View style={[styles.popupContainer, { height: height }]}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={"#181629"}
          translucent={true}
        />
        <Image
          contentFit="contain"
          contentPosition={"center"}
          transition={1000}
          source={require("../assets/tooltip.svg")}
          width={45}
          height={45}
          style={styles.iconPopup}
        />
        <Text style={styles.headerPopup}>{headerPopup}</Text>
        <Text style={styles.textPopup}>{textPopup1}</Text>
        <Text style={styles.textPopup}>{textPopup2}</Text>
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
      </View>
    </BlurView>
  );
};

const styles = {
  popupContainer: {
    minHeight: 250,
    // paddingTop: 50,
    backgroundColor: "#181629",
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    width: WIDTH.width,
    // marginHorizontal: 0,
    alignItems: "center",
    justifyContent: "center",
    // marginBottom: 10,
  },
  blur__container: {
    flex: 1,
    // width: WIDTH.width-40,
    // marginHorizontal: 10,
    minHeight: HEIGHT.height,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 25,
  },
  iconPopup: {
    marginBottom: 15,
  },
  headerPopup: {
    fontSize: 24,
    fontFamily: FONTS.medium,
    color: "white",
    marginBottom: 20,
  },
  textPopup: {
    fontSize: 16,
    color: "white",
    marginBottom: 12,
  },
  closePopup: {
    position: "absolute",
    top: 10,
    right: 10,
  },
};

export default PopupComponent;
