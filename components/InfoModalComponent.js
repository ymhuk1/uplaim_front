import {
  Modal,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Image } from "expo-image";
import { textPrimaryColor } from "./ColorsComponent";
import NewButtonComponent from "./NewButtonComponent";
import React, { useEffect, useState } from "react";
import { getBallsText } from "./utils/utils";
import * as SecureStore from "expo-secure-store";
import { FONTS } from "../constants/theme";

export default function InfoModalComponent({
  visible,
  titlePrimaryButton,
  titleSecondaryButton,
  titleText,
  onPress,
  onPressSecondary,
  exchange,
  apiBaseUrl,
  item,
  takerCompanyValue,
}) {
  const [token, setToken] = useState(null);
  const [categoriesData, setCategoriesData] = useState([]);
  const [companiesData, setCompaniesData] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpenDop, setDropdownOpenDop] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [childValue, setChildValue] = useState("");

  useEffect(() => {
    if (item) {
      if (item.taker_companies) {
        setSelectedCompany(item.taker_companies);
      } else if (item.taker_categories) {
        setSelectedCategory(item.taker_categories);
      } else {
      }
    }
  }, []);

  const fetchData = async () => {
    try {
      const userDataStr = await SecureStore.getItemAsync("userData");
      if (userDataStr) {
        const userData = JSON.parse(userDataStr);
        setToken(userData.token);

        const headers = {
          Authorization: userData.token,
          "Content-Type": "application/json",
        };
        // categories
        const categoriesResponse = await fetch(
          `${apiBaseUrl}api/exchange/all_categories`,
          { headers }
        );
        if (categoriesResponse.ok) {
          const categoriesData = await categoriesResponse.json();
          setCategoriesData(categoriesData.categories);
        } else {
          console.error("Ошибка при загрузке данных клиента");
        }
        // companies

        const companiesResponse = await fetch(`${apiBaseUrl}api/companies`, {
          headers,
        });
        if (companiesResponse.ok) {
          const companiesData = await companiesResponse.json();
          setCompaniesData(companiesData.companies);
        } else {
          console.error("Ошибка при загрузке данных клиента");
        }
      }
    } catch (error) {
      console.error("Ошибка при получении запроса InfoModalComponent:", error);
    }
  };

  const handleButtonPress = () => {
    if (item.taker_companies) {
      const valueToPass = item
        ? selectedCompany
          ? selectedCompany.id
          : item.taker_companies
          ? item.taker_companies[0].id
          : ""
        : "";
      if (takerCompanyValue) {
        takerCompanyValue(valueToPass);
      }
    } else if (item.taker_categories) {
      const valueToPass = item
        ? selectedCompany && selectedCompany
          ? selectedCompany.id
          : companiesData.find(
              (itemCategory) =>
                itemCategory.category_id ===
                (selectedCategory && parseInt(selectedCategory.id)
                  ? parseInt(selectedCategory.id)
                  : item.taker_categories
                  ? item.taker_categories[0].id
                  : null)
            ).id
        : "";
      if (takerCompanyValue) {
        takerCompanyValue(valueToPass);
      }
    } else {
      const valueToPass = "";
      if (takerCompanyValue) {
        takerCompanyValue(valueToPass);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.centeredView}>
      <Modal animationType="none" transparent={true} visible={visible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{titleText}</Text>
            {exchange && item && (
              <View style={styles.containerExchange}>
                {/* отдаю баллы компании*/}
                {item.holder_company && item.give_balls && (
                  <View>
                    {item.type_deal === "sell" ? (
                      <View>
                        <Text style={styles.dopText}>Продать</Text>
                        <View style={styles.containerExchangeCash}>
                          <Text style={styles.dopTextExchangeCash}>
                            баллы компании
                          </Text>
                        </View>
                      </View>
                    ) : (
                      <Text style={styles.dopText}>Обмен</Text>
                    )}

                    <View style={styles.containerHolderExchange}>
                      <View style={styles.containerCompany}>
                        <View style={styles.containerImageHolderExchange}>
                          {item.holder_company.main_photo ? (
                            <Image
                              style={styles.imageHolderExchange}
                              contentFit="contain"
                              contentPosition="center"
                              source={
                                apiBaseUrl + item.holder_company.main_photo
                              }
                              width={33}
                              height={33}
                            />
                          ) : (
                            <View style={styles.placeholderImage}></View>
                          )}
                        </View>
                        <View style={styles.containerTextHolderExchange}>
                          <Text style={styles.textHolderExchange}>
                            {item.holder_company.name}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.containerBallsHolderExchange}>
                        <Image
                          style={styles.containerBallsIconExchange}
                          contentFit="contain"
                          contentPosition="center"
                          source={require("../assets/ellipse.svg")}
                          width={12}
                          height={12}
                        />
                        <Text style={styles.ballsTextExchange}>
                          {item.give_balls} {getBallsText(item.give_balls)}
                        </Text>
                      </View>
                    </View>

                    {item.type_deal === "sell" ? (
                      <View></View>
                    ) : (
                      <Text style={styles.dopText}>На</Text>
                    )}
                  </View>
                )}

                {/* Купить за рубли, апы */}
                <View>
                  {item.give_cash && (
                    <View style={styles.containerExchangeCash}>
                      <Text style={styles.textExchangeCash}>
                        Купить за {item.give_cash} ₽
                      </Text>
                    </View>
                  )}
                  {item.give_saveup && (
                    <View style={styles.containerExchangeCash}>
                      <Text style={styles.textExchangeCash}>
                        Купить за {item.give_saveup}
                      </Text>
                      <Image
                        contentFit="contain"
                        contentPosition={"center"}
                        transition={1000}
                        source={require("../assets/up.svg")}
                        width={21}
                        height={16}
                        style={{ marginBottom: 2, marginRight: 3 }}
                      />
                    </View>
                  )}
                  {item.give_cash && (
                    <View style={styles.containerExchangeCash}>
                      <Text style={styles.dopTextExchangeCash}>
                        баллы компании
                      </Text>
                    </View>
                  )}
                  {item.give_saveup && (
                    <View style={styles.containerExchangeCash}>
                      <Text style={styles.dopTextExchangeCash}>
                        баллы компании
                      </Text>
                    </View>
                  )}
                </View>

                <View>
                  {item && (
                    <View>
                      <TouchableOpacity
                        style={styles.dropdownButton}
                        onPress={() => {
                          setDropdownOpen(!dropdownOpen);
                        }}
                      >
                        {item.taker_companies ? (
                          <View style={styles.containerHolderExchange}>
                            <View style={styles.containerCompany}>
                              <View style={styles.containerImageHolderExchange}>
                                {item.taker_companies ? (
                                  <Image
                                    style={styles.imageHolderExchange}
                                    contentFit="contain"
                                    contentPosition="center"
                                    source={
                                      apiBaseUrl +
                                      (selectedCompany
                                        ? selectedCompany.main_photo
                                        : item.taker_companies[0].main_photo)
                                    }
                                    width={33}
                                    height={33}
                                  />
                                ) : (
                                  <View style={styles.placeholderImage}></View>
                                )}
                              </View>
                              <Text style={styles.textHolderExchange}>
                                {selectedCompany
                                  ? selectedCompany.name
                                  : item.taker_companies[0].name}
                              </Text>
                              {/*{item.taker_categories ? (*/}
                              {/*    <Text style={styles.textHolderExchange}>{selectedCompany ? selectedCompany.name : (companiesData.filter(itemCategory => itemCategory.category_id === parseInt(selectedCategory.id)))}</Text>*/}
                              {/*) : (*/}
                              {/*    <View></View>*/}
                              {/*)}*/}
                            </View>
                            <View style={styles.containerBallsHolderExchange}>
                              <Image
                                style={styles.containerBallsIconExchange}
                                contentFit="contain"
                                contentPosition="center"
                                source={require("../assets/ellipse.svg")}
                                width={12}
                                height={12}
                              />
                              <Text style={styles.ballsTextExchange}>
                                {item.get_balls} {getBallsText(item.get_balls)}
                              </Text>
                            </View>
                          </View>
                        ) : (
                          <View></View>
                        )}
                        {item.taker_categories ? (
                          <View>
                            <View style={styles.containerHolderExchange}>
                              <View style={styles.containerCompany}>
                                <View
                                  style={styles.containerImageHolderExchange}
                                >
                                  {item.taker_categories ? (
                                    <Image
                                      style={styles.imageHolderExchange}
                                      contentFit="contain"
                                      contentPosition="center"
                                      source={
                                        apiBaseUrl +
                                        (selectedCategory
                                          ? selectedCategory.icon
                                          : item.taker_categories[0].icon)
                                      }
                                      width={33}
                                      height={33}
                                    />
                                  ) : (
                                    <View
                                      style={styles.placeholderImage}
                                    ></View>
                                  )}
                                </View>
                                <Text style={styles.textHolderExchange}>
                                  {selectedCategory
                                    ? selectedCategory.name
                                    : item.taker_categories[0].name}
                                </Text>
                              </View>
                            </View>
                          </View>
                        ) : (
                          <View></View>
                        )}
                      </TouchableOpacity>
                    </View>
                  )}

                  {dropdownOpen && (
                    <View>
                      {item.taker_companies ? (
                        <FlatList
                          style={styles.dropdownList}
                          data={item.taker_companies}
                          keyExtractor={(item, index) => index.toString()}
                          renderItem={({ item: company }) => (
                            <TouchableOpacity
                              onPress={() => {
                                setSelectedCompany(company);
                                setDropdownOpen(false);
                              }}
                            >
                              <View style={styles.containerHolderExchange}>
                                <View style={styles.containerCompany}>
                                  <View
                                    style={styles.containerImageHolderExchange}
                                  >
                                    {company.main_photo ? (
                                      <Image
                                        style={styles.imageHolderExchange}
                                        contentFit="contain"
                                        contentPosition="center"
                                        source={apiBaseUrl + company.main_photo}
                                        width={33}
                                        height={33}
                                      />
                                    ) : (
                                      <View
                                        style={styles.placeholderImage}
                                      ></View>
                                    )}
                                  </View>
                                  <Text style={styles.textHolderExchange}>
                                    {company.name}
                                  </Text>
                                </View>
                              </View>
                            </TouchableOpacity>
                          )}
                        />
                      ) : (
                        <View></View>
                      )}

                      {item.taker_categories ? (
                        <View>
                          <FlatList
                            style={styles.dropdownList}
                            data={item.taker_categories}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item: category }) => (
                              <TouchableOpacity
                                onPress={() => {
                                  setSelectedCategory(category);
                                  setDropdownOpen(false);
                                }}
                              >
                                <View style={styles.containerHolderExchange}>
                                  <View style={styles.containerCompany}>
                                    <View
                                      style={
                                        styles.containerImageHolderExchange
                                      }
                                    >
                                      {category.icon ? (
                                        <Image
                                          style={styles.imageHolderExchange}
                                          contentFit="contain"
                                          contentPosition="center"
                                          source={apiBaseUrl + category.icon}
                                          width={33}
                                          height={33}
                                        />
                                      ) : (
                                        <View
                                          style={styles.placeholderImage}
                                        ></View>
                                      )}
                                    </View>
                                    <Text style={styles.textHolderExchange}>
                                      {category.name}
                                    </Text>
                                  </View>
                                </View>
                              </TouchableOpacity>
                            )}
                          />
                        </View>
                      ) : (
                        <View></View>
                      )}
                    </View>
                  )}

                  {companiesData && item.taker_categories ? (
                    <TouchableOpacity
                      style={styles.dropdownButton}
                      onPress={() => {
                        setDropdownOpenDop(!dropdownOpenDop);
                      }}
                    >
                      <View style={styles.containerHolderExchange}>
                        {companiesData && (
                          <View style={styles.containerCompany}>
                            <View style={styles.containerImageHolderExchange}>
                              <Image
                                style={styles.imageHolderExchange}
                                contentFit="contain"
                                contentPosition="center"
                                source={
                                  apiBaseUrl +
                                  (selectedCompany && selectedCompany
                                    ? selectedCompany.main_photo
                                    : companiesData.find(
                                        (itemCategory) =>
                                          itemCategory.category_id ===
                                          (selectedCategory &&
                                          parseInt(selectedCategory.id)
                                            ? parseInt(selectedCategory.id)
                                            : item.taker_categories
                                            ? item.taker_categories[0].id
                                            : null)
                                      ).main_photo)
                                }
                                width={33}
                                height={33}
                              />
                            </View>
                            <Text style={styles.textHolderExchange}>
                              {selectedCompany
                                ? selectedCompany.name
                                : companiesData.find(
                                    (itemCategory) =>
                                      itemCategory.category_id ===
                                      (selectedCategory &&
                                      parseInt(selectedCategory.id)
                                        ? parseInt(selectedCategory.id)
                                        : item.taker_categories
                                        ? item.taker_categories[0].id
                                        : null)
                                  ).name}
                            </Text>
                          </View>
                        )}
                        <View style={styles.containerBallsHolderExchange}>
                          <Image
                            style={styles.containerBallsIconExchange}
                            contentFit="contain"
                            contentPosition="center"
                            source={require("../assets/ellipse.svg")}
                            width={12}
                            height={12}
                          />
                          <Text style={styles.ballsTextExchange}>
                            {item.get_balls} {getBallsText(item.get_balls)}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  ) : (
                    <View></View>
                  )}
                  {dropdownOpenDop && (
                    <View>
                      {companiesData ? (
                        <View>
                          <FlatList
                            style={styles.dropdownList}
                            data={companiesData.filter(
                              (itemCategory) =>
                                itemCategory.category_id ===
                                (selectedCategory &&
                                parseInt(selectedCategory.id)
                                  ? parseInt(selectedCategory.id)
                                  : item.taker_categories
                                  ? item.taker_categories[0].id
                                  : null)
                            )}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item: company }) => (
                              <TouchableOpacity
                                onPress={() => {
                                  setSelectedCompany(company);
                                  setDropdownOpenDop(false);
                                }}
                              >
                                <View style={styles.containerHolderExchange}>
                                  <View style={styles.containerCompany}>
                                    <View
                                      style={
                                        styles.containerImageHolderExchange
                                      }
                                    >
                                      {company.main_photo ? (
                                        <Image
                                          style={styles.imageHolderExchange}
                                          contentFit="contain"
                                          contentPosition="center"
                                          source={
                                            apiBaseUrl + company.main_photo
                                          }
                                          width={33}
                                          height={33}
                                        />
                                      ) : (
                                        <View
                                          style={styles.placeholderImage}
                                        ></View>
                                      )}
                                    </View>
                                    <Text style={styles.textHolderExchange}>
                                      {company.name}
                                    </Text>
                                  </View>
                                </View>
                              </TouchableOpacity>
                            )}
                          />
                        </View>
                      ) : (
                        <View></View>
                      )}
                    </View>
                  )}

                  <View>
                    {item.type_deal === "sell" ? (
                      <View>
                        {item.get_cash && (
                          <View style={styles.containerExchangeCash}>
                            <Text style={styles.textExchangeCash}>
                              за {item.get_cash} ₽
                            </Text>
                          </View>
                        )}
                        {item.get_saveup && (
                          <View style={styles.containerExchangeCash}>
                            <Text style={styles.textExchangeCash}>
                              за {item.get_saveup}
                            </Text>
                            <Image
                              contentFit="contain"
                              contentPosition={"center"}
                              transition={1000}
                              source={require("../assets/up.svg")}
                              width={21}
                              height={16}
                              style={{ marginBottom: 2, marginRight: 3 }}
                            />
                          </View>
                        )}
                      </View>
                    ) : (
                      <View>
                        {item.get_cash && (
                          <View>
                            <View style={styles.containerExchangeCash}>
                              <Text style={styles.textExchangeCash}>Или</Text>
                            </View>
                            <View style={styles.containerExchangeCash}>
                              <Text style={styles.textExchangeCash}>
                                Купить за {item.get_cash} ₽
                              </Text>
                            </View>
                          </View>
                        )}
                        {item.get_saveup && (
                          <View>
                            <View style={styles.containerExchangeCash}>
                              <Text style={styles.textExchangeCash}>Или</Text>
                            </View>
                            <View style={styles.containerExchangeCash}>
                              <Text style={styles.textExchangeCash}>
                                Купить за {item.get_saveup}
                              </Text>
                              <Image
                                contentFit="contain"
                                contentPosition={"center"}
                                transition={1000}
                                source={require("../assets/up.svg")}
                                width={21}
                                height={16}
                                style={{ marginBottom: 2, marginRight: 3 }}
                              />
                            </View>
                          </View>
                        )}
                      </View>
                    )}
                  </View>
                </View>
              </View>
            )}

            {/* кнопки */}
            <View style={styles.modalButton}>
              {titlePrimaryButton && (
                <NewButtonComponent
                  title={titlePrimaryButton}
                  filled={true}
                  height={48}
                  fontSize={18}
                  onPress={() => {
                    handleButtonPress();
                    onPress();
                  }}
                />
              )}
              {titleSecondaryButton && (
                <NewButtonComponent
                  title={titleSecondaryButton}
                  empty={true}
                  height={48}
                  fontSize={18}
                  onPress={onPressSecondary}
                />
              )}
            </View>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {
                setDropdownOpen(false);
                setDropdownOpenDop(false);
                setSelectedCompany(null);
                setSelectedCategory(null);
                onPressSecondary();
              }}
            >
              <Image
                contentFit="contain"
                contentPosition="center"
                source={require("../assets/closeModal.svg")}
                width={33}
                height={33}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  modalView: {
    backgroundColor: "#24224A",
    borderRadius: 12,
    width: 340,
    minHeight: 180,
  },
  modalText: {
    // marginBottom: 15,
    paddingHorizontal: 30,
    paddingTop: 40,
    fontSize: 24,
    fontFamily: FONTS.medium,
    color: textPrimaryColor,
    textAlign: "center",
  },
  closeButton: {
    position: "absolute",
    right: 1,
    padding: 5,
  },
  modalButton: {
    padding: 20,
  },
  containerExchange: {
    marginVertical: 15,
    marginHorizontal: 15,
  },
  dopText: {
    marginVertical: 5,
    textAlign: "center",
    color: textPrimaryColor,
    fontSize: 18,
    fontFamily: FONTS.medium,
  },
  containerHolderExchange: {
    marginHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  containerCompany: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  containerTextHolderExchange: {},
  textHolderExchange: {
    color: textPrimaryColor,
    fontSize: 16,
    fontFamily: FONTS.medium,
    marginRight: 10,
  },
  containerImageHolderExchange: {
    marginRight: 10,
  },
  imageHolderExchange: {},
  placeholderImage: {},
  containerBallsHolderExchange: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  containerBallsIconExchange: {
    // marginBottom: 4,
  },
  ballsTextExchange: {
    color: textPrimaryColor,
    fontSize: 16,
    fontFamily: FONTS.medium,
    marginLeft: 5,
    marginBottom: -4,
  },
  containerExchangeCash: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  textExchangeCash: {
    color: textPrimaryColor,
    fontSize: 18,
    fontFamily: FONTS.medium,
    marginRight: 5,
  },
  dopTextExchangeCash: {
    color: textPrimaryColor,
    fontSize: 16,
    marginRight: 5,
    marginVertical: 5,
  },
  dropdownButton: {
    backgroundColor: "#1f1d3b",
    paddingBottom: 10,
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 10,
  },
  dropdownList: {
    backgroundColor: "#1f1d3b",
    paddingBottom: 10,
    borderRadius: 8,
  },
});
