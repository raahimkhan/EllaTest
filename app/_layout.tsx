import React, { useEffect, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import useLoadFonts from '@hooks/use-load-fonts';
import { Stack } from 'expo-router';
import {
	setBaseScreenSize,
	setFontScaleLimits,
} from '@raahimkhan23/react-native-responsive-utils';
import { useGlobalStore } from '@global-store/global-store';

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
	/*
		- setting base screen size as per Figma
		- this is required for responsive utils (my own library)
		- also setting font scale min/max limits (my own library)
	*/
	useEffect(() => {
		setBaseScreenSize(393, 852);
		setFontScaleLimits(2, 2);
	}, []);

	const { transcriptMetaData, interleavedPhrases, audioSource } =
		useGlobalStore();

	const fontsLoaded = useLoadFonts();

	// hide splash only when fonts have been loaded successfully
	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded) {
			await SplashScreen.hideAsync();
		}
	}, [fontsLoaded]);

	if (!fontsLoaded) {
		return null;
	}

	return (
		<>
			<View style={styles.container} onLayout={onLayoutRootView}>
				<Stack>
					<Stack.Screen
						name="index"
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="transcript-and-audio-loader"
						options={{ headerShown: false }}
					/>
					{/* auth guard to take user back to index screen if below data is empty */}
					<Stack.Protected
						guard={
							transcriptMetaData !== null &&
							interleavedPhrases !== null &&
							audioSource !== ''
						}
					>
						<Stack.Screen
							name="transcript-player"
							options={{ headerShown: false }}
						/>
					</Stack.Protected>
				</Stack>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

export default RootLayout;
