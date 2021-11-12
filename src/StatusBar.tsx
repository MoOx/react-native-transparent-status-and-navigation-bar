import * as React from "react";
import { Platform, StatusBar as RNStatusBar } from "react-native";
import { StatusBarProps, StatusBarStackEntry, SystemBarStyle } from "./types";

const isSupportedPlatform =
  Platform.OS === "ios" ||
  (Platform.OS === "android" && Platform.Version >= 27);

export class StatusBar extends React.Component<StatusBarProps> {
  private static propsStack: StatusBarStackEntry[] = [];
  private static immediate: NodeJS.Immediate | null = null;
  private static mergedProps: StatusBarProps | null = null;

  private static createStackEntry({
    animated = false,
    barStyle,
  }: StatusBarProps): StatusBarStackEntry {
    return { animated, barStyle };
  }

  static currentHeight = RNStatusBar.currentHeight ?? undefined;

  static pushStackEntry(props: StatusBarProps): StatusBarStackEntry {
    const entry = StatusBar.createStackEntry(props);
    StatusBar.propsStack.push(entry);
    StatusBar.updatePropsStack();
    return entry;
  }

  static popStackEntry(entry: StatusBarStackEntry): void {
    const index = StatusBar.propsStack.indexOf(entry);
    if (index !== -1) {
      StatusBar.propsStack.splice(index, 1);
    }
    StatusBar.updatePropsStack();
  }

  static replaceStackEntry(
    entry: StatusBarStackEntry,
    props: StatusBarProps,
  ): StatusBarStackEntry {
    const newEntry = StatusBar.createStackEntry(props);
    const index = StatusBar.propsStack.indexOf(entry);
    if (index !== -1) {
      StatusBar.propsStack[index] = newEntry;
    }
    StatusBar.updatePropsStack();
    return newEntry;
  }

  private static updatePropsStack() {
    // Send the update to the native module only once at the end of the frame.
    if (StatusBar.immediate !== null) {
      clearImmediate(StatusBar.immediate);
    }

    StatusBar.immediate = setImmediate(() => {
      const oldProps = StatusBar.mergedProps;
      const last = StatusBar.propsStack[StatusBar.propsStack.length - 1];
      const animated = last?.animated ?? false;
      let barStyle: SystemBarStyle | undefined = undefined;

      for (let index = StatusBar.propsStack.length - 1; index >= 0; index--) {
        const entry = StatusBar.propsStack[index];

        if (entry && entry.barStyle) {
          barStyle = entry.barStyle;
        }
      }

      // Update the props that have changed.
      if (
        isSupportedPlatform &&
        barStyle != null &&
        (!oldProps || oldProps.barStyle !== barStyle)
      ) {
        RNStatusBar.setBarStyle(barStyle, animated);
      }

      // Update the current prop values.
      StatusBar.mergedProps = { animated, barStyle };
    });
  }

  private stackEntry: StatusBarStackEntry | null = null;

  componentDidMount() {
    this.stackEntry = StatusBar.pushStackEntry(this.props);
  }

  componentDidUpdate() {
    if (this.stackEntry) {
      this.stackEntry = StatusBar.replaceStackEntry(
        this.stackEntry,
        this.props,
      );
    }
  }

  componentWillUnmount() {
    if (this.stackEntry) {
      StatusBar.popStackEntry(this.stackEntry);
    }
  }

  render(): React.ReactNode {
    return null;
  }
}
