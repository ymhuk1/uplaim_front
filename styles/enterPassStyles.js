import { StyleSheet } from "react-native";
import { COLORS, SIZES, HEIGHT, FONTS } from "../constants/theme";

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary,
    minHeight: HEIGHT.height,
    flex: 1,
  },
  containerSmall: {
    backgroundColor: COLORS.primary,
    minHeight: HEIGHT.height,
  },
  containerViewIMG: {
    minHeight: HEIGHT.height,
    flex: 1,
  },
  containerView: {
    alignItems: "center",
    // paddingTop: 80,
    // paddingBottom: 40,
  },
  iconContainer: {
    paddingTop: 110,
    marginBottom: 70,
  },
  icon: {
    maxWidth: 185,
    height: 40,
  },
  textContainer: {},
  text: {
    fontFamily: FONTS.medium,
    paddingBottom: 20,
    textAlign: "center",
    // maxWidth: 185,
    fontSize: SIZES.xLarge,
    fontWeight: "bold",
    color: COLORS.text,
  },
  smsButton: {
    paddingTop: 30,
    marginBottom: 71,
  },
  button: {
    width: 260,
    marginBottom: 220,
  },
  buttonSmall: {
    width: 260,
    marginBottom: 180,
  },
  textMenu: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.medium,
    color: COLORS.text,
    marginLeft: 8,
    textAlign: "center",
  },
});

// console.log(HEIGHT.height);

let containerStyles = styles.container;
let buttonStyles = styles.button;

if (HEIGHT.height < 780) {
  containerStyles = styles.containerSmall;
  buttonStyles = styles.buttonSmall;
  // console.log("Login screen is smaller than 1280");
}

export { styles, containerStyles, buttonStyles };
