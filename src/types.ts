export type SystemBarStyle = "light-content" | "dark-content";

export type StatusBarProps = {
  animated?: boolean;
  barStyle?: SystemBarStyle;
};

export type StatusBarStackEntry = {
  animated: boolean;
  barStyle?: SystemBarStyle;
};

export type NavigationBarProps = {
  barStyle?: SystemBarStyle;
};

export type NavigationBarStackEntry = NavigationBarProps;
export type SystemBarProps = StatusBarProps;
