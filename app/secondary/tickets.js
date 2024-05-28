import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
} from "react-native";
import {
  buttonGradientColors,
  elemBackgroundColor,
  elemBackgroundColor3,
  elemGradientColors,
  textPrimaryColor,
} from "../../components/ColorsComponent";
import { FONTS, HEIGHT, WIDTH } from "../../constants/theme";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import TicketsComponent from "../../components/TicketsComponent";
import HeaderComponent from "../../components/HeaderComponent";
import NewButtonComponent from "../../components/NewButtonComponent";
import { router } from "expo-router";
import TicketsModalComponent from "../../components/TicketsModalComponent";

const Tickets = () => {
  const [textValue, setTextValue] = useState("Ваши билеты");
   const [isTooltipVisible, setTooltipVisible] = useState(false);

   const toggleTooltip = () => {
     setTooltipVisible(!isTooltipVisible);
   };

  const renderActivatedTickets = () => {
    const colors = ["#2FA44E", "#F2994A", "#F456FE"];
    return colors.map((color, index) =>
      renderActivatedTicketBlock(color, index)
    );
  };

  const renderActivatedTicketBlock = (color, index) => {
    const date = new Date().toLocaleDateString("ru-RU");
    const numbers = [
      "126415285452",
      "245862145655",
      "545554544541",
      "554455544544",
      "245862145655",
      "245862145655",
    ];

    return (
      <View
        key={index}
        style={[styles.activated__tickets_block, { borderColor: color }]}
      >
        <Text style={[styles.block__text, { color }]}>
          Билеты розыгрыша “Лови момент” ({date}):
        </Text>
        <View style={styles.block__numbers}>
          <View style={styles.block__number_left}>
            {numbers.slice(0, 3).map((number) => (
              <Text style={[styles.text__numbers]}>
                {number}
              </Text>
            ))}
          </View>
          <View style={styles.block__number_right}>
            {numbers.slice(3).map((number) => (
              <Text style={[styles.text__numbers]}>
                {number}
              </Text>
            ))}
          </View>
        </View>
        <TouchableOpacity
          style={[styles.block__button, { borderColor: color }]}
        >
          <Text style={styles.text__button}>Все билеты</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {textValue ? (
        <View style={styles.ticket__container}>
          <HeaderComponent text={textValue} secondary={true} />
          <TicketsComponent
            buttonTitle={"Активировать"}
            ticketsTitle={"Неактивированные билеты"}
            onButtonPress={() =>
              router.push({ pathname: "/secondary/allRaffles" })
            }
            widthButton={142}
            height={35}
          />
          <View style={styles.activated__ticket}>
            <LinearGradient
              colors={elemGradientColors}
              style={styles.activated__ticket_inner}
            >
              <Text style={styles.activated__title}>Активированные билеты</Text>
              {renderActivatedTickets()}
            </LinearGradient>
          </View>
          <View style={styles.button}>
            <NewButtonComponent
              title={"Магазин билетов"}
              filled={true}
              height={54}
              fontSize={18}
              onPress={() => toggleTooltip()}
            />
          </View>
        </View>
      ) : null}
      {isTooltipVisible && (
        <Modal
          visible={isTooltipVisible}
          animationType="slide"
          transparent={true}
        >
          <TicketsModalComponent onClose={toggleTooltip} />
        </Modal>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: elemBackgroundColor,
    height: HEIGHT.height,
  },
  ticket__container: {
    minHeight: HEIGHT.height,
    borderRadius: 8,
    paddingHorizontal: 15,
  },
  ticket__title: {
    fontFamily: FONTS.medium,
    fontSize: 24,
    color: textPrimaryColor,
    marginBottom: 10,
  },
  activated__ticket: {
    marginTop: 15,
  },
  activated__ticket_inner: {
    height: "auto",
    paddingHorizontal: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: elemBackgroundColor3,
    borderStyle: "solid",
    borderRadius: 10,
  },
  activated__title: {
    fontFamily: FONTS.medium,
    fontSize: 16,
    color: textPrimaryColor,
    marginVertical: 6,
  },
  activated__tickets_block: {
    marginBottom: 15,
  },
  block__text: {
    fontFamily: FONTS.medium,
    fontSize: 14,
    color: "#50FF9A",
    width: 317,
  },
  block__numbers: {
    flexDirection: "row",
    marginBottom: 10,
  },
  block__number_left: {
    width: 100,
    marginRight: "auto",
  },
  block__number_right: {
    width: 100,
  },
  text__numbers: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: textPrimaryColor,
  },
  block__button: {
    borderRadius: 16,
    borderWidth: 1,
    borderStyle: "solid",
    alignSelf: "center",
  },
  text__button: {
    fontFamily: FONTS.medium,
    fontSize: 14,
    color: textPrimaryColor,
    paddingHorizontal: 50,
    paddingVertical: 10,
  },
  button: {
    width: WIDTH.width - 30,
    marginVertical: 15,
  },
});

export default Tickets;
