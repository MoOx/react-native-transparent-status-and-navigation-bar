const path = require("path");
const { name, source } = require("../package.json");

module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    [
      "module-resolver",
      {
        extensions: [".tsx", ".ts", ".js", ".json"],
        alias: {
          [name]: path.join(__dirname, "..", source),
        },
      },
    ],
  ],
};
