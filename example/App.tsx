import * as React from "react";
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import {
  NavigationBar,
  StatusBar,
  SystemBarStyle,
} from "react-native-transparent-status-and-navigation-bar";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    padding: 16,
    borderRadius: 4,
    borderWidth: 1,
  },
  spacer: {
    height: 20,
  },
});

export const App = () => {
  const isDarkMode = useColorScheme() === "dark";

  const [statusBarStyle, setStatusBarStyle] = React.useState<SystemBarStyle>();
  const [navigationBarStyle, setNavigationBarStyle] =
    React.useState<SystemBarStyle>();

  const buttonStyle = [
    styles.button,
    { borderColor: isDarkMode ? "white" : "black" },
  ];

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? "darkblue" : "pink" },
      ]}
    >
      <StatusBar barStyle={statusBarStyle} />
      <NavigationBar barStyle={navigationBarStyle} />

      <Text>StatusBar barStyle: {statusBarStyle ?? "default"}</Text>
      <Text>StatusBar height: {StatusBar.currentHeight ?? "unavailable"}</Text>

      <View style={styles.spacer} />

      <Pressable
        accessibilityRole="button"
        style={buttonStyle}
        onPress={() => setStatusBarStyle("light-content")}
      >
        <Text>Set light StatusBar</Text>
      </Pressable>

      <View style={styles.spacer} />

      <Pressable
        accessibilityRole="button"
        style={buttonStyle}
        onPress={() => setStatusBarStyle("dark-content")}
      >
        <Text>Set dark StatusBar</Text>
      </Pressable>

      <View style={styles.spacer} />
      <View style={styles.spacer} />

      <Text>NavigationBar barStyle: {statusBarStyle ?? "default"}</Text>
      <Text>
        NavigationBar height: {NavigationBar.currentHeight ?? "unavailable"}
      </Text>

      <View style={styles.spacer} />

      <Pressable
        accessibilityRole="button"
        style={buttonStyle}
        onPress={() => setNavigationBarStyle("light-content")}
      >
        <Text>Set light NavigationBar</Text>
      </Pressable>

      <View style={styles.spacer} />

      <Pressable
        accessibilityRole="button"
        style={buttonStyle}
        onPress={() => setNavigationBarStyle("dark-content")}
      >
        <Text>Set dark NavigationBar</Text>
      </Pressable>
    </SafeAreaView>
  );
};
