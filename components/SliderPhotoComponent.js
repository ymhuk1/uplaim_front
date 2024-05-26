import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Swiper from 'react-native-swiper';
import Constants from 'expo-constants';

const apiBaseUrl = Constants.expoConfig.extra.API_PROD;
const SliderPhotoComponent = ({ photos }) => {

    return (
      <Swiper
        style={styles.container}
        dot={<View style={styles.dot} />}
        activeDot={<View style={styles.activeDot} />}
        loop={false}
      >
        {photos.map((photo, index) => (
          <View key={index} style={styles.image}>
            <Image
              source={{ uri: apiBaseUrl + photo.photo }}
              style={styles.imageImage}
              contentFit="contain"
              contentPosition={"center"}
            />
          </View>
        ))}
      </Swiper>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 30,
        height: 260,
    },
    dot: {
        backgroundColor: 'rgba(255,255,255,.05)',
        width: 8,
        height: 8,
        borderRadius: 4,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 3,
    },
    activeDot: {
        backgroundColor: 'rgba(255,255,255,.2)',
        width: 16,
        height: 8,
        borderRadius: 4,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 3,
    },
    image: {
        flex: 1,
        borderRadius: 12,
    },
    imageImage: {
        height: 240,
        borderRadius: 12,
        width: "100%",
    }

});

export default SliderPhotoComponent;
