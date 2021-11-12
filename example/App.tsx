import * as React from "react";
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  useColorScheme,
} from "react-native";
import {
  StatusBar,
  SystemBarStyle,
  NavigationBar,
} from "react-native-transparent-status-and-navigation-bar";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#FFF",
  },
});

export const App = () => {
  const isDarkMode = useColorScheme() === "dark";

  const [barStyle, setBarStyle] =
    React.useState<SystemBarStyle>("light-content");

  return (
    <SafeAreaView style={[styles.container]}>
      <StatusBar barStyle={barStyle} />
      <NavigationBar barStyle={barStyle} />

      <Pressable
        style={{ padding: 20 }}
        onPress={() => {
          setBarStyle("dark-content");
        }}
      >
        <Text>dark-content</Text>
      </Pressable>

      <Pressable
        style={{ padding: 20 }}
        onPress={() => {
          setBarStyle("light-content");
        }}
      >
        <Text>light-content</Text>
      </Pressable>
    </SafeAreaView>
  );
};
