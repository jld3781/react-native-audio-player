# React Native Audio Player App

This audio player app streams 16 audio tracks from [SoundHelix](https://www.soundhelix.com/audio-examples).

### Features

- Scroll through a list of audio tracks with image, title, and artist
- Select a song to play
- Play and pause music
- Seek forward or backwards by 30 seconds
- Continue playing audio while app is in background
- Control audio (start, pause, seek 30 seconds) via device specific controls (i.e. lock screen, pull down menus)

## Install Project & Dependencies

These instructions assume you have set up XCode and have an iOS simulator as well as an Android emulator through Android Studio.

Clone the repo

```
git clone https://github.com/jld3781/react-native-audio-player.git
```

Install Dependencies

```
yarn
```

Install Pods

```
cd ios && pod install
```

## Run the App

Run on iOS

```
yarn ios
```

Run on Android

```
yarn android
```

## Notes

- Tested with Xcode 12.5 & 13, Android Studio Artic Fox, and command line on iPhone 11 simulator, Pixel XL emulator, and my personal iPhone X device.
- Had to upgrade Flipper version since the original version included in the project was broken for Xcode 12.5+
- Added [React Native Track Player](https://github.com/DoubleSymmetry/react-native-track-player). This library has fairly frequent releases, a high number of downloads, a good number of closed issues and PRs, and it supports the features I was looking for.
- Had to upgrade minimum iOS version to 11.0 to support the React Native Track Player package
- Originally, I added all 16 tracks to the player on setup of the track player which seemed to have improved performance, but I later found an issue with how the package was handling '.stop()' on iOS (Stop was clearing all tracks from the player queue instead of just stopping the current track). So, I switched to adding only one track to the player at a time and calling '.reset()' then '.add()' for track changes. With these changes, the app seems to still respond quickly.
- Added tests with Jest
- Added icons from [Expo vector icon](https://icons.expo.fyi/) library. I decided to go with Expo for the icons since it was already installed and it had the Material icon library with the forward and replay 30 icons.
- Added images from [Lorem Picsum](https://picsum.photos/). This is a cool resource that allows you to get a random photo at whatever dimensions you need.
- Made a custom progress bar since Expo doesn't support the [React Native Community Slider](https://www.npmjs.com/package/@react-native-community/slider). Comments on [StackOverflow](https://github.com/expo/expo/issues/4300) suggested using the deprecated [React Native Slider](https://reactnative.dev/docs/slider) until it get's added to the React Native Community, but I decided that a more simple custom progress bar would be preferred to using the deprecated feature.
- Added [Prettier](https://prettier.io/) for code formatting
- From a design perspective, I referenced Apple Music, Apple Podcasts, and Spotify, but made changes to accommodate the needs of the assignment.
- I enabled remote play as a way to control the audio while the app is in background mode.

## Future Ideas

- Add Enzyme Tests
- Add ESLint
- Add Typescript
- Add a single track detail view on separate screen
- Add navigation header bar
- Update default splash screen
