import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import styles from "../styles/feedbackInputStyles";

const FeedbackInput = ({ placeholder, value, onChangeText }) => {
  return (
    <View>
      <TextInput
        style={styles.input}
        placeholderTextColor="rgba(255, 255, 255, 0.2)"
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default FeedbackInput;
