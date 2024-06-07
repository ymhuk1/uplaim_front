import { StyleSheet } from "react-native";
import { FONTS, WIDTH } from "../constants/theme";
import { elemBackgroundColor, elemBackgroundColor3, fuchsia, textColor4, textPrimaryColor } from "../components/ColorsComponent";

let ticketsWidth = WIDTH.width - 180;
let upBalanceWidth = WIDTH.width - ticketsWidth - 45;
let giftsWidthImg = (WIDTH.width - 60) / 3;

const styles = StyleSheet.create({
  container: {},
  containerImg: {
    flex: 1,
  },
  containerView: {
    marginHorizontal: 15,
    // marginTop: 50,
  },
  textTitle1: {
    marginBottom: 15,
    fontFamily: FONTS.medium,
    fontSize: 24,
    color: textPrimaryColor,
  },
  textTitle2: {
    marginTop: 20,
    marginBottom: 16,
    fontFamily: FONTS.medium,
    fontSize: 24,
    color: textPrimaryColor,
  },
  upBalanceContainer: {
    marginTop: 10,
    justifyContent: "center",
    flexDirection: "row",
    columnGap: 15,
  },
  upBalance: {
    height: 111,
    width: upBalanceWidth,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: elemBackgroundColor3,
    borderStyle: "solid",
    borderRadius: 10,
  },
  upbalance__text: {
    fontFamily: FONTS.regular,
    fontSize: 16,
    color: textPrimaryColor,
    marginBottom: 12,
  },
  balance__text: {
    fontFamily: FONTS.medium,
    fontSize: 30,
    color: textPrimaryColor,
    marginRight: 6,
  },
  ticket__text: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    color: textPrimaryColor,
  },
  prize__container: {
    width: WIDTH.width - 30,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderWidth: 1,
    borderColor: fuchsia,
    borderStyle: "solid",
    borderRadius: 20,
  },
  text__prize: {
    textAlign: "center",
    alignItems: "center",
    fontFamily: FONTS.medium,
    fontSize: 18,
    color: textPrimaryColor,
  },
  currentGifts: {
    marginBottom: 5,
  },
  currentGifts__inner: {
    flexDirection: "row",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderWidth: 2,
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 10,
  },
  currentGifts__img: {
    borderWidth: 1,
    borderColor: textColor4,
    borderRadius: 8,
  },
  currentGifts__text_title: {
    fontFamily: FONTS.medium,
    fontSize: 16,
    color: textPrimaryColor,
  },
  currentGifts__text: {
    alignItems: "start",
    justifyContent: "center",
    marginLeft: 8,
    marginRight: "auto",
  },
  text_date: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: textColor4,
  },
  currentGifts__text_prizes: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: textPrimaryColor,
    alignSelf: "flex-end",
    justifyContent: "center",
  },
  currentGifts__button: {
    alignItems: "flex-end",
    marginRight: 4,
  },
  currentGifts__button_text: {
    width: 94,
    fontFamily: FONTS.regular,
    textAlign: "center",
    fontSize: 12,
    color: textPrimaryColor,
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderRadius: 7,
    marginBottom: 4,
  },
  currentGifts__button_ticket: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: textPrimaryColor,
  },
  makeMoney: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
  },
  makeMoney__text: {
    marginTop: 24,
    fontFamily: FONTS.medium,
    fontSize: 24,
    color: textPrimaryColor,
  },
  makeMoney__tickets: {

  },
  fitness__container: {
    width: WIDTH.width - 30,
    marginBottom: 20,
  },
  fitness__inner: {
    width: WIDTH.width - 30,
    marginTop: 15,
    paddingHorizontal: 10,
    paddingVertical: "auto",
    height: 100,
    backgroundColor: elemBackgroundColor,
    borderRadius: 12,
    justifyContent: "center",
  },
  fitness__inner_top: {
    marginTop: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  fitness__inner_text: {
    flexDirection: "column",
    marginLeft: 8,
    marginRight: "auto",
    justifyContent: "center",
  },
  fitness__button: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  fitness__inner_bottom: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 5,
  },
  fitness__text: {
    fontFamily: FONTS.medium,
    fontSize: 20,
    color: textPrimaryColor,
  },
  fitness__text2: {
    width: 193,
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: textPrimaryColor,
  },
  fitness__button_text: {
    fontFamily: FONTS.medium,
    fontSize: 14,
    color: textPrimaryColor,
    position: "absolute",
    top: 16,
    alignSelf: "center",
  },
  fitness__balance: {
    columnGap: 4,
    marginLeft: "auto",
    flexDirection: "row",
    alignItems: "baseline",
  },
  accordion__container: {
    maxWidth: WIDTH.width - 30,
    rowGap: 20,
    marginBottom: 40,
  },
});

export {styles, giftsWidthImg, upBalanceWidth, ticketsWidth};