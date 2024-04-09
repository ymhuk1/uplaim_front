import { ActivityIndicator, Dimensions, StyleSheet, Text, View } from "react-native";
import { COLORS, SIZES } from "../constants/theme";

export const LoadingSkeleton = () => {
  return (
    <View style={styles.container}>
      <View style={styles.placeholderSquare2} />
      <View style={styles.placeholderSquare3} />
      <View style={styles.placeholderSquare} />
      <View style={styles.placeholderSquare4} />
      <View style={styles.placeholderSquare} />
    </View>
  );
};

const {height} = Dimensions.get("window");
const {width} = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    marginVertical: height / 10,
    backgroundColor: COLORS.primary,
    height: height,
    alignItems: "center",
  },
  placeholderSquare: {
    backgroundColor: "#3d2e4f70",
    width: width - 40,
    marginVertical: 20,
    borderRadius: 15,
    height: 100,
  },
  placeholderSquare2: {
    backgroundColor: "#3d2e4f70",
    width: width - 100,
    marginVertical: 20,
    borderRadius: 50,
    height: 120,
  },
  placeholderSquare3: {
    backgroundColor: "#3d2e4f70",
    width: width - 200,
    marginVertical: 20,
    borderRadius: 50,
    height: 40,
  },
  placeholderSquare4: {
    backgroundColor: "#3d2e4f70",
    width: width - 120,
    marginVertical: 20,
    borderRadius: 50,
    marginVertical: 50,
    height: 60,
  },
});
