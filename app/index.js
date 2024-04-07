import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, Dimensions } from 'react-native';
import { Image, ImageBackground } from 'expo-image';

import { useRouter} from 'expo-router';


export default function Index() {
  const router = useRouter()




    return (
        <ScrollView style={styles.container}
                    showsVerticalScrollIndicator={false}
                    automaticallyAdjustKeyboardInsets={true}>
          <ImageBackground
              source={require('../assets/background.png')}
              contentFit={"cover"}>
            <View style={styles.containerView}>

            </View>
          </ImageBackground>
        </ScrollView>
    );
  };


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#181629',
    height: Dimensions.get("screen").height,
  },
  containerView: {
    alignItems: "center",
    paddingVertical: 80,
  },
});
