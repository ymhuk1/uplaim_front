import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import styles from "../styles/InputComponentStyles";
import { TextInputMask as TextMask } from "react-native-masked-text";


const InputComponent = ({
  placeholder,
  keyboardType,
  value,
  onChangeText,
  error,
}) => {
  const [phone, setPhone] = React.useState("");
  const [phoneNumber, setPhoneNumber] = useState("");


  const handleInputFocus = () => {
    if (error !== "") {
      onChangeText("");
    }
  };

  return (
    <View>
      <TextMask
        style={styles.input}
        type={"custom"}
        options={{ mask: "+7 999 999-99-99", getRawValue: (value) => setPhoneNumber(value) }}
        placeholderTextColor="rgba(255, 255, 255, 0.2)"
        placeholder={placeholder}
        keyboardType={keyboardType}
        value={value}
        onChangeText={onChangeText}
        onFocus={handleInputFocus}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default InputComponent;
