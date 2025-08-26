// i.e., { speaker: 'John', words: 'this is one phrase.' }
export interface PhraseItem {
	speaker: string;
	words: string;
}

// i.e., { words: 'this is one phrase.', time: 1474 }
export interface Phrase {
	words: string;
	time: number;
}

/*
	- below is a sample structure of Speaker interface
	{
		name: 'John',
		phrases: [
			{
				words: 'this is one phrase.',
				time: 1474,
			},
			{
				words: 'now the second phrase.',
				time: 1667,
			},
			{
				words: 'end with last phrase.',
				time: 1214,
			},
		],
	},
*/
export interface Speaker {
	name: string;
	phrases: Phrase[];
}

// please refer @constants/example-audio-metadata
export interface AudioMetaData {
	pause: number;
	speakers: Speaker[];
}
