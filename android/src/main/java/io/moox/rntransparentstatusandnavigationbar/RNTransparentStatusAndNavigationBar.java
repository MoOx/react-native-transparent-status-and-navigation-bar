package io.moox.rntransparentstatusandnavigationbar;

import android.app.Activity;

import androidx.annotation.Nullable;

public class RNTransparentStatusAndNavigationBar {
  public static void init(@Nullable final Activity activity) {
    TransparentStatusAndNavigationBarModule.init(activity);
  }
}
