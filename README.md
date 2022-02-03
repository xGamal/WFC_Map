
# # Dynamic webmap for World for Climate on Mapbox



We use [Mapbox](https://www.mapbox.com/showcase) to show activites on it in a dynamic way based on the data we collect from the users and parteners.


Mapbox is a location data platform that powers the maps and location services used in many popular apps. 

- ✅ Super easy to set up, only requiring [Node](https://nodejs.dev).
- ✅ Expo allows us to quickly develop in JavaScript on you Mac/Windows/Linux machine.
  In contrast: standard React Native development requires you to have a Mac.
- ✅ No Android Studio or Xcode required – and none of their many React Native dependencies.
- ✅ Test-drive the app on your device using the iOS/Android app [Expo Go](https://expo.dev/client).
- ✅ Expo allows to build and submit the apps right from the command-line, using [Fastlane](https://fastlane.tools).
  You need an [Apple Developer Account](https://developer.apple.com/programs/enroll/)
  and a [Google Developer Account](https://play.google.com/apps/publish/signup).
- ✅ We can switch to full React Native development at any time by executing the command `expo eject`,
  which will convert our repository to contain all Android Studio and Xcode files.
- ⚠️ With Expo you don’t build apps on your local machine. Instead you let the Expo servers build the app.
  You need a [free Expo account](https://expo.dev/signup) for that.
- ⚠️ Expo has [some limitations](https://docs.expo.dev/introduction/why-not-expo/):
  only Expo-push service supported; free app builds are queued; limited support of native libraries.
- ❌ No native UI tests for Android and iOS. Tests of the JavaScript-side are supported via [Jest](https://jestjs.io).

## First, your Setup

All you have to do is to run this:

```bash
npm install -g expo-cli
```

That’s it.

## Launch the App

_Continue here when the installation of [`expo-cli`](https://docs.expo.dev/workflow/expo-cli/) finished._

Make sure you are inside the repository folder, then run this:

```bash
expo start
```

You will presented with a QR code that you can scan on your Android or iOS device.
This will launch our app in the [Expo Go](https://expo.dev/client) app.

Note: By default the frontend will make requests to Staging (`https://wfc-backend-staging.herokuapp.com/`).
See [Local Commands](./development/commands.md) to change that.

## Next Steps

- [See the Expo docs](https://docs.expo.dev)
- [Run tests and linters](./development/commands.md)
- Write your changes and create a pull-request.
- [Build, submit and release the app to the app stores](./deployment/basics.md)
- [Got trouble? Check for solutions here!](./development/troubleshooting.md)

## TODO: Upgrade Dependencies
