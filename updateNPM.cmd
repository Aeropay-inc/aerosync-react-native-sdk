@echo off
del .\sample\*.tgz
npm pack --pack-destination="./sample"
cd sample
npm uninstall aerosync-react-native-sdk
timeout 2
npm i aerosync-react-native-sdk-1.0.5.tgz
