import React from 'react';
import { View, Text, Platform, FlatList, StyleSheet } from 'react-native';
import {
	wp,
	hp,
	scaleHeight,
	scaleFont,
} from '@raahimkhan23/react-native-responsive-utils';
import type { PhraseItem } from '@blue-prints/audio-meta-data';
import { useGlobalStore } from '@global-store/global-store';

const TranscriptMetaData: React.FC = React.memo(() => {
	// get current time (ms), transcript meta data, and interleaved phrases from global state
	const currentAudioTime = useGlobalStore((state) => state.currentAudioTime);
	const transcriptMetaData = useGlobalStore(
		(state) => state.transcriptMetaData
	);
	const interleavedPhrases = useGlobalStore(
		(state) => state.interleavedPhrases
	);

	// render each phrase item with speaker name
	const renderPhrase = React.useCallback(
		({ item }: { item: PhraseItem }) => {
			/*
				- we check if current phrase is from speaker 1 or speaker 2
				- we do this based on the name of the current phrase's speaker
				- then we dynamically align the bubbles right or left based on speaker
			*/
			const isSecondSpeaker =
				transcriptMetaData!.speakers.findIndex(
					(s) => s.name === item.speaker
				) === 1;
			// check if current phrase should be highlighted
			const isCurrent =
				currentAudioTime >= item.startTime &&
				currentAudioTime <= item.endTime;
			// calculate colors based on highlight
			const bubbleColor = isCurrent ? '#E1E4FF' : '#FFFFFF';
			const speakerAndPhraseColor = isCurrent ? '#DBA604' : '#1B1B1B';
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
						style={[
							isSecondSpeaker
								? styles.speakerNameRight
								: styles.speakerNameLeft,
							{ color: speakerAndPhraseColor },
						]}
					>
						{item.speaker}
					</Text>
					{/* phrase */}
					<View
						style={[
							styles.phraseContainer,
							{ backgroundColor: bubbleColor },
						]}
					>
						<Text
							style={[
								styles.phrase,
								{ color: speakerAndPhraseColor },
							]}
						>
							{item.words}
						</Text>
					</View>
				</View>
			);
		},
		[currentAudioTime]
	);

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
		fontSize: Platform.OS === 'web' ? wp(1) : scaleFont(15),
		alignSelf: 'flex-start',
	},
	speakerNameRight: {
		fontFamily: 'OutfitMedium',
		fontSize: Platform.OS === 'web' ? wp(1) : scaleFont(15),
		alignSelf: 'flex-end',
	},
	phraseContainer: {
		width: Platform.OS === 'web' ? wp(25) : wp(80),
		minHeight: scaleHeight(52),
		borderRadius: 10,
		borderWidth: 1,
		borderColor: '#F2EEF6',
		marginTop: hp(1.5),
		alignItems: 'flex-start',
		justifyContent: 'center',
	},
	phrase: {
		fontFamily: 'OutfitSemiBold',
		fontSize: scaleFont(17),
		marginHorizontal: Platform.OS === 'web' ? wp(1) : wp(4),
		marginVertical: hp(2),
	},
});

export default TranscriptMetaData;
