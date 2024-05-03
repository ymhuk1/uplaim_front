import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Image, ImageBackground } from 'expo-image'
import HeaderComponent from '../../components/HeaderComponent';
import { FONTS, HEIGHT, WIDTH } from '../../constants/theme';
import { elemBackgroundColor, textPrimaryColor } from '../../components/ColorsComponent';
import FitnessGift from '../../components/FitnessCardComponent';

export default function AllTasks() {
  const [textValue, setTextValue] = useState("Все задания");

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
              height={21}
              width={28}
            />
          </View>
        </View>
        <Text style={styles.title__text}>Регулярные задания</Text>
        <View style={{ marginBottom: 20 }}>
          <FitnessGift
            imageSource={require("../../assets/gifts/fitness.svg")}
            balanceImageSource={require("../../assets/up.svg")}
            statusImageSource={require("../../assets/gifts/clock.svg")}
            title={"Фитнес-центр"}
            description={
              "Приобретите что то у нас и мы сделаем скидку 15% для вас"
            }
            count={5}
            maxCount={5}
            endDate={"до 1 января 2024 года"}
            balance={10}
            balanceImageHeight={17}
            balanceImageWidth={22}
          />
          <FitnessGift
            imageSource={require("../../assets/gifts/fitness.svg")}
            balanceImageSource={require("../../assets/ticket-green.svg")}
            statusImageSource={require("../../assets/gifts/clock.svg")}
            title={"Фитнес-центр"}
            description={
              "Приобретите что то у нас и мы сделаем скидку 15% для вас"
            }
            count={5}
            maxCount={5}
            endDate={"до 1 января 2024 года"}
            balance={10}
            balanceImageHeight={12}
            balanceImageWidth={33}
          />
        </View>
        <Text style={styles.title__text}>Разовые задания</Text>
        <View>
          <FitnessGift
            imageSource={require("../../assets/gifts/fitness.svg")}
            balanceImageSource={require("../../assets/up.svg")}
            statusImageSource={require("../../assets/gifts/success.svg")}
            title={"Фитнес-центр"}
            description={
              "Приобретите что то у нас и мы сделаем скидку 15% для вас"
            }
            count={5}
            maxCount={5}
            endDate={"выполнено"}
            balance={10}
            balanceImageHeight={17}
            balanceImageWidth={22}
          />
          <FitnessGift
            imageSource={require("../../assets/gifts/fitness.svg")}
            balanceImageSource={require("../../assets/ticket-orange.svg")}
            statusImageSource={require("../../assets/gifts/clock.svg")}
            title={"Фитнес-центр"}
            description={
              "Приобретите что то у нас и мы сделаем скидку 15% для вас"
            }
            count={5}
            maxCount={5}
            endDate={"до 5 февраля 2024 года"}
            balance={5}
            balanceImageHeight={12}
            balanceImageWidth={33}
          />
        </View>
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