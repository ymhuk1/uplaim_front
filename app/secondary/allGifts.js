import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Image, ImageBackground } from "expo-image";
import { FONTS, HEIGHT, WIDTH } from "../../constants/theme";
import {
  elemBackgroundColor,
  textPrimaryColor,
} from "../../components/ColorsComponent";
import GiftNow from "../../components/GiftsNowComponent";
import HeaderComponent from "../../components/HeaderComponent";
import UniversalModal from "../../components/ModalWindowComponent";
import Constants from "expo-constants";
import * as SecureStore from "expo-secure-store";
import { Path, Svg } from "react-native-svg";
import { useLocalSearchParams } from "expo-router";

const apiBaseUrl = Constants.expoConfig.extra.API_PROD;

export default function AllGifts() {
  const [textValue, setTextValue] = useState("Все призы");
  const [isTooltipVisible, setTooltipVisible] = useState(false);
  const [prizes, setPrizes] = useState([]);
  const [competitions, setCompetitions] = useState([]);
  const [selectedPrize, setSelectedPrize] = useState();
  const [selectedPrizeId, setSelectedPrizeId] = useState();

  const fetchData = async () => {
    try {
      const prizesResponse = await fetch(`${apiBaseUrl}api/prizes`);
      if (prizesResponse.ok) {
        const data = await prizesResponse.json();
        console.log("Данные Prizes успешно получены:", data);
        setPrizes(data);
      } else {
        console.error("Произошла ошибка при получении данных призов");
      }

      const competitionsResponse = await fetch(`${apiBaseUrl}api/competitions`);
      if (competitionsResponse.ok) {
        const data = await competitionsResponse.json();
        if (data === null) {
          console.error(
            "Произошла ошибка при получении данных конкурсов: данные конкурсов равны null"
          );
        } else {
          // console.log("Данные Competitions успешно получены:", data);
          setCompetitions(data);
        }
      } else {
        console.error(
          `Произошла ошибка при получении данных конкурсов. Статус ответа: ${competitionsResponse.status}`
        );
      }
    } catch (error) {
      console.error("Ошибка при получении запроса:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const toggleTooltip = () => {
    setTooltipVisible(!isTooltipVisible);
  };

  const { id } = useLocalSearchParams();

  useEffect(() => {
    fetchData();
    if (id !== undefined && id !== "") {
      setSelectedPrizeId(Number(id));
    }
  }, [id]);

  const handleCategoryClick = (id) => {
    setSelectedPrizeId(id);
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
            <ScrollView
              showsHorizontalScrollIndicator={false}
              decelerationRate="normal"
              horizontal
            >
              {prizes.map((prize) =>
                prize.prizes.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.tickets__wrapper_image,
                      {
                        borderColor:
                          selectedPrize === item ? prize.color : "transparent",
                        borderWidth: 1,
                      },
                      selectedPrize === item
                        ? { borderColor: prize.color }
                        : {},
                    ]}
                    onPress={() =>
                      handleCategoryClick(item.id) ||
                      setSelectedPrize(selectedPrize === item ? null : item)
                    }
                  >
                    <Svg
                      width="75"
                      height="23"
                      viewBox="0 0 45 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <Path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M8.90903 0H0V5.23889C1.00411 5.71593 1.69811 6.73911 1.69811 7.92453C1.69811 9.10995 1.00411 10.1331 0 10.6102V15.7075H8.9079C8.97963 15.6558 9.0677 15.6253 9.16288 15.6253C9.25807 15.6253 9.34614 15.6558 9.41786 15.7075H45V10.6729C43.9204 10.2277 43.1604 9.16495 43.1604 7.92453C43.1604 6.68411 43.9204 5.62141 45 5.17615V0H9.41673C9.34522 0.0512418 9.25757 0.0814048 9.16288 0.0814048C9.06819 0.0814048 8.98055 0.0512418 8.90903 0ZM9.16288 0.626806C8.92191 0.626806 8.72656 0.822153 8.72656 1.06313V1.14494C8.72656 1.38591 8.92191 1.58126 9.16288 1.58126C9.40386 1.58126 9.5992 1.38591 9.5992 1.14494V1.06313C9.5992 0.822153 9.40386 0.626806 9.16288 0.626806ZM8.72656 2.56298C8.72656 2.32201 8.92191 2.12666 9.16288 2.12666C9.40386 2.12666 9.5992 2.32201 9.5992 2.56298V2.64479C9.5992 2.88576 9.40386 3.08111 9.16288 3.08111C8.92191 3.08111 8.72656 2.88576 8.72656 2.64479V2.56298ZM9.16288 3.62651C8.92191 3.62651 8.72656 3.82186 8.72656 4.06283V4.14464C8.72656 4.38562 8.92191 4.58096 9.16288 4.58096C9.40386 4.58096 9.5992 4.38562 9.5992 4.14464V4.06283C9.5992 3.82186 9.40386 3.62651 9.16288 3.62651ZM8.72656 5.56268C8.72656 5.32171 8.92191 5.12636 9.16288 5.12636C9.40386 5.12636 9.5992 5.32171 9.5992 5.56269V5.6445C9.5992 5.88547 9.40386 6.08082 9.16288 6.08082C8.92191 6.08082 8.72656 5.88547 8.72656 5.64449V5.56268ZM9.16288 6.62622C8.92191 6.62622 8.72656 6.82156 8.72656 7.06254V7.14435C8.72656 7.38532 8.92191 7.58067 9.16288 7.58067C9.40386 7.58067 9.5992 7.38532 9.5992 7.14435V7.06254C9.5992 6.82156 9.40386 6.62622 9.16288 6.62622ZM8.72656 8.56239C8.72656 8.32142 8.92191 8.12607 9.16288 8.12607C9.40386 8.12607 9.5992 8.32142 9.5992 8.56239V8.6442C9.5992 8.88517 9.40386 9.08052 9.16288 9.08052C8.92191 9.08052 8.72656 8.88517 8.72656 8.6442V8.56239ZM9.16288 9.62592C8.92191 9.62592 8.72656 9.82127 8.72656 10.0622V10.1441C8.72656 10.385 8.92191 10.5804 9.16288 10.5804C9.40386 10.5804 9.5992 10.385 9.5992 10.1441V10.0622C9.5992 9.82127 9.40386 9.62592 9.16288 9.62592ZM8.72656 11.5621C8.72656 11.3211 8.92191 11.1258 9.16288 11.1258C9.40386 11.1258 9.5992 11.3211 9.5992 11.5621V11.6439C9.5992 11.8849 9.40386 12.0802 9.16288 12.0802C8.92191 12.0802 8.72656 11.8849 8.72656 11.6439V11.5621ZM9.16288 12.6256C8.92191 12.6256 8.72656 12.821 8.72656 13.0619V13.1438C8.72656 13.3847 8.92191 13.5801 9.16288 13.5801C9.40386 13.5801 9.5992 13.3847 9.5992 13.1438V13.0619C9.5992 12.821 9.40386 12.6256 9.16288 12.6256ZM8.72656 14.5618C8.72656 14.3208 8.92191 14.1255 9.16288 14.1255C9.40386 14.1255 9.5992 14.3208 9.5992 14.5618V14.6436C9.5992 14.8846 9.40386 15.0799 9.16288 15.0799C8.92191 15.0799 8.72656 14.8846 8.72656 14.6436V14.5618Z"
                        fill={prize.color}
                      />
                    </Svg>
                    <Text style={styles.tickets__wrapper_text}>
                      {prize.date_end}
                    </Text>
                  </TouchableOpacity>
                ))
              )}
            </ScrollView>
          </View>
          <View
            style={{
              marginTop: 18,
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 15,
            }}
          >
            {competitions.length > 0 &&
              competitions.map((competition) =>
                competition.prizes
                  .filter(
                    (item) =>
                      !selectedPrizeId ||
                      (item.id && item.id === selectedPrizeId)
                  )
                  .map((item, index) => (
                    <TouchableOpacity
                      onPress={() => toggleTooltip() || setSelectedPrize(item)}
                      key={index}
                    >
                      <GiftNow
                        sourceImg={apiBaseUrl + item.photo}
                        sourceTicket={competition.color}
                        title={item.name}
                        text={item.description}
                        height={giftsHeightWrapper}
                        imageHeight={heightImage}
                        width={giftsWidthImg}
                      />
                    </TouchableOpacity>
                  ))
              )}
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
                title={selectedPrize?.name}
                title2={"У вас подходящих билетов"}
                buttonTitle={"Хорошо"}
                balance={selectedPrize?.quantity_ticket}
                content={selectedPrize?.description}
                sourceImg={
                  selectedPrize ? apiBaseUrl + selectedPrize.photo : null
                }
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
    marginRight: 15,
  },
  tickets__wrapper_text: {
    position: "absolute",
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: textPrimaryColor,
  },
});
