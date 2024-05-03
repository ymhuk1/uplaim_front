import { Image } from "expo-image";
import { Text, TouchableOpacity, View } from "react-native";
import { FONTS, WIDTH } from "../constants/theme";
import {
  elemBackgroundColor,
  textColor4,
  textPrimaryColor,
} from "./ColorsComponent";

const FitnessGift = ({
  imageSource,
  title,
  description,
  count,
  maxCount,
  endDate,
  balance,
  balanceImageSource,
  balanceImageHeight,
  balanceImageWidth,
  statusImageSource,
}) => {
  return (
    <View style={styles.fitness__container}>
      <View
        style={
          count && maxCount ? styles.fitness__inner : styles.fitness__inner2
        }
      >
        <View style={styles.fitness__inner_top}>
          <Image height={52} width={52} source={imageSource} />
          {count && maxCount ? (
            <View style={styles.fitness__inner_text}>
              <Text style={styles.fitness__text}>{title}</Text>
              <Text style={styles.fitness__text2}>{description}</Text>
            </View>
          ) : (
            <View style={styles.fitness__inner_text}>
              <Text style={styles.fitness__text2}>{description}</Text>
            </View>
          )}
          <View style={styles.fitness__button}>
            {count && maxCount ? (
              <TouchableOpacity>
                <Text style={styles.fitness__button_text}>
                  {count}/{maxCount}
                </Text>
                <Image
                  height={52}
                  width={52}
                  source={require("../assets/gifts/circle.svg")}
                />
              </TouchableOpacity>
            ) : (
              <View style={styles.fitness__balance}>
                <Text style={styles.fitness__text3}>{balance}</Text>
                <Image
                  height={balanceImageHeight}
                  width={balanceImageWidth}
                  source={balanceImageSource}
                />
              </View>
            )}
          </View>
        </View>

        <View style={styles.fitness__inner_bottom}>
          <Image height={16} width={16} source={statusImageSource} />
          <View style={{ marginLeft: 4 }}>
              <Text style={styles.text_date}>{endDate}</Text>
          </View>
          {count && maxCount ? (
            <View style={styles.fitness__balance}>
              <Text style={styles.fitness__text3}>{balance}</Text>
              <Image
                height={balanceImageHeight}
                width={balanceImageWidth}
                source={balanceImageSource}
              />
            </View>
          ) : null}
        </View>
      </View>
    </View>
  );
};

const styles = {
  fitness__container: {
    width: WIDTH.width - 30,
    alignItems: "center",
  },
  fitness__inner: {
    width: WIDTH.width - 30,
    marginTop: 15,
    paddingHorizontal: 10,
    paddingVertical: 8,
    height: 100,
    backgroundColor: elemBackgroundColor,
    borderRadius: 12,
    justifyContent: "center",
  },
  fitness__inner2: {
    width: WIDTH.width - 30,
    paddingHorizontal: 10,
    paddingVertical: 9,
    height: 70,
    backgroundColor: elemBackgroundColor,
    borderRadius: 12,
    justifyContent: "space-around",
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
    fontSize: 14,
    color: textPrimaryColor,
  },
  fitness__text2: {
    width: 193,
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: textPrimaryColor,
  },
  fitness__text3: {
    fontFamily: FONTS.medium,
    fontSize: 20,
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
  text_date: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: textColor4,
  },
};

export default FitnessGift;
