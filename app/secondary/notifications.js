import {
  Modal,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Constants from "expo-constants";
import HeaderComponent from "../../components/HeaderComponent";
import React, { useEffect, useState } from "react";
import { Image, ImageBackground } from "expo-image";
import {
  elemBackgroundColor,
  fuchsia,
  textColor3,
  textColor4,
  textPrimaryColor,
} from "../../components/ColorsComponent";
import { useLocalSearchParams } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { format, isToday } from "date-fns";
import { ru } from "date-fns/locale";
import { UTCDate } from "@date-fns/utc";
import { FONTS } from "../../constants/theme";

const apiBaseUrl = Constants.expoConfig.extra.API_PROD;

export default function Notifications() {
  const [textValue, setTextValue] = useState("Уведомления");
  const [refreshing, setRefreshing] = useState(false);
  const [notificationsGroup, setNotificationsGroup] = useState(null);
  const [clientId, setClientId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectNotifications, setSelectNotifications] = useState(null);

  const fetchData = (id, is_read, date, type_notify) => {
    const encodedDate = encodeURIComponent(date);

    const url = `${apiBaseUrl}api/notifications?client_id=${id}${
      is_read ? `&is_read=${is_read}` : ""
    }${date ? `&date=${encodedDate}` : ""}${
      type_notify ? `&type_notify=${type_notify}` : ""
    }`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const { tariffs } = data;
        console.log('Данные успешно получены:', data.notifications);
        setNotificationsGroup(data.notifications);
        setRefreshing(false);
      })
      .catch((error) => {
        console.error("Ошибка при загрузке данных: ", error);
        setRefreshing(false);
      });
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const clientData = await SecureStore.getItemAsync("clientData");
        const client = JSON.parse(clientData).client
        if (client) {
          setClientId(client.id);
          await fetchData(client.id);
        }
      } catch (error) {
        console.error("Error loading user data:", error);
      } finally {
        setRefreshing(false);
      }
    };

    loadData();
  }, []);

  const getNotificationTypeLabel = (type) => {
    let label = "";
    let iconSource = "";

    switch (type) {
      case "referral":
        label = "Партнерская программа";
        iconSource = require("../../assets/referral_notify.svg");
        break;
      case "exchange":
        label = "Сделки";
        iconSource = require("../../assets/referral_notify.svg");
        break;
      default:
        label = "Другие";
        iconSource = require("../../assets/referral_notify.svg");
        break;
    }

    return { label, iconSource };
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchData(clientId);
  };

  const groupNotificationsByTypeAndDate = () => {
    const groupedNotifications = {};
    if (notificationsGroup) {
      notificationsGroup.forEach((notification) => {
        const date = new Date(notification.created_at);
        if (date instanceof Date && !isNaN(date)) {
          const dateKey = date.toISOString().slice(0, 10);

          const type = notification.type;

          if (!groupedNotifications[dateKey]) {
            groupedNotifications[dateKey] = {};
          }

          if (!groupedNotifications[dateKey][type]) {
            groupedNotifications[dateKey][type] = [];
          }

          groupedNotifications[dateKey][type].push(notification);
        } else {
          console.error("Invalid date:", notification.created_at);
        }
      });

      const sortedDates = Object.keys(groupedNotifications).sort((a, b) => {
        const dateA = new Date(a);
        const dateB = new Date(b);
        return dateB - dateA;
      });

      const sortedGroupedNotifications = {};
      sortedDates.forEach((dateKey) => {
        sortedGroupedNotifications[dateKey] = groupedNotifications[dateKey];
      });

      return sortedGroupedNotifications;
    }
    return groupedNotifications;
  };

  return (
    <View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <ImageBackground
          source={require("../../assets/background.png")}
          contentFit="cover"
        >
          <View style={styles.containerView}>
            <HeaderComponent text={textValue} secondary={true} />
            {notificationsGroup?.length > 0 ? (
              <View>
                {Object.entries(groupNotificationsByTypeAndDate()).map(
                  ([dateKey, notificationsByDate]) => (
                    <View key={dateKey}>
                      <Text style={styles.dateText}>
                        {isToday(new UTCDate(dateKey))
                          ? "Сегодня"
                          : format(new Date(dateKey), "dd MMMM", {
                              locale: ru,
                            })}
                      </Text>
                      {Object.entries(notificationsByDate).map(
                        ([type, notifications]) => {
                          const unreadNotifications = notifications.filter(
                            (notification) => !notification.read
                          );

                          return (
                            <TouchableOpacity
                              key={type}
                              onPress={() => {
                                setModalVisible(!modalVisible);
                                setSelectNotifications(notifications);
                                fetchData(
                                  clientId,
                                  true,
                                  notifications[0].created_on,
                                  notifications[0].type
                                );
                              }}
                            >
                              <View style={styles.containerGroupNotify}>
                                <View style={styles.containerGroupNotifyLeft}>
                                  <View style={styles.groupNotifyLeftIcon}>
                                    <Image
                                      contentFit="contain"
                                      contentPosition="center"
                                      transition={1000}
                                      source={
                                        getNotificationTypeLabel(type)
                                          .iconSource
                                      }
                                      width={24}
                                      height={24}
                                    />
                                  </View>
                                  <Text style={styles.groupNotifyLeftText}>
                                    {getNotificationTypeLabel(type).label}
                                  </Text>
                                </View>
                                <View style={styles.containerGroupNotifyRight}>
                                  <Image
                                    contentFit="contain"
                                    contentPosition="center"
                                    transition={1000}
                                    source={require("../../assets/message-square.svg")}
                                    width={24}
                                    height={24}
                                  />
                                  {unreadNotifications.length > 0 && (
                                    <View
                                      style={styles.groupNotifyCountContainer}
                                    >
                                      <Text style={styles.groupNotifyCount}>
                                        {unreadNotifications.length}
                                      </Text>
                                    </View>
                                  )}
                                </View>
                              </View>
                            </TouchableOpacity>
                          );
                        }
                      )}
                      <Modal
                        animationType="fade"
                        transparent={true}
                        visible={modalVisible}
                      >
                        <View style={styles.centeredView}>
                          <View style={styles.modalContent}>
                            <Text style={styles.modalHeader}>
                              {
                                getNotificationTypeLabel(
                                  selectNotifications
                                    ? selectNotifications[0].type
                                    : ""
                                ).label
                              }
                            </Text>
                            {selectNotifications &&
                              selectNotifications.map((notification, index) => (
                                <View key={index} style={styles.modalItem}>
                                  <Image
                                    contentFit="contain"
                                    contentPosition="center"
                                    transition={1000}
                                    source={require("../../assets/ref_notify.svg")}
                                    width={33}
                                    height={33}
                                  />
                                  <View style={styles.modalText}>
                                    <Text style={styles.modalTextHeader}>
                                      {notification.title}
                                    </Text>
                                    <Text style={styles.modalTextDop}>
                                      {notification.description}
                                    </Text>
                                  </View>
                                </View>
                              ))}
                          </View>

                          <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setModalVisible(!modalVisible)}
                          >
                            <Image
                              contentFit="contain"
                              contentPosition="center"
                              source={require("../../assets/closeModal.svg")}
                              width={36}
                              height={36}
                            />
                          </TouchableOpacity>
                        </View>
                      </Modal>
                    </View>
                  )
                )}
              </View>
            ) : (
              <View style={styles.containerEmptyNotify}>
                <Text style={styles.emptyNotify}>
                  У вас пока нет уведомлений
                </Text>
              </View>
            )}
          </View>
        </ImageBackground>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  containerView: {
    marginHorizontal: 15,
    height: 1050,
    flex: 1,
  },
  dateText: {
    color: textPrimaryColor,
    fontFamily: FONTS.medium,
    fontSize: 16,
    marginVertical: 10,
  },
  containerGroupNotify: {
    justifyContent: "space-between",
    borderRadius: 12,
    backgroundColor: elemBackgroundColor,
    height: 50,
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingRight: 20,
    marginBottom: 8,
  },
  containerGroupNotifyLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  groupNotifyLeftIcon: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: textColor4,
    height: 32,
    width: 32,
    marginRight: 10,
  },
  groupNotifyLeftText: {
    color: textPrimaryColor,
    fontFamily: FONTS.medium,
    fontSize: 16,
  },
  containerGroupNotifyRight: {
    justifyContent: "center",
    alignItems: "center",
  },
  groupNotifyCountContainer: {
    backgroundColor: fuchsia,
    position: "absolute",
    bottom: 10,
    left: 15,
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 4,
  },
  groupNotifyCount: {
    fontSize: 10,
    fontFamily: FONTS.medium,
    color: textPrimaryColor,
  },
  centeredView: {
    marginHorizontal: 15,
    borderRadius: 16,
    height: "98%",
    backgroundColor: elemBackgroundColor,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  modalContent: {
    alignItems: "center",
    marginTop: 50,
  },
  modalHeader: {
    color: textPrimaryColor,
    fontSize: 24,
    fontFamily: FONTS.medium,
    marginBottom: 10,
  },
  modalItem: {
    alignItems: "center",
    flexDirection: "row",
    marginVertical: 5,
    width: "100%",
    paddingHorizontal: 15,
  },
  modalText: {
    marginLeft: 10,
  },
  modalTextHeader: {
    color: textPrimaryColor,
    fontSize: 14,
    fontFamily: FONTS.medium,
    width: "70%",
  },
  modalTextDop: {
    color: textPrimaryColor,
    fontSize: 12,
  },
  containerEmptyNotify: {
    justifyContent: "center",
    marginTop: 300,
  },
  emptyNotify: {
    textAlign: "center",
    color: textPrimaryColor,
    fontSize: 16,
  },
});
