import React from 'react';
import { View, Platform, StyleSheet } from 'react-native';
import AudioPlayer from '@components/AudioPlayer';
import hexToRgba from 'hex-to-rgba';
import TranscriptMetaData from '@components/TranscriptMetaData';

const TranscriptPlayer: React.FC = React.memo(() => {
	return (
		<View style={styles.container}>
			{/* simple space as can be seen in the Figma template */}
			<View style={styles.header} />
			{/* transcript meta data */}
			<TranscriptMetaData />
			{/* audio player controls and the progress bar along with timer texts */}
			<AudioPlayer />
		</View>
	);
});

const styles = StyleSheet.create({
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
				shadowColor: hexToRgba('#C2C3CB', 0.5),
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
							color: hexToRgba('#C2C3CB', 0.5),
						},
					},
				],
			},
			// to show drop shadow on web
			web: {
				boxShadow: `0px 20px 20px ${hexToRgba('#C2C3CB', 0.5)}`,
			},
		}),
	},
});

export default TranscriptPlayer;
