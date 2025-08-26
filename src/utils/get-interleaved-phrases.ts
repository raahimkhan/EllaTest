import type { Speaker, PhraseItem } from '@blue-prints/audio-meta-data';

// function to interleave phrases across both speakers
export const getInterleavedPhrases = (speakers: Speaker[]): PhraseItem[] => {
	// find the maximum number of phrases any speaker has
	const maxLength = Math.max(...speakers.map((s) => s.phrases.length));
	const interleaved: PhraseItem[] = [];
	// loop through each phrase index
	for (let i = 0; i < maxLength; i++) {
		// loop through each speaker
		for (const speaker of speakers) {
			// if the speaker has a phrase at this index, add it to interleaved list
			if (speaker.phrases[i]) {
				interleaved.push({
					speaker: speaker.name,
					words: speaker.phrases[i].words,
				});
			}
		}
	}
	return interleaved;
};
