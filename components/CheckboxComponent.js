import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { FONTS } from "../constants/theme";
import { fuchsia, textPrimaryColor } from "./ColorsComponent";

const CheckboxComponent = ({ isChecked, onToggle, error, title, basket }) => {
  const handleCheckboxToggle = () => {
    onToggle(!isChecked);
  };

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: 250,
        }}
      >
        <TouchableOpacity onPress={handleCheckboxToggle}>
          <View
            style={{
              width: 24,
              height: 24,
              borderRadius: 3,
              borderWidth: 2,
              borderColor: "rgba(18, 17, 35, 1)",
              backgroundColor: isChecked
                ? "rgba(18, 17, 35, 1)"
                : "rgba(18, 17, 35, 1)",
            }}
          >
            {isChecked && (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ color: fuchsia, fontSize: 16 }}>✓</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
        <Text
          style={{
            marginLeft: basket ? 10 : 8,
            color: basket ? textPrimaryColor : "rgba(255, 255, 255, 0.2)",
            fontFamily: FONTS.regular,
            fontSize: basket ? 16 : null,
          }}
        >
          {title}
        </Text>
      </View>
      <Text style={{ color: "red", width: 230 }}>{error}</Text>
    </View>
  );
};

export default CheckboxComponent;
