import { StyleSheet } from "react-native";

import { COLORS, SIZES, HEIGHT } from "../constants/theme";

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
    paddingTop: 80,
    paddingBottom: 30,
  },
  textContainerSmall: {
    paddingTop: 40,
    paddingBottom: 15,
  },
  textContainer2: {},
  textContainer3: {},
  textContainer4: {},
  text: {
    fontSize: SIZES.xLarge,
    fontWeight: "bold",
    color: "white",
  },
  text2: {
    width: 250,
    fontSize: SIZES.medium,
    color: COLORS.text,
    textAlign: "center",
  },
  text3: {
    width: 280,
    fontSize: SIZES.medium,
    color: "white",
    textAlign: "center",
  },
  text4: {
    fontSize: SIZES.medium,
    color: COLORS.text,
  },
  smsButton: {
    paddingVertical: 60,
  },
  smsButtonSmall: {
    paddingVertical: 30,
  },
  button: {
    width: 260,
  },
  smsRepeat: {
    width: 280,
    fontSize: SIZES.medium,
    color: "#3D4ABA",
    textAlign: "center",
    textDecorationLine: "underline",
    paddingVertical: 60,
  },
});

// console.log(HEIGHT.height);

let containerStyles = styles.container;
let textContainerStyles = styles.textContainer;

let smsButtonstyles = styles.smsButton;

if (HEIGHT.height < 650) {
  containerStyles = styles.containerSmall;
  textContainerStyles = styles.textContainerSmall;
  smsButtonstyles = styles.smsButtonSmall;
}

export { styles, containerStyles, textContainerStyles, smsButtonstyles };
