import { StyleSheet } from "react-native";
import { COLORS, SIZES, HEIGHT, WIDTH } from "../constants/theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // width: WIDTH.width-40,
    // marginHorizontal: 10,
    minHeight: HEIGHT.height,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 25,
  },
  popupContainer: {
    height: 550,
    paddingTop: 50,
    backgroundColor: "#24224A",
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    // width: WIDTH.width - 20,
    // marginHorizontal: 0,
    alignItems: "center",
    justifyContent: "center",
    // marginBottom: 10,
  },
  headerPopup: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  rating: {
    marginTop: 18,
    // marginHorizontal: "auto",
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
