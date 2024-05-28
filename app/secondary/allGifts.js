import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Image, ImageBackground } from "expo-image";
import { FONTS, HEIGHT, WIDTH } from "../../constants/theme";
import {
  elemBackgroundColor,
  textPrimaryColor,
} from "../../components/ColorsComponent";
import GiftNow from "../../components/GiftsNowComponent";
import HeaderComponent from "../../components/HeaderComponent";
import UniversalModal from "../../components/ModalWindowComponent";

export default function AllGifts() {
  const [textValue, setTextValue] = useState("Все призы");
  const [isTooltipVisible, setTooltipVisible] = useState(false);

  const toggleTooltip = () => {
    setTooltipVisible(!isTooltipVisible);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <ImageBackground
        source={require("../../assets/background.png")}
        contentFit={"cover"}
        style={styles.containerImg}
      >
        <View style={styles.containerView}>
          <HeaderComponent text={textValue} secondary={true} />
          <View style={styles.tickets__wrapper}>
            <View
              style={[
                styles.tickets__wrapper_image,
                { borderColor: "#50FF9A", borderWidth: 1 },
              ]}
            >
              <Image
                source={require("../../assets/ticket-green.svg")}
                height={21}
                width={60}
              />
              <Text style={styles.tickets__wrapper_text}>12.08.24</Text>
            </View>
            <View style={styles.tickets__wrapper_image}>
              <Image
                source={require("../../assets/ticket-orange.svg")}
                height={21}
                width={60}
              />
              <Text style={styles.tickets__wrapper_text}>12.08.24</Text>
            </View>
            <View style={styles.tickets__wrapper_image}>
              <Image
                source={require("../../assets/ticket-fuksia.svg")}
                height={21}
                width={60}
              />
              <Text style={styles.tickets__wrapper_text}>12.08.24</Text>
            </View>
          </View>
          <View
            style={{
              marginTop: 18,
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 15,
            }}
          >
            <TouchableOpacity onPress={() => toggleTooltip()}>
              <GiftNow
                sourceImg={require("../../assets/gifts/iphones.jpg")}
                sourceTicket={require("../../assets/ticket-green.svg")}
                title={"Apple iPhone 14"}
                text={"Новый смартфон от компании Apple"}
                height={giftsHeightWrapper}
                imageHeight={heightImage}
                width={giftsWidthImg}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => toggleTooltip()}>
              <GiftNow
                sourceImg={require("../../assets/gifts/iphones.jpg")}
                sourceTicket={require("../../assets/ticket-orange.svg")}
                title={"Apple iPhone 14"}
                text={"Новый смартфон от компании Apple"}
                height={giftsHeightWrapper}
                imageHeight={heightImage}
                width={giftsWidthImg}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => toggleTooltip()}>
              <GiftNow
                sourceImg={require("../../assets/gifts/sauna.jpg")}
                sourceTicket={require("../../assets/ticket-fuksia.svg")}
                title={"2 часа сауны"}
                text={"Отдохните от забот в сауне “Бриз”"}
                height={giftsHeightWrapper}
                imageHeight={heightImage}
                width={giftsWidthImg}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => toggleTooltip()}>
              <GiftNow
                sourceImg={require("../../assets/gifts/bicycle.jpg")}
                sourceTicket={require("../../assets/ticket-orange.svg")}
                title={"Велосипед"}
                text={"Спортивный велосипед Stels Pilot"}
                height={giftsHeightWrapper}
                imageHeight={heightImage}
                width={giftsWidthImg}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => toggleTooltip()}>
              <GiftNow
                sourceImg={require("../../assets/gifts/iphones.jpg")}
                sourceTicket={require("../../assets/ticket-green.svg")}
                title={"Apple iPhone 14"}
                text={"Новый смартфон от компании Apple"}
                height={giftsHeightWrapper}
                imageHeight={heightImage}
                width={giftsWidthImg}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => toggleTooltip()}>
              <GiftNow
                sourceImg={require("../../assets/gifts/iphones.jpg")}
                sourceTicket={require("../../assets/ticket-fuksia.svg")}
                title={"Apple iPhone 14"}
                text={"Новый смартфон от компании Apple"}
                height={giftsHeightWrapper}
                imageHeight={heightImage}
                width={giftsWidthImg}
              />
            </TouchableOpacity>
          </View>
          {isTooltipVisible && (
            <Modal
              visible={isTooltipVisible}
              animationType="slide"
              transparent={true}
              // onRequestClose={onClose}
            >
              <UniversalModal
                onClose={toggleTooltip}
                title={"Apple IPhone 14"}
                title2={"У вас подходящих билетов"}
                buttonTitle={"Хорошо"}
                balance={10}
                content={
                  "Тонкий и легкий смартфон из новой линейки Apple iPhone 14 с высоким разрешением OLED-экрана, хорошим объемом памяти и запасом автономности во влагостойком корпусе. Продвинутые камеры позволят снимать фото и видео в отличном качестве даже при слабом освещении."
                }
                sourceImg={require("../../assets/gifts/iphones.jpg")}
                dateText={"Розыгрыш будет произведён 12.08.2024 в 20:00 МСК "}
              />
            </Modal>
          )}
        </View>
      </ImageBackground>
    </ScrollView>
  );
}

let ticketsWrapperImageWidth = (WIDTH.width - 60) / 3;
let giftsWidthImg = (WIDTH.width - 45) / 2;
let emptySpace = HEIGHT.height - 668;
let giftsHeightWrapper = (HEIGHT.height - emptySpace) / 3;
let heightImage = (HEIGHT.height - (emptySpace + giftsHeightWrapper + 30)) / 3;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerImg: {
    // flex: 1,
    minHeight: HEIGHT.height,
  },
  containerView: {
    flex: 1,
    marginHorizontal: 15,
    // marginTop: 50,
  },
  title__text: {
    fontFamily: FONTS.medium,
    fontSize: 24,
    color: textPrimaryColor,
  },
  tickets__wrapper: {
    marginTop: 12,
    flexDirection: "row",
    columnGap: 15,
  },
  tickets__wrapper_image: {
    height: 37,
    width: ticketsWrapperImageWidth,
    backgroundColor: elemBackgroundColor,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  tickets__wrapper_text: {
    position: "absolute",
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: textPrimaryColor,
  },
});
