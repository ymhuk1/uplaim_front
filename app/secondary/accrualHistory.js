import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { ImageBackground } from "expo-image";
import { FONTS, HEIGHT } from "../../constants/theme";
import HeaderComponent from "../../components/HeaderComponent";
import FitnessGift from "../../components/FitnessCardComponent";
import {
  elemBackgroundColor,
  textColor4,
  textDisabledColor,
  textPrimaryColor,
} from "../../components/ColorsComponent";

export default function AccrualHistory() {
  const [textValue, setTextValue] = useState("История начислений");

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <ImageBackground
        source={require("../../assets/background.png")}
        contentFit={"cover"}
        style={styles.containerImg}
      >
        <HeaderComponent text={textValue} secondary={true} />

        <View style={styles.date__container}>
          <Text style={styles.date__text}>7 дней</Text>
          <Text
            style={[
              styles.date__text,
              {
                color: textColor4,
                backgroundColor: "rgba(154, 149, 178, 0.2)",
              },
            ]}
          >
            Месяц
          </Text>
          <Text
            style={[
              styles.date__text,
              {
                color: textColor4,
                backgroundColor: "rgba(154, 149, 178, 0.2)",
              },
            ]}
          >
            Год
          </Text>
          <Text
            style={[
              styles.date__text,
              {
                color: textColor4,
                backgroundColor: "rgba(154, 149, 178, 0.2)",
              },
            ]}
          >
            Все время
          </Text>
        </View>

        <View style={{ rowGap: 12, marginBottom: 20, marginTop: 10 }}>
          <Text style={styles.ticket__text}>Сегодня</Text>
          <FitnessGift
            imageSource={require("../../assets/gifts/fitness.svg")}
            balanceImageSource={require("../../assets/ticket-green.svg")}
            description={
              "Приобретите что то у нас и мы сделаем скидку 15% для вас"
            }
            balance={10}
            balanceImageHeight={12}
            balanceImageWidth={33}
          />
          <FitnessGift
            imageSource={require("../../assets/gifts/fitness.svg")}
            balanceImageSource={require("../../assets/up.svg")}
            description={
              "Приобретите что то у нас и мы сделаем скидку 15% для вас"
            }
            balance={10}
            balanceImageHeight={14}
            balanceImageWidth={22}
          />
          <Text style={styles.ticket__text}>8 октября</Text>
          <FitnessGift
            imageSource={require("../../assets/gifts/fitness.svg")}
            balanceImageSource={require("../../assets/ticket-green.svg")}
            description={
              "Приобретите что то у нас и мы сделаем скидку 15% для вас"
            }
            balance={10}
            balanceImageHeight={12}
            balanceImageWidth={33}
          />
          <Text style={styles.ticket__text}>6 октября</Text>
          <FitnessGift
            imageSource={require("../../assets/gifts/fitness.svg")}
            balanceImageSource={require("../../assets/ticket-orange.svg")}
            description={
              "Приобретите что то у нас и мы сделаем скидку 15% для вас"
            }
            balance={10}
            balanceImageHeight={12}
            balanceImageWidth={33}
          />
        </View>
      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  containerImg: {
    minHeight: HEIGHT.height,
    paddingHorizontal: 15,
  },
  date__container: {
    marginTop: 10,
    flexDirection: "row",
    columnGap: 10,
  },
  date__text: {
    backgroundColor: textColor4,
    color: elemBackgroundColor,
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  ticket__text: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    color: textPrimaryColor,
  },
});
