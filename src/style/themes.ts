import { utilities } from '@style/utils';

const defaultTheme = {
	utilities,
} as const;

export const appThemes = {
	light: defaultTheme,
} as const;
