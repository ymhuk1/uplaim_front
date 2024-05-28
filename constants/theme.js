import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("screen");

const HEIGHT ={
  height: height,
}

const WIDTH = {
  width: width,
}

const COLORS = {
  primary: "#181629",
  iconBack: "#24224A",
  iconBack2: "#3F3761",
  text: "#FFFFFF",
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

export { COLORS, SIZES, SKELETON, HEIGHT, WIDTH };
