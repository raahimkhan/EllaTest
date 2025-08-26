import { StyleSheet } from 'react-native-unistyles';
import { breakpoints } from '@style/breakpoints';
import { appThemes } from '@style/themes';

type AppBreakpoints = typeof breakpoints;

type AppThemes = typeof appThemes;

declare module 'react-native-unistyles' {
	export interface UnistylesBreakpoints extends AppBreakpoints {}
	export interface UnistylesThemes extends AppThemes {}
}

StyleSheet.configure({
	settings: {
		initialTheme: 'light',
		adaptiveThemes: false,
	},
	breakpoints,
	themes: appThemes,
});
