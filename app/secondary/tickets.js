import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
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

const Tickets = () => {
  const [textValue, setTextValue] = useState("Ваши билеты");

  // const [tickets, setTickets] = useState([]);

  // useEffect(() => {
  //   // Fetch tickets data from API or any other source
  //   fetchTickets();
  // }, []);

  // const fetchTickets = async () => {
  //   try {
  //     // Make API request to fetch tickets data
  //     const response = await fetch("https://example.com/api/tickets");
  //     const data = await response.json();
  //     setTickets(data);
  //   } catch (error) {
  //     console.error("Error fetching tickets:", error);
  //   }
  // };

  // const renderItem = ({ item }) => (
  //   <TouchableOpacity onPress={() => handleTicketPress(item)}>
  //     <View style={styles.ticketContainer}>
  //       <Text style={styles.ticketTitle}>{item.title}</Text>
  //       <Text style={styles.ticketDescription}>{item.description}</Text>
  //     </View>
  //   </TouchableOpacity>
  // );

  // const handleTicketPress = (ticket) => {
  //   // Handle ticket press event
  //   console.log("Ticket pressed:", ticket);
  // };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      scrollEnabled={true}
    >
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
            <View style={styles.activated__tickets_block}>
              <Text style={styles.block__text}>
                Билеты розыгрыша “Лови момент”
              </Text>
              <Text style={styles.block__text}>(12.08.24):</Text>
              <View style={styles.block__numbers}>
                <View style={styles.block__number_left}>
                  <Text style={styles.text__numbers}>126415285452</Text>
                  <Text style={styles.text__numbers}>245862145655</Text>
                  <Text style={styles.text__numbers}>545554544541</Text>
                </View>
                <View style={styles.block__number_right}>
                  <Text style={styles.text__numbers}>554455544544</Text>
                  <Text style={styles.text__numbers}>245862145655</Text>
                  <Text style={styles.text__numbers}>245862145655</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.block__button}>
                <Text style={styles.text__button}>Все билеты</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.activated__tickets_block}>
              <Text style={[styles.block__text, { color: "#F2994A" }]}>
                Билеты розыгрыша “Лови момент”
              </Text>
              <Text style={[styles.block__text, { color: "#F2994A" }]}>
                (12.08.24):
              </Text>
              <View style={styles.block__numbers}>
                <View style={styles.block__number_left}>
                  <Text style={styles.text__numbers}>126415285452</Text>
                  <Text style={styles.text__numbers}>245862145655</Text>
                  <Text style={styles.text__numbers}>545554544541</Text>
                </View>
                <View style={styles.block__number_right}>
                  <Text style={styles.text__numbers}>554455544544</Text>
                  <Text style={styles.text__numbers}>245862145655</Text>
                  <Text style={styles.text__numbers}>245862145655</Text>
                </View>
              </View>
              <TouchableOpacity
                style={[styles.block__button, { borderColor: "#F2994A" }]}
              >
                <Text style={styles.text__button}>Все билеты</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.activated__tickets_block}>
              <Text style={[styles.block__text, { color: "#F456FE" }]}>
                Билеты розыгрыша “Лови момент”
              </Text>
              <Text style={[styles.block__text, { color: "#F456FE" }]}>
                (12.08.24):
              </Text>
              <View style={styles.block__numbers}>
                <View style={styles.block__number_left}>
                  <Text style={styles.text__numbers}>126415285452</Text>
                  <Text style={styles.text__numbers}>245862145655</Text>
                  <Text style={styles.text__numbers}>545554544541</Text>
                </View>
                <View style={styles.block__number_right}>
                  <Text style={styles.text__numbers}>554455544544</Text>
                  <Text style={styles.text__numbers}>245862145655</Text>
                  <Text style={styles.text__numbers}>245862145655</Text>
                </View>
              </View>
              <TouchableOpacity
                style={[styles.block__button, { borderColor: "#F456FE" }]}
              >
                <Text style={styles.text__button}>Все билеты</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
      </View>
      <View style={styles.button}>
        <NewButtonComponent
          title={"Магазин билетов"}
          filled={true}
          height={54}
          fontSize={18}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: elemBackgroundColor,
    height: HEIGHT.height,
  },
  ticket__container: {
    // flex: 1,
    // paddingTop: 55,
    // backgroundColor: elemBackgroundColor,
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
    height: 'auto',
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  activated__title: {
    fontFamily: FONTS.medium,
    fontSize: 16,
    color: textPrimaryColor,
    marginVertical: 6,
  },
  activated__tickets_block: {
    // height: 134,
    width: 300,
    // backgroundColor: elemBackgroundColor,
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
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#50FF9A",
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
    width: WIDTH.width,
    marginVertical: 15,
    paddingHorizontal: 15,
  },
  // tickets: {
  //   paddingTop: 10,
  //   height: 111,
  //   width: WIDTH.width - 30,
  //   justifyContent: "center",
  //   borderWidth: 1,
  //   borderColor: elemBackgroundColor3,
  //   borderStyle: "solid",
  //   borderRadius: 10,
  // },
  // ticket__inner: {
  //   paddingHorizontal: 120,
  //   flexDirection: "row",
  //   alignItems: "center",
  //   columnGap: 8,
  // },
  // ticket__text: {
  //   fontFamily: FONTS.regular,
  //   fontSize: 14,
  //   color: textPrimaryColor,
  // },
  // ticket__button: {
  //   justifyContent: "center",
  //   alignItems: "center",
  //   width: 142,
  //   height: 34,
  // },
  // ticket__button_text: {
  //   fontFamily: FONTS.regular,
  //   fontSize: 12,
  //   color: textPrimaryColor,
  // },
});

export default Tickets;
