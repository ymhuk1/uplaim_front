import { Modal, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Image, ImageBackground } from "expo-image";
import HeaderComponent from "../../components/HeaderComponent";
import { FONTS, HEIGHT, WIDTH } from "../../constants/theme";
import {
  elemBackgroundColor,
  textPrimaryColor,
} from "../../components/ColorsComponent";
import FitnessGift from "../../components/FitnessCardComponent";
import UniversalModal from "../../components/ModalWindowComponent";
import Constants from "expo-constants";

const apiBaseUrl = Constants.expoConfig.extra.API_PROD;

export default function AllTasks() {
  const [textValue, setTextValue] = useState("Все задания");
  const [isTooltipVisible, setTooltipVisible] = useState(false);
  const [tasks, setTasks] = useState([]);

  const toggleTooltip = () => {
    setTooltipVisible(!isTooltipVisible);
  };

  const fetchData = async () => {
    // All tasks
    const allTasksResponse = await fetch(`${apiBaseUrl}api/all_tasks`);
    if (allTasksResponse.ok) {
      const data = await allTasksResponse.json();
      // console.log("Данные Tasks успешно получены:", data);
      setTasks(data);
    } else {
      console.error("Произошла ошибка при получении данных задач");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <ImageBackground
        source={require("../../assets/background.png")}
        contentFit={"cover"}
        style={styles.containerImg}
      >
        <HeaderComponent text={textValue} secondary={true} />
        <View style={styles.tickets__wrapper}>
          <View
            style={[
              styles.tickets__wrapper_image,
              { borderColor: "#50FF9A", borderWidth: 1 },
            ]}
          >
            <Image
              source={require("../../assets/ticket-green.svg")}
              height={17}
              width={45}
            />
          </View>
          <View style={styles.tickets__wrapper_image}>
            <Image
              source={require("../../assets/ticket-orange.svg")}
              height={17}
              width={45}
            />
          </View>
          <View style={styles.tickets__wrapper_image}>
            <Image
              source={require("../../assets/ticket-fuksia.svg")}
              height={17}
              width={45}
            />
          </View>
          <View style={styles.tickets__wrapper_image}>
            <Image
              source={require("../../assets/up.svg")}
              height={18}
              width={28}
            />
          </View>
        </View>
        <Text style={styles.title__text}>Регулярные задания</Text>
        {tasks.length > 0 &&
          tasks.map((task) => (
            <View style={{ columnGap: 20 }} key={task.id}>
              <FitnessGift
                imageSource={apiBaseUrl + task.photo}
                balanceImageSource={
                  task.reward_type === "up"
                    ? require("../../assets/up.svg")
                    : null
                }
                balanceSource={task.reward_type}
                statusImageSource={
                  task.status !== "activate"
                    ? require("../../assets/gifts/clock.svg")
                    : require("../../assets/gifts/success.svg")
                }
                title={task.name}
                description={task.description}
                count={task.quantity === null ? "1" : task.quantity}
                maxCount={task.quantity === null ? "1" : task.quantity}
                endDate={"до " + task.date_end.slice(0, 10)}
                balance={10}
                balanceImageHeight={14}
                balanceImageWidth={22}
                onClose={toggleTooltip}
              />
            </View>
          ))}
        <Text style={styles.title__text}>Разовые задания</Text>
        {tasks.length > 0 &&
          tasks.map((task, index) => (
            <View style={{ columnGap: 20 }} key={index}>
              <FitnessGift
                imageSource={apiBaseUrl + task.photo}
                balanceImageSource={
                  task.reward_type === "up"
                    ? require("../../assets/up.svg")
                    : null
                }
                balanceSource={task.reward_type}
                statusImageSource={
                  task.status !== "activate"
                    ? require("../../assets/gifts/clock.svg")
                    : require("../../assets/gifts/success.svg")
                }
                title={task.name}
                description={task.description}
                count={task.quantity === null ? "1" : task.quantity}
                maxCount={task.quantity === null ? "1" : task.quantity}
                endDate={"до " + task.date_end.slice(0, 10)}
                balance={10}
                balanceImageHeight={14}
                balanceImageWidth={22}
                onClose={toggleTooltip}
              />
            </View>
          ))}
        {isTooltipVisible && (
          <Modal
            visible={isTooltipVisible}
            animationType="slide"
            transparent={true}
          >
            <UniversalModal
              onClose={toggleTooltip}
              title={tasks[0].name}
              title2={"Получаете"}
              buttonTitle={"К покупкам"}
              balance={tasks[0].reward_type}
              balanceUp={tasks[0].reward_type}
              content={tasks[0].description}
              sourceImg={apiBaseUrl + tasks[0].photo}
              dateText={tasks[0].short_description}
            />
          </Modal>
        )}
      </ImageBackground>
    </ScrollView>
  );
}

let ticketsWrapperImageWidth = (WIDTH.width - 60) / 4;

const styles = StyleSheet.create({
  container: {},
  containerImg: {
    minHeight: HEIGHT.height,
    paddingHorizontal: 15,
  },
  tickets__wrapper: {
    marginTop: 12,
    flexDirection: "row",
    columnGap: 10,
    marginBottom: 20,
  },
  tickets__wrapper_image: {
    height: 37,
    width: ticketsWrapperImageWidth,
    backgroundColor: elemBackgroundColor,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  title__text: {
    fontFamily: FONTS.medium,
    fontSize: 24,
    color: textPrimaryColor,
  },
});
