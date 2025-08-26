import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	Platform,
	StyleSheet,
} from 'react-native';
import useInsetsInfo from '@hooks/use-insets-info';
import {
	wp,
	hp,
	scaleHeight,
} from '@raahimkhan23/react-native-responsive-utils';
import hexToRgba from 'hex-to-rgba';
import AntDesign from '@expo/vector-icons/AntDesign';
import { LinearProgress } from '@rneui/themed';
import { LinearGradient } from 'expo-linear-gradient';
import { useGlobalStore } from '@global-store/global-store';
import { togglePlayPause } from '@utils/toggle-play-pause';

/*
	- extracting blur layer and progress bar heights as constants
	- will be used to absolutely position the blur layer above the progress bar
*/
const layerBlurHeight = scaleHeight(75.83);
const progressBarHeight = scaleHeight(9.71);

const MusicPlayer: React.FC = React.memo(() => {
	// safe area bottom insets
	const { bottomInsets } = useInsetsInfo();

	// music player is playing or not
	const isPlaying = useGlobalStore((state) => state.isPlaying);

	// related to the progress bar
	const progressRef = React.useRef(null);
	const [progressYPosition, setProgressYPosition] = useState<number>(0);

	/*
		- here we measure the absolute y position of progress bar after layout completes
		- we then store it in state to absolutely position the blur layer correctly
		- requestAnimationFrame ensures the measurement happens after the layout is finalized
	*/
	useEffect(() => {
		requestAnimationFrame(() => {
			if (progressRef.current) {
				(progressRef.current as any)?.measure(
					(
						_x: number,
						_y: number,
						_width: number,
						_height: number,
						_pageX: number,
						pageY: number
					) => {
						setProgressYPosition(pageY);
					}
				);
			}
		});
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
					<LinearProgress
						style={styles.progressBar}
						value={Math.round(0.05 * 1000) / 1000}
						variant="determinate"
						color="#DBA604"
						trackColor="rgba(135, 148, 255, 0.2)"
						ref={progressRef}
					/>
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
							01:23
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
							06:00
						</Text>
					</View>
				</View>
				<View style={styles.controlsContainer}>
					{/* rewind button */}
					<TouchableOpacity
						hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
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
						onPress={togglePlayPause}
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
});

export default MusicPlayer;
