import { NativeModules } from "react-native";
import { SystemBarStyle } from "./types";

export const NativeModule: Partial<{
  navigationBarHeight: number;
  setNavigationBarStyle: (style: SystemBarStyle) => void;
}> = NativeModules.TransparentStatusAndNavigationBar;
