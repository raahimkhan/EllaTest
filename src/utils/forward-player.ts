import { AudioPlayer } from 'expo-audio';
import { useGlobalStore } from '@global-store/global-store';
import type { PhraseItem } from '@blue-prints/audio-meta-data';
import type { AudioStatus } from 'expo-audio';

/*
    - skips the audio player to the beginning of the next phrase
    - if currently at the last phrase, does nothing
*/
export const forwardPlayer = (
	player: AudioPlayer,
	interleavedPhrases: PhraseItem[],
	status: AudioStatus
) => {
	// exit if audio not loaded or not ready
	if (!status || !status.isLoaded) return;

	// convert current time from seconds to milliseconds
	const currentTime = status.currentTime * 1000;

	// find the index of the current phrase being spoken
	const currentPhraseIndex = interleavedPhrases.findIndex(
		(phrase) =>
			currentTime >= phrase.startTime && currentTime <= phrase.endTime
	);

	// if current phrase not found or at last index, exit the function
	if (
		currentPhraseIndex === -1 ||
		currentPhraseIndex === interleavedPhrases.length - 1
	)
		return;

	// get next phrase
	const nextPhrase = interleavedPhrases[currentPhraseIndex + 1];

	// skip to the start of the next phrase
	player.seekTo(nextPhrase.startTime / 1000);

	/*
		- update global state of current audio time
		- we do this only if player is paused so that not only seek,
		but also next phrase in order is highlighted correctly
	*/
	if (!status.playing) {
		const updateGlobalState = useGlobalStore.getState().updateGlobalState;
		updateGlobalState({ currentAudioTime: nextPhrase.startTime });
	}
};
