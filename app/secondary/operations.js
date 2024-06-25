import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { FONTS, HEIGHT } from "../../constants/theme";
import HeaderComponent from "../../components/HeaderComponent";
import { textPrimaryColor } from "../../components/ColorsComponent";
import NewTagComponent from "../../components/NewTagComponent";
import { ImageBackground, Image } from "expo-image";

export default function Operations() {
  const [textValue, setTextValue] = useState("Операции");
  const [availableTags, setAvailableTags] = useState("Тип операции");
  const [periodTags, setPeriodTags] = useState("Выбрать период");

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <ImageBackground
        source={require("../../assets/background.png")}
        style={styles.container__view}
      >
        <View style={styles.container__operations}>
          <HeaderComponent text={textValue} secondary={true} />
          <View style={{ flexDirection: "row", marginTop: 20, marginLeft: 15 }}>
            <NewTagComponent
              tag={availableTags}
              valueOnChange={(selectedValue) => (
                selectedValue, "availableTags"
              )}
            />
            <NewTagComponent
              tag={periodTags}
              valueOnChange={(selectedValue) => (
                selectedValue, "availableTags"
              )}
            />
          </View>
          <Text style={styles.title}>Сегодня</Text>
          <View style={styles.block}>
            <Image
              contentFit="contain"
              contentPosition={"center"}
              transition={1000}
              source={require("../../assets/gifts/fitness.svg")}
              width={33}
              height={33}
              style={{ borderRadius: 10 }}
            />
            <View style={{ marginRight: "auto" }}>
              <Text style={styles.text__title}>Фитнес-центр</Text>
              <Text style={styles.text__description}>начисление баллов</Text>
            </View>
            <View style={[styles.block, { columnGap: 5 }]}>
              <Image
                contentFit="contain"
                contentPosition={"center"}
                transition={1000}
                source={require("../../assets/ellipse.svg")}
                width={12}
                height={12}
              />
              <Text style={styles.text__balls}>300</Text>
              <Text style={styles.text__description}>баллов</Text>
            </View>
          </View>
          <View style={styles.block}>
            <Image
              contentFit="contain"
              contentPosition={"center"}
              transition={1000}
              source={require("../../assets/gifts/fitness.svg")}
              width={33}
              height={33}
              style={{ borderRadius: 10 }}
            />
            <View style={{ marginRight: "auto" }}>
              <Text style={styles.text__title}>Фитнес-центр</Text>
              <Text style={styles.text__description}>списание баллов</Text>
            </View>
            <View style={[styles.block, { columnGap: 5 }]}>
              <Image
                contentFit="contain"
                contentPosition={"center"}
                transition={1000}
                source={require("../../assets/ellipse.svg")}
                width={12}
                height={12}
              />
              <Text style={styles.text__balls}>300</Text>
              <Text style={styles.text__description}>баллов</Text>
            </View>
          </View>
          <View style={styles.block}>
            <Image
              contentFit="contain"
              contentPosition={"center"}
              transition={1000}
              source={require("../../assets/gifts/fitness.svg")}
              width={33}
              height={33}
              style={{ borderRadius: 10 }}
            />
            <View style={{ marginRight: "auto" }}>
              <Text style={styles.text__title}>Зачисление денег</Text>
              <Text style={styles.text__description}>
                доход от реферальной прораммы
              </Text>
            </View>
            <View style={[styles.block, { columnGap: 5 }]}>
              <Text style={styles.text__balls}>125,25</Text>
              <Text style={styles.text__description}>₽</Text>
            </View>
          </View>
          <View style={styles.block}>
            <Image
              contentFit="contain"
              contentPosition={"center"}
              transition={1000}
              source={require("../../assets/gifts/fitness.svg")}
              width={33}
              height={33}
              style={{ borderRadius: 10 }}
            />
            <View
              style={{
                marginRight: "auto",
              }}
            >
              <Text style={styles.text__title}>Зачисление</Text>
              <Text style={styles.text__description}>выполнение задания</Text>
            </View>
            <View style={[styles.block, { columnGap: 5 }]}>
              <Text style={styles.text__balls}>300</Text>
              <Image
                height={10}
                width={15}
                transition={1000}
                source={require("../../assets/up.svg")}
              />
            </View>
          </View>
          <Text style={styles.title}>7 августа</Text>
          <View style={styles.block}>
            <Image
              contentFit="contain"
              contentPosition={"center"}
              transition={1000}
              source={require("../../assets/gifts/fitness.svg")}
              width={33}
              height={33}
              style={{ borderRadius: 10 }}
            />
            <View style={{ marginRight: "auto" }}>
              <Text style={styles.text__title}>Фитнес-центр</Text>
              <Text style={styles.text__description}>начисление баллов</Text>
            </View>
            <View style={[styles.block, { columnGap: 5 }]}>
              <Image
                contentFit="contain"
                contentPosition={"center"}
                transition={1000}
                source={require("../../assets/ellipse.svg")}
                width={12}
                height={12}
              />
              <Text style={styles.text__balls}>300</Text>
              <Text style={styles.text__description}>баллов</Text>
            </View>
          </View>
          <Text style={styles.title}>3 августа</Text>
          <View style={styles.block}>
            <Image
              contentFit="contain"
              contentPosition={"center"}
              transition={1000}
              source={require("../../assets/gifts/fitness.svg")}
              width={33}
              height={33}
              style={{ borderRadius: 10 }}
            />
            <View style={{ marginRight: "auto" }}>
              <Text style={styles.text__title}>Фитнес-центр</Text>
              <Text style={styles.text__description}>начисление баллов</Text>
            </View>
            <View style={[styles.block, { columnGap: 5 }]}>
              <Image
                contentFit="contain"
                contentPosition={"center"}
                transition={1000}
                source={require("../../assets/ellipse.svg")}
                width={12}
                height={12}
              />
              <Text style={styles.text__balls}>300</Text>
              <Text style={styles.text__description}>баллов</Text>
            </View>
          </View>
          <View style={styles.block}>
            <Image
              contentFit="contain"
              contentPosition={"center"}
              transition={1000}
              source={require("../../assets/gifts/fitness.svg")}
              width={33}
              height={33}
              style={{ borderRadius: 10 }}
            />
            <View style={{ marginRight: "auto" }}>
              <Text style={styles.text__title}>Списание денег</Text>
              <Text style={styles.text__description}>оплата тарифа PRO</Text>
            </View>
            <View style={[styles.block, { columnGap: 5 }]}>
              <Text style={styles.text__balls}>-169</Text>
              <Text style={styles.text__description}>₽</Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container__view: {
    minHeight: HEIGHT.height,
  },
  container__operations: {
    marginHorizontal: 15,
  },
  title: {
    color: textPrimaryColor,
    fontFamily: FONTS.medium,
    fontSize: 16,
    lineHeight: 24,
    marginTop: 10,
    marginLeft: 15,
    marginBottom: 9,
  },
  text__title: {
    color: textPrimaryColor,
    fontFamily: FONTS.medium,
    fontSize: 14,
    lineHeight: 16,
  },
  text__description: {
    color: textPrimaryColor,
    fontFamily: FONTS.regular,
    fontSize: 12,
    lineHeight: 14,
  },
  text__balls: {
    color: textPrimaryColor,
    fontFamily: FONTS.medium,
    fontSize: 18,
    lineHeight: 20,
  },
  block: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
    marginBottom: 10,
  },
});
