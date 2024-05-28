import { StyleSheet } from "react-native";
import { COLORS, SIZES, HEIGHT, FONTS } from "../constants/theme";

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary,
    flex: 1,
  },
  containerViewIMG: {
    minHeight: HEIGHT.height,
    flex: 1,
  },
  containerView: {
    alignItems: "center",
    paddingTop: 80,
    paddingBottom: 60,
  },
  iconContainer: {},
  icon: {
    maxWidth: 185,
    height: 40,
  },
  textContainer: {
    fontFamily: FONTS.medium,
  },
  text: {
    fontFamily: FONTS.medium,
    paddingTop: 100,
    textAlign: "center",
    maxWidth: 185,
    fontSize: SIZES.xLarge,
    color: COLORS.text,
  },
  smsButton: {
    paddingTop: 30,
    marginBottom: 70,
  },
  button: {
    width: 260,
    marginBottom: 260,
  },
  textMenu: {
    display: "none",
    fontSize: SIZES.medium,
    color: COLORS.text,
    marginLeft: 8,
    textAlign: "center",
  },
});

export { styles };