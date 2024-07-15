import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableOpacity,
  Modal,
  StatusBar,
  TextInput,
  // Picker,
} from "react-native";
import React, { useRef, useState } from "react";
import { Image, ImageBackground } from "expo-image";
import { FONTS, HEIGHT, WIDTH } from "../../constants/theme";
import HeaderComponent from "../../components/HeaderComponent";
import {
  elemBackgroundColor,
  elemBackgroundColor2,
  fuchsia,
  inputBackgroundColor,
  textPrimaryColor,
} from "../../components/ColorsComponent";
import Icon from "react-native-vector-icons/MaterialIcons";
import { BlurView } from "expo-blur";
import NewButtonComponent from "../../components/NewButtonComponent";
import { TextInputMask } from "react-native-masked-text";

export default function MyData() {
  const [textValue, setTextValue] = useState("Мои данные");
  const [photoModalVisible, setPhotoModalVisible] = useState(false);
  const [nameModalVisible, setNameModalVisible] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [male, setMale] = useState(false);
  const [female, setFemale] = useState(false);


  const togglePhotoModal = () => {
    setPhotoModalVisible(!photoModalVisible);
  };

  const toggleNameModal = () => {
    setNameModalVisible(!nameModalVisible);
  };

  return (
    <ImageBackground
      source={require("../../assets/background.png")}
      style={styles.container__view}
    >
      <View style={styles.container}>
        <HeaderComponent text={textValue} secondary={true} />
        <View style={styles.header__container}>
          <TouchableOpacity onPress={togglePhotoModal}>
            <Image
              contentFit="contain"
              contentPosition="center"
              transition={500}
              source={require("../../assets/no_photo.svg")}
              width={60}
              height={60}
            />
          </TouchableOpacity>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View style={styles.header__text_container}>
              <Text style={styles.text_light}>ФИО</Text>
              <Text style={styles.text_medium}>Константин Иванов</Text>
            </View>
            <Icon name="arrow-forward-ios" size={40} color={fuchsia} />
          </View>
        </View>
        <View style={styles.info__container}>
          <View style={styles.info__container_inner}>
            <View style={styles.info__item}>
              <Text style={styles.text_light}>Телефон</Text>
              <Text style={styles.text_medium}>+7 987 654 32 10</Text>
            </View>
            <Icon name="arrow-forward-ios" size={40} color={fuchsia} />
          </View>
          <View style={styles.info__container_inner}>
            <View style={styles.info__item}>
              <Text style={styles.text_light}>E-mail</Text>
              <Text style={styles.text_medium}>abc@mail.ru</Text>
            </View>
            <Icon name="arrow-forward-ios" size={40} color={fuchsia} />
          </View>
          <View style={styles.info__container_inner}>
            <View style={styles.info__item}>
              <Text style={styles.text_light}>День рождения</Text>
              <Text style={styles.text_medium}>01.01.2001</Text>
            </View>
            <Icon name="arrow-forward-ios" size={40} color={fuchsia} />
          </View>
          <View style={styles.info__container_inner}>
            <View style={styles.info__item}>
              <Text style={styles.text_light}>Пол</Text>
              <Text style={styles.text_medium}>Мужской</Text>
            </View>
            <Icon name="arrow-forward-ios" size={40} color={fuchsia} />
          </View>
        </View>
        <View style={{ paddingHorizontal: 10, marginTop: 30 }}>
          <NewButtonComponent
            title={"Изменить данные"}
            filled={true}
            height={54}
            fontSize={18}
            onPress={toggleNameModal}
          />
        </View>
      </View>
      {photoModalVisible && (
        <Modal
          animationType="fade"
          isVisible={photoModalVisible}
          transparent={true}
          style={styles.modal}
        >
          <BlurView
            tint="dark"
            intensity={40}
            blurReductionFactor={10}
            experimentalBlurMethod={"dimezisBlurView"}
            style={styles.containerBlur}
          >
            <StatusBar
              barStyle="light-content"
              backgroundColor={elemBackgroundColor2}
            />
            <View style={styles.photoModal__container}>
              <TouchableOpacity
                onPress={() => setPhotoModalVisible(false)}
                style={styles.closePopup}
              >
                <Image
                  contentFit="contain"
                  contentPosition={"center"}
                  transition={1000}
                  source={require("../../assets/close.svg")}
                  width={40}
                  height={40}
                />
              </TouchableOpacity>
              <View style={styles.photoModal__container_inner}>
                <View style={styles.photoModal__item}>
                  <TouchableOpacity>
                    <Text style={styles.text_medium}>Снять фото</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.photoModal__container_inner}>
                <View style={styles.photoModal__item}>
                  <TouchableOpacity>
                    <Text style={styles.text_medium}>Выбрать фото</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={[
                  styles.photoModal__container_inner,
                  { borderBottomWidth: 0 },
                ]}
              >
                <View style={styles.photoModal__item}>
                  <TouchableOpacity>
                    <Text style={styles.text_medium}>Удалить фото</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </BlurView>
        </Modal>
      )}
      {nameModalVisible && (
        <Modal
          animationType="fade"
          isVisible={nameModalVisible}
          transparent={true}
          style={styles.modal}
        >
          <BlurView
            tint="dark"
            intensity={40}
            blurReductionFactor={10}
            experimentalBlurMethod={"dimezisBlurView"}
            style={styles.nameModal_blur}
          >
            <StatusBar
              barStyle="light-content"
              backgroundColor={elemBackgroundColor2}
            />
            <View style={styles.nameModal__container}>
              <TouchableOpacity
                onPress={toggleNameModal}
                style={styles.closePopup}
              >
                <Image
                  contentFit="contain"
                  contentPosition={"center"}
                  transition={1000}
                  source={require("../../assets/close.svg")}
                  width={40}
                  height={40}
                />
              </TouchableOpacity>
              <View style={styles.nameModal__container_inner}>
                <Text style={styles.nameModal__title}>Данные пользователя</Text>
                <View style={styles.nameModal__item}>
                  <Text
                    style={[
                      styles.text_light,
                      { paddingTop: 10, paddingBottom: 3 },
                    ]}
                  >
                    Фамилия
                  </Text>
                  <TextInput style={styles.input} />
                </View>
                <View style={styles.nameModal__item}>
                  <Text
                    style={[
                      styles.text_light,
                      { paddingTop: 10, paddingBottom: 3 },
                    ]}
                  >
                    Имя
                  </Text>
                  <TextInput style={styles.input} />
                </View>
                <View style={styles.nameModal__item}>
                  <Text
                    style={[
                      styles.text_light,
                      { paddingTop: 10, paddingBottom: 3 },
                    ]}
                  >
                    Отчество
                  </Text>
                  <TextInput style={styles.input} />
                </View>
                <View style={styles.nameModal__item}>
                  <Text
                    style={[
                      styles.text_light,
                      { paddingTop: 10, paddingBottom: 3 },
                    ]}
                  >
                    Телефон
                  </Text>
                  <TextInputMask
                    style={styles.input}
                    keyboardType={"phone-pad"}
                    type={"custom"}
                    options={{ mask: "+7 999 999-99-99" }}
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                  />
                </View>
                <View style={styles.nameModal__item}>
                  <Text
                    style={[
                      styles.text_light,
                      { paddingTop: 10, paddingBottom: 3 },
                    ]}
                  >
                    E-mail
                  </Text>
                  <TextInput
                    style={styles.input}
                    keyboardType="email-address"
                  />
                </View>
                <View style={styles.nameModal__item}>
                  <Text
                    style={[
                      styles.text_light,
                      { paddingTop: 10, paddingBottom: 3 },
                    ]}
                  >
                    День рождения
                  </Text>
                  <TextInputMask
                    style={styles.input}
                    keyboardType={"numeric"}
                    type={"custom"}
                    options={{ mask: "99. 99. 9999 " }}
                    value={birthDay}
                    onChangeText={setBirthDay}
                  />
                </View>
                <View style={styles.nameModal__item}>
                  <Text
                    style={[
                      styles.text_light,
                      { paddingTop: 10, paddingBottom: 3 },
                    ]}
                  >
                    Пол
                  </Text>
                  {/* <TextInput style={styles.input} /> */}
                  <View style={styles.nameModal__checkbox}>
                    {/* <TouchableOpacity onPress={() => setMale(!male)}>
                      <Text
                        style={[
                          styles.text_light,
                          female ? { color: "gray" } : null,
                        ]}
                      >
                        Мужской
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Text
                        style={[
                          styles.text_light,
                          male ? { color: "gray" } : null,
                        ]}
                      >
                        Женский
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Text
                        style={[
                          styles.text_light,
                          // none ? { color: "gray" } : null,
                        ]}
                      >
                        не выбранно
                      </Text>
                    </TouchableOpacity> */}
                  </View>
                </View>
               
              </View>
              <View style={{ paddingHorizontal: 10 }}>
                <NewButtonComponent
                  title={"Сохранить"}
                  filled={true}
                  height={54}
                  fontSize={18}
                  onPress={() => {}}
                />
              </View>
            </View>
          </BlurView>
        </Modal>
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container__view: {
    height: HEIGHT.height,
  },
  container: {
    marginHorizontal: 15,
  },
  header__container: {
    flexDirection: "row",
    marginTop: 30,
    columnGap: 20,
    alignItems: "center",
    marginLeft: 10,
  },
  header__text_container: {
    rowGap: 10,
    marginRight: "auto",
  },
  text_light: {
    fontFamily: FONTS.light,
    fontSize: 14,
    lineHeight: 14,
    color: textPrimaryColor,
  },
  text_medium: {
    fontFamily: FONTS.medium,
    fontSize: 18,
    lineHeight: 20,
    color: textPrimaryColor,
  },
  ID__container: {
    marginTop: 15,
    marginLeft: 10,
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
  },
  info__container: {
    marginTop: 40,
    marginLeft: 10,
    rowGap: 20,
  },
  info__container_inner: {
    paddingBottom: 6,
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
    borderBottomWidth: 1,
    borderColor: "#9A95B2",
  },
  info__item: {
    rowGap: 10,
    marginRight: "auto",
  },
  containerBlur: {
    flex: 1,
    justifyContent: "flex-end",
  },
  closePopup: {
    alignItems: "flex-end",
  },
  photoModal__container: {
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 20,
    backgroundColor: elemBackgroundColor2,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    width: WIDTH.width,
  },
  photoModal__container_inner: {
    alignItems: "center",
    marginHorizontal: 15,
    borderBottomWidth: 1,
    borderColor: "#9A95B2",
  },
  photoModal__item: {
    paddingVertical: 12,
  },
  nameModal_blur: {
    flex: 1,
  },
  nameModal__container: {
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 20,
    backgroundColor: elemBackgroundColor,
    borderRadius: 12,
    width: WIDTH.width,
  },
  nameModal__container_inner: {
    marginTop: 20,
    rowGap: 20,
    marginBottom: 40,
  },
  nameModal__title: {
    fontFamily: FONTS.medium,
    fontSize: 24,
    lineHeight: 24,
    color: textPrimaryColor,
    textAlign: "center",
  },
  nameModal__item: {
    backgroundColor: inputBackgroundColor,
    paddingHorizontal: 25,
    borderRadius: 100,
  },
  input: {
    color: textPrimaryColor,
    fontFamily: FONTS.medium,
    fontSize: 18,
    lineHeight: 20,
    paddingBottom: 10,
  },
  nameModal__checkbox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    columnGap: 10,
    paddingBottom: 15,
  },
});
