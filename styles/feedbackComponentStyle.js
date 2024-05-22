import { StyleSheet } from "react-native";
import { COLORS, SIZES, HEIGHT, WIDTH, FONTS } from "../constants/theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: HEIGHT.height,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  popupContainer: {
    paddingTop: 50,
    backgroundColor: "#24224A",
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  headerPopup: {
    fontSize: 24,
    fontFamily: FONTS.medium,
    color: "white",
  },
  rating: {
    marginTop: 18,
  },
  textPopupContainer: {
    paddingTop: 20,
    gap: 18,
    minWidth: WIDTH.width,
  },
  textPopup: {
    padding: 10,
    backgroundColor: "#121123",
    marginHorizontal: 10,
    height: 47,
    fontSize: 16,
    borderRadius: 25,
  },
  textPopup2: {
    padding: 10,
    backgroundColor: "#121123",
    marginHorizontal: 10,
    height: 100,
    fontSize: 16,
    borderRadius: 25,
    marginBottom: 20,
  },
  closePopup: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  button: {
    fontSize: 18,
    width: WIDTH.width,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
});

export default styles;
