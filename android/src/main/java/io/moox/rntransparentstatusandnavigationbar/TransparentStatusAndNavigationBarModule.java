package io.moox.rntransparentstatusandnavigationbar;

import android.app.Activity;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.module.annotations.ReactModule;

@ReactModule(name = TransparentStatusAndNavigationBarModule.NAME)
public class TransparentStatusAndNavigationBarModule extends ReactContextBaseJavaModule {
  public static final String NAME = "TransparentStatusAndNavigationBar";

  public TransparentStatusAndNavigationBarModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  @NonNull
  public String getName() {
    return NAME;
  }

  static public void init(@NonNull final Activity activity) {}
}
