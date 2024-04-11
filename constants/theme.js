import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");



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
    duration: 1000,
  },
  colors: ["#152f55", "#320a77"],
};

export { COLORS, SIZES, SKELETON };
