import * as React from 'react';

import {
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import * as TransparentStatusAndNavigationBar from 'react-native-transparent-status-and-navigation-bar';

// ⬇ Requirement
TransparentStatusAndNavigationBar.init();

export default function App() {
  // alternatively, you can put the init here to have this always up to date if app reloads during development
  React.useEffect(() => {
    TransparentStatusAndNavigationBar.init();
  }, []);

  const colorScheme = useColorScheme();
  const [statusBar, statusBar_set] = React.useState();
  return (
    <>
      {statusBar === undefined ? null : <StatusBar barStyle={statusBar} />}
      <View
        style={[
          styles.container,
          {backgroundColor: colorScheme === 'dark' ? 'darkblue' : 'pink'},
        ]}>
        <Text>{'statusBar: ' + statusBar}</Text>
        <View style={styles.spacer} />
        <Pressable onPress={_ => statusBar_set(_ => 'light-content')}>
          <Text>Set light StatusBar</Text>
        </Pressable>
        <View style={styles.spacer} />
        <Pressable onPress={_ => statusBar_set(_ => 'dark-content')}>
          <Text>Set dark StatusBar</Text>
        </Pressable>
        <View style={styles.spacer} />
        <Pressable onPress={_ => statusBar_set(_ => undefined)}>
          <Text>Unset StatusBar</Text>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spacer: {
    height: 20,
  },
});
