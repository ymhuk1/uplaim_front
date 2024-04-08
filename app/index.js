import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, ScrollView, Dimensions, StatusBar } from "react-native";
import { Image, ImageBackground } from "expo-image";

import { useRouter } from "expo-router";
import { COLORS } from "../constants/theme";

export default function Index() {
  const router = useRouter();

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      automaticallyAdjustKeyboardInsets={true}
      contentContainerStyle={styles.container}
    >
      <ImageBackground
        source={require("../assets/background.png")}
        contentFit={"cover"}
      >
        <View style={styles.containerView}></View>
        <StatusBar backgroundColor="transparent" barStyle="light-content" />
      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary,
    flex: 1,
  },
  containerView: {
    alignItems: "center",
    paddingVertical: 80,
  },
});
