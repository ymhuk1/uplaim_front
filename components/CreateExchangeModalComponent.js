import {
  Modal,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
} from "react-native";
import InputComponent from "./InputComponent";
import { Image } from "expo-image";
import React, { useEffect, useMemo, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { router, useGlobalSearchParams, useRouter } from "expo-router";
import { textPrimaryColor } from "./ColorsComponent";
import CheckboxComponent from "./CheckboxComponent";
import NewInputComponent from "./NewInputComponent";
import NewCheckboxComponent from "./NewCheckboxComponent";
import NewButtonComponent from "./NewButtonComponent";
import SwitchComponent from "./SwitchComponent";
import * as SecureStore from "expo-secure-store";
import InfoModalComponent from "./InfoModalComponent";
import ErrorModalComponent from "./ErrorModalComponent";
import { FONTS } from "../constants/theme";

const GradientModal = ({ width, height, content }) => {
  return (
    <LinearGradient
      start={[1.5, 0.25]}
      end={[-0.5, 0.6]}
      colors={["#242249", "rgba(139,42,145,0.27)", "#201E41"]}
      width={width}
      height={height}
      style={styles.modalGradient}
    >
      {content}
    </LinearGradient>
  );
};

export default function CreateExchangeModalComponent({
  visible,
  onRequestClose,
  selectedTakerItems,
  companyId,
  companiesData,
  ballsData,
  apiBaseUrl,
  typeDeal,
  edit,
  companyOrCategory,
}) {
  const [giveBalls, setGiveBalls] = useState("");
  const [getBalls, setGetBalls] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [filteredBall, setFilteredBall] = useState(null);
  const [saveupCash, setSaveupCash] = useState("");
  const [clientId, setClientId] = useState("");
  const [clientCity, setClientCity] = useState("");

  const [isEnabled, setIsEnabled] = useState(false);
  const [error, setError] = useState(null);
  const [errorModal, setErrorModal] = useState(false);

  const {
    deal,
    existGiveBalls,
    existGetBalls,
    existExchangeId,
    existGiveSaveup,
    existGetSaveup,
    existGiveCash,
    existGetCash,
    existCompanyTaker,
    existTypeDeal,
    existHolderId,
  } = useGlobalSearchParams();

  const router = useRouter();

  const handleSwitchToggle = () => {
    setIsEnabled((previousState) => !previousState);
  };

  const closeFullScreen = () => setErrorModal(false);

  function findMatchingBall(ballsData, companyId) {
    if (deal === "edit" || deal === "offer") {
      return ballsData?.find((item) => item.company_id === companyId);
    } else {
      return ballsData?.find((item) => item.company_id === companyId);
    }
  }

  useEffect(() => {
    setFilteredBall(findMatchingBall(ballsData, parseInt(companyId)));

    if (deal === "edit" || deal === "offer") {
      setGiveBalls(existGiveBalls);
      setGetBalls(existGetBalls);

      if (typeDeal === "sell" || typeDeal === "exchange_sell") {
        setSaveupCash(existGetSaveup ? existGetSaveup : existGetCash);
        setIsEnabled(!!existGetSaveup);
      } else if (typeDeal === "buy") {
        setSaveupCash(existGiveSaveup ? existGiveSaveup : existGiveCash);
        setIsEnabled(!!existGiveSaveup);
      }
    } else if (filteredBall) {
      setGiveBalls(String(filteredBall.balls));
    }
    loadUserData();
  }, [ballsData, companyId, filteredBall]);

  const loadUserData = async () => {
    try {
      const client = await SecureStore.getItemAsync("clientData");

      if (client) {
        setClientId(JSON.parse(client).id);
        setClientCity(JSON.parse(client).last_name);
      }
      console.log("clientId: ", clientId);
    } catch (error) {
      console.error("Ошибка при загрузке данных пользователя:", error);
    }
  };

  const createDeal = async () => {
    try {
      const url = `${apiBaseUrl}api/exchange/create`;
      const userToken = await SecureStore.getItemAsync("userData");
      const token = userToken ? JSON.parse(userToken).token : null;

      if (!token) {
        console.error("Токен не найден.");
        return;
      }
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          holder_id: clientId,
          last_holder_id: deal === "offer" ? existHolderId : null,
          type_deal: typeDeal,
          give_balls: giveBalls ? giveBalls : null,
          get_balls: getBalls ? getBalls : null,
          holder_company_id: companyId ? companyId : null,
          status: "active",
          give_saveup: typeDeal === "buy" && isEnabled ? saveupCash : null,
          get_saveup:
            (typeDeal === "exchange_sell" || typeDeal === "sell") && isEnabled
              ? saveupCash
              : null,
          give_cash: typeDeal === "buy" && !isEnabled ? saveupCash : null,
          get_cash:
            (typeDeal === "exchange_sell" || typeDeal === "sell") && !isEnabled
              ? saveupCash
              : null,
          taker_companies:
            companyOrCategory === "Баллы в компании" ||
            companyOrCategory === null
              ? selectedTakerItems
              : [],
          taker_categories:
            companyOrCategory === "Баллы в категории" ? selectedTakerItems : [],
          partial_deal: isChecked,
          counter_deal: deal === "offer",
          city_deal: clientCity ? clientCity : null,
        }),
      });
      if (response.ok) {
        console.log("Сделка создана!");
        router.push({
          pathname: "/home/exchange",
          params: { statusExchange: "create" },
        });
      } else {
        const errorBody = await response.json();
        setError(errorBody.error);
        setErrorModal(true);
      }
    } catch (error) {
      console.error("Ошибка при выполнении запроса:", error);
    }
  };

  const updateDeal = async () => {
    try {
      const url = `${apiBaseUrl}api/exchange/update/${existExchangeId}`;

      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          give_balls: giveBalls,
          get_balls: getBalls,
          status: "active",
          give_saveup: typeDeal === "buy" && isEnabled ? saveupCash : null,
          get_saveup:
            (typeDeal === "exchange_sell" || typeDeal === "sell") && isEnabled
              ? saveupCash
              : null,
          give_cash: typeDeal === "buy" && !isEnabled ? saveupCash : null,
          get_cash:
            (typeDeal === "exchange_sell" || typeDeal === "sell") && !isEnabled
              ? saveupCash
              : null,
          taker_companies: selectedTakerItems,
          // taker_categories: ["2"],
          // partial_deal: true
        }),
      });

      if (response.ok) {
        console.log("Сделка обновлена!");
        router.push({
          pathname: "/home/exchange",
          params: { statusExchange: "update" },
        });
      } else {
        console.error("Ошибка при создании сделки:", response.status);
        setErrorModal(true);
      }
    } catch (error) {
      console.error("Ошибка при выполнении запроса:", error);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}
    >
      <ScrollView>
        <View style={styles.createExchangeModal}>
          <GradientModal
            width={"100%"}
            height={"100%"}
            content={
              <View style={styles.modalContainer}>
                {typeDeal === "exchange" && (
                  <View style={styles.modalContainerGive}>
                    {filteredBall && (
                      <View style={styles.modalContainerGive}>
                        <View style={styles.modalContainerTextAll}>
                          <View style={styles.modalContainerCompanyText}>
                            <Text style={styles.modalDopText}>Обмен</Text>
                            <Image
                              style={styles.modalCompanyLogo}
                              contentFit="contain"
                              contentPosition="center"
                              source={apiBaseUrl + filteredBall.company_logo}
                              width={33}
                              height={33}
                            />
                            <Text style={styles.modalCompanyName}>
                              {filteredBall.company_name}
                            </Text>
                          </View>
                        </View>
                        <View style={styles.modalContainerTextBallsGive}>
                          <Text style={styles.modalTextBallsGive}>
                            Количество баллов
                          </Text>
                        </View>
                        <NewInputComponent
                          value={giveBalls}
                          maxLength={String(filteredBall.balls).length}
                          onChangeText={(value) => {
                            const newValue = value.replace(/[^0-9]/g, "");
                            const newNumber = Math.min(
                              Number(newValue),
                              Number(filteredBall.balls)
                            );
                            setGiveBalls(String(newNumber));
                            // console.log('giveBalls: ', giveBalls)
                          }}
                        />
                      </View>
                    )}
                    <Image
                      style={[
                        styles.containerIconMiddleExchange,
                        { transform: [{ rotate: "90deg" }] },
                      ]}
                      contentFit="contain"
                      contentPosition="center"
                      source={require("../assets/exchange.svg")}
                      width={32}
                      height={32}
                    />
                    <View style={styles.modalContainerTextAll}>
                      {selectedTakerItems &&
                        selectedTakerItems.map((selectedItemId, index) => {
                          const selectedCompany = companiesData.find(
                            (company) => company.id === selectedItemId
                          );

                          if (selectedCompany) {
                            return (
                              <View key={index}>
                                <View style={styles.modalContainerCompanyText}>
                                  <Text style={styles.modalDopText}>На</Text>
                                  <Image
                                    style={styles.modalCompanyLogo}
                                    contentFit="contain"
                                    contentPosition="center"
                                    source={apiBaseUrl + selectedCompany.photo}
                                    width={33}
                                    height={33}
                                  />
                                  {deal === "edit" || deal === "offer" ? (
                                    <TouchableOpacity onPress={onRequestClose}>
                                      <Text style={styles.modalCompanyName}>
                                        {selectedCompany?.name}
                                      </Text>
                                    </TouchableOpacity>
                                  ) : (
                                    <Text style={styles.modalCompanyName}>
                                      {selectedCompany?.name}
                                    </Text>
                                  )}
                                </View>
                                {index < selectedTakerItems.length - 1 && (
                                  <Text style={styles.modalCompanyOr}>или</Text>
                                )}
                              </View>
                            );
                          }
                        })}
                    </View>
                    <View>
                      <Text style={styles.modalTextBallsGive}>
                        Количество баллов
                      </Text>
                    </View>
                    <NewInputComponent
                      value={getBalls}
                      onChangeText={setGetBalls}
                      maxLength={10}
                      placeholder={"Введите"}
                    />
                    <View style={styles.modalCheckbox}>
                      <NewCheckboxComponent
                        isChecked={isChecked}
                        onToggle={setIsChecked}
                        title={"Возможность частичного обмена"}
                      />
                    </View>
                  </View>
                )}

                {typeDeal === "exchange_sell" && (
                  <View style={styles.modalContainerGive}>
                    {filteredBall && (
                      <View style={styles.modalContainerGive}>
                        <View style={styles.modalContainerTextAll}>
                          <View style={styles.modalContainerCompanyText}>
                            <Text style={styles.modalDopText}>Обмен</Text>
                            <Image
                              style={styles.modalCompanyLogo}
                              contentFit="contain"
                              contentPosition="center"
                              source={apiBaseUrl + filteredBall.company_logo}
                              width={33}
                              height={33}
                            />
                            <Text style={styles.modalCompanyName}>
                              {filteredBall.company_name}
                            </Text>
                          </View>
                        </View>
                        <View style={styles.modalContainerTextBallsGive}>
                          <Text style={styles.modalTextBallsGive}>
                            Количество баллов
                          </Text>
                        </View>
                        <NewInputComponent
                          value={giveBalls}
                          maxLength={String(filteredBall.balls).length}
                          onChangeText={(value) => {
                            const newValue = value.replace(/[^0-9]/g, "");
                            const newNumber = Math.min(
                              Number(newValue),
                              Number(filteredBall.balls)
                            );
                            setGiveBalls(String(newNumber));
                          }}
                        />
                      </View>
                    )}
                    <Image
                      style={[
                        styles.containerIconMiddleExchange,
                        { transform: [{ rotate: "90deg" }] },
                      ]}
                      contentFit="contain"
                      contentPosition="center"
                      source={require("../assets/exchange.svg")}
                      width={32}
                      height={32}
                    />
                    <View style={styles.modalContainerTextAll}>
                      {selectedTakerItems &&
                        selectedTakerItems.map((selectedItemId, index) => {
                          const selectedCompany = companiesData.find(
                            (company) => company.id === selectedItemId
                          );

                          if (selectedCompany) {
                            return (
                              <View key={index}>
                                <View style={styles.modalContainerCompanyText}>
                                  <Text style={styles.modalDopText}>На</Text>
                                  <Image
                                    style={styles.modalCompanyLogo}
                                    contentFit="contain"
                                    contentPosition="center"
                                    source={
                                      apiBaseUrl +
                                      (deal === "edit" || deal === "offer"
                                        ? selectedCompany.photo
                                        : selectedCompany.photo)
                                    }
                                    width={33}
                                    height={33}
                                  />
                                  {deal === "edit" || deal === "offer" ? (
                                    <TouchableOpacity onPress={onRequestClose}>
                                      <Text style={styles.modalCompanyName}>
                                        {selectedCompany?.name}
                                      </Text>
                                    </TouchableOpacity>
                                  ) : (
                                    <Text style={styles.modalCompanyName}>
                                      {selectedCompany?.name}
                                    </Text>
                                  )}
                                </View>
                                {index < selectedTakerItems.length - 1 && (
                                  <Text style={styles.modalCompanyOr}>или</Text>
                                )}
                              </View>
                            );
                          }
                        })}
                    </View>
                    <View>
                      <Text style={styles.modalTextBallsGive}>
                        Количество баллов
                      </Text>
                    </View>
                    <NewInputComponent
                      value={getBalls}
                      onChangeText={setGetBalls}
                      maxLength={10}
                      placeholder={"Введите"}
                    />
                    <Text style={styles.modalDopText}>Или продать за</Text>
                    <SwitchComponent
                      isEnabled={isEnabled}
                      onToggle={handleSwitchToggle}
                    />
                    <NewInputComponent
                      value={saveupCash}
                      onChangeText={setSaveupCash}
                      maxLength={10}
                      placeholder={"Введите"}
                    />
                  </View>
                )}
                {typeDeal === "buy" && (
                  <View style={styles.modalContainerGive}>
                    <Text style={styles.modalDopText}>Купить за</Text>
                    <SwitchComponent
                      isEnabled={isEnabled}
                      onToggle={handleSwitchToggle}
                    />
                    <NewInputComponent
                      value={saveupCash}
                      onChangeText={setSaveupCash}
                    />
                    <Text
                      style={[styles.modalDopText, styles.modalDopTextMore]}
                    >
                      баллы компаний
                    </Text>

                    <View style={styles.modalContainerTextAll}>
                      {selectedTakerItems &&
                        selectedTakerItems.map((selectedItemId, index) => {
                          const selectedCompany = companiesData.find(
                            (company) => company.id === selectedItemId
                          );

                          if (selectedCompany) {
                            return (
                              <View key={index}>
                                <View style={styles.modalContainerCompanyText}>
                                  <Image
                                    style={styles.modalCompanyLogo}
                                    contentFit="contain"
                                    contentPosition="center"
                                    source={apiBaseUrl + selectedCompany.photo}
                                    width={33}
                                    height={33}
                                  />
                                  {deal === "edit" || deal === "offer" ? (
                                    <TouchableOpacity onPress={onRequestClose}>
                                      <Text style={styles.modalCompanyName}>
                                        {selectedCompany?.name}
                                      </Text>
                                    </TouchableOpacity>
                                  ) : (
                                    <Text style={styles.modalCompanyName}>
                                      {selectedCompany?.name}
                                    </Text>
                                  )}
                                </View>
                                {index < selectedTakerItems.length - 1 && (
                                  <Text style={styles.modalCompanyOr}>или</Text>
                                )}
                              </View>
                            );
                          }
                        })}
                    </View>
                    <View>
                      <Text style={styles.modalTextBallsGive}>
                        Количество баллов
                      </Text>
                    </View>
                    <NewInputComponent
                      value={getBalls}
                      onChangeText={setGetBalls}
                      maxLength={10}
                      placeholder={"Введите"}
                    />
                    <View style={styles.modalCheckbox}>
                      <NewCheckboxComponent
                        isChecked={isChecked}
                        onToggle={setIsChecked}
                        title={"Возможность частичного обмена"}
                      />
                    </View>
                  </View>
                )}

                {typeDeal === "sell" && (
                  <View style={styles.modalContainerGive}>
                    {filteredBall && (
                      <View style={styles.modalContainerGive}>
                        <Text
                          style={[styles.modalDopText, styles.modalDopTextMore]}
                        >
                          Продать баллы
                        </Text>
                        <View style={styles.modalContainerTextAll}>
                          <View style={styles.modalContainerCompanyText}>
                            <Image
                              style={styles.modalCompanyLogo}
                              contentFit="contain"
                              contentPosition="center"
                              source={apiBaseUrl + filteredBall.company_logo}
                              width={33}
                              height={33}
                            />
                            <Text style={styles.modalCompanyName}>
                              {filteredBall.company_name}
                            </Text>
                          </View>
                        </View>
                        <View style={styles.modalContainerTextBallsGive}>
                          <Text style={styles.modalTextBallsGive}>
                            Количество баллов
                          </Text>
                        </View>
                        <NewInputComponent
                          value={giveBalls}
                          maxLength={String(filteredBall.balls).length}
                          onChangeText={(value) => {
                            const newValue = value.replace(/[^0-9]/g, "");
                            const newNumber = Math.min(
                              Number(newValue),
                              Number(filteredBall.balls)
                            );
                            setGiveBalls(String(newNumber));
                          }}
                        />
                      </View>
                    )}
                    <Text style={styles.modalDopText}>Продать за</Text>
                    <SwitchComponent
                      isEnabled={isEnabled}
                      onToggle={handleSwitchToggle}
                    />
                    <NewInputComponent
                      value={saveupCash}
                      onChangeText={setSaveupCash}
                    />
                    <View style={styles.modalCheckbox}>
                      <NewCheckboxComponent
                        isChecked={isChecked}
                        onToggle={setIsChecked}
                        title={"Возможность частичного обмена"}
                      />
                    </View>
                  </View>
                )}

                <View>
                  <Text style={styles.modalTextCommission}>
                    Комиссия за сделку составит 10%, согласно вашему тарифному
                    плану. Вы получите 280 баллов на свой баланс
                  </Text>
                </View>
                <View style={styles.modalCreateButton}>
                  {deal === "edit" ? (
                    <NewButtonComponent
                      title={"Сохранить сделку"}
                      filled={true}
                      height={48}
                      fontSize={18}
                      onPress={updateDeal}
                    />
                  ) : (
                    <View>
                      {deal === "offer" ? (
                        <NewButtonComponent
                          title={"Встречная сделка"}
                          filled={true}
                          height={48}
                          fontSize={18}
                          onPress={createDeal}
                        />
                      ) : (
                        <NewButtonComponent
                          title={"Создать сделку"}
                          filled={true}
                          height={48}
                          fontSize={18}
                          onPress={createDeal}
                        />
                      )}
                    </View>
                  )}
                </View>
                {error && (
                  <View>
                    <ErrorModalComponent
                      visible={errorModal}
                      textError={error}
                      onRequestClose={closeFullScreen}
                    />
                  </View>
                )}
              </View>
            }
          />

          <TouchableOpacity
            style={styles.closeButton}
            onPress={
              deal === "edit" || deal === "offer"
                ? () => router.push("home/exchange")
                : onRequestClose
            }
          >
            <Image
              contentFit="contain"
              contentPosition="center"
              source={require("../assets/closeModal.svg")}
              width={36}
              height={36}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  createExchangeModal: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
    backgroundColor: "#24224A",
    marginRight: 10,
    marginTop: 35,
  },
  modalGradient: {
    borderRadius: 16,
  },
  closeButton: {
    position: "absolute",
    right: 1,
    padding: 15,
  },
  modalContainer: {
    marginHorizontal: 15,
    marginVertical: 60,
    alignItems: "center",
  },
  modalContainerGive: {
    alignItems: "center",
  },
  modalContainerTextAll: {},
  modalContainerCompanyText: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  modalDopText: {
    fontSize: 24,
    fontFamily: FONTS.medium,
    color: textPrimaryColor,
  },
  modalDopTextMore: {
    marginVertical: 10,
  },
  containerIconMiddleExchange: {
    marginVertical: 20,
  },
  modalCompanyLogo: {
    marginHorizontal: 10,
  },
  modalCompanyName: {
    fontSize: 24,
    fontFamily: FONTS.medium,
    color: textPrimaryColor,
  },
  modalCompanyOr: {
    fontSize: 14,
    color: textPrimaryColor,
    marginVertical: 10,
    textAlign: "center",
  },
  modalTextBallsGive: {
    fontSize: 14,
    color: textPrimaryColor,
    marginVertical: 10,
  },
  modalContainerTextBallsGive: {},
  modalCheckbox: {
    marginVertical: 30,
  },
  modalTextCommission: {
    width: 270,
    textAlign: "center",
    color: "rgba(255, 255, 255, 0.2)",
  },
  modalCreateButton: {
    marginVertical: 30,
    width: "100%",
  },
});
