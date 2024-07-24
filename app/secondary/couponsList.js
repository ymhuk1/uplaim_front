import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Image, ImageBackground } from "expo-image";
import { textPrimaryColor } from "../../components/ColorsComponent";
import Constants from "expo-constants";
import HeaderComponent from "../../components/HeaderComponent";
import { FONTS, HEIGHT } from "../../constants/theme";
import { BlurView } from "expo-blur";
import { StatusBar } from "expo-status-bar";

const apiBaseUrl = Constants.expoConfig.extra.API_PROD;

export default function CouponsList() {
  const [refreshing, setRefreshing] = useState(false);
  const [textValue, setTextValue] = useState("Купоны и промокоды");
  const [categories, setCategories] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const formatDate = (rawDate) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    const formattedDate = new Date(rawDate)
      .toLocaleDateString("en-US", options)
      .replace(/\//g, ".");
    return formattedDate;
  };

  const fetchData = async () => {
    try {
      // Fetch categories and companies data
      const [categoriesResponse, couponsResponse] = await Promise.all([
        fetch(`${apiBaseUrl}api/categories`),
        fetch(`${apiBaseUrl}api/coupon`),
      ]);

      if (!categoriesResponse.ok) {
        throw new Error(
          `Failed to fetch categories. Status: ${categoriesResponse.status}`
        );
      }

      if (!couponsResponse.ok) {
        throw new Error(
          `Failed to fetch coupon. Status: ${couponsResponse.status}`
        );
      }

      const [categoriesData, couponsData] = await Promise.all([
        categoriesResponse.json(),
        couponsResponse.json(),
      ]);

      const allCategories = [
        {
          id: null,
          name: "Все",
          icon: "/static/img/category/2/photo/category2.png",
        },
        ...categoriesData,
      ];

      // Set categories and companies data
      setCategories(allCategories);
      setCoupons(couponsData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  useEffect(() => {
    setRefreshing(true);
    fetchData();
  }, []);

  const handleCategoryClick = (id) => {
    setSelectedCategoryId(id);
  };

  // console.log("coupons: " + coupons);
  // console.log("selectedCategoryId: " + selectedCategoryId);
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
          <View style={styles.storyContainer}>
            <ScrollView
              style={styles.storiesContainer}
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              {categories.length > 0
                ? categories.map((item, index) => {
                    return (
                      <TouchableOpacity
                        key={item.id}
                        onPress={() => handleCategoryClick(item.id)}
                        activeOpacity={0.7}
                      >
                        <View
                          style={[
                            styles.story,
                            selectedCategoryId === item.id &&
                              styles.selectedCategory,
                          ]}
                        >
                          <Image
                            contentFit="contain"
                            contentPosition="center"
                            transition={0}
                            source={{ uri: apiBaseUrl + item.icon }}
                            width={46}
                            height={46}
                            style={styles.iconStories}
                          />
                          <View style={styles.textContainer}>
                            <Text style={styles.textStories} numberOfLines={2}>
                              {item.name === "Фитнес-центр"
                                ? "Фитнес-\nцентр"
                                : item.name}
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    );
                  })
                : null}
            </ScrollView>
          </View>
          <View style={styles.couponsContainer}>
            {coupons.length > 0 ? (
              coupons
                .filter(
                  (item) =>
                    selectedCategoryId === null ||
                    (item.company.category_id &&
                      item.company.category_id === selectedCategoryId)
                )
                .map((item, index) => (
                  <View key={item.id} style={styles.view}>
                    <View style={styles.itemActivity}>
                      <View
                        style={[
                          styles.backActivity,
                          { backgroundColor: `${item.color}20` },
                        ]}
                      >
                        <Text style={[styles.activity, { color: item.color }]}>
                          {item.category}
                        </Text>
                      </View>
                    </View>
                    <View>
                      <View style={styles.logoContainer}>
                        <Image
                          contentFit="contain"
                          contentPosition={"center"}
                          source={
                            item.company.main_photo
                              ? apiBaseUrl + item.company.main_photo
                              : require("../../assets/no-photo-coupon.png")
                          }
                          width={80}
                          height={80}
                          style={styles.logo}
                        />
                      </View>
                      <View style={styles.couponContainer}>
                        <Text style={styles.nameCoupon}>{item.company.name}</Text>
                        <Text style={styles.deskCoupon} 
                        // numberOfLines={3}
                        >
                          {item.description}
                        </Text>
                        <Text style={styles.dateCoupon}>
                          {formatDate(item.created_at)}
                        </Text>
                      </View>
                    </View>
                  </View>
                ))
            ) : (
              <Text style={styles.text2}>Нет активных купонов</Text>
            )}
          </View>
        </View>
      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: "rgba(0, 0, 0, 0.3)",
    // alignItems: "center",
    // justifyContent: "center",
  },
  containerImg: {
    minHeight: HEIGHT.height,
  },
  containerView: {
    marginHorizontal: 15,
  },
  textContainer2: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  text2: {
    fontSize: 24,
    fontFamily: FONTS.medium,
    color: textPrimaryColor,
    marginLeft: 7,
  },

  storiesContainer: {
    overflow: "hidden",
    marginBottom: 30,
    marginTop: 20,
  },
  story: {
    width: 120,
    height: 112,
    borderRadius: 12,
    backgroundColor: "#24224A",
    marginRight: 10,
  },
  iconStories: {
    width: 46,
    height: 46,
    marginHorizontal: 12,
    marginVertical: 10,
  },
  textContainer: {
    marginHorizontal: 12,
    width: 80,
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 10,
  },
  textStories: {
    fontSize: 14,
    color: textPrimaryColor,
    fontFamily: FONTS.medium,
  },
  couponsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 15,
  },
  view: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 12,
    backgroundColor: "#24224A",
  },
  itemActivity: {
    alignItems: "flex-start",
  },
  backActivity: {
    margin: 10,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  activity: {
    fontSize: 12,
    lineHeight: 14,
    padding: 5,
    paddingHorizontal: 10,
  },
  logoContainer: {
    marginTop: 5,
    marginBottom: 15,
    alignItems: "center",
  },
  textNameContainer: {
    // height: 80,
    // alignItems: "center",
    // justifyContent: "center",
    // marginHorizontal: 10,
  },
  nameCompany: {
    color: textPrimaryColor,
    fontSize: 16,
    fontFamily: FONTS.medium,
  },
  selectedCategory: {
    borderWidth: 4,
    borderColor: "#9B51E0",
  },
  couponContainer: {
    flex: 1,
    paddingHorizontal: 5,
    // height: 120,
    alignItems: "center",
    rowGap: 10,
  },
  nameCoupon: {
    fontFamily: FONTS.medium,
    color: textPrimaryColor,
    fontSize: 16,
    lineHeight: 20,
  },
  deskCoupon: {
    fontFamily: FONTS.light,
    lineHeight: 14,
    fontSize: 14,
    paddingHorizontal: 15,
    color: textPrimaryColor,
    textAlign: "center",
    marginBottom: "auto",
  },
  dateCoupon: {
    fontFamily: FONTS.light,
    fontSize: 12,
    lineHeight: 20,
    color: "#9A95B2",
  },
});
