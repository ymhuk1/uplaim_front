import React, { memo } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import SearchComponent from "./SearchComponent";
import { useRouter } from "expo-router";
import { Image } from "expo-image";
import { textErrorColor } from "./ColorsComponent";
import { Skeleton } from "moti/skeleton";
import { FONTS, SIZES, SKELETON } from "../constants/theme";

const HeaderComponent = ({ text, secondary, home, main, notify, skeleton }) => {
  const router = useRouter();

  const isMainScreen = home;
  const isOverScreen = secondary;

  const renderHeader = () => {
    if (isMainScreen) {
      return (
        <View style={{ paddingTop: 50 }}>
          <Skeleton show={skeleton} height={40} width={"100%"} {...SKELETON}>
            <View style={styles.headerContainer}>
              <TouchableOpacity
                onPress={() =>
                  router.push({ pathname: "/secondary/recommendPage" })
                }
              >
                <Image
                  contentFit="contain"
                  contentPosition={"center"}
                  transition={1000}
                  source={require("../assets/bottom-menu/qrcode_gr.svg")}
                  width={40}
                  height={40}
                  style={styles.iconContainer}
                />
              </TouchableOpacity>
              <SearchComponent style={{ width: 250 }} main={main} />
              <TouchableOpacity
                onPress={() =>
                  router.push({ pathname: "/secondary/notifications" })
                }
              >
                <Image
                  contentFit="contain"
                  contentPosition={"center"}
                  transition={1000}
                  source={require("../assets/notice.svg")}
                  width={30}
                  height={30}
                />
                {notify && <View style={styles.iconCountContainer}></View>}
              </TouchableOpacity>
            </View>
          </Skeleton>
        </View>
      );
    } else if (isOverScreen) {
      return (
        <View style={styles.headerContainerBack}>
          <TouchableOpacity onPress={() => router.back()} title={" "}>
            <Image
              contentFit="contain"
              contentPosition={"center"}
              transition={1000}
              source={require("../assets/arrow-left.svg")}
              width={32}
              height={32}
            />
          </TouchableOpacity>
          <Text style={styles.headerText}>{text}</Text>
        </View>
      );
    }
  };

  return <View style={styles.container}>{renderHeader()}</View>;
};

const styles = StyleSheet.create({
  container: {
    // height: 90,

    // backgroundColor: "red",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerContainerBack: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 50,
  },
  iconContainer: {},
  iconCountContainer: {
    position: "absolute",
    borderRadius: 10,
    right: 1,
    bottom: 1,
    width: 12,
    height: 12,
    backgroundColor: textErrorColor,
  },
  headerText: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.xLarge,
    color: "white",
    marginBottom: 2,
  },
});

export default memo(HeaderComponent);
