import { StyleSheet } from "react-native";
import { COLORS, SIZES, HEIGHT } from "../constants/theme";

const styles = StyleSheet.create({
  input: {
    padding: 10,
    paddingHorizontal: 15,
    width: 280,
    height: 48,
    borderRadius: 8,
    backgroundColor: "rgba(18, 17, 35, 1)",
    color: "white",
  },
  errorText: {
    fontSize: 12,
    color: "red",
    marginLeft: 5,
    paddingVertical: 5,
  },
});

export default styles ;
