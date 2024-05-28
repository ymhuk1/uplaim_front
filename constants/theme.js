import { Dimensions } from "react-native";
import * as Font from "expo-font";

const loadFonts = async () => {
  try {
    const fonts = {
      "Rubik-Light": require("../assets/fonts/Rubik-Light.ttf"),
      "Rubik-Medium": require("../assets/fonts/Rubik-Medium.ttf"),
      "Rubik-Regular": require("../assets/fonts/Rubik-Regular.ttf"),
      "Rubik-Bold": require("../assets/fonts/Rubik-Bold.ttf"),
      "Rubik-SemiBold": require("../assets/fonts/Rubik-SemiBold.ttf"),
    };
    await Font.loadAsync(fonts);
  } catch (error) {
    console.error("Error loading fonts:", error);
  }
};

loadFonts();

const { width, height } = Dimensions.get("screen");

const HEIGHT = {
  height: height,
};

const WIDTH = {
  width: width,
};

const COLORS = {
  primary: "#181629",
  secondary: "#121123",
  iconBack: "#24224A",
  iconBack2: "#3F3761",
  text: "#FFFFFF",
};

const FONTS = {
  light: "Rubik-Light",
  medium: "Rubik-Medium",
  regular: "Rubik-Regular",
  semibold: "Rubik-SemiBold",
  bold: "Rubik-Bold",
};

const SIZES = {
  xSmall: 10,
  small: 12,
  medium: 16,
  large: 22,
  xLarge: 24,
  xxLarge: 32,
};

const SKELETON = {
  // colorMode: "light",
  transition: {
    type: "timing",
    duration: 2000,
  },
  colors: ["#1E192F", "#201b44"],
};

export { COLORS, SIZES, SKELETON, HEIGHT, WIDTH, FONTS };
