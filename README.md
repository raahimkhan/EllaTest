# Overview
This is a test assessment for a job. Assignment instructions can be viewed here: https://dune-dinner-167.notion.site/React-Native-Audio-and-Text-Interleave-1832fabcbb3f80ad8230f092510be21f

- The web application is live at: https://ellatest.expo.app/
- Web demo: https://drive.google.com/file/d/1ThYms7CwbVVTcQMzHkcyLoWMcKdJUTDi/view?usp=drive_link
- Mobile demo: https://drive.google.com/file/d/1JIh8ycgqodgzjGkIzKzzJFLR3CYBRX6h/view?usp=drive_link

# How To Run
* Clone the repository
* Navigate to the cloned repository directory
* Run `npm install`

## To Build Locally
* Run -> `npm run prebuild`
* To build the iOS app, execute the command: `npm run ios:bare`. Make sure your iOS simulator is up and running
* To build the Android app, execute the command: `npm run android:bare`. Make sure your Android emulator is up and running
> **Note:** The above commands will generate development builds within the iOS simulator and the Android emulator and launch the app directly. For subsequent runs, you just need to run `npm run start` and then press `i` to launch the app on iOS simulator and `a` to launch the app on Android emulator
* To build the web app, execute the command `npm run export:web`. This will generate a `dist` directory within the root of the folder. To run the web app, execute `npx expo serve`. This will give you a production view of the web app. To run the web app in debug mode, execute the command `npm run web`

## To Build Using EAS
* Replace `projectId` in `/app.json` file with your Expo project ID. To do so create project on Expo titled `EllaTest`. Your slug value may or may not be same. In case it is different, then update the `slug` value in `/app.json` as well as specified in your EAS project
* Login using your EAS account (if not already logged in). You can login using the command `eas login`. If EAS CLI is not installed, you can install it using the command `npm install -g eas-cli`
* Execute the command `npm run EASDevelopmentBuild` to create development builds for iOS and Android. Once done, install the builds directly in iOS simulator and Android emulator and run using `npm run start` as specified above
* Generating web app would be similar as specified above. No change. However to deploy to EAS, execute the command `npm run export:web && npm run deploy:web-prod`

## Alternatively
* I have already generated development builds for Android and iOS here: https://drive.google.com/drive/folders/1-yY5sZsP_IDvfHfLbI5hEZXWBvUYz8iC?usp=drive_link
* Download the builds and install in respective devices and run using the above specified commands

# Important Points
* The app assumes that the transcript Meta Data json will be in the format as specified here: https://dune-dinner-167.notion.site/React-Native-Audio-and-Text-Interleave-1832fabcbb3f80ad8230f092510be21f
* The app assumes there will be 2 speakers as specified in the assessment. However functionality can easily be extended to cater multiple speakers
* The app assumes that the audio file will be valid and not corrupted
* Initially, I utilised UniStyles for styling, however due to encountering a bug, I had to switch to default `StyleSheet`. I also logged the bug here: https://github.com/jpudysz/react-native-unistyles/issues/961
* I have used the library `expo-audio` for audio playback and functionalities. The library is fairly new and is acting a bit buggy on Android. I plan to raise an issue for this as well on the official GitHub repository. I did not utilise `expo-av` since it is deprecated
* For the web app, please disable ad blockers (if any) and make sure that popups are enabled. Otherwise error alerts will be blocked
* On mobile browsers, UI is small sized. This is because it completely skipped my mind to apply styles for mobile browsers. I hope that would be okay. All other functionalities are working perfectly fine across web and mobile

