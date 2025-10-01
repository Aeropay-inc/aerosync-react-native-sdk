const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const defaultConfig = getDefaultConfig(__dirname);
const { resolver: { assetExts } } = defaultConfig;

const config = {
    resolver: {
        // Ensure HTML files are bundled as assets so `require('../external/index.html')` works
        assetExts: [...assetExts, 'html'],
    },
};

module.exports = mergeConfig(defaultConfig, config);
