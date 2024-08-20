import { Tabs } from "expo-router";
import { Image } from "expo-image";
import { StyleSheet, TouchableOpacity } from "react-native";

export default () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarActiveTintColor: "#ffffff",
        tabBarInactiveTintColor: "grey",
        tabBarHideOnKeyboard: true,
        tabBarStyle: styles.tabBarStyle,
        tabBarItemStyle: styles.tabBarItemStyle,
        tabBarIconStyle: styles.tabBarIcon,
      }}
    >
      <Tabs.Screen
        name={"main"}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={require("../../assets/bottom-menu/house.svg")}
              color={color}
              style={{ opacity: focused ? 1 : 0.5 }}
              height={34}
              width={34}
            />
          ),
        }}
      />
      <Tabs.Screen
        name={"companyList"}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={require("../../assets/bottom-menu/search.svg")}
              color={color}
              style={{ opacity: focused ? 1 : 0.5 }}
              height={34}
              width={34}
            />
          ),
        }}
      />
      <Tabs.Screen
        name={"qrcode"}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={require("../../assets/bottom-menu/qrcode_gr.svg")}
              style={{ height: 34, width: 34 }}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name={"exchange"}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={require("../../assets/bottom-menu/invite.svg")}
              color={color}
              style={{ opacity: focused ? 1 : 0.5 }}
              height={34}
              width={34}
            />
          ),
        }}
      />
      <Tabs.Screen
        name={"profile"}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={require("../../assets/bottom-menu/profile.svg")}
              color={color}
              style={{ opacity: focused ? 1 : 0.5 }}
              height={34}
              width={34}
            />
          ),
        }}
      />
    </Tabs>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: "#121123",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    height: 80,
    display: "flex",
    borderTopWidth: 0,
    position: "absolute",
  },
  tabBarIcon: {
    height: 34,
    width: 34,
    fill: "red",
    stroke: "red",
    color: "red",
  },
  tabBarItemStyle: {
    // opacity: 0.5,
  },
});
