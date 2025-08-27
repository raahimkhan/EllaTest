import React, { useState, useRef, useEffect } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	Platform,
	StyleSheet,
	ActivityIndicator,
} from 'react-native';
import useInsetsInfo from '@hooks/use-insets-info';
import {
	wp,
	hp,
	scaleHeight,
} from '@raahimkhan23/react-native-responsive-utils';
import hexToRgba from 'hex-to-rgba';
import AntDesign from '@expo/vector-icons/AntDesign';
import { LinearGradient } from 'expo-linear-gradient';
import * as Progress from 'react-native-progress';
import { useGlobalStore } from '@global-store/global-store';
import { togglePlayPause } from '@utils/toggle-play-pause';
import {
	useAudioPlayer,
	useAudioPlayerStatus,
	setAudioModeAsync,
} from 'expo-audio';
import { formatTime } from '@utils/format-time';
import { rewindPlayer } from '@utils/rewind-player';
import { forwardPlayer } from '@utils/forward-player';

/*
	- extracting blur layer and progress bar heights as constants
	- will be used to absolutely position the blur layer above the progress bar
*/
const layerBlurHeight = scaleHeight(75.83);
const progressBarHeight = scaleHeight(9.71);

const AudioPlayer: React.FC = React.memo(() => {
	// safe area bottom insets
	const { bottomInsets } = useInsetsInfo();

	// interleaved phrases from global state to handle forward and rewind
	const updateGlobalState = useGlobalStore.getState().updateGlobalState;
	const interleavedPhrases = useGlobalStore(
		(state) => state.interleavedPhrases
	);
	const audioSource = useGlobalStore((state) => state.audioSource);

	// related to audio player
	const isPlaying = useGlobalStore((state) => state.isPlaying);
	const player = useAudioPlayer(audioSource);
	const status = useAudioPlayerStatus(player);

	// related to the progress bar
	const progressWrapperRef = useRef<View>(null);
	const [progressYPosition, setProgressYPosition] = useState<number>(0);

	/*
		- here we check the status of the audio playback
		- based on that we handle logic like seeking the audio back to the start and resetting
		- we also constantly update current time in global state so that
		the TranscriptMetaData component can highlight phrases by utilising it
	*/
	useEffect(() => {
		if (status?.playing) {
			updateGlobalState({ currentAudioTime: status.currentTime * 1000 });
		}
		if (status?.didJustFinish) {
			player.pause(); // without this, it was looping on Android for some reason
			player.seekTo(0);
			updateGlobalState({ isPlaying: false });
		}
	}, [status]);

	/*
		- here we measure the absolute y position of progress bar
		- we then store it in state to absolutely position the blur layer correctly
		- we also set audio modes for the audio player
		- i added a slight delay of 100ms so that layout is calculated accurately
	*/
	useEffect(() => {
		const timer = setTimeout(() => {
			progressWrapperRef.current?.measure(
				(_x, _y, _width, _height, _pageX, pageY) => {
					setProgressYPosition(pageY);
				}
			);
		}, 100);
		setAudioModeAsync({
			playsInSilentMode: true,
			shouldPlayInBackground: false,
			shouldRouteThroughEarpiece: true,
		});
		return () => clearTimeout(timer);
	}, []);

	return (
		<>
			<View
				style={[
					styles.container,
					{
						marginBottom: bottomInsets === 0 ? hp(3) : bottomInsets,
					},
				]}
			>
				<View style={styles.progressBarContainer}>
					{/* progress bar */}
					<View ref={progressWrapperRef}>
						<Progress.Bar
							style={styles.progressBar}
							progress={
								status?.duration
									? (status?.currentTime || 0) /
										status.duration
									: 0
							}
							width={wp(100)}
							height={progressBarHeight}
							color="#DBA604"
							unfilledColor="rgba(135, 148, 255, 0.2)"
							borderWidth={0}
							borderRadius={0}
							useNativeDriver={
								Platform.OS === 'web' ? false : true
							}
						/>
					</View>
					<View style={styles.timeContainer}>
						{/* audio current time text, i.e., current position time */}
						<Text
							style={[
								styles.timerText,
								{
									marginLeft:
										Platform.OS === 'web' ? wp(3) : wp(6),
								},
							]}
						>
							{formatTime(status?.currentTime)}
						</Text>
						{/* audio total time text, i.e., total audio duration */}
						<Text
							style={[
								styles.timerText,
								{
									marginRight:
										Platform.OS === 'web' ? wp(3) : wp(6),
								},
							]}
						>
							{formatTime(status?.duration)}
						</Text>
					</View>
				</View>
				<View style={styles.controlsContainer}>
					{/* rewind button */}
					<TouchableOpacity
						hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
						onPress={() =>
							rewindPlayer(player, interleavedPhrases!, status)
						}
					>
						<AntDesign
							name="banckward"
							size={Platform.OS === 'web' ? wp(2.5) : wp(7)}
							color="#1B1B1B"
						/>
					</TouchableOpacity>
					{/* play/pause button */}
					<TouchableOpacity
						style={styles.playPauseContainer}
						hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
						onPress={() => togglePlayPause(player)}
					>
						{/* update play/pause based on the global isPlaying state */}
						{isPlaying ? (
							<AntDesign
								name="pause"
								size={Platform.OS === 'web' ? wp(3.5) : wp(10)}
								color="#DBA604"
							/>
						) : (
							<AntDesign
								name="caretright"
								size={Platform.OS === 'web' ? wp(3.5) : wp(10)}
								color="#DBA604"
							/>
						)}
					</TouchableOpacity>
					{/* forward button */}
					<TouchableOpacity
						hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
						onPress={() =>
							forwardPlayer(player, interleavedPhrases!, status)
						}
					>
						<AntDesign
							name="forward"
							size={Platform.OS === 'web' ? wp(2.5) : wp(7)}
							color="#1B1B1B"
						/>
					</TouchableOpacity>
				</View>
			</View>
			{/* blurred layer as can be seen in Figma template above the progress bar */}
			<View
				style={[
					styles.layerBlur,
					{
						top:
							progressYPosition -
							layerBlurHeight +
							progressBarHeight / 2,
					},
				]}
			>
				{/* colors and locations are as speicfied in the Figma template */}
				<LinearGradient
					colors={[
						'rgba(249,249,249,0.55)',
						'rgba(241,241,246,0.7)',
						'rgba(237,237,243,0.8)',
					]}
					locations={[0, 0.49, 1]}
					style={StyleSheet.absoluteFill}
				/>
			</View>
			{/* loading screen to show while audio is downloading */}
			{!player.isLoaded && (
				<View style={styles.loadingScreen}>
					<Text style={styles.loadingText}>
						Please wait! Audio is downloading.
					</Text>
					<ActivityIndicator size="large" color="white" />
				</View>
			)}
		</>
	);
});

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#F6F6F9',
		zIndex: 1000,
	},
	progressBarContainer: {
		width: wp(100),
	},
	progressBar: {
		width: wp(100),
		height: progressBarHeight,
		marginBottom: hp(1.3),
	},
	timeContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	timerText: {
		fontFamily: 'OutfitMedium',
		fontSize: Platform.OS === 'web' ? wp(1.5) : wp(4),
		color: hexToRgba('#000000', 0.5),
	},
	controlsContainer: {
		width: wp(100),
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: Platform.OS === 'web' ? hp(0.5) : wp(1),
	},
	playPauseContainer: {
		padding: Platform.OS === 'web' ? hp(0.4) : wp(2),
		borderRadius: 10,
		backgroundColor: hexToRgba('#8794FF', 0.2),
		alignItems: 'center',
		justifyContent: 'center',
		marginHorizontal: Platform.OS === 'web' ? wp(5.5) : wp(10),
	},
	layerBlur: {
		width: wp(100),
		height: layerBlurHeight,
		backgroundColor: 'transparent',
		zIndex: 1000,
		position: 'absolute',
	},
	loadingScreen: {
		position: 'absolute',
		width: wp(100),
		height: hp(100),
		backgroundColor: 'rgba(50, 50, 50, 1)',
		zIndex: 1000,
		alignItems: 'center',
		justifyContent: 'center',
	},
	loadingText: {
		fontFamily: 'OutfitMedium',
		fontSize: Platform.OS === 'web' ? wp(3) : wp(4),
		color: 'white',
		marginBottom: hp(4),
	},
});

export default AudioPlayer;
