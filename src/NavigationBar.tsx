import * as React from "react";
import { Platform } from "react-native";
import { NativeModule } from "./module";
import {
  NavigationBarProps,
  NavigationBarStackEntry,
  SystemBarStyle,
} from "./types";

const isSupportedPlatform = Platform.OS === "android" && Platform.Version >= 27;

export class NavigationBar extends React.Component<NavigationBarProps> {
  private static propsStack: NavigationBarStackEntry[] = [];
  private static immediate: NodeJS.Immediate | null = null;
  private static mergedProps: NavigationBarProps | null = null;

  private static createStackEntry({
    barStyle,
  }: NavigationBarProps): NavigationBarStackEntry {
    return { barStyle };
  }

  static currentHeight = NativeModule.navigationBarHeight ?? undefined;

  static pushStackEntry(props: NavigationBarProps): NavigationBarStackEntry {
    const entry = NavigationBar.createStackEntry(props);
    NavigationBar.propsStack.push(entry);
    NavigationBar.updatePropsStack();
    return entry;
  }

  static popStackEntry(entry: NavigationBarStackEntry): void {
    const index = NavigationBar.propsStack.indexOf(entry);
    if (index !== -1) {
      NavigationBar.propsStack.splice(index, 1);
    }
    NavigationBar.updatePropsStack();
  }

  static replaceStackEntry(
    entry: NavigationBarStackEntry,
    props: NavigationBarProps,
  ): NavigationBarStackEntry {
    const newEntry = NavigationBar.createStackEntry(props);
    const index = NavigationBar.propsStack.indexOf(entry);
    if (index !== -1) {
      NavigationBar.propsStack[index] = newEntry;
    }
    NavigationBar.updatePropsStack();
    return newEntry;
  }

  private static updatePropsStack() {
    // Send the update to the native module only once at the end of the frame.
    if (NavigationBar.immediate !== null) {
      clearImmediate(NavigationBar.immediate);
    }

    NavigationBar.immediate = setImmediate(() => {
      const oldProps = NavigationBar.mergedProps;
      let barStyle: SystemBarStyle | undefined = undefined;

      for (
        let index = NavigationBar.propsStack.length - 1;
        index >= 0;
        index--
      ) {
        const entry = NavigationBar.propsStack[index];

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
        NativeModule.setNavigationBarStyle?.(barStyle);
      }

      // Update the current prop values.
      NavigationBar.mergedProps = { barStyle };
    });
  }

  private stackEntry: NavigationBarStackEntry | null = null;

  componentDidMount() {
    this.stackEntry = NavigationBar.pushStackEntry(this.props);
  }

  componentDidUpdate() {
    if (this.stackEntry) {
      this.stackEntry = NavigationBar.replaceStackEntry(
        this.stackEntry,
        this.props,
      );
    }
  }

  componentWillUnmount() {
    if (this.stackEntry) {
      NavigationBar.popStackEntry(this.stackEntry);
    }
  }

  render(): React.ReactNode {
    return null;
  }
}
