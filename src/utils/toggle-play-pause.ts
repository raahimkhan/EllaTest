import { useGlobalStore } from '@global-store/global-store';
import { AudioPlayer } from 'expo-audio';
import { customErrorAlert } from '@utils/custom-alert';

// this function will be used to toggle audio player pause/resume and handle related logic
export const togglePlayPause = (player: AudioPlayer) => {
	try {
		if (player.isLoaded) {
			const updateGlobalState =
				useGlobalStore.getState().updateGlobalState;
			const isPlaying = useGlobalStore.getState().isPlaying;
			if (player.playing) {
				player.pause();
			} else {
				player.play();
			}
			updateGlobalState({ isPlaying: !isPlaying });
		} else {
			customErrorAlert(
				'Player is not loaded! Audio is downloading. Please wait.'
			);
		}
	} catch {
		customErrorAlert('Something went wrong! Cannot play audio.');
	}
};
