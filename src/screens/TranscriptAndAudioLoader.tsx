import React, { useState } from 'react';
import { View, TextInput, Platform, StyleSheet } from 'react-native';
import { wp, hp } from '@raahimkhan23/react-native-responsive-utils';
import { Button } from '@rneui/themed';
import { fetchTranscriptMetaData } from '@utils/fetch-transcript-metadata';
import { getInterleavedPhrases } from '@utils/get-interleaved-phrases';
import { useGlobalStore } from '@global-store/global-store';
import { useRouter } from 'expo-router';
import { customErrorAlert } from '@utils/custom-alert';

const TranscriptAndAudioLoader: React.FC = React.memo(() => {
	const router = useRouter();

	const updateGlobalState = useGlobalStore.getState().updateGlobalState;

	const [transcriptURL, setTranscriptURL] = useState<string>(''); // meta data url
	const [audioURL, setAudioURL] = useState<string>(''); // audio source url
	const [loading, setLoading] = useState<boolean>(false); // for button
	const [disabled, setDisabled] = useState<boolean>(false); // for button

	const handleSubmit = React.useCallback(async () => {
		try {
			// verify that both URLs are present and are in valid format
			const urlRegex = /^(https?:\/\/[^\s$.?#].[^\s]*)$/i;
			if (
				!transcriptURL ||
				!audioURL ||
				!urlRegex.test(transcriptURL) ||
				!urlRegex.test(audioURL)
			) {
				customErrorAlert(
					'Either Transcript URL or Audio URL is missing or invalid!'
				);
				return;
			}
			setLoading(true);
			setDisabled(true);
			// fetch the transcript meta data
			const transcriptMetaData =
				await fetchTranscriptMetaData(transcriptURL);
			// interleave the phrases based on transcript meta data
			const interleavedPhrases = getInterleavedPhrases(
				transcriptMetaData.speakers,
				transcriptMetaData.pause
			);
			// update global state
			updateGlobalState({
				transcriptMetaData: transcriptMetaData,
				interleavedPhrases: interleavedPhrases,
				audioSource: audioURL,
			});
			setLoading(false);
			setDisabled(false);
			// navigate to transcript player
			router.push('/transcript-player');
		} catch (error) {
			setLoading(false);
			setDisabled(false);
			const e = error as { statusCode?: number; message: string };
			if (e.statusCode === 400) {
				customErrorAlert(e.message);
			} else {
				customErrorAlert(
					'Something went wrong while fetching transcript meta data!'
				);
			}
		}
	}, [transcriptURL, audioURL]);

	return (
		<View style={styles.container}>
			{/* input for transcript meta data url */}
			<TextInput
				value={transcriptURL}
				onChangeText={setTranscriptURL}
				placeholder="Enter transcript meta data URL..."
				placeholderTextColor={'gray'}
				style={styles.textInput}
				autoCapitalize="none"
				keyboardType="url"
			/>
			{/* input for mp3 audio url */}
			<TextInput
				value={audioURL}
				onChangeText={setAudioURL}
				placeholder="Enter audio URL..."
				placeholderTextColor={'gray'}
				style={styles.textInput}
				autoCapitalize="none"
				keyboardType="url"
			/>
			{/* submit button */}
			<Button
				title="Let's go..!"
				loading={loading}
				disabled={disabled}
				loadingProps={{
					size: Platform.OS === 'web' ? 'large' : 'small',
					color: 'black',
				}}
				titleStyle={styles.titleStyle}
				buttonStyle={styles.buttonStyle}
				containerStyle={styles.containerStyle}
				onPress={handleSubmit}
			/>
		</View>
	);
});

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F6F6F9',
		alignItems: 'center',
		justifyContent: 'center',
	},
	textInput: {
		width: wp(80),
		height: Platform.OS === 'web' ? hp(12) : hp(6),
		borderWidth: 1,
		borderColor: 'black',
		borderRadius: 7,
		backgroundColor: 'white',
		paddingLeft: wp(3),
		color: '#1B1B1B',
		fontFamily: 'OutfitMedium',
		fontSize: wp(3.5),
		marginTop: hp(3),
	},
	titleStyle: {
		fontFamily: 'OutfitSemiBold',
		fontSize: wp(3.5),
	},
	buttonStyle: {
		backgroundColor: 'black',
		borderWidth: 0,
		borderRadius: 10,
		width: wp(80),
	},
	containerStyle: {
		marginTop: hp(5),
	},
});

export default TranscriptAndAudioLoader;
