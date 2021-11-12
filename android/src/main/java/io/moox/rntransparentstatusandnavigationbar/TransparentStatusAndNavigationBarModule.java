package io.moox.rntransparentstatusandnavigationbar;

import android.app.Activity;
import android.content.Context;
import android.graphics.Color;
import android.os.Build;
import android.view.View;
import android.view.ViewConfiguration;
import android.view.Window;
import android.view.WindowManager;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.common.logging.FLog;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.UiThreadUtil;
import com.facebook.react.common.ReactConstants;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.uimanager.PixelUtil;

import java.util.HashMap;
import java.util.Map;

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

  @Nullable
  @Override
  public Map<String, Object> getConstants() {
    final HashMap<String, Object> constants = new HashMap<>();
    final Context context = getReactApplicationContext();
    final boolean hasPermanentMenuKey = ViewConfiguration.get(context).hasPermanentMenuKey();

    final int navigationBarHeightResId =
      context.getResources().getIdentifier("navigation_bar_height", "dimen", "android");

    final float navigationBarHeight =
      navigationBarHeightResId > 0 && !hasPermanentMenuKey
        ? PixelUtil.toDIPFromPixel(context.getResources().getDimensionPixelSize(navigationBarHeightResId))
        : 0;

    constants.put("navigationBarHeight", navigationBarHeight);
    return constants;
  }

  static public void init(@Nullable final Activity activity) {
    if (activity == null) {
      FLog.w(
        ReactConstants.TAG,
        NAME + ": Ignored change, current activity is null.");
      return;
    }

    final Window window = activity.getWindow();
    final View decorView = window.getDecorView();

    activity.runOnUiThread(new Runnable() {
      @Override
      public void run() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O_MR1) {
          // On Android API >= 27, the system UI is transparent

          window.clearFlags(
            WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS |
            WindowManager.LayoutParams.FLAG_TRANSLUCENT_NAVIGATION
          );

          int flags = decorView.getSystemUiVisibility();
          flags |= View.SYSTEM_UI_FLAG_LAYOUT_STABLE;
          flags |= View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION;

          decorView.setSystemUiVisibility(flags);

          window.setStatusBarColor(Color.TRANSPARENT);
          window.setNavigationBarColor(Color.TRANSPARENT);

          if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
            window.setStatusBarContrastEnforced(false);
            window.setNavigationBarContrastEnforced(false);
          }
        } else {
          // On Android API < 27, the system UI is translucent

          window.addFlags(
            WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS |
            WindowManager.LayoutParams.FLAG_TRANSLUCENT_NAVIGATION
          );
        }
      }
    });
  }

  @ReactMethod
  public void setNavigationBarStyle(@Nullable final String style) {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O_MR1) {
      final Activity activity = getCurrentActivity();

      if (activity == null) {
        FLog.w(
          ReactConstants.TAG,
          NAME + ": Ignored navigation bar change, current activity is null.");
        return;
      }

      UiThreadUtil.runOnUiThread(new Runnable() {
        @Override
        public void run() {
          View decorView = activity.getWindow().getDecorView();
          int flags = decorView.getSystemUiVisibility();

          if ("dark-content".equals(style)) {
            flags |= View.SYSTEM_UI_FLAG_LIGHT_NAVIGATION_BAR;
          } else {
            flags &= ~View.SYSTEM_UI_FLAG_LIGHT_NAVIGATION_BAR;
          }

          decorView.setSystemUiVisibility(flags);
        }
      });
    }
  }
}
