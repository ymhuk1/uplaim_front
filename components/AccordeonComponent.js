import React, { useState } from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { fuchsia, textColor4, textPrimaryColor } from "./ColorsComponent";
import { FONTS } from "../constants/theme";

const Accordion = ({ title, content, width }) => {
  const [expanded, setExpanded] = useState(false);
  const [arrowAngle] = useState(new Animated.Value(0));

  const toggleAccordion = () => {
    setExpanded(!expanded);
    Animated.timing(arrowAngle, {
      toValue: expanded ? 0 : 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View>
      <TouchableOpacity onPress={toggleAccordion}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "baseline",
          }}
        >
          <Text
            style={{
              fontFamily: FONTS.regular,
              fontSize: 16,
              color: textPrimaryColor,
              marginRight: "auto",
            }}
            width={width}
          >
            {title}
          </Text>
          <Animated.View
            style={{
              transform: [
                {
                  rotate: arrowAngle.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["0deg", "90deg"],
                  }),
                },
              ],
              marginLeft: "auto",
            }}
          >
            <Icon name="arrow-forward-ios" size={40} color={fuchsia} />
          </Animated.View>
        </View>
      </TouchableOpacity>
      {expanded && (
        <Text
          style={{
            marginLeft: 15,
            fontFamily: FONTS.regular,
            color: textColor4,
            fontSize: 12,
          }}
        >
          {content}
        </Text>
      )}
    </View>
  );
};

export default Accordion;
