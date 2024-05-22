import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import NewButtonComponent from "./NewButtonComponent";
import { FONTS, WIDTH } from "../constants/theme";
import {
  elemBackgroundColor3,
  elemGradientColors,
  textPrimaryColor,
} from "./ColorsComponent";

function TicketsComponent(props) {
  const {
    images,
    counts,
    buttonTitle,
    onButtonPress,
    ticketsTitle,
    disabled,
    widthElement,
    widthButton,
    height,
  } = props;
  const defaultProps = {
    images: [
      { source: require("../assets/ticket-green.svg"), count: 10 },
      { source: require("../assets/ticket-orange.svg"), count: 5 },
      { source: require("../assets/ticket-fuksia.svg"), count: 0 },
    ],
    counts: [],
    buttonTitle: "Мои билеты",
    onButtonPress: () => router.push({ pathname: "/secondary/tickets" }),
  };

  const mergedProps = { ...defaultProps, ...props };
  const {
    images: imgSources,
    counts: imgCounts,
    buttonTitle: btnTitle,
    onButtonPress: btnPress,
    ticketsTitle: title,
  } = mergedProps;

  return (
    <View style={styles.container} width={widthElement}>
      <LinearGradient
        colors={elemGradientColors}
        style={[
          styles.tickets,
          ticketsTitle ? { flexDirection: "row" } : { flexDirection: "column" },
        ]}
      >
        <View
          style={ticketsTitle ? styles.ticket__inner2 : styles.ticket__inner}
        >
          {ticketsTitle ? (
            <View style={{ marginBottom: 5 }}>
              <Text style={styles.ticket__title}>{title}</Text>
            </View>
          ) : null}
          {imgSources.map(({ source, count }, index) => (
            <View
              key={count}
              style={[
                styles.ticket__img,
                !ticketsTitle
                  ? { paddingHorizontal: (widthElement - 145) / 2 }
                  : null,
              ]}
            >
              <Image height={15} width={45} source={source} />
              <Text style={styles.ticket__text}>
                {imgCounts[index] || count} билетов
              </Text>
            </View>
          ))}
        </View>
        <View
          style={[
            styles.ticket__button,
            ticketsTitle ? { paddingTop: 20 } : null,
          ]}
        >
          <TouchableOpacity onPress={btnPress}>
            <LinearGradient
              location={[0.5, 0.5]}
              start={[0.4, -0.9]}
              // end={[  0.1, 0.5 ]}
              colors={
                disabled ? ["#7c7f86", "#5F5F65"] : ["#7434b7", "#7730e5"]
              }
              style={[
                styles.button,
                {
                  width: widthButton,
                  height: height,
                },
                ticketsTitle
                  ? {
                      marginRight: 5,
                    }
                  : { justifyContent: "center", marginVertical: 5 },
              ]}
            >
              <Text style={styles.ticket__text}>{btnTitle}</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
}
let ticketsWidth2 = WIDTH.width - 180;
let ticketsWidth = WIDTH.width - 30;
let giftsWidthImg = (WIDTH.width - 60) / 3;

const styles = StyleSheet.create({
  container: {},
  tickets: {
    height: 110,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: elemBackgroundColor3,
    borderStyle: "solid",
    borderRadius: 10,
  },
  ticket__title: {
    marginTop: 4,
    fontFamily: FONTS.medium,
    fontSize: 16,
    color: textPrimaryColor,
  },
  ticket__inner: {
    paddingHorizontal: 10,
  },
  ticket__inner2: {
    paddingHorizontal: 15,
  },
  ticket__img: {
    flexDirection: "row",
    columnGap: 5,
    alignItems: "center",
  },
  ticket__text: {
    textAlign: "center",
    fontFamily: FONTS.regular,
    fontSize: 14,
    color: textPrimaryColor,
  },
  ticket__button: {
    paddingHorizontal: 10,
    marginLeft: "auto",
    justifyContent: "center",
  },
  button: {
    borderRadius: 10,
    justifyContent: "center",
  },
});

export default TicketsComponent;
