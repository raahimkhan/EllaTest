import { AudioPlayer } from 'expo-audio';
import { useGlobalStore } from '@global-store/global-store';
import type { PhraseItem } from '@blue-prints/audio-meta-data';
import type { AudioStatus } from 'expo-audio';

/*
    - rewinds the audio player to the beginning of the current phrase,
    - or if already at the start of that phrase, to the beginning of the previous phrase.
    - for the first phrase only, it rewinds to its start
*/
export const rewindPlayer = (
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

	// if current phrase not found, exit the function
	if (currentPhraseIndex === -1) return;

	// if first phrase (index 0), rewind to its start
	if (currentPhraseIndex === 0) {
		player.seekTo(0);
		return;
	}

	// get current and previous phrases
	const currentPhrase = interleavedPhrases[currentPhraseIndex];
	const previousPhrase = interleavedPhrases[currentPhraseIndex - 1];

	/*
		- if current time is less than quarter of the duration of the current phrase,
		we rewind to start of the current phase
		- otherwise, we rewind to start of the previous phase
		- i tried multiple offset values to detect the start of phrase
		- quarter seems to work the best across web and mobile
		- we also update global state of current audio time
		- we do this only if player is paused so that not only seek,
		but also previous phrase in order is highlighted correctly
	*/
	const targetTime =
		currentTime <=
		currentPhrase.startTime +
			(currentPhrase.endTime - currentPhrase.startTime) / 4
			? previousPhrase.startTime
			: currentPhrase.startTime;
	player.seekTo(targetTime / 1000);
	if (!status.playing) {
		const updateGlobalState = useGlobalStore.getState().updateGlobalState;
		updateGlobalState({ currentAudioTime: targetTime });
	}
};
