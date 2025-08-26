import React, { useEffect, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import useLoadFonts from '@hooks/use-load-fonts';
import { Stack } from 'expo-router';
import {
	setBaseScreenSize,
	setFontScaleLimits,
} from '@raahimkhan23/react-native-responsive-utils';

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
	useEffect(() => {
		setBaseScreenSize(393, 852);
		setFontScaleLimits(2, 2);
	}, []);

	const fontsLoaded = useLoadFonts();

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
						name="landing"
						options={{ headerShown: false }}
					/>
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
