import { Alert, Platform } from 'react-native';

export const customErrorAlert = (message: string) => {
	if (Platform.OS === 'web') {
		(window.alert as any)(message);
	} else {
		Alert.alert('Error', message);
	}
};
