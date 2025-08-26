import React from 'react';
import { View, Text, Platform, FlatList, StyleSheet } from 'react-native';
import {
	wp,
	hp,
	scaleHeight,
	scaleFont,
} from '@raahimkhan23/react-native-responsive-utils';
import type { PhraseItem } from '@blue-prints/audio-meta-data';
import { exampleAudioMetadata } from '@constants/example-audio-metadata';
import { getInterleavedPhrases } from '@utils/get-interleaved-phrases';

const TranscriptMetaData: React.FC = React.memo(() => {
	// generate interleaved phrases
	const interleavedPhrases = getInterleavedPhrases(
		exampleAudioMetadata.speakers
	);

	// render each phrase item with speaker name
	const renderPhrase = React.useCallback(({ item }: { item: PhraseItem }) => {
		/*
			- we check if current phrase is from speaker 1 or speaker 2
			- we do this based on the name of the current phrase's speaker
			- then we dynamically align the bubbles right or left based on speaker
		*/
		const isSecondSpeaker =
			exampleAudioMetadata.speakers.findIndex(
				(s) => s.name === item.speaker
			) === 1;
		return (
			<View
				style={
					isSecondSpeaker
						? styles.individualMetaDataContainerRight
						: styles.individualMetaDataContainerLeft
				}
			>
				{/* speaker name */}
				<Text
					style={
						isSecondSpeaker
							? styles.speakerNameRight
							: styles.speakerNameLeft
					}
				>
					{item.speaker}
				</Text>
				{/* phrase */}
				<View style={styles.phraseContainer}>
					<Text style={styles.phrase}>{item.words}</Text>
				</View>
			</View>
		);
	}, []);

	return (
		<View style={styles.container}>
			<FlatList
				data={interleavedPhrases}
				extraData={interleavedPhrases}
				renderItem={renderPhrase}
				keyExtractor={(_, index) => index.toString()}
				showsVerticalScrollIndicator={false}
				style={styles.flatListStyle}
				contentContainerStyle={
					styles.flatListStyleContentContainerStyle
				}
			/>
		</View>
	);
});

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexGrow: 1,
		backgroundColor: '#fafafa',
		alignItems: 'center',
		justifyContent: 'flex-start',
		paddingTop: hp(1),
	},
	flatListStyle: {
		width: wp(100),
	},
	flatListStyleContentContainerStyle: {
		paddingBottom: hp(10),
	},
	individualMetaDataContainerLeft: {
		marginTop: hp(4),
		alignSelf: 'flex-start',
		marginLeft: Platform.OS === 'web' ? wp(4) : wp(8),
	},
	individualMetaDataContainerRight: {
		marginTop: hp(4),
		alignSelf: 'flex-end',
		marginRight: Platform.OS === 'web' ? wp(4) : wp(8),
	},
	speakerNameLeft: {
		fontFamily: 'OutfitMedium',
		color: '#000000',
		fontSize: Platform.OS === 'web' ? wp(1) : scaleFont(15),
		alignSelf: 'flex-start',
	},
	speakerNameRight: {
		fontFamily: 'OutfitMedium',
		color: '#000000',
		fontSize: Platform.OS === 'web' ? wp(1) : scaleFont(15),
		alignSelf: 'flex-end',
	},
	phraseContainer: {
		width: Platform.OS === 'web' ? wp(25) : wp(80),
		minHeight: scaleHeight(52),
		backgroundColor: '#FFFFFF',
		borderRadius: 10,
		borderWidth: 1,
		borderColor: '#F2EEF6',
		marginTop: hp(1.5),
		alignItems: 'flex-start',
		justifyContent: 'center',
	},
	phrase: {
		fontFamily: 'OutfitSemiBold',
		color: '#1B1B1B',
		fontSize: scaleFont(17),
		marginHorizontal: Platform.OS === 'web' ? wp(1) : wp(4),
		marginVertical: hp(2),
	},
});

export default TranscriptMetaData;
