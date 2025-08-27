// i.e., { speaker: 'John', words: 'this is one phrase.', time: 1474, startTime: 0, endTime: 1474 }
export interface PhraseItem {
	speaker: string;
	words: string;
	time: number; // milli seconds
	startTime: number; // milli seconds
	endTime: number; // milli seconds
}

// i.e., { words: 'this is one phrase.', time: 1474 }
export interface Phrase {
	words: string;
	time: number; // milli seconds
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

// please refer here for a sample: https://file.notion.so/f/f/24407104-f114-40ec-91ac-25f0ac0ac7a6/fd457fa5-cdfc-423b-8900-d47ed9bc0915/example_audio.json?table=block&id=1832fabc-bb3f-806e-a751-e68302a10296&spaceId=24407104-f114-40ec-91ac-25f0ac0ac7a6&expirationTimestamp=1756324800000&signature=L_BuoE1M9JXUtT-m_w7BU7fVXcjtBC8UBZHMCsRHpEw&downloadName=example_audio.json
export interface AudioMetaData {
	pause: number; // milli seconds
	speakers: Speaker[];
}
