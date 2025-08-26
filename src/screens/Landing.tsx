import React from 'react';
import { View, Platform } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import MusicPlayer from '@components/MusicPlayer';

const Landing: React.FC = React.memo(() => {
	return (
		<View style={styles.container}>
			{/* simple space as can be seen in the Figma template */}
			<View style={styles.header} />
			{/* transcript meta data */}
			<View style={styles.transcriptMetaData} />
			{/* music player controls and the progress bar along with timer texts */}
			<MusicPlayer />
		</View>
	);
});

const styles = StyleSheet.create((theme) => ({
	container: {
		flex: 1,
		backgroundColor: '#F6F6F9',
	},
	header: {
		flex: 0.15,
		// zIndex is required for drop shadow to be visible
		zIndex: 1000,
		backgroundColor: '#F6F6F9',
		...Platform.select({
			// drop shadow properties for iOS
			ios: {
				shadowColor: theme.utilities.convertHexToRGBA('#C2C3CB', 0.5),
				shadowOffset: { width: 0, height: 20 },
				shadowOpacity: 1,
				shadowRadius: 20,
			},
			// drop shadow properties for Android
			android: {
				elevation: 30,
				filter: [
					{
						dropShadow: {
							offsetX: 0,
							offsetY: 20,
							blurRadius: 20,
							color: theme.utilities.convertHexToRGBA(
								'#C2C3CB',
								0.5
							),
						},
					},
				],
			},
		}),
	},
	transcriptMetaData: {
		flex: 1,
		backgroundColor: '#fafafa',
	},
}));

export default Landing;
