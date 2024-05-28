import {
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import HeaderComponent from "../../components/HeaderComponent";
import { Image, ImageBackground } from "expo-image";
import {
  elemBackgroundColor,
  textPrimaryColor,
} from "../../components/ColorsComponent";
import Constants from "expo-constants";
import { useRouter } from "expo-router";
import { FONTS, HEIGHT, WIDTH } from "../../constants/theme";

const apiBaseUrl = Constants.expoConfig.extra.API_PROD;

export default function FindCompany() {
  const [textValue, setTextValue] = useState("Рекомендация компаний");
  const [refreshing, setRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("c");
  const [searchResults, setSearchResults] = useState([]);

  const router = useRouter();

  const fetchDataCompany = (term) => {
    fetch(`${apiBaseUrl}api/company/search?term=${term}`)
      .then((response) => response.json())
      .then((data) => {
        // const { companies } = data;
        console.log("CompanyList results:", data);
        setSearchResults(data);
      })
      .catch((error) => {
        console.error("Error fetching search results: ", error);
      });
  };

  useEffect(() => {
    if (searchTerm.length > 0) {
      // Fetch data when searchTerm is not empty
      fetchDataCompany(searchTerm);
    } else {
      // Clear search results when searchTerm is empty
      setSearchResults([]);
    }
  }, [searchTerm]);

  const onRefresh = () => {
    setRefreshing(true);
  };
  return (
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
        style={styles.containerImg}
      >
        <View style={styles.containerView}>
          <HeaderComponent text={textValue} secondary={true} />
          <View>
            <TextInput
              style={styles.customInput}
              placeholder="Поиск..."
              placeholderTextColor="white"
              onChangeText={(text) => setSearchTerm(text)}
            />
            <Image
              contentFit="contain"
              contentPosition={"center"}
              transition={1000}
              source={require("../../assets/bottom-menu/search.svg")}
              width={24}
              height={24}
              style={styles.customSearch}
            />
          </View>
          <View style={styles.mainContainer}>
            <Text style={styles.textContainer}>
              Выбери компанию, которую хочешь рекомендовать
            </Text>
          </View>
          {searchResults.length > 0 && (
            <View>
              {searchResults.map((company, index) => (
                <Pressable
                  key={index}
                  onPress={() => {
                    router.push({
                      pathname: "/secondary/company",
                      params: { id: company.id },
                    });
                  }}
                >
                  <View style={styles.companyContainer}>
                    <Image
                      contentFit="contain"
                      contentPosition="center"
                      transition={1000}
                      source={apiBaseUrl + company.main_photo}
                      width={80}
                      height={80}
                      style={styles.logoContainer}
                    />
                    <View style={styles.innerContainer}>
                      <Text style={styles.headerContainer}>{company.name}</Text>
                      <View style={styles.dopContainer}>
                        <View style={styles.userContainer}>
                          <View style={styles.userTextContainer}>
                            <Image
                              contentFit="contain"
                              contentPosition={"center"}
                              transition={1000}
                              source={require("../../assets/user.svg")}
                              width={16}
                              height={16}
                            />
                            <Text style={styles.dopTextContainer}>тебе</Text>
                          </View>
                          <View style={styles.userTextContainer}>
                            <Image
                              contentFit="contain"
                              contentPosition={"center"}
                              transition={1000}
                              source={require("../../assets/users.svg")}
                              width={16}
                              height={16}
                            />
                            <Text style={styles.dopTextContainer}>другу</Text>
                          </View>
                        </View>
                        <View style={styles.container__img}>
                          <Image
                            contentFit="contain"
                            contentPosition={"center"}
                            transition={1000}
                            source={require("../../assets/ellipse.svg")}
                            width={12}
                            height={12}
                          />
                          <Image
                            contentFit="contain"
                            contentPosition={"center"}
                            transition={1000}
                            source={require("../../assets/ellipse.svg")}
                            width={12}
                            height={12}
                            style={{ marginBottom: 2 }}
                          />
                        </View>
                        <View style={styles.ballsContainer}>
                          <Text style={styles.ballsTextContainer}>
                            100 баллов
                          </Text>
                          <Text style={styles.ballsTextContainer}>
                            300 баллов
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </Pressable>
              ))}
            </View>
          )}
        </View>
      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {},
  containerImg: {
    minHeight: HEIGHT.height,
  },
  containerView: {
    marginHorizontal: 15,
    marginBottom: 80,
  },
  mainContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  textContainer: {
    color: textPrimaryColor,
    fontFamily: FONTS.medium,
    fontSize: 18,
  },
  companyContainer: {
    height: 100,
    width: WIDTH.width - 30,
    backgroundColor: elemBackgroundColor,
    borderRadius: 12,
    padding: 10,
    flexDirection: "row",
    marginBottom: 15,
    columnGap: 20,
  },
  innerContainer: {},
  logoContainer: {
    borderRadius: 12,
  },
  headerContainer: {
    color: textPrimaryColor,
    fontSize: 16,
    fontFamily: FONTS.medium,
  },
  dopContainer: {
    width: WIDTH.width - 150,
    flexDirection: "row",
    alignItems: "center",
  },
  userContainer: {
    rowGap: 5,
    marginRight: "auto",
  },
  userTextContainer: {
    flexDirection: "row",
    columnGap: 8,
    alignItems: "center",
  },
  dopTextContainer: {
    color: textPrimaryColor,
    fontSize: 12,
    fontFamily: FONTS.regular,
  },
  container__img: {
    rowGap: 15,
  },
  ballsContainer: {
    rowGap: 2,
  },
  ballsTextContainer: {
    marginLeft: 8,
    color: textPrimaryColor,
    fontSize: 16,
    fontFamily: FONTS.medium,
  },
  customInput: {
    padding: 10,
    paddingHorizontal: 15,
    minWidth: 260,
    width: "100%",
    height: 36,
    borderRadius: 50,
    backgroundColor: "rgba(18, 17, 35, 1)",
    color: "white",
  },
  customSearch: {
    position: "absolute",
    top: 6,
    right: 10,
  },
  customInputText: {
    color: textPrimaryColor,
  },
});
