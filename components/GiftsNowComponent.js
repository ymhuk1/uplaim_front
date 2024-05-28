import { Text, View } from "react-native";
import { giftsWidthImg } from "../styles/giftStyles";
import { elemBackgroundColor, textPrimaryColor } from "./ColorsComponent";
import { FONTS } from "../constants/theme";
import { Image } from "expo-image";

const GiftNow = ({
  sourceImg,
  sourceTicket,
  text,
  title,
  width,
  height,
  imageHeight,
}) => {
  return (
    <View style={styles.giftsNow} height={height} width={width}>
      <View key={text} style={styles.giftsNow__img}>
        <View style={styles.giftsNow__img_ticket}>
          <Image height={15} width={45} source={sourceTicket} />
        </View>
        <Image
          contentFit="cover"
          contentPosition={"top"}
          height={imageHeight}
          width={width}
          source={sourceImg}
          borderTopRightRadius={12}
          borderTopLeftRadius={12}
        />
        {title ? (
          <View style={styles.text__wrapper}>
            <Text style={styles.giftsNow__title}>{title}</Text>
            <Text style={styles.giftsNow__text2}>{text}</Text>
          </View>
        ) : (
          <Text style={styles.giftsNow__text}>{text}</Text>
        )}
      </View>
    </View>
  );
};

const styles = {
  giftsNow: {
    // position: "relative",
    flexDirection: "row",
    justifyContent: "center",
    // columnGap: 15,
    // marginBottom: 15,
  },
  giftsNow__img: {
    // height: 154,
    // width: giftsWidthImg,
    backgroundColor: elemBackgroundColor,
    borderRadius: 12,
  },
  giftsNow__img_ticket: {
    position: "absolute",
    alignSelf: "center",
    top: -8,
    zIndex: 99,
  },
  text__wrapper: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    justifyContent: "center",
  },
  giftsNow__title: {
    fontFamily: FONTS.medium,
    fontSize: 16,
    color: textPrimaryColor,
  },
  giftsNow__text: {
    marginTop: 5,
    // width: 65,
    fontFamily: FONTS.regular,
    fontSize: 14,
    color: textPrimaryColor,
    alignSelf: "center",
    // textAlign: "center",
  },
  giftsNow__text2: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    color: textPrimaryColor,
  },
};

export default GiftNow;
