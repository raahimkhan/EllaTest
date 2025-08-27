import type { AudioMetaData, PhraseItem } from '@blue-prints/audio-meta-data';

export interface GlobalState {
	isPlaying: boolean; // whether audio is playing or not
	currentAudioTime: number; // current time in ms of the playing audio
	transcriptMetaData: AudioMetaData | null; // transcript containing phrases and speaker names etc
	interleavedPhrases: PhraseItem[] | null; // phrases interleaved from the above defined meta data
}
