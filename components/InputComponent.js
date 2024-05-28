import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import styles from "../styles/InputComponentStyles";

const InputComponent = ({
  placeholder,
  keyboardType,
  value,
  onChangeText,
  error,
}) => {
  const [phone, setPhone] = React.useState("");

  const handleInputFocus = () => {
    if (error !== "") {
      onChangeText("");
    }
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholderTextColor="rgba(255, 255, 255, 0.2)"
        placeholder={placeholder}
        keyboardType={keyboardType}
        value={value}
        onChangeText={onChangeText}
        onFocus={handleInputFocus}
      />
      {error !== "" && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default InputComponent;
