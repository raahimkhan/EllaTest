import {
	scaleWidth,
	scaleHeight,
	scaleImageWidth,
	scaleImageHeight,
	scaleFont,
	wp,
	hp,
} from '@raahimkhan23/react-native-responsive-utils';
import hexToRgba from 'hex-to-rgba';

export const utilities = {
	scaleWidth,
	scaleHeight,
	scaleImageWidth,
	scaleImageHeight,
	scaleFont,
	wp,
	hp,
	convertHexToRGBA: (hex: string, alpha: number): string =>
		hexToRgba(hex, alpha),
} as const;
