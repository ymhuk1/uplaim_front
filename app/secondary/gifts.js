import {
  Modal,
  RefreshControl,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Image, ImageBackground } from "expo-image";
import React, { useState } from "react";
import { FONTS, HEIGHT, WIDTH } from "../../constants/theme";
import { elemGradientColors } from "../../components/ColorsComponent";
import { LinearGradient } from "expo-linear-gradient";
import NewButtonComponent from "../../components/NewButtonComponent";
import FitnessGift from "../../components/FitnessCardComponent";
import Accordion from "../../components/AccordeonComponent";
import {
  styles,
  giftsWidthImg,
  ticketsWidth,
  upBalanceWidth,
} from "../../styles/giftStyles";
import { router } from "expo-router";
import GiftsNow from "../../components/GiftsNowComponent";
import TicketsComponent from "../../components/TicketsComponent";
import HeaderComponent from "../../components/HeaderComponent";
import UniversalModal from "../../components/ModalWindowComponent";
import ActivatesModalComponent from "../../components/ActivatesModalComponent";

export default function Gifts() {
  const [refreshing, setRefreshing] = useState(false);
  const [textValue, setTextValue] = useState("Выигрывай с нами!");
  const [isTooltipVisible, setTooltipVisible] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleTooltip = () => {
    setTooltipVisible(!isTooltipVisible);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const onRefresh = () => {
    setRefreshing(true);
  };
  return (
    <View>
      <ScrollView
      // style={styles.container}
      // refreshControl={
      //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      // }
      // scrollEnabled={true}
      showsVerticalScrollIndicator={false}
      // contentContainerStyle={styles.container}
      >
        <ImageBackground
          source={require("../../assets/background.png")}
          contentFit={"cover"}
          style={styles.containerImg}
          // blurRadius={100}
        >
            <View style={styles.containerView}>
              <HeaderComponent text={textValue} secondary={true} />
              <View style={styles.upBalanceContainer}>
                <LinearGradient
                  colors={elemGradientColors}
                  style={styles.upBalance}
                >
                  <Text style={styles.upbalance__text}>У Вас</Text>
                  <View
                    style={{
                      flexDirection: "row-reverse",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      height={18}
                      width={28}
                      source={require("../../assets/up.svg")}
                    />
                    <Text style={styles.balance__text}>300</Text>
                  </View>
                </LinearGradient>

                <TicketsComponent
                  buttonTitle={"Мои билеты"}
                  widthElement={ticketsWidth}
                  widthButton={ticketsWidth - 20}
                  height={27}
                />
              </View>
              <Text style={styles.textTitle2}>Сейчас в розыгрыше</Text>

              <View
                style={{
                  flexDirection: "row",
                  columnGap: 15,
                  marginBottom: 15,
                }}
              >
                <GiftsNow
                  sourceImg={require("../../assets/gifts/iphone.png")}
                  sourceTicket={require("../../assets/ticket-green.svg")}
                  text={"Apple iPhone 14"}
                  height={154}
                  imageHeight={105}
                  width={giftsWidthImg}
                />
                <GiftsNow
                  sourceImg={require("../../assets/gifts/macbook.png")}
                  sourceTicket={require("../../assets/ticket-orange.svg")}
                  text={"Apple iPhone 14"}
                  height={154}
                  imageHeight={105}
                  width={giftsWidthImg}
                />
                <GiftsNow
                  sourceImg={require("../../assets/gifts/car.png")}
                  sourceTicket={require("../../assets/ticket-fuksia.svg")}
                  text={"Apple iPhone 14"}
                  height={154}
                  imageHeight={105}
                  width={giftsWidthImg}
                />
              </View>

              <TouchableOpacity
                onPress={() => router.push({ pathname: "/secondary/allGifts" })}
              >
                <View style={styles.prize__container}>
                    <Text style={styles.text__prize}>
                      Все разыгрываемые призы
                    </Text>
                </View>
              </TouchableOpacity>

              <Text style={styles.textTitle2}>Текущие розыгрыши</Text>
              <View style={styles.currentGifts}>
                {[
                  {
                    srcImg: require("../../assets/gifts/pizza.jpg"),
                    srcTicket: require("../../assets/gift-green.svg"),
                    borderColor: "#50FF9A",
                    activeTickets: 2,
                  },
                  {
                    srcImg: require("../../assets/gifts/scooter.jpg"),
                    srcTicket: require("../../assets/gift-orange.svg"),
                    borderColor: "#F2994A",
                    activeTickets: 1,
                  },
                  {
                    srcImg: require("../../assets/gifts/telephone.jpg"),
                    srcTicket: require("../../assets/gift-pink.svg"),
                    borderColor: "#F456FE",
                    activeTickets: 0,
                  },
                ].map(({ srcImg, srcTicket, borderColor, activeTickets }) => (
                  <View
                    key={srcImg}
                    style={[styles.currentGifts__inner, { borderColor }]}
                  >
                    <View style={styles.currentGifts__img}>
                      <Image
                        height={60}
                        width={60}
                        source={srcImg}
                        borderRadius={8}
                      />
                    </View>
                    <View style={styles.currentGifts__text}>
                      <Text style={styles.currentGifts__text_title}>
                        Лови момент
                      </Text>
                      <Text style={styles.text_date}>Розыгрыш 12.08.2024</Text>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          columnGap: 5,
                        }}
                      >
                        <Image height={24} width={24} source={srcTicket} />
                        <Text style={styles.currentGifts__text_prizes}>
                          50 призов
                        </Text>
                      </View>
                    </View>
                    <View style={styles.currentGifts__button}>
                      <TouchableOpacity onPress={() => toggleModal()}>
                        <Text
                          style={[
                            styles.currentGifts__button_text,
                            { backgroundColor: borderColor },
                          ]}
                        >
                          Участвовать
                        </Text>
                      </TouchableOpacity>
                      <Text style={styles.currentGifts__button_ticket}>
                        Активных билетов: {activeTickets}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
              <TouchableOpacity
                onPress={() =>
                  router.push({ pathname: "/secondary/allRaffles" })
                }
              >
                <View style={styles.prize__container}>
                  <Text style={styles.text__prize}>Все розыгрыши</Text>
                </View>
              </TouchableOpacity>

              <View style={styles.makeMoney}>
                <Text style={styles.makeMoney__text}>Зарабатывай</Text>
                <Image
                  height={26}
                  width={40}
                  source={require("../../assets/gifts/gift-up.svg")}
                />
                <Text style={styles.makeMoney__text}>и</Text>
                <View style={styles.makeMoney__tickets}>
                  <Image
                    height={29}
                    width={82}
                    source={require("../../assets/ticket-green.svg")}
                  />
                  <Image
                    height={29}
                    width={82}
                    source={require("../../assets/ticket-orange.svg")}
                    style={{ marginLeft: 3 }}
                  />
                  <Image
                    height={29}
                    width={82}
                    source={require("../../assets/ticket-fuksia.svg")}
                    style={{ marginLeft: 7 }}
                  />
                </View>
              </View>
              <Text style={styles.ticket__text}>
                Выполняйте данные задания и получайте UP или билеты для
                розыгрыша.
              </Text>

              <View style={{ marginBottom: 20 }}>
                <FitnessGift
                  imageSource={require("../../assets/gifts/fitness.svg")}
                  balanceImageSource={require("../../assets/up.svg")}
                  statusImageSource={require("../../assets/gifts/clock.svg")}
                  title={"Фитнес-центр"}
                  description={
                    "Приобретите что то у нас и мы сделаем скидку 15% для вас"
                  }
                  count={5}
                  maxCount={5}
                  endDate={"до 1 января 2024 года"}
                  balance={10}
                  balanceImageHeight={14}
                  balanceImageWidth={22}
                  onClose={toggleTooltip}
                />
                <FitnessGift
                  imageSource={require("../../assets/gifts/fitness.svg")}
                  balanceImageSource={require("../../assets/ticket-green.svg")}
                  statusImageSource={require("../../assets/gifts/clock.svg")}
                  title={"Фитнес-центр"}
                  description={
                    "Приобретите что то у нас и мы сделаем скидку 15% для вас"
                  }
                  count={5}
                  maxCount={5}
                  endDate={"до 1 января 2024 года"}
                  balance={10}
                  balanceImageHeight={12}
                  balanceImageWidth={33}
                  onClose={toggleTooltip}
                />
                <FitnessGift
                  imageSource={require("../../assets/gifts/fitness.svg")}
                  balanceImageSource={require("../../assets/up.svg")}
                  statusImageSource={require("../../assets/gifts/success.svg")}
                  title={"Фитнес-центр"}
                  description={
                    "Приобретите что то у нас и мы сделаем скидку 15% для вас"
                  }
                  count={5}
                  maxCount={5}
                  endDate={"выполнено"}
                  balance={10}
                  balanceImageHeight={14}
                  balanceImageWidth={22}
                  onClose={toggleTooltip}
                />
              </View>

              <TouchableOpacity
                onPress={() => router.push({ pathname: "/secondary/allTasks" })}
              >
                <View style={styles.prize__container}>
                  <Text style={styles.text__prize}>Все задания</Text>
                </View>
              </TouchableOpacity>

              <Text style={styles.textTitle2}>История начислений</Text>
              <View style={{ rowGap: 12, marginBottom: 20 }}>
                <Text style={styles.ticket__text}>10 октября</Text>
                <FitnessGift
                  imageSource={require("../../assets/gifts/fitness.svg")}
                  balanceImageSource={require("../../assets/ticket-green.svg")}
                  description={
                    "Приобретите что то у нас и мы сделаем скидку 15% для вас"
                  }
                  balance={10}
                  balanceImageHeight={12}
                  balanceImageWidth={33}
                />
                <FitnessGift
                  imageSource={require("../../assets/gifts/fitness.svg")}
                  balanceImageSource={require("../../assets/up.svg")}
                  description={
                    "Приобретите что то у нас и мы сделаем скидку 15% для вас"
                  }
                  balance={10}
                  balanceImageHeight={14}
                  balanceImageWidth={22}
                />
                <Text style={styles.ticket__text}>8 октября</Text>
                <FitnessGift
                  imageSource={require("../../assets/gifts/fitness.svg")}
                  balanceImageSource={require("../../assets/ticket-green.svg")}
                  description={
                    "Приобретите что то у нас и мы сделаем скидку 15% для вас"
                  }
                  balance={10}
                  balanceImageHeight={12}
                  balanceImageWidth={33}
                />
              </View>

              <TouchableOpacity
                onPress={() =>
                  router.push({ pathname: "/secondary/accrualHistory" })
                }
              >
                <View style={styles.prize__container}>
                  <Text style={styles.text__prize}>Все начисления</Text>
                </View>
              </TouchableOpacity>

              <Text style={styles.textTitle2}>Ответы на вопросы</Text>

              <View style={styles.accordion__container}>
                <Accordion
                  title={"Отзыв / предложение по стабильности или функционалу"}
                  content={
                    "Приобретите что то у нас и мы сделаем скидку 15% для вас"
                  }
                  width={270}
                />
                <Accordion
                  title={"Я не вижу баллы Проверить начисления"}
                  content={
                    "Приобретите что то у нас и мы сделаем скидку 15% для вас"
                  }
                  width={180}
                />
                <Accordion
                  title={"Отзыв / предложение по стабильности или функционалу"}
                  content={
                    "Приобретите что то у нас и мы сделаем скидку 15% для вас"
                  }
                  width={270}
                />
              </View>
              {isTooltipVisible && (
                <Modal
                  visible={isTooltipVisible}
                  animationType="slide"
                  transparent={true}
                >
                  <UniversalModal
                    onClose={toggleTooltip}
                    title={"Покупайте в категории Авто"}
                    title2={"Получаете"}
                    buttonTitle={"К покупкам"}
                    balance={10}
                    balanceUp={10}
                    content={
                      "Приобретите что то у нас и мы сделаем скидку 15% для вас скидку 15% для васПриобретите что то у нас и мы сделаем скидку 15% для вас"
                    }
                    sourceImg={require("../../assets/gifts/car.png")}
                    dateText={
                      "Приобретите что то у нас и мы сделаем скидку 15% для вас скидку 15% для вас"
                    }
                  />
                </Modal>
              )}
              {isModalVisible && (
                <Modal
                  visible={isModalVisible}
                  animationType="slide"
                  transparent={true}
                >
                  <ActivatesModalComponent onClose={toggleModal} />
                </Modal>
              )}
            </View>
            <StatusBar
              backgroundColor="transparent"
              barStyle="light-content"
              translucent={true}
            />
        </ImageBackground>
      </ScrollView>
    </View>
  );
}
