import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Modal,
  TouchableOpacity,
  Button,
  Pressable,
  ActivityIndicator,
  PanResponder,
} from "react-native";
import { Image, ImageSource } from "expo-image";
import Constants from "expo-constants";
import Swiper from "react-native-swiper";
import ButtonComponent from "./ButtonComponent";
import { elemBackgroundColor, textDisabledColor } from "./ColorsComponent";
import NewButtonComponent from "./NewButtonComponent";
import { LinearGradient } from "expo-linear-gradient";

const apiBaseUrl = Constants.expoConfig.extra.API_PROD;

const GradientBottom = ({ name, description }) => {
  return (
    <LinearGradient
      colors={["rgba(255,255,255,0)", "rgba(42,41,45,0.95)"]}
      style={[
        {
          width: "100%",
          height: 300,
          borderBottomRightRadius: 16,
          borderBottomLeftRadius: 16,
          justifyContent: "flex-end",
        },
      ]}
    >
      <View style={styles.infoDopContainer}>
        <Text style={styles.infoName}>{name}</Text>
        <Text style={styles.infoDescription}>{description}</Text>
        <NewButtonComponent
          title={"Рекомендовать"}
          filled={true}
          height={48}
          fontSize={18}
          onPress={() => {}}
        />
      </View>
    </LinearGradient>
  );
};

const StoryComponent = ({ data, stories }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const openFullScreen = (index) => {
    setSelectedIndex(index);
    setModalVisible(true);
  };

  const closeFullScreen = () => {
    setModalVisible(false);
  };

  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dy > 50) {
          closeFullScreen();
        }
      },
      onPanResponderRelease: () => {},
    })
  ).current;

  return (
    <ScrollView
      style={styles.storiesContainer}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {data.map((item, index) => {
        return (
          <TouchableOpacity
            key={item.id}
            onPress={() => openFullScreen(index)}
            activeOpacity={0.7}
          >
            <View style={styles.story}>
              <Image
                contentFit="cover"
                contentPosition="center"
                transition={1000}
                source={{ uri: apiBaseUrl + item.icon }}
                width={46}
                height={46}
                style={styles.iconStories}
              />
              <LinearGradient
                style={styles.shadowText}
                colors={["rgba(255,255,255,0)", "rgba(35,33,33,0.64)"]}
              >
                <View style={styles.textContainer}>
                  <Text style={styles.textStories}>{item.name}</Text>
                </View>
              </LinearGradient>
            </View>
          </TouchableOpacity>
        );
      })}
      {stories && (
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={closeFullScreen}
          >
            <View style={{ flex: 1 }} {...panResponder.panHandlers}>
              <Swiper
                loop={true}
                index={selectedIndex}
                dot={<View style={styles.dot} />}
                activeDot={<View style={styles.activeDot} />}
                onIndexChanged={(index) => setSelectedIndex(index)}
                paginationStyle={{
                  top: -710,
                }}
              >
                {data.map((item) => (
                  <View key={item.id} style={styles.fullScreenContainer}>
                    {item.photo ? (
                      <Image
                        contentFit="cover"
                        contentPosition="center"
                        transition={0}
                        source={apiBaseUrl + item.photo}
                        style={styles.fullScreenImage}
                      />
                    ) : (
                      <View style={styles.fullScreenEmpty}></View>
                    )}

                    <View style={styles.infoContainer}>
                      <GradientBottom
                        name={item.name}
                        description={item.description}
                      />
                    </View>
                  </View>
                ))}
              </Swiper>
            </View>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={closeFullScreen}
            >
              <Image
                contentFit="contain"
                contentPosition="center"
                transition={1000}
                source={require("../assets/closeModal.svg")}
                width={36}
                height={36}
              />
            </TouchableOpacity>
          </Modal>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  storiesContainer: {
    overflow: "hidden",
    flexDirection: "row",
    // marginBottom: 30,
    marginRight: -15,
  },
  story: {
    width: 120,
    height: 112,
    borderRadius: 12,
    backgroundColor: "#24224A",
    marginRight: 10,
  },
  shadowText: {
    height: 100,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 12,
  },
  iconStories: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
  textContainer: {
    position: "absolute",
    marginHorizontal: 10,
    bottom: 0,
    justifyContent: "flex-end",
    marginVertical: 7,
  },
  textStories: {
    fontSize: 12,
    color: "white",
    fontWeight: "bold",
  },
  fullScreenContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20,
  },
  fullScreenImage: {
    width: "96%",
    height: "100%",
    borderRadius: 16,
  },
  fullScreenEmpty: {
    width: "96%",
    height: "100%",
    backgroundColor: elemBackgroundColor,
    borderRadius: 16,
  },
  closeButton: {
    position: "absolute",
    right: 10,
    padding: 10,
  },
  dot: {
    backgroundColor: "rgba(255,255,255,.2)",
    width: 44,
    height: 5,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
  activeDot: {
    backgroundColor: "rgba(255,255,255,1)",
    width: 44,
    height: 5,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
  infoContainer: {
    position: "absolute",
    bottom: 20,
    width: "96%",
    verticalAlign: "bottom",
    justifyContent: "flex-end",
    alignContent: "flex-end",
    alignItems: "flex-end",
  },
  infoDopContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  infoName: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
    marginBottom: 5,
  },
  infoDescription: {
    fontSize: 16,
    color: "white",
    marginBottom: 10,
  },
  storySelect: {
    borderWidth: 1,
    borderColor: "transparent",
  },
  selectedCategory: {
    borderColor: "red",
  },
});

export default StoryComponent;
