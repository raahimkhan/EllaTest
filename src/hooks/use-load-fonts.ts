import { useFonts } from 'expo-font';

const useLoadFonts = () => {
	const [fontsLoaded] = useFonts({
		OutfitMedium: require('../assets/fonts/Outfit-Medium.ttf'),
		OutfitRegular: require('../assets/fonts/Outfit-Regular.ttf'),
		OutfitSemiBold: require('../assets/fonts/Outfit-SemiBold.ttf'),
		SFProTextSemiBold: require('../assets/fonts/SF-Pro-Text-SemiBold.ttf'),
	});
	return fontsLoaded;
};

export default useLoadFonts;
