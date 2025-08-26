import { useFonts } from 'expo-font';

const useLoadFonts = () => {
	const [fontsLoaded] = useFonts({
		PoppinsSemiBold: require('../assets/fonts/Poppins-SemiBold.ttf'),
		InterExtraBold: require('../assets/fonts/Inter-ExtraBold.otf'),
		InterMedium: require('../assets/fonts/Inter-Medium.otf'),
		InterRegular: require('../assets/fonts/Inter-Regular.otf'),
		RobotoMedium: require('../assets/fonts/Roboto-Medium.ttf'),
		RobotoRegular: require('../assets/fonts/Roboto-Regular.ttf'),
		InterSemiBold: require('../assets/fonts/Inter-SemiBold.otf'),
	});
	return fontsLoaded;
};

export default useLoadFonts;
