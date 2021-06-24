open ReactNative

// @todo use ReactNative.Color.processColor
// https://github.com/rescript-react-native/rescript-react-native/commit/0c880f88c314ec29cb3cc943e6c138f7219fba72
@module("react-native")
external processColor: string => string = "processColor"

type consts = {backgroundColorFallback: string} // it's not a string actually, but setBackgroundColor accepts string per bindings
@module("react-native") @scope(("NativeModules", "TransparentStatusAndNavigationBar"))
external getConstants: unit => consts = "getConstants"

type barsStyle = [#default | #"light-content" | #"dark-content"]

@module("react-native") @scope(("NativeModules", "TransparentStatusAndNavigationBar"))
external _setBarsStyle: barsStyle => unit = "setBarsStyle"

let init = () => {
  // this is to prepare default value for StatusBar to be set as default for component usage
  if Platform.os === Platform.android {
    StatusBar.setTranslucent(true)
    StatusBar.setBackgroundColor(getConstants().backgroundColorFallback, true)
    ()
  }
}

let setBarsStyle = (~animated: bool=true, barsStyle: barsStyle) => {
  if Platform.os === Platform.android {
    _setBarsStyle(barsStyle)
  } else {
    // @todo revisit when rescript-react-native accepts similar strings
    // https://github.com/rescript-react-native/rescript-react-native/issues/748
    StatusBar.setBarStyle(
      switch barsStyle {
      | #default => #default
      | #"light-content" => #lightContent
      | #"dark-content" => #darkContent
      },
      animated,
    )
  }
}
