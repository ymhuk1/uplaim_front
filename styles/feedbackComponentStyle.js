import { StyleSheet } from "react-native";
import { COLORS, SIZES, HEIGHT, WIDTH } from "../constants/theme";

const styles = StyleSheet.create({
  popupContainer: {
    position: "absolute",
    paddingTop: 50,
    bottom: -20,
    // top: 20,
    backgroundColor: "#24224A",
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    minWidth: WIDTH.width,
    zIndex: 999,
    alignItems: "center",
    // padding: 20,
  },
  headerPopup: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    // marginBottom: 20,
  },
  rating: {
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: "auto",
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
    color: "white",
    borderRadius: 25,
  },
  textPopup2: {
    padding: 10,
    backgroundColor: "#121123",
    marginHorizontal: 10,
    height: 100,
    fontSize: 16,
    color: "white",
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
