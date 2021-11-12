import { NativeModules } from "react-native";
import { SystemBarStyle } from "./types";

export const NativeModule:
  | {
      setNavigationBarStyle: (style: SystemBarStyle) => void;
      navigationBarHeight: number;
    }
  | undefined = NativeModules.TransparentStatusAndNavigationBar;
