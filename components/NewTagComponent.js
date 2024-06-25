import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { FONTS } from "../constants/theme";

const NewTagComponent = ({ tag, valueOnChange }) => {
  const isDropdownTag = Array.isArray(tag);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState(null);
  const [oneSelectTag, setOneSelectTag] = useState(true);

  useEffect(() => {
    setSelectedTag(isDropdownTag ? tag[0]?.name : tag);
  }, [tag]);

  const handleTagPress = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleSubTagPress = (subTag) => {
    setSelectedTag(subTag);
    setDropdownOpen(false);
    setOneSelectTag(!isDropdownTag ? !oneSelectTag : oneSelectTag);
    valueOnChange(!isDropdownTag ? oneSelectTag : subTag);
  };

  return (
    <View style={styles.tagContainer}>
      <View style={styles.tagContainerText}>
        <TouchableOpacity
          onPress={() => {
            handleTagPress();
            !isDropdownTag ? handleSubTagPress(selectedTag) : null;
          }}
        >
          <Text
            style={[
              styles.tagText,
              !isDropdownTag
                ? oneSelectTag
                  ? { backgroundColor: "#343148", color: "#9A95B2" }
                  : null
                : null,
            ]}
          >
            {selectedTag} {isDropdownTag ? "▼" : ""}
          </Text>
        </TouchableOpacity>
        {isDropdownOpen && isDropdownTag && (
          <View style={styles.dropdownContainer}>
            {tag.map(
              (subTag, subIndex) =>
                subTag !== selectedTag && (
                  <TouchableOpacity
                    key={subIndex}
                    onPress={() => handleSubTagPress(subTag?.name)}
                  >
                    <Text style={styles.dropdownText}>{subTag?.name}</Text>
                  </TouchableOpacity>
                )
            )}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    maxWidth: "100%",
  },
  tagContainerText: {},
  tagText: {
    fontFamily: FONTS.regular,
    borderRadius: 4,
    paddingVertical: 3,
    paddingHorizontal: 10,
    backgroundColor: "#9A95B2",
    marginRight: 10,
    marginBottom: 10,
  },
  dropdownContainer: {
    position: "absolute",
    top: 30,
    left: 0,
    zIndex: 1,
    backgroundColor: "#9A95B2",
    padding: 10,
    borderRadius: 5,
    minWidth: 100,
  },
  dropdownText: {
    fontFamily: FONTS.regular,
    fontSize: 16,
    color: "black",
  },
});

export default NewTagComponent;
