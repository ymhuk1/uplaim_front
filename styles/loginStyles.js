import { StyleSheet } from "react-native";
import  { COLORS, SIZES, HEIGHT, FONTS, WIDTH } from "../constants/theme";

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary,
    flex: 1,
  },
  containerSmall: {
    backgroundColor: COLORS.primary,
  },
  containerViewIMG: {
    minHeight: HEIGHT.height,
    flex: 1,
  },
  containerViewIMGSmall: {
    minHeight: HEIGHT.height,
    flex: 1,
  },
  containerView: {
    alignItems: "center",
  },
  logo: {
    marginTop: 110,
    marginBottom: 55,
  },
  logoSmall: {
    marginTop: 110,
    marginBottom: 40,
  },
  iconSocialIn: {
    marginBottom: 40,
    flexDirection: "row",
  },
  iconSocialInSmall: {
    marginBottom: 30,
    flexDirection: "row",
  },
  iconBack: {
    marginHorizontal: 10,
    borderRadius: 12,
    backgroundColor: COLORS.iconBack,
    height: 80,
    width: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  iconSocial: {
    height: 40,
    width: 40,
  },
  textContainer: {
    marginBottom: 40,
    alignItems: "center",
  },
  textContainerSmall: {
    marginBottom: 30,
    alignItems: "center",
  },
  text: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.medium,
    color: COLORS.text,
  },
  input: {
    gap: 25,
  },
  inputSmall: {
    gap: 15,
  },
  checkbox: {
    marginLeft: 35,
    marginBottom: 71,
  },
  checkboxSmall: {
    marginLeft: 35,
    marginBottom: 40,
  },
  button: {
    marginBottom: 71,
    width: 260,
  },
  buttonSmall: {
    marginBottom: 25,
    width: 260,
  },
});

console.log("Login screen width:", WIDTH.width);

let containerStyles = styles.container;
let inputStyles = styles.input;
let textContainerStyles = styles.textContainer;
let logoStyles = styles.logo;
let iconStyles = styles.iconSocialIn;
let checkboxStyles = styles.checkbox;
let buttonStyles = styles.button;
let containerViewIMGStyles = styles.containerViewIMG;

if (HEIGHT.height < 780 || WIDTH.width < 450) {
  containerStyles = styles.containerSmall;
  inputStyles = styles.inputSmall;
  textContainerStyles = styles.textContainerSmall;
  logoStyles = styles.logoSmall;
  iconStyles = styles.iconSocialInSmall;
  checkboxStyles = styles.checkboxSmall;
  buttonStyles = styles.buttonSmall;
  containerViewIMGStyles = styles.containerViewIMGSmall;
  // console.log("Login screen is smaller than 900");
}

export {
  styles,
  containerStyles,
  inputStyles,
  textContainerStyles,
  logoStyles,
  iconStyles,
  checkboxStyles,
  buttonStyles,
  containerViewIMGStyles,
};
