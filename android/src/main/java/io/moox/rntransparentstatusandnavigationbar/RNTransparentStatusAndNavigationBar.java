package io.moox.rntransparentstatusandnavigationbar;

import android.app.Activity;

import androidx.annotation.DrawableRes;
import androidx.annotation.NonNull;

public class RNTransparentStatusAndNavigationBar {
  public static void init(@NonNull final Activity activity) {
    TransparentStatusAndNavigationBarModule.init(activity);
  }
}
