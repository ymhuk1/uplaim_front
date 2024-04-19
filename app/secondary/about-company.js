import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import HeaderComponent from "../../components/HeaderComponent";
import PopupComponent from "../../components/PopupComponent";
import TagComponent from "../../components/TagComponent";
import Modal from "react-native-modal";
import { Link, useGlobalSearchParams } from "expo-router";
import Constants from "expo-constants";
import { Image, ImageBackground } from "expo-image";
import { HEIGHT } from "../../constants/theme";
import FeedbackComponent from "../../components/feedbackComponent";

const apiBaseUrl = Constants.expoConfig.extra.API_PROD;

export default function AboutCompany() {
  const { id } = useGlobalSearchParams();

  const [textValue, setTextValue] = useState("О компании");
  const [isTooltipVisible, setTooltipVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [company, setCompany] = useState({});
  const [isFeedbackVisible, setFeedbackVisible] = useState(false);

  const companyId = id;

  const toggleTooltip = () => {
    setTooltipVisible(!isTooltipVisible);
  };

  const toggleFeedback = () => {
    setFeedbackVisible(!isFeedbackVisible);
  };

  const fetchData = () => {
    fetch(`${apiBaseUrl}/api/companies/${companyId}`)
      .then((response) => response.json())
      .then((data) => {
        const { company } = data;
        // console.log("Данные успешно получены:", data);
        setCompany(company);
        setRefreshing(false);
      })
      .catch((error) => {
        console.error("Ошибка при загрузке данных: ", error);
        setRefreshing(false);
      });
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <ImageBackground
          source={require("../../assets/background.png")}
          contentFit={"cover"}
          style={styles.containerViewImg}
        >
          <View style={styles.containerView}>
            <HeaderComponent text={textValue} secondary={true} />
            <View style={styles.topContainer}>
              <Image
                contentFit="contain"
                contentPosition={"center"}
                transition={1000}
                source={apiBaseUrl + company.main_photo}
                width={74}
                height={74}
                style={styles.logoCompany}
              />
              <View style={styles.infoTopContainer}>
                <View style={styles.textTopContainer}>
                  <Text style={styles.textTop}>{company.name}</Text>
                  <Image
                    contentFit="contain"
                    contentPosition={"center"}
                    transition={1000}
                    source={require("../../assets/link-out.svg")}
                    width={24}
                    height={24}
                  />
                </View>
                <TagComponent tags={company.tags} />
              </View>
            </View>
            <View style={styles.addressContainer}>
              <View style={styles.iconTextContainer}>
                <Image
                  contentFit="contain"
                  contentPosition={"center"}
                  transition={1000}
                  source={require("../../assets/location-pin-alt-1.svg")}
                  width={24}
                  height={24}
                />
                <Text style={styles.textWhite}>{company.address}</Text>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.textPurple}>Другие филиалы</Text>
              </View>
              <TouchableOpacity
                style={styles.iconTextContainer}
                onPress={toggleTooltip}
                activeOpacity={1}
              >
                <Image
                  contentFit="contain"
                  contentPosition={"center"}
                  transition={1000}
                  source={require("../../assets/clock-five.svg")}
                  width={24}
                  height={24}
                />
                <Text style={styles.textWhite}>
                  {company.schedule !== undefined
                    ? company.schedule
                    : "Не указано"}
                </Text>
                {/*<Tooltip  style={styles.tooltip} onPress={toggleTooltip} />*/}
                <Image
                  contentFit="contain"
                  contentPosition={"center"}
                  transition={1000}
                  source={require("../../assets/tooltip.svg")}
                  width={16}
                  height={16}
                  style={styles.tooltip}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.contactContainer}>
              <View style={styles.itemContactContainer}>
                <Image
                  contentFit="contain"
                  contentPosition={"center"}
                  transition={1000}
                  source={require("../../assets/phone.svg")}
                  width={24}
                  height={24}
                />
                <Text style={styles.textContactContainer}>Позвонить</Text>
              </View>
              <TouchableOpacity
                style={styles.itemContactContainer}
                onPress={toggleTooltip}
              >
                <Image
                  contentFit="contain"
                  contentPosition={"center"}
                  transition={1000}
                  source={require("../../assets/message-chat.svg")}
                  width={24}
                  height={24}
                />
                <Text style={styles.textContactContainer}>Написать</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.itemContactContainer}
                onPress={toggleFeedback}
              >
                <Image
                  contentFit="contain"
                  contentPosition={"center"}
                  transition={1000}
                  source={require("../../assets/star.svg")}
                  width={24}
                  height={24}
                />
                <Text style={styles.textContactContainer}>Отзыв</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.descriptionContainer}>
              <Text style={styles.descriptionText}>
                {company.full_description}
              </Text>
            </View>
          </View>
        </ImageBackground>
      </ScrollView>
      {isTooltipVisible && (
        <Modal
          isVisible={isTooltipVisible}
          onBackdropPress={toggleTooltip}
          style={styles.modal}
        >
          <PopupComponent
            onClose={toggleTooltip}
            height={220}
            headerPopup={"Режим работы:"}
            textPopup1={
              company.working_hours !== undefined
                ? company.working_hours
                : "Не указано"
            }
            textPopup2={
              company.working_hours_weekend !== undefined
                ? company.working_hours_weekend
                : "Не указано"
            }
          />
        </Modal>
      )}
      {isFeedbackVisible && (
        <Modal
          isVisible={isFeedbackVisible}
          onBackdropPress={toggleFeedback}
          style={styles.modalFeedback}
        >
          <FeedbackComponent
            onClose={toggleFeedback}
            height={525}
            headerPopup1={"Поставьте оценку"}
            headerPopup2={"Опишите плюсы и минусы"}
            textPopup1={"Приемущества"}
            textPopup2={"Недостатки"}
            textPopup3={"Комментарий"}
          />
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  containerViewImg: {
    minHeight: HEIGHT.height,
  },
  containerView: {
    marginHorizontal: 15,
    // height: 835,
  },
  topContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  logoCompany: {
    borderRadius: 12,
  },
  infoTopContainer: {
    marginLeft: 15,
  },
  textTopContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 15,
    justifyContent: "space-between",
  },
  logo: {
    width: 74,
    height: 74,
  },
  textTop: {
    fontWeight: "bold",
    fontSize: 24,
    color: "white",
    marginBottom: -5,
    marginRight: 5,
  },
  addressContainer: {
    height: 120,
    width: "100%",
    borderRadius: 12,
    backgroundColor: "#24224A",
    paddingVertical: 16,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  iconTextContainer: {
    flexDirection: "row",
    marginBottom: 8,
  },
  textContainer: {
    marginLeft: 26,
  },
  textWhite: {
    marginLeft: 5,
    fontSize: 16,
    color: "white",
  },
  textPurple: {
    fontSize: 12,
    color: "#9B51E0",
    marginBottom: 16,
  },
  tooltip: {
    marginBottom: -7,
    marginLeft: 5,
  },
  contactContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  itemContactContainer: {
    height: 65,
    width: "31%",
    alignItems: "center",
    backgroundColor: "#24224A",
    padding: 10,
    borderRadius: 16,
  },
  textContactContainer: {
    fontSize: 14,
    color: "white",
  },
  descriptionContainer: {
    backgroundColor: "#24224A",
    borderRadius: 12,
    padding: 15,
  },
  descriptionText: {
    fontSize: 14,
    color: "white",
  },
  modal: {
    marginHorizontal: 0,
  },
  modalFeedback: {
    marginHorizontal: 0,
  },
});
