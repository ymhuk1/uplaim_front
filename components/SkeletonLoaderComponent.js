import { ActivityIndicator, Text, View } from "react-native";
import { COLORS, SIZES } from "../constants/theme";

export const Loading = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: COLORS.primary }}>
      <ActivityIndicator size="large" color={COLORS.text} />
      <Text style={{ color: COLORS.text, fontSize: SIZES.medium }}>Загрузка...</Text>
    </View>
  );
};
