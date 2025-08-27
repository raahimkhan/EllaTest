import type { Speaker, PhraseItem } from '@blue-prints/audio-meta-data';

// function to interleave phrases across both speakers
export const getInterleavedPhrases = (
	speakers: Speaker[],
	pauseDuration: number
): PhraseItem[] => {
	// find the maximum number of phrases any speaker has
	const maxLength = Math.max(...speakers.map((s) => s.phrases.length));
	const interleaved: PhraseItem[] = [];
	/*
		- keep track of cumulative timeline position
		- this will move forward as we add phrase durations + pauses
	*/
	let cursor = 0;
	// loop through each phrase index
	for (let i = 0; i < maxLength; i++) {
		// loop through each speaker
		for (const speaker of speakers) {
			// if the speaker has a phrase at this index, add it to interleaved list
			if (speaker.phrases[i]) {
				const phrase = speaker.phrases[i];
				const startTime = cursor; // mark when this phrase starts
				const endTime = cursor + phrase.time; // mark when this phrase ends
				interleaved.push({
					speaker: speaker.name,
					words: speaker.phrases[i].words,
					time: speaker.phrases[i].time,
					startTime,
					endTime,
				});
				/*
					- add silence to cursor position, i.e., the pause after each phrase
				*/
				cursor = endTime + pauseDuration;
			}
		}
	}
	return interleaved;
};
