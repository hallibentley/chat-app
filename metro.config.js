// const { getDefaultConfig } = require("metro-config");
// const { resolver: defaultResolver } = getDefaultConfig.getDefaultValues();
// exports.resolver = {
//   ...defaultResolver,
//   sourceExts: [
//     ...defaultResolver.sourceExts,
//     "cjs",
//   ],
// };

const { getDefaultConfig } = require("expo/metro-config");
const defaultConfig = getDefaultConfig(__dirname);
defaultConfig.resolver.sourceExts.push("cjs");
module.exports = defaultConfig;



// "@react-native-async-storage/async-storage": "^1.17.10",